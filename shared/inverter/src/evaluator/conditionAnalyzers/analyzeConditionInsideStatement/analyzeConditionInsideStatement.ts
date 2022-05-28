import { EvaluateAndPrepareInsideStatement } from './evaluateAndPrepare';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { ConditionAnalyzerUtil } from '../shared/conditionAnalyzerUtil';
import { TokensJSON } from '../../../shared/types/tokensJSON';
import { AnalyzeInsideStatement } from './analyzeToken';
import { Tokens } from '../../../shared/types/tokens';

export default class AnalyzeConditionInsideStatement extends ConditionAnalyzerUtil {
  private static readonly statementStartTokens: TokensJSON = { if: true, elif: true, while: true, for: true };

  public static shouldAnalysisStart(tokens: Tokens, index: number): boolean {
    return Boolean(AnalyzeConditionInsideStatement.statementStartTokens[tokens[index] as string]);
  }

  public static traverseTokensAndUpdateEvaluationState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    return ConditionAnalyzerUtil.traverseTokensAndUpdateEvaluationState(tokens, index, evaluationState, {
      evaluateAndPrepareState: EvaluateAndPrepareInsideStatement.init,
      analyzeToken: AnalyzeInsideStatement.analyze,
    });
  }
}
