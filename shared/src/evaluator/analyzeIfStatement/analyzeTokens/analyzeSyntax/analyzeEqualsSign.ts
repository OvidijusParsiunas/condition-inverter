import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeEqualsSign {
  private static getNewIndex(tokens: Tokens, index: number): number {
    if (tokens[index + 2] === '=') {
      return index + 2;
    }
    return index + 1;
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    evaluationState.comparisonOperatorFound = true;
    evaluationState.invertableSyntaxIndexes.push({ start: index });
    if (tokens[index + 1] === '=') {
      return AnalyzeEqualsSign.getNewIndex(tokens, index);
    }
    return index;
  }
}
