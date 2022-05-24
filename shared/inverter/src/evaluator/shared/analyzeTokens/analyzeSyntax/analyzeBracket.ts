import { EvaluationState } from '../../../../shared/types/evaluationState';

export class AnalyzeBracket {
  public static updateStateForOpen(evaluationState: EvaluationState): void {
    if (!evaluationState.isOperationWrappableInBrackets && evaluationState.numberOfBracketsOpen === 0) {
      evaluationState.areBracketsAlreadyPresent = true;
    }
    evaluationState.numberOfBracketsOpen += 1;
  }

  public static updateStateForClose(evaluationState: EvaluationState): void {
    evaluationState.numberOfBracketsOpen -= 1;
  }
}
