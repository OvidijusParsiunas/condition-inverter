import { AnalyzeStandaloneStatements } from './analyzeTokens/analyzeStandaloneStatement';
import { EvaluationStateUtil } from '../evaluationState/evaluationStateUtil';
import { EvaluationState } from '../../shared/types/evaluationState';
import { AnalyzeTokens } from './analyzeTokens/analyzeTokens';
import { TraversalUtils } from '../../traversalUtils';
import { Tokens } from '../../shared/types/tokens';

export class AnalyzeIfStatement {
  private static finishEvaluatingIfStatement(tokens: Tokens, evaluationState: EvaluationState): void {
    AnalyzeStandaloneStatements.markStandaloneStatementsForInversion(tokens, evaluationState.currentIfStatementCloseBracketIndex, evaluationState);
    evaluationState.isCurrentlyInsideIfStatement = false;
    evaluationState.comparisonOperatorFound = false;
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (evaluationState.currentIfStatementCloseBracketIndex > index) {
      return AnalyzeTokens.analyze(tokens, index, evaluationState);
    }
    AnalyzeIfStatement.finishEvaluatingIfStatement(tokens, evaluationState);
    return index;
  }

  public static setNewIfStatementState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const openBracketIndex = TraversalUtils.getNonSpaceCharacterIndex(tokens, index + 1);
    evaluationState.startOfCurrentIfStatementInsideIndex = TraversalUtils.getNonSpaceCharacterIndex(tokens, openBracketIndex + 1);
    evaluationState.currentIfStatementCloseBracketIndex = TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index);
    evaluationState.isCurrentlyInsideIfStatement = true;
    return evaluationState.startOfCurrentIfStatementInsideIndex - 1;
  }
}
