import { EvaluationState } from '../../../shared/types/evaluationState';

export class AnalyzeEmptyIfStatement {
  public static isEmpty(evaluationState: EvaluationState): boolean {
    return evaluationState.startOfCurrentIfStatementInsideIndex >= evaluationState.currentIfStatementCloseBracketIndex;
  }
}
