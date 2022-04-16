import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeGreaterOrLessThanSign {
  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[index + 1];
    evaluationState.comparisonOperatorFound = true;
    if (nextToken === '=') {
      evaluationState.invertableSyntaxIndexes.push({ start: index, greaterOrLessThanHasFollowupEquals: true });
      return index + 1;
    }
    evaluationState.invertableSyntaxIndexes.push({ start: index });
    return index;
  }
}
