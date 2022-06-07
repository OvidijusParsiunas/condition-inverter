import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Token, Tokens } from '../../../../shared/types/tokens';

interface TraversalState {
  closeBracketNum: number;
}

export class EvaluateAndPrepareOutsideStatement {
  private static getStartIndexForEquals(tokens: Tokens, equalsIndex: number, traversalIndex: number, evaluationState: EvaluationState): number {
    if (tokens[equalsIndex + 1] === '>') {
      const openBracketIndex = TraversalUtil.findTokenIndex(tokens, equalsIndex, '(', false);
      const closeBracketIndex = TraversalUtil.getIndexOfClosingBracket(tokens, openBracketIndex, 1);
      if (closeBracketIndex > -1 && closeBracketIndex < equalsIndex) {
        return EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, openBracketIndex, evaluationState);
      }
    }
    return traversalIndex;
  }

  private static isFunctionInvocation(tokens: Tokens, openBracketIndex: number): boolean {
    return Boolean((tokens[openBracketIndex - 1] as string)?.match(/(\w+)/g));
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
    if (EvaluateAndPrepareOutsideStatement.isFunctionInvocation(tokens, openBracketIndex)) {
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

  // prettier-ignore
  private static getStartIndexAfterSymbol(
      tokens: Tokens, previousIndex: number, traversalIndex: number, evaluationState: EvaluationState, traversalState: TraversalState): number {
    switch (tokens[previousIndex]) {
      case ';':
      case ',':
        return traversalIndex;
      case '=':
        return EvaluateAndPrepareOutsideStatement.getStartIndexForEquals(tokens, previousIndex, traversalIndex, evaluationState);
      case '(':
        return EvaluateAndPrepareOutsideStatement.getStartIndexForOpenBracket(tokens, previousIndex, traversalIndex, evaluationState, traversalState);
      case ')':
        traversalState.closeBracketNum += 1;
      default:
        return EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, previousIndex, evaluationState, traversalState);
    }
  }

  // tracks back until a token before the condition start is found
  // prettier-ignore
  private static getStartIndex(
      tokens: Tokens, index: number, evaluationState: EvaluationState, traversalState: TraversalState = { closeBracketNum: 0 }): number {
    if (index === 0) return 0;
    const previousIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index - 1, false);
    if (previousIndex === -1) return index;
    return EvaluateAndPrepareOutsideStatement.getStartIndexAfterSymbol(tokens, previousIndex, index, evaluationState, traversalState);
  }

  public static getStartIndexAndUpdateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const startIndex = EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, index, evaluationState);
    evaluationState.currentConditionStartIndex = startIndex;
    evaluationState.isEvaluatingConditions = true;
    return startIndex;
  }
}
