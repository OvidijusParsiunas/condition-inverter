import { AnalyzeConditionOutsideStatement } from '../../analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
import { EvaluateAndPrepareOutsideStatement } from '../../analyzeConditionOutsideStatement/utils/evaluateAndPrepare';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';

export class NoCloseSymbolInStatement {
  private static getOutsideStatementAnalysisStartIndex(insideStatementTokens: Tokens): number {
    for (let i = 0; i < insideStatementTokens.length; i += 1) {
      if (AnalyzeConditionOutsideStatement.shouldAnalysisStart(insideStatementTokens, i)) return i;
    }
    // reason why full length is returned is because EvaluateAndPrepareOutsideStatement.getStartIndexAndUpdateState uses a - 1 on it
    return insideStatementTokens.length;
  }

  private static getStartIndexAndUpdateState(insideStatementTokens: Tokens, evaluationState: EvaluationState): number {
    const outsideStatementAnalysisStartIndex = NoCloseSymbolInStatement.getOutsideStatementAnalysisStartIndex(insideStatementTokens);
    return EvaluateAndPrepareOutsideStatement.getStartIndexAndUpdateState(insideStatementTokens, outsideStatementAnalysisStartIndex, evaluationState);
  }

  // prettier-ignore
  public static getStartIndexAndUpdateStateForOutsideStatementAnalysis(
      tokens: Tokens, evaluationState: EvaluationState, insideStatementIndex: number): number {
    const insideStatementTokens = tokens.slice(insideStatementIndex);
    const startIndex = NoCloseSymbolInStatement.getStartIndexAndUpdateState(insideStatementTokens, evaluationState);
    evaluationState.currentConditionStartIndex += insideStatementIndex;
    evaluationState.conditionSequenceEndIndex = tokens.length - 1;
    evaluationState.isEvaluatingConditions = true;
    return insideStatementIndex + startIndex;
  }
}
