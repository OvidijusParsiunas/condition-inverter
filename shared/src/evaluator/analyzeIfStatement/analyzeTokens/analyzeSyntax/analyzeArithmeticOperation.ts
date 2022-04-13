import { EvaluationState } from '../../../../shared/types/evaluationState';

export class AnalyzeArithmeticOperation {
  private static doesStatementBeforeArithmeticOperationHasBrackets(evaluationState: EvaluationState): boolean {
    return evaluationState.areBracketsAlreadyPresent && evaluationState.numberOfBracketsOpen === 0;
  }
  public static markSyntaxUpForInversion(evaluationState: EvaluationState): void {
    evaluationState.isOperationWrappableInBrackets = true;
    if (AnalyzeArithmeticOperation.doesStatementBeforeArithmeticOperationHasBrackets(evaluationState)) {
      evaluationState.areBracketsAlreadyPresent = false;
    }
  }
}
