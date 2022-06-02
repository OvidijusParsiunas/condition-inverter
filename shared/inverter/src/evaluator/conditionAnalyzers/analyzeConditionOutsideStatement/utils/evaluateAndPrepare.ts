import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';

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

  // indexAfterFirstBracket in the context of backward traversal
  private static getStartIndexForOpenBracket(tokens: Tokens, openBracketIndex: number, indexAfterFirstBracket: number): number {
    const previousIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, openBracketIndex - 1, false);
    if (tokens[previousIndex] === '!') {
      return EvaluateAndPrepareOutsideStatement.getLastExclamationMark(tokens, previousIndex);
    }
    if (tokens[previousIndex] === '(') {
      return EvaluateAndPrepareOutsideStatement.getStartIndexForOpenBracket(tokens, previousIndex, indexAfterFirstBracket);
    }
    return indexAfterFirstBracket;
  }

  private static getStartIndexAfterSymbol(tokens: Tokens, previousIndex: number, traversalIndex: number, evaluationState: EvaluationState): number {
    switch (tokens[previousIndex]) {
      case ';':
      case ',':
        return traversalIndex;
      case '=':
        return EvaluateAndPrepareOutsideStatement.getStartIndexForEquals(tokens, previousIndex, traversalIndex, evaluationState);
      case '(':
        return EvaluateAndPrepareOutsideStatement.getStartIndexForOpenBracket(tokens, previousIndex, traversalIndex);
      default:
        return EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, previousIndex, evaluationState);
    }
  }

  // tracks back until a token before the condition start is found
  private static getStartIndex(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (index === 0) return 0;
    const previousIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index - 1, false);
    if (previousIndex === -1) return index;
    return EvaluateAndPrepareOutsideStatement.getStartIndexAfterSymbol(tokens, previousIndex, index, evaluationState);
  }

  public static getStartIndexAndUpdateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const startIndex = EvaluateAndPrepareOutsideStatement.getStartIndex(tokens, index, evaluationState);
    evaluationState.currentConditionStartIndex = startIndex;
    evaluationState.isEvaluatingConditions = true;
    return startIndex;
  }
}
