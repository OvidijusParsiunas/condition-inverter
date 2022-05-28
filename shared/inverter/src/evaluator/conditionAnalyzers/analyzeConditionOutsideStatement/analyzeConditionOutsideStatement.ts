import { EvaluateAndPrepareOutsideStatement } from './evaluateAndPrepare';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { ConditionAnalyzerUtil } from '../shared/conditionAnalyzerUtil';
import { TokensJSON } from '../../../shared/types/tokensJSON';
import { AnalyzeOutsideStatement } from './analyzeToken';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeConditionOutsideStatement extends ConditionAnalyzerUtil {
  private static readonly logicalOperatorStartTokens: TokensJSON = { ['&']: true, ['|']: true };
  private static readonly lessThanOrGreterThanOperatorTokens: TokensJSON = { ['<']: true, ['>']: true };

  private static readonly isConditionStartFuncs = [
    AnalyzeConditionOutsideStatement.isLogicalOperatorToken,
    AnalyzeConditionOutsideStatement.isTernaryOperatorToken,
    AnalyzeConditionOutsideStatement.isLessThanOrGreaterThanOperatorToken,
  ];

  private static isLogicalOperatorToken(tokens: Tokens, currentIndex: number): boolean {
    return (
      AnalyzeConditionOutsideStatement.logicalOperatorStartTokens[tokens[currentIndex] as string] &&
      AnalyzeConditionOutsideStatement.logicalOperatorStartTokens[tokens[currentIndex + 1] as string] &&
      tokens[currentIndex + 2] !== '='
    );
  }

  private static isTernaryOperatorToken(tokens: Tokens, currentIndex: number): boolean {
    return tokens[currentIndex] === '?' && tokens[currentIndex + 1] !== '?' && tokens[currentIndex + 1] !== '.' && tokens[currentIndex - 1] !== '?';
  }

  private static isLessThanOrGreaterThanOperatorToken(tokens: Tokens, currentIndex: number): boolean {
    return (
      AnalyzeConditionOutsideStatement.lessThanOrGreterThanOperatorTokens[tokens[currentIndex] as string] &&
      !AnalyzeConditionOutsideStatement.lessThanOrGreterThanOperatorTokens[tokens[currentIndex - 1] as string] &&
      !AnalyzeConditionOutsideStatement.lessThanOrGreterThanOperatorTokens[tokens[currentIndex + 1] as string]
    );
  }

  public static shouldAnalysisStart(tokens: Tokens, index: number): boolean {
    for (let i = 0; i < AnalyzeConditionOutsideStatement.isConditionStartFuncs.length; i += 1) {
      const isStart = AnalyzeConditionOutsideStatement.isConditionStartFuncs[i](tokens, index);
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
