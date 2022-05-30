import { EvaluationState, InsertNewBrackets } from '../../../shared/types/evaluationState';

export class CleanUpRedundancies {
  private static canRedundantBracketsBeReused(evaluationState: EvaluationState): boolean {
    return Boolean(
      evaluationState.syntaxToBeInverted.length === 2 &&
        evaluationState.lastRedundantOpenBracketIndex &&
        evaluationState.lastRedundantOpenBracketIndex > -1 &&
        evaluationState.isOperationWrappableInBrackets &&
        (evaluationState.syntaxToBeInverted[1] as InsertNewBrackets).insertNewBrackets,
    );
  }

  public static removeAdditionOfBracketsFromState(evaluationState: EvaluationState): void {
    if (CleanUpRedundancies.canRedundantBracketsBeReused(evaluationState)) {
      evaluationState.syntaxToBeInverted[0].start = evaluationState.lastRedundantOpenBracketIndex as number;
      evaluationState.syntaxToBeInverted.pop();
    }
  }
}
