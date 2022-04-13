import { EvaluationState } from '../../../shared/types/evaluationState';

export class AnalyzeTokensUtil {
  public static refreshBooleanState(evaluationState: EvaluationState) {
    evaluationState.isOperationWrappableInBrackets = false;
    evaluationState.shouldBracketsBeRemoved = false;
    evaluationState.areBracketsAlreadyPresent = false;
    evaluationState.invertBooleanLiteral = false;
  }
}
