import { AnalyzeConditionOutsideStatement } from '../../analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
import { EvaluateAndPrepareOutsideStatement } from '../../analyzeConditionOutsideStatement/utils/evaluateAndPrepare';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';

export class NoCloseSymbolInStatement {
  private static getOutsideStatementAnalysisStartIndex(insideStatementTokens: Tokens): number {
    for (let i = 0; i < insideStatementTokens.length; i += 1) {
      if (AnalyzeConditionOutsideStatement.shouldAnalysisStart(insideStatementTokens, i)) return i;
    }
    return insideStatementTokens.length - 1;
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
