import { AnalyzeStatementBoundariesAndLanguage } from './analyzeStatementDetails/analyzeStatementBoundariesAndLanguage';
import { CleanUpRedundancies } from './analyzeStatementDetails/redundancies/cleanUpRedundancies';
import { UpdateStateForStandaloneStatements } from './analyzeTokens/analyzeStandaloneStatement';
import { EvaluationStateUtil } from '../evaluationState/evaluationStateUtil';
import { EvaluationState } from '../../shared/types/evaluationState';
import { AnalyzeTokens } from './analyzeTokens/analyzeTokens';
import { Tokens } from '../../shared/types/tokens';

export class AnalyzeStatement {
  private static finishEvaluatingStatement(tokens: Tokens, evaluationState: EvaluationState): void {
    UpdateStateForStandaloneStatements.markStandaloneStatementsForInversion(
      tokens,
      evaluationState.currentStatementCloseBracketIndex,
      evaluationState,
    );
    evaluationState.isCurrentlyInsideStatement = false;
    evaluationState.markedForOperatorInversion = false;
    CleanUpRedundancies.removeAdditionOfBracketsFromState(evaluationState);
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (evaluationState.currentStatementCloseBracketIndex > index) {
      return AnalyzeTokens.updateState(tokens, index, evaluationState);
    }
    AnalyzeStatement.finishEvaluatingStatement(tokens, evaluationState);
    return index;
  }

  public static setNewStatementState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    AnalyzeStatementBoundariesAndLanguage.setStatementBoundaryIndexesAndLanguage(tokens, index, evaluationState);
    evaluationState.isCurrentlyInsideStatement = true;
    return evaluationState.startOfCurrentStatementInsideIndex - 1;
  }
}
