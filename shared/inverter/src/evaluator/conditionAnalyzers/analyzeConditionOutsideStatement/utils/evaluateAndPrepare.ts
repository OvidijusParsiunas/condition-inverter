import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';

interface Start {
  index: number;
  isNegatedBracket?: boolean;
}

export class EvaluateAndPrepareOutsideStatement {
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
  private static getStartTokenForOpenBracket(tokens: Tokens, openBracketIndex: number, indexAfterFirstBracket: number): Start {
    const previousIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, openBracketIndex - 1, false);
    if (tokens[previousIndex] === '!') {
      const result = EvaluateAndPrepareOutsideStatement.getLastExclamationMark(tokens, previousIndex);
      return { index: result, isNegatedBracket: true };
    }
    if (tokens[previousIndex] === '(') {
      return EvaluateAndPrepareOutsideStatement.getStartTokenForOpenBracket(tokens, previousIndex, indexAfterFirstBracket);
    }
    return { index: indexAfterFirstBracket };
  }

  // tracks back until a token before the condition start is found
  private static getStart(tokens: Tokens, index: number, evaluationState: EvaluationState): Start {
    if (index === 0) return { index: 0 };
    const previousIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index - 1, false);
    if (previousIndex === -1) return { index: index };
    const previousToken = tokens[previousIndex];
    if (previousToken === '=' || previousToken === ';' || previousToken === ',') return { index: index };
    if (previousToken === '(') return EvaluateAndPrepareOutsideStatement.getStartTokenForOpenBracket(tokens, previousIndex, index);
    return EvaluateAndPrepareOutsideStatement.getStart(tokens, previousIndex, evaluationState);
  }

  public static init(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const start = EvaluateAndPrepareOutsideStatement.getStart(tokens, index, evaluationState);
    evaluationState.currentConditionStartIndex = start.index;
    evaluationState.isEvaluatingConditions = true;
    return start.index;
  }
}
