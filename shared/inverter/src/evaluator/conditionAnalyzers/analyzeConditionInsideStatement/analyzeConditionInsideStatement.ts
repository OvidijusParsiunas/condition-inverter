import { AnalyzeOutsideStatement } from '../analyzeConditionOutsideStatement/utils/analyzeToken';
import { EvaluateAndPrepareInsideStatement } from './utils/evaluateAndPrepare';
import { NoCloseSymbolInStatement } from './utils/noCloseSymbolInStatement';
import { AnalyzeFrontendFramework } from './utils/analyzeFrontendFramework';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { STATEMENT_JSON } from '../../../shared/consts/specialTokens';
import { ConditionAnalyzer } from '../shared/conditionAnalyzer';
import { AnalyzeInsideStatement } from './utils/analyzeToken';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeConditionInsideStatement {
  public static shouldAnalysisStart(tokens: Tokens, index: number): boolean {
    return (
      STATEMENT_JSON[tokens[index] as keyof typeof STATEMENT_JSON] ||
      AnalyzeFrontendFramework.isAngularJSOrVueDirective(tokens, index) ||
      AnalyzeFrontendFramework.isAngular2Directive(tokens, index)
    );
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
