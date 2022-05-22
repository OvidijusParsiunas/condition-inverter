import { SetStateForGenericStatement } from './analyzeStatementDetails/prepareStatement/setStateForGenericStatement';
import { SetStateForLoopStatement } from './analyzeStatementDetails/prepareStatement/setStateForLoopStatement';
import { CleanUpRedundancies } from './analyzeStatementDetails/redundancies/cleanUpRedundancies';
import { UpdateStateForStandaloneStatements } from './analyzeTokens/analyzeStandaloneStatement';
import { EvaluationStateUtil } from '../evaluationState/evaluationStateUtil';
import { EvaluationState } from '../../shared/types/evaluationState';
import { AnalyzeTokens } from './analyzeTokens/analyzeTokens';
import { Tokens } from '../../shared/types/tokens';

export class AnalyzeStatement {
  private static finishEvaluatingStatement(tokens: Tokens, evaluationState: EvaluationState): void {
    UpdateStateForStandaloneStatements.markStandaloneStatementsForInversion(tokens, evaluationState.currentStatementEndIndex, evaluationState);
    evaluationState.isCurrentlyInsideStatement = false;
    evaluationState.markedForOperatorInversion = false;
    CleanUpRedundancies.removeAdditionOfBracketsFromState(evaluationState);
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (evaluationState.currentStatementEndIndex > index) {
      return AnalyzeTokens.updateState(tokens, index, evaluationState);
    }
    AnalyzeStatement.finishEvaluatingStatement(tokens, evaluationState);
    return index;
  }

  public static setNewStatementState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (tokens[index] === 'for') {
      return SetStateForLoopStatement.set(tokens, index, evaluationState);
    }
    return SetStateForGenericStatement.set(tokens, index, evaluationState);
  }
}
