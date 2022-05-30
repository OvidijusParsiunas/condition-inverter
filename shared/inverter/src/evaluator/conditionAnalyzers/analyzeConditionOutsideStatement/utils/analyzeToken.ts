import { jstsReservedTerminatingWords } from '../../../../shared/consts/jstsReservedTerminatingWords';
import { MarkValueForInversion } from '../../../shared/analyzeTokens/markValueForInversion';
import { EvaluationStateUtil } from '../../../shared/evaluationState/evaluationStateUtil';
import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { AnalyzeToken } from '../../../shared/analyzeTokens/analyzeToken';
import { CleanUpRedundancies } from '../../shared/cleanUpRedundancies';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeOutsideStatement {
  // not using evaluationState.conditionSequenceEndIndex to identify if finishEvaluatingStatement needs to be run as for conditions that
  // are analysed outside statement this variable is only ever used for identifying an end of a bracket that was used at the start of a
  // condition and the condition can span beyond the bracket - hence it is not a stopping factor: const result = (dog && cat) && mouse
  private static finishEvaluatingStatement(tokens: Tokens, evaluationState: EvaluationState, index: number): void {
    MarkValueForInversion.mark(tokens, index, evaluationState);
    evaluationState.isEvaluatingConditions = false;
    evaluationState.markedForOperatorInversion = false;
    CleanUpRedundancies.removeAdditionOfBracketsFromState(evaluationState);
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  private static attemptToFinishViaTerminatingWord(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (jstsReservedTerminatingWords[tokens[index] as keyof typeof jstsReservedTerminatingWords]) {
      const resut = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index - 1, false);
      AnalyzeOutsideStatement.finishEvaluatingStatement(tokens, evaluationState, resut);
      return index;
    }
    return -1;
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const terminatingWordIndex = AnalyzeOutsideStatement.attemptToFinishViaTerminatingWord(tokens, index, evaluationState);
    if (terminatingWordIndex > -1) return terminatingWordIndex;
    const nextIndex = AnalyzeToken.updateState(tokens, index, evaluationState);
    if (tokens.length - 1 === index) AnalyzeOutsideStatement.finishEvaluatingStatement(tokens, evaluationState, index);
    return nextIndex;
  }
}
