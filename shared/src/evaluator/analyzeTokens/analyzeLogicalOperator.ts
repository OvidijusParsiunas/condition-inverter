import { EvaluationState } from '../../shared/types/evaluationState';
import { Tokens } from '../../shared/types/tokens';

export class AnalyzeGreaterOrLessThan {
  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[index + 1];
    evaluationState.comparisonOperatorFound = true;
    if (nextToken === '=') {
      evaluationState.conditionsToBeInverted.push({ start: index, greaterOrLessThanHasFollowupEquals: true });
      return index + 1;
    }
    evaluationState.conditionsToBeInverted.push({ start: index });
    return index;
  }
}
