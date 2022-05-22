import { EvaluationState } from '../../../../shared/types/evaluationState';

export class AnalyzeEmptyStatement {
  public static isEmpty(evaluationState: EvaluationState): boolean {
    return evaluationState.startOfCurrentStatementIndex >= evaluationState.currentStatementEndIndex;
  }
}
