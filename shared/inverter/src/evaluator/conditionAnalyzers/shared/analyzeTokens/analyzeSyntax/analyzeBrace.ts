import { EvaluationState } from '../../../../../shared/types/evaluationState';

export class AnalyzeBrace {
  public static updateStateForOpenBrace(index: number, evaluationState: EvaluationState): number {
    evaluationState.numberOfBracesOpen += 1;
    return index;
  }

  public static updateStateForCloseBrace(index: number, evaluationState: EvaluationState): number {
    evaluationState.numberOfBracesOpen -= 1;
    return index;
  }
}
