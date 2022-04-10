import { EvaluationState } from '../../shared/types/evaluationState';

export class AnalyzeBracket {
  public static open(evaluationState: EvaluationState): void {
    if (!evaluationState.isOperationWrappableInBrackets && evaluationState.numberOfBracketsOpen === 0) {
      evaluationState.areBracketsAlreadyPresent = true;
    }
    evaluationState.numberOfBracketsOpen += 1;
  }

  public static close(evaluationState: EvaluationState): void {
    evaluationState.numberOfBracketsOpen -= 1;
  }
}
