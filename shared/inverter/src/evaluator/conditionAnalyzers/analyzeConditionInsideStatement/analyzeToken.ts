import { CleanUpRedundancies } from './evaluateAndPrepareUtils/redundancies/cleanUpRedundancies';
import { MarkValueForInversion } from '../../shared/analyzeTokens/markValueForInversion';
import { EvaluationStateUtil } from '../../shared/evaluationState/evaluationStateUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { AnalyzeToken } from '../../shared/analyzeTokens/analyzeToken';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeInsideStatement {
  private static finishEvaluatingStatement(tokens: Tokens, evaluationState: EvaluationState): void {
    MarkValueForInversion.mark(tokens, evaluationState.conditionSequenceEndIndex, evaluationState);
    evaluationState.isEvaluatingConditions = false;
    evaluationState.markedForOperatorInversion = false;
    CleanUpRedundancies.removeAdditionOfBracketsFromState(evaluationState);
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (evaluationState.conditionSequenceEndIndex >= index) {
      return AnalyzeToken.updateState(tokens, index, evaluationState);
    }
    AnalyzeInsideStatement.finishEvaluatingStatement(tokens, evaluationState);
    return index;
  }
}
