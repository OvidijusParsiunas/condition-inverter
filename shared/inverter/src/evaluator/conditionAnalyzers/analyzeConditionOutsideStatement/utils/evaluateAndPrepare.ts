import { jstsReservedTerminatingWords } from '../../../../shared/consts/jstsReservedTerminatingWords';
import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { IsTokenWord } from '../../../../shared/functionality/isTokenWord';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';

interface TraversalState {
  closeBracketNum: number;
  startedOnternaryOperator: boolean;
}

export class EvaluateAndPrepareOutsideStatement {
  // prettier-ignore
  private static getStartIndexForEquals(
      tokens: Tokens, equalsIndex: number, traversalIndex: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
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
    return traversalIndex;
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
      return EvaluateAndPrepareOutsideStatement.getStartIndexForOpenBracket(
        tokens, previousIndex, indexAfterBracket, evaluationState, traversalState);
    }
    if (EvaluateAndPrepareOutsideStatement.isFunctionInvocation(tokens, previousIndex)
        && !jstsReservedTerminatingWords[tokens[previousIndex] as keyof typeof jstsReservedTerminatingWords]) {
      return previousIndex;
    }
    return indexAfterBracket;
  }

  // indexAfterFirstBracket in the context of backward traversal
  // prettier-ignore
  private static getStartIndexForOpenBracket(
      tokens: Tokens, openBracketIndex: number, indexAfterBracket: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
    if (traversalState.closeBracketNum > 0) {
      traversalState.closeBracketNum -= 1;
      return EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, openBracketIndex, evaluationState, traversalState);
    }
    return EvaluateAndPrepareOutsideStatement.getIndexAroundOpenBracket(tokens, openBracketIndex, indexAfterBracket, evaluationState, traversalState);
  }

  // this is used for a scenarion where a ternary operator with no conditions in front of it has passed and the expression contains another one,
  // e.g: ? dog : fish ? cat ? dog  -  should result in ? dog : !fish ? cat ? dog
  // prettier-ignore
  private static getIndexIfColonBeforeTernaryOperator(
    tokens: Tokens, previousIndex: number, traversalIndex: number, evaluationState: EvaluationState, traversalState: TraversalState
  ): number {
    if (traversalState.startedOnternaryOperator) return traversalIndex;
    return EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, previousIndex, evaluationState, traversalState);
  }

  // this is used for a scenarion where a ternary operator with no conditions in front of it has passed and the second one should be inverted instead,
  // e.g: ? fish ? dog : cat  -  should result in ? !fish ? dog : cat
  // prettier-ignore
  private static getIndexIfOutsideTernaryOperator(
      tokens: Tokens, previousIndex: number, traversalIndex: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
    if (tokens[previousIndex - 1] !== '?' && tokens[traversalIndex + 1] !== '?' && tokens[traversalIndex + 1] !== '.') {
      return traversalIndex;
    }
    return EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, previousIndex, evaluationState, traversalState);
  }

  // prettier-ignore
  private static getStartIndexAfterSymbol(
      tokens: Tokens, previousIndex: number, traversalIndex: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
    switch (tokens[previousIndex]) {
      case ';':
      case ',':
        return traversalIndex;
      case '=':
        return EvaluateAndPrepareOutsideStatement.getStartIndexForEquals(tokens, previousIndex, traversalIndex, evaluationState, traversalState);
      case '(':
        return EvaluateAndPrepareOutsideStatement.getStartIndexForOpenBracket(tokens, previousIndex, traversalIndex, evaluationState, traversalState);
      case '?':
        return EvaluateAndPrepareOutsideStatement.getIndexIfOutsideTernaryOperator(
            tokens, previousIndex, traversalIndex, evaluationState, traversalState);
      case ':':
        return EvaluateAndPrepareOutsideStatement.getIndexIfColonBeforeTernaryOperator(
          tokens, previousIndex, traversalIndex, evaluationState, traversalState);
      case ')':
        traversalState.closeBracketNum += 1;
      default:
        return EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, previousIndex, evaluationState, traversalState);
    }
  }

  // tracks back until a token before the condition start is found
  // prettier-ignore
  private static getStartIndex(
      tokens: Tokens, index: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
    if (index === 0) return 0;
    const previousIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index - 1, false);
    if (previousIndex === -1) return index;
    return EvaluateAndPrepareOutsideStatement.getStartIndexAfterSymbol(tokens, previousIndex, index, evaluationState, traversalState);
  }

  public static getStartIndexAndUpdateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const initialTraversalState = { closeBracketNum: 0, startedOnternaryOperator: tokens[index] === '?' };
    const startIndex = EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, index, evaluationState, initialTraversalState);
    evaluationState.currentConditionStartIndex = startIndex;
    evaluationState.isEvaluatingConditions = true;
    return startIndex;
  }
}
