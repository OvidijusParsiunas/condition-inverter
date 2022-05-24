import { AnalyzerStartTokens } from '../../../shared/types/analyzerStartTokens';
import { EvaluateAndPrepareOutsideStatement } from './evaluateAndPrepare';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { ConditionAnalyzerUtil } from '../shared/conditionAnalyzerUtil';
import { AnalyzeOutsideStatement } from './analyzeToken';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeConditionOutsideStatement extends ConditionAnalyzerUtil {
  // WORK: need to do < >
  private static readonly analyzerStartTokens: AnalyzerStartTokens = { ['&']: true, ['|']: true };

  public static shouldAnalysisStart(tokens: Tokens, index: number): boolean {
    return ConditionAnalyzerUtil.shouldAnalysisStart(tokens, index, AnalyzeConditionOutsideStatement.analyzerStartTokens);
  }

  public static traverseTokensAndUpdateEvaluationState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    return ConditionAnalyzerUtil.traverseTokensAndUpdateEvaluationState(tokens, index, evaluationState, {
      evaluateAndPrepareState: EvaluateAndPrepareOutsideStatement.init,
      analyzeToken: AnalyzeOutsideStatement.analyze,
    });
  }
}
