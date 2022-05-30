import { EvaluateAndPrepareInsideStatement } from './utils/evaluateAndPrepare';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { ConditionAnalyzer } from '../shared/conditionAnalyzer';
import { TokensJSON } from '../../../shared/types/tokensJSON';
import { AnalyzeInsideStatement } from './utils/analyzeToken';
import { Tokens } from '../../../shared/types/tokens';

export default class AnalyzeConditionInsideStatement {
  private static readonly statementStartTokens: TokensJSON = { if: true, elif: true, while: true, for: true };

  public static shouldAnalysisStart(tokens: Tokens, index: number): boolean {
    return Boolean(AnalyzeConditionInsideStatement.statementStartTokens[tokens[index] as string]);
  }

  public static traverseTokensAndUpdateEvaluationState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    return ConditionAnalyzer.traverseTokensAndUpdateEvaluationState(tokens, index, evaluationState, {
      evaluateAndPrepareState: EvaluateAndPrepareInsideStatement.init,
      analyzeToken: AnalyzeInsideStatement.analyze,
    });
  }
}
