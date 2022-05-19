import { EvaluationState } from '../../shared/types/evaluationState';

export class EvaluationStateUtil {
  public static generateNewState(): EvaluationState {
    return {
      isCurrentlyInsideStatement: false,
      startOfCurrentStatementInsideIndex: 0,
      currentStatementCloseBracketIndex: 0,
      syntaxToBeInverted: [],
      shouldBracketsBeRemoved: false,
      // usually involves arithmentic operations or double bangs
      isOperationWrappableInBrackets: false,
      invertBooleanLiteral: false,
      // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
      markedForOperatorInversion: false,
      areBracketsAlreadyPresent: false,
      numberOfBracketsOpen: 0,
    };
  }

  public static refreshBooleanState(evaluationState: EvaluationState): void {
    evaluationState.isOperationWrappableInBrackets = false;
    evaluationState.shouldBracketsBeRemoved = false;
    evaluationState.areBracketsAlreadyPresent = false;
    evaluationState.invertBooleanLiteral = false;
  }
}
