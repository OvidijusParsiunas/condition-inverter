import { EvaluationState } from '../../../../shared/types/evaluationState';

export class AnalyzeBrackatableSyntax {
  private static doesStatementBeforeArithmeticOperationHaveBrackets(evaluationState: EvaluationState): boolean {
    return evaluationState.areBracketsAlreadyPresent && evaluationState.numberOfBracketsOpen === 0;
  }

  // used to update state for arithmetic, bitwise and assignment operators e.g:
  // dog + cat &&
  // dog & cat &&
  // dog += cat &&
  public static updateState(evaluationState: EvaluationState): void {
    evaluationState.isOperationWrappableInBrackets = true;
    if (AnalyzeBrackatableSyntax.doesStatementBeforeArithmeticOperationHaveBrackets(evaluationState)) {
      evaluationState.areBracketsAlreadyPresent = false;
    }
  }
}
