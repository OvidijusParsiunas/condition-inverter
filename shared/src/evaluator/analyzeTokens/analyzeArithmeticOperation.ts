import { EvaluationState } from '../../shared/types/evaluationState';

export class AnalyzeArithmeticOperation {
  public static analyze(evaluationState: EvaluationState): void {
    evaluationState.isOperationWrappableInBrackets = true;
    if (evaluationState.areBracketsAlreadyPresent && evaluationState.numberOfBracketsOpen === 0) evaluationState.areBracketsAlreadyPresent = false;
  }
}
