import { TraversalUtil } from '../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';

export class EvaluateAndPrepareOutsideStatement {
  // tracks back until a token before the condition start is found
  private static getStartTokenIndex(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (index === 0) {
      return index;
    }
    const previousIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index - 1, false);
    const previousToken = tokens[previousIndex];
    if (previousToken === '=' || previousToken === ';' || previousToken === ',' || previousToken === '(') return index;
    return EvaluateAndPrepareOutsideStatement.getStartTokenIndex(tokens, previousIndex, evaluationState);
  }

  public static init(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    evaluationState.currentConditionStartIndex = EvaluateAndPrepareOutsideStatement.getStartTokenIndex(tokens, index, evaluationState);
    evaluationState.isEvaluatingConditions = true;
    return evaluationState.currentConditionStartIndex;
  }
}
