import { EvaluationState } from '../../../../shared/types/evaluationState';

export class AnalyzeBrackatableSyntax {
  private static doesStatementBeforeArithmeticOperationHasBrackets(evaluationState: EvaluationState): boolean {
    return evaluationState.areBracketsAlreadyPresent && evaluationState.numberOfBracketsOpen === 0;
  }

  // this analyzes arithmetic and bitwise operators
  public static analyze(evaluationState: EvaluationState): void {
    evaluationState.isOperationWrappableInBrackets = true;
    if (AnalyzeBrackatableSyntax.doesStatementBeforeArithmeticOperationHasBrackets(evaluationState)) {
      evaluationState.areBracketsAlreadyPresent = false;
    }
  }
}
