import { EvaluationState } from '../../../../../shared/types/evaluationState';

export class AnalyzeBracket {
  public static updateStateForOpen(evaluationState: EvaluationState): void {
    if (!evaluationState.isOperationWrappableInBrackets && evaluationState.numberOfBracketsOpen === 0) {
      evaluationState.areBracketsAlreadyPresent = true;
    }
    evaluationState.numberOfBracketsOpen += 1;
  }

  public static updateStateForClose(evaluationState: EvaluationState): void {
    // the reason why evaluationState.numberOfBracketsOpen -= 1 is not used here is because when conditions are analyzed
    // outside of a statement and they start with a (, numberOfBracketsOpen is not 1, hence when doing -1, we need to ensure
    // that it does not go below 0 to adhere to existing === 0 statements and have correct number when increasing it again
    evaluationState.numberOfBracketsOpen = Math.max(evaluationState.numberOfBracketsOpen - 1, 0);
  }
}
