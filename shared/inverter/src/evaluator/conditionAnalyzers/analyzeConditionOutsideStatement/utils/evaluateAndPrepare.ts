import { jstsReservedTerminatingWords } from '../../../../shared/consts/jstsReservedTerminatingWords';
import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { STRING_QUOTE_JSON } from '../../../../shared/consts/specialTokens';
import { IsTokenWord } from '../../../../shared/functionality/isTokenWord';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';

interface TraversalState {
  closeBracketNum: number;
  stringQuoteNum: number;
}

export class EvaluateAndPrepareOutsideStatement {
  // prettier-ignore
  private static getIndexForEqualsOrContinue(
      tokens: Tokens, equalsIndex: number, originalIndex: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
    // arrow function
    if (tokens[equalsIndex + 1] === '>') {
      const openBracketIndex = TraversalUtil.findTokenIndex(tokens, equalsIndex, '(', false);
      const closeBracketIndex = TraversalUtil.getIndexOfClosingBracket(tokens, openBracketIndex, 1);
      if (closeBracketIndex > -1 && closeBracketIndex < equalsIndex) {
        return EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, openBracketIndex, evaluationState, traversalState);
      }
    } else if (tokens[equalsIndex - 1] === ':') {
      // this is used to prevent := from being inverted when there is no ;
      // e.g: if num := 9
      const semicolonIndex = TraversalUtil.findTokenIndex(tokens, equalsIndex, ';');
      return semicolonIndex === -1 ? tokens.length : semicolonIndex;
    }
    if (tokens[equalsIndex - 1] === '>' || tokens[equalsIndex - 1] === '<') {
      return EvaluateAndPrepareOutsideStatement.getStartIndexAfterSymbol(tokens, equalsIndex - 1, originalIndex, evaluationState, traversalState);
    }
    // if =" and there is an uneven amount of string quotes since condition - can assume that it is a condition in a template
    const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, equalsIndex + 1);
    if (STRING_QUOTE_JSON[tokens[nextTokenIndex] as keyof typeof STRING_QUOTE_JSON] && traversalState.stringQuoteNum % 2 === 1) {
      return TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, nextTokenIndex + 1);
    }
    return originalIndex;
  }

  private static isFunctionInvocation(tokens: Tokens, previousIndex: number): boolean {
    return IsTokenWord.check(tokens[previousIndex]);
  }

  private static getLastExclamationMark(tokens: Tokens, index: number): number {
    const previousIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index, false);
    if (tokens[previousIndex] === '!') {
      return EvaluateAndPrepareOutsideStatement.getLastExclamationMark(tokens, previousIndex - 1);
    }
    if (tokens[previousIndex] === '(') {
      const indexBeforeOpenBracket = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, previousIndex - 1, false);
      if (tokens[indexBeforeOpenBracket] === '!' || tokens[indexBeforeOpenBracket] === '(') {
        return EvaluateAndPrepareOutsideStatement.getLastExclamationMark(tokens, indexBeforeOpenBracket);
      }
    }
    return index + 1;
  }

  // prettier-ignore
  private static getIndexAroundOpenBracket(
      tokens: Tokens, openBracketIndex: number, indexAfterBracket: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
    const previousIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, openBracketIndex - 1, false);
    if (tokens[previousIndex] === '!') {
      return EvaluateAndPrepareOutsideStatement.getLastExclamationMark(tokens, previousIndex);
    }
    if (tokens[previousIndex] === '(') {
      // prettier-ignore
      return EvaluateAndPrepareOutsideStatement.getIndexForOpenBracket(
        tokens, previousIndex, indexAfterBracket, evaluationState, traversalState);
    }
    if (EvaluateAndPrepareOutsideStatement.isFunctionInvocation(tokens, previousIndex)
        && !jstsReservedTerminatingWords[tokens[previousIndex] as keyof typeof jstsReservedTerminatingWords]) {
      return previousIndex;
    }
    return indexAfterBracket;
  }

  // indexAfterBracket in the context of backward traversal
  // prettier-ignore
  private static getIndexForOpenBracket(
      tokens: Tokens, openBracketIndex: number, indexAfterBracket: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
    if (traversalState.closeBracketNum > 0) {
      traversalState.closeBracketNum -= 1;
      return EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, openBracketIndex, evaluationState, traversalState);
    }
    return EvaluateAndPrepareOutsideStatement.getIndexAroundOpenBracket(tokens, openBracketIndex, indexAfterBracket, evaluationState, traversalState);
  }

  // this is used for a scenarion where a ternary operator with no conditions in front of it has passed and the second one should be inverted instead,
  // e.g: ? fish ? dog : cat  -  should result in ? !fish ? dog : cat
  // prettier-ignore
  private static getIndexIfOutsideTernaryOperator(
      tokens: Tokens, previousIndex: number, originalIndex: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
    if (tokens[previousIndex - 1] !== '?' && tokens[originalIndex + 1] !== '?' && tokens[originalIndex + 1] !== '.') {
      return originalIndex;
    }
    return EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, previousIndex, evaluationState, traversalState);
  }

  // prettier-ignore
  private static getIndexIfArrowOrContinue(
      tokens: Tokens, previousIndex: number, originalIndex: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
    return tokens[previousIndex - 1] === '='
      ? originalIndex
      : EvaluateAndPrepareOutsideStatement.getStartIndexAfterSymbol(tokens, previousIndex - 2, originalIndex, evaluationState, traversalState);
  }

  // prettier-ignore
  private static getIndexIfOpenSqrBracket(
    tokens: Tokens, previousIndex: number, originalIndex: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
      const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, previousIndex - 1, false);
      if (STRING_QUOTE_JSON[tokens[previousTokenIndex] as keyof typeof STRING_QUOTE_JSON]) {
        return originalIndex;
      }
      return EvaluateAndPrepareOutsideStatement.getStartIndexAfterSymbol(tokens, previousIndex - 1, originalIndex, evaluationState, traversalState);
  }

  // prettier-ignore
  private static getIndexIfCloseScopeBraceOrContinue(
      tokens: Tokens, previousIndex: number, originalIndex: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
    const indexOfOpenBrace = TraversalUtil.getIndexOfOpenBrace(tokens, previousIndex, 1);
    if (indexOfOpenBrace > -1) {
      return tokens[indexOfOpenBrace - 1] === '$'
        ? EvaluateAndPrepareOutsideStatement.getStartIndexAfterSymbol(tokens, indexOfOpenBrace - 1, originalIndex, evaluationState, traversalState)
        : originalIndex;
    }
    return evaluationState.currentConditionStartIndex;
  }

  // prettier-ignore
  private static getStartIndexAfterSymbol(
      tokens: Tokens, previousIndex: number, originalIndex: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
    switch (tokens[previousIndex]) {
      case '{':
      case ';':
      case ':':
      case ',':
      case 'return':
      case 'function':
        return originalIndex;
      case '}':
        return EvaluateAndPrepareOutsideStatement.getIndexIfCloseScopeBraceOrContinue(
          tokens, previousIndex, originalIndex, evaluationState, traversalState);
      case '[':
        return EvaluateAndPrepareOutsideStatement.getIndexIfOpenSqrBracket(tokens, previousIndex, originalIndex, evaluationState, traversalState);  
      case '>':
        return EvaluateAndPrepareOutsideStatement.getIndexIfArrowOrContinue(tokens, previousIndex, originalIndex, evaluationState, traversalState);
      case '=':
        return EvaluateAndPrepareOutsideStatement.getIndexForEqualsOrContinue(tokens, previousIndex, originalIndex, evaluationState, traversalState);
      case '(':
        return EvaluateAndPrepareOutsideStatement.getIndexForOpenBracket(tokens, previousIndex, originalIndex, evaluationState, traversalState);
      case '?':
        return EvaluateAndPrepareOutsideStatement.getIndexIfOutsideTernaryOperator(
          tokens, previousIndex, originalIndex, evaluationState, traversalState);
      case `'`:
      case '`':
      case '"':
        traversalState.stringQuoteNum += 1;
        return EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, previousIndex, evaluationState, traversalState);
      case ')':
        traversalState.closeBracketNum += 1;
      default:
        return EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, previousIndex, evaluationState, traversalState);
    }
  }

  private static isIndexBeforeEndOfPreviousAnalysis(tokens: Tokens, index: number, evaluationState: EvaluationState): boolean {
    return evaluationState.conditionSequenceEndIndex !== tokens.length - 1 && index < evaluationState.conditionSequenceEndIndex;
  }

  // tracks back until a token before the condition start is found
  private static getStartIndex(tokens: Tokens, index: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
    if (EvaluateAndPrepareOutsideStatement.isIndexBeforeEndOfPreviousAnalysis(tokens, index, evaluationState)) {
      return evaluationState.conditionSequenceEndIndex + 1;
    }
    if (index === 0) return 0;
    const previousIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index - 1, false);
    if (previousIndex === -1) return index;
    return EvaluateAndPrepareOutsideStatement.getStartIndexAfterSymbol(tokens, previousIndex, index, evaluationState, traversalState);
  }

  public static getStartIndexAndUpdateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    evaluationState.currentConditionStartIndex = index;
    const initialTraversalState = { closeBracketNum: 0, stringQuoteNum: 0 };
    const startIndex = EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, index, evaluationState, initialTraversalState);
    evaluationState.currentConditionStartIndex = startIndex;
    evaluationState.isEvaluatingConditions = true;
    return startIndex;
  }
}
