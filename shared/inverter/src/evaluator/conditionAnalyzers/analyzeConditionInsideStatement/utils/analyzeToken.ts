import { MarkValueForInversion } from '../../shared/analyzeTokens/markValueForInversion';
import { CleanUpRedundancies } from '../../shared/redundancies/cleanUpRedundancies';
import { EvaluationStateUtil } from '../../../evaluationState/evaluationStateUtil';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { AnalyzeToken } from '../../shared/analyzeTokens/analyzeToken';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeInsideStatement {
  private static finishEvaluatingStatement(tokens: Tokens, evaluationState: EvaluationState): void {
    MarkValueForInversion.mark(tokens, evaluationState.conditionSequenceEndIndex, evaluationState);
    evaluationState.isEvaluatingConditions = false;
    evaluationState.markedForOperatorInversion = false;
    CleanUpRedundancies.removeAdditionOfBracketsFromState(evaluationState);
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (index <= evaluationState.conditionSequenceEndIndex) {
      // if nextIndex is out of bounds, proceed for final analysis, the reason why this is doen is in partial conditions
      // the final index could be the word 'and', 'true' or !(dog), which needs to be analysed AnalyzeToken.updateState
      // before proceeding to finishEvaluatingStatement method
      const nextIndex = AnalyzeToken.updateState(tokens, index, evaluationState);
      if (nextIndex < tokens.length - 1) return nextIndex;
    }
    AnalyzeInsideStatement.finishEvaluatingStatement(tokens, evaluationState);
    return index;
  }
}
