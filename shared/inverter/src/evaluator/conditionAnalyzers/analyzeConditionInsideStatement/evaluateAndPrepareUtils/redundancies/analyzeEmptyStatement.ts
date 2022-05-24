import { EvaluationState } from '../../../../../shared/types/evaluationState';

export class AnalyzeEmptyStatement {
  public static isEmpty(evaluationState: EvaluationState): boolean {
    // the reason why start would be ahead of end is because currentStatementStartIndex is assigned with a + 1 and currentStatementEndIndex is
    // assigned with a - 1 when setting the evaluation state-; SetEvaluationState.set
    return evaluationState.currentStatementStartIndex > evaluationState.currentStatementEndIndex;
  }
}
