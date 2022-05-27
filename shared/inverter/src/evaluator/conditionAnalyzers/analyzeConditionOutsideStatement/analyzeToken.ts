import { CleanUpRedundancies } from '../analyzeConditionInsideStatement/evaluateAndPrepareUtils/redundancies/cleanUpRedundancies';
import { jstsReservedTerminatingWords } from '../../../shared/consts/jstsReservedTerminatingWords';
import { MarkValueForInversion } from '../../shared/analyzeTokens/markValueForInversion';
import { EvaluationStateUtil } from '../../shared/evaluationState/evaluationStateUtil';
import { TraversalUtil } from '../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { AnalyzeToken } from '../../shared/analyzeTokens/analyzeToken';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeOutsideStatement {
  private static finishEvaluatingStatement(tokens: Tokens, evaluationState: EvaluationState, index: number): void {
    MarkValueForInversion.mark(tokens, index, evaluationState);
    evaluationState.isEvaluatingConditions = false;
    evaluationState.markedForOperatorInversion = false;
    CleanUpRedundancies.removeAdditionOfBracketsFromState(evaluationState);
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  private static attemptToFinishEvaluatingStatement(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    // not using index <= evaluationState.conditionSequenceEndIndex as for conditions analysed outside statement, this variable
    // is only ever used for identifying an end of a bracket that was used at the start of a condition, and the condition can
    // span beyond the bracket - hence it is not a stopping factor: const result = (dog && cat) && mouse
    if (jstsReservedTerminatingWords[tokens[index] as keyof typeof jstsReservedTerminatingWords]) {
      const resut = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index - 1, false);
      AnalyzeOutsideStatement.finishEvaluatingStatement(tokens, evaluationState, resut);
    } else if (index === tokens.length - 1) {
      AnalyzeOutsideStatement.finishEvaluatingStatement(tokens, evaluationState, index);
    }
    return -1;
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const finishIndex = AnalyzeOutsideStatement.attemptToFinishEvaluatingStatement(tokens, index, evaluationState);
    if (finishIndex > -1) return finishIndex;
    return AnalyzeToken.updateState(tokens, index, evaluationState);
  }
}
