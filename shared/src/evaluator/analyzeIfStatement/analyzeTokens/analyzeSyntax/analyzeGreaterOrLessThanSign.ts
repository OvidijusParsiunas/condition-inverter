import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeGreaterOrLessThanSign {
  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[index + 1];
    evaluationState.comparisonOperatorFound = true;
    if (nextToken === '=') {
      evaluationState.syntaxToBeInverted.push({ start: index, greaterOrLessThanHasFollowUpEquals: true });
      return index + 1;
    }
    evaluationState.syntaxToBeInverted.push({ start: index });
    return index;
  }
}
