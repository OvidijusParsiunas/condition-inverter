import { AnalyzeOutsideStatement } from '../analyzeConditionOutsideStatement/utils/analyzeToken';
import { EvaluateAndPrepareInsideStatement } from './utils/evaluateAndPrepare';
import { NoCloseSymbolInStatement } from './utils/noCloseSymbolInStatement';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { ConditionAnalyzer } from '../shared/conditionAnalyzer';
import { TokensJSON } from '../../../shared/types/tokensJSON';
import { AnalyzeInsideStatement } from './utils/analyzeToken';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeConditionInsideStatement {
  private static readonly statementStartTokens: TokensJSON = { if: true, elif: true, while: true, for: true };

  public static shouldAnalysisStart(tokens: Tokens, index: number): boolean {
    return Boolean(AnalyzeConditionInsideStatement.statementStartTokens[tokens[index] as string]);
  }

  public static traverseTokensAndUpdateEvaluationState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    let startIndex = EvaluateAndPrepareInsideStatement.getStartIndexAndUpdateState(tokens, index, evaluationState);
    if (startIndex >= tokens.length) return startIndex;
    let analyzeToken = AnalyzeInsideStatement.analyze;
    // if conditionSequenceEndIndex is -1, it means the statement condition ends without a close symbol e.g:
    // no close bracket for ones that start with a close bracket and no end semicolon for for loop, hence
    // outside statement analysis will be handling the preparation and traversal of the tokens
    if (evaluationState.conditionSequenceEndIndex === -1) {
      startIndex = NoCloseSymbolInStatement.getStartIndexAndUpdateStateForOutsideStatementAnalysis(tokens, evaluationState, startIndex);
      analyzeToken = AnalyzeOutsideStatement.analyze;
    }
    return ConditionAnalyzer.traverseTokensAndUpdateEvaluationState(tokens, startIndex, evaluationState, analyzeToken);
  }
}
