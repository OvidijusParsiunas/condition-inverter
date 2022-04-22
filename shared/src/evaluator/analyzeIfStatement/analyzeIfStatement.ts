import { UpdateStateForStandaloneStatements } from './analyzeTokens/analyzeStandaloneStatement';
import { AnalyzeRedundantBrackets } from './analyzeRedundancies/analyzeRedundantBrackets';
import { EvaluationStateUtil } from '../evaluationState/evaluationStateUtil';
import { TraversalUtil } from '../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../shared/types/evaluationState';
import { AnalyzeTokens } from './analyzeTokens/analyzeTokens';
import { Tokens } from '../../shared/types/tokens';

export class AnalyzeIfStatement {
  private static finishEvaluatingIfStatement(tokens: Tokens, evaluationState: EvaluationState): void {
    UpdateStateForStandaloneStatements.markStandaloneStatementsForInversion(
      tokens,
      evaluationState.currentIfStatementCloseBracketIndex,
      evaluationState,
    );
    evaluationState.isCurrentlyInsideIfStatement = false;
    evaluationState.comparisonOperatorFound = false;
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (evaluationState.currentIfStatementCloseBracketIndex > index) {
      return AnalyzeTokens.updateState(tokens, index, evaluationState);
    }
    AnalyzeIfStatement.finishEvaluatingIfStatement(tokens, evaluationState);
    return index;
  }

  private static setStartAndEndIndexes(tokens: Tokens, index: number, evaluationState: EvaluationState, openBracketIndex: number): void {
    const startIndex = TraversalUtil.getNonSpaceCharacterIndex(tokens, openBracketIndex + 1);
    const endIndex = TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, index);
    const result = AnalyzeRedundantBrackets.getIndexesOfNestedStartAndEndBrackets(tokens, startIndex, endIndex - 1);
    evaluationState.startOfCurrentIfStatementInsideIndex = result.start;
    evaluationState.currentIfStatementCloseBracketIndex = result.end + 1;
  }

  public static setNewIfStatementState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const openBracketIndex = TraversalUtil.getNonSpaceCharacterIndex(tokens, index + 1);
    AnalyzeIfStatement.setStartAndEndIndexes(tokens, index, evaluationState, openBracketIndex);
    evaluationState.isCurrentlyInsideIfStatement = true;
    return evaluationState.startOfCurrentIfStatementInsideIndex - 1;
  }
}
