import { EvaluationState } from '../../../shared/types/evaluationState';
import { LANGUAGE } from '../../../shared/consts/languages';

export class EvaluationStateUtil {
  public static generateNewState(): EvaluationState {
    return {
      isCurrentlyEvaluatingConditions: false,
      currentStatementStartIndex: 0,
      currentStatementEndIndex: 0,
      syntaxToBeInverted: [],
      shouldBracketsBeRemoved: false,
      // usually involves arithmentic operations or double bangs
      isOperationWrappableInBrackets: false,
      invertBooleanLiteral: false,
      // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
      markedForOperatorInversion: false,
      areBracketsAlreadyPresent: false,
      numberOfBracketsOpen: 0,
      language: LANGUAGE.unknown,
    };
  }

  public static refreshBooleanState(evaluationState: EvaluationState): void {
    evaluationState.isOperationWrappableInBrackets = false;
    evaluationState.shouldBracketsBeRemoved = false;
    evaluationState.areBracketsAlreadyPresent = false;
    evaluationState.invertBooleanLiteral = false;
  }
}
