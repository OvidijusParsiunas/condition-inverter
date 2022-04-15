import { EvaluationState } from '../../shared/types/evaluationState';

export class EvaluationStateUtil {
  public static generateNewState(): EvaluationState {
    return {
      isCurrentlyInsideIfStatement: false,
      startOfCurrentIfStatementInsideIndex: 0,
      currentIfStatementCloseBracketIndex: 0,
      syntaxToBeInverted: [],
      shouldBracketsBeRemoved: false,
      // usually involves arithmentic operations or double bangs
      isOperationWrappableInBrackets: false,
      invertBooleanLiteral: false,
      // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
      comparisonOperatorFound: false,
      areBracketsAlreadyPresent: false,
      numberOfBracketsOpen: 0,
    };
  }

  public static refreshBooleanState(evaluationState: EvaluationState) {
    evaluationState.isOperationWrappableInBrackets = false;
    evaluationState.shouldBracketsBeRemoved = false;
    evaluationState.areBracketsAlreadyPresent = false;
    evaluationState.invertBooleanLiteral = false;
  }
}
