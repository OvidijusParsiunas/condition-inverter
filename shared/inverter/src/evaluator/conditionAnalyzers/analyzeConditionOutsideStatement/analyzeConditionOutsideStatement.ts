import { EvaluateAndPrepareOutsideStatement } from './evaluateAndPrepare';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { ConditionAnalyzerUtil } from '../shared/conditionAnalyzerUtil';
import { TokensJSON } from '../../../shared/types/tokensJSON';
import { AnalyzeOutsideStatement } from './analyzeToken';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeConditionOutsideStatement extends ConditionAnalyzerUtil {
  // WORK: need to do < >
  private static readonly logicalOperatorStartTokens: TokensJSON = { ['&']: true, ['|']: true };

  private static readonly isConditionStartFuncs = [
    AnalyzeConditionOutsideStatement.isLogicalOperatorToken,
    AnalyzeConditionOutsideStatement.isTernaryOperatorToken,
  ];

  private static isLogicalOperatorToken(currentToken: string, nextToken: string): boolean {
    return (
      AnalyzeConditionOutsideStatement.logicalOperatorStartTokens[currentToken] &&
      AnalyzeConditionOutsideStatement.logicalOperatorStartTokens[nextToken]
    );
  }

  private static isTernaryOperatorToken(currentToken: string, nextToken: string, previousToken: string): boolean {
    return currentToken === '?' && nextToken !== '?' && previousToken !== '?' && nextToken !== '.';
  }

  public static shouldAnalysisStart(tokens: Tokens, index: number): boolean {
    const token = tokens[index] as string;
    const nextToken = tokens[index + 1] as string;
    const previousToken = tokens[index - 1] as string;
    for (let i = 0; i < AnalyzeConditionOutsideStatement.isConditionStartFuncs.length; i += 1) {
      const isStart = AnalyzeConditionOutsideStatement.isConditionStartFuncs[i](token, nextToken, previousToken);
      if (isStart) return true;
    }
    return false;
  }

  public static traverseTokensAndUpdateEvaluationState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    return ConditionAnalyzerUtil.traverseTokensAndUpdateEvaluationState(tokens, index, evaluationState, {
      evaluateAndPrepareState: EvaluateAndPrepareOutsideStatement.init,
      analyzeToken: AnalyzeOutsideStatement.analyze,
    });
  }
}
