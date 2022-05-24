import { UpdateStateForStandaloneStatements } from '../../shared/analyzeTokens/analyzeStandaloneStatement';
import { CleanUpRedundancies } from './evaluateAndPrepareUtils/redundancies/cleanUpRedundancies';
import { EvaluationStateUtil } from '../../shared/evaluationState/evaluationStateUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { AnalyzeToken } from '../../shared/analyzeTokens/analyzeToken';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeInsideStatement {
  private static finishEvaluatingStatement(tokens: Tokens, evaluationState: EvaluationState): void {
    UpdateStateForStandaloneStatements.markStandaloneStatementsForInversion(tokens, evaluationState.currentStatementEndIndex, evaluationState);
    evaluationState.isCurrentlyEvaluatingConditions = false;
    evaluationState.markedForOperatorInversion = false;
    CleanUpRedundancies.removeAdditionOfBracketsFromState(evaluationState);
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (evaluationState.currentStatementEndIndex >= index) {
      return AnalyzeToken.updateState(tokens, index, evaluationState);
    }
    AnalyzeInsideStatement.finishEvaluatingStatement(tokens, evaluationState);
    return index;
  }
}
