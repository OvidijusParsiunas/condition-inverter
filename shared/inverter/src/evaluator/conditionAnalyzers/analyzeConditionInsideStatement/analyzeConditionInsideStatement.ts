import { AnalyzerStartTokens } from '../../../shared/types/analyzerStartTokens';
import { EvaluateAndPrepareInsideStatement } from './evaluateAndPrepare';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { ConditionAnalyzerUtil } from '../shared/conditionAnalyzerUtil';
import { AnalyzeInsideStatement } from './analyzeToken';
import { Tokens } from '../../../shared/types/tokens';

export default class AnalyzeConditionInsideStatement extends ConditionAnalyzerUtil {
  private static readonly analyzerStartTokens: AnalyzerStartTokens = { if: true, elif: true, while: true, for: true };

  public static shouldAnalysisStart(tokens: Tokens, index: number): boolean {
    return ConditionAnalyzerUtil.shouldAnalysisStart(tokens, index, AnalyzeConditionInsideStatement.analyzerStartTokens);
  }

  public static traverseTokensAndUpdateEvaluationState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    return ConditionAnalyzerUtil.traverseTokensAndUpdateEvaluationState(tokens, index, evaluationState, {
      evaluateAndPrepareState: EvaluateAndPrepareInsideStatement.init,
      analyzeToken: AnalyzeInsideStatement.analyze,
    });
  }
}
