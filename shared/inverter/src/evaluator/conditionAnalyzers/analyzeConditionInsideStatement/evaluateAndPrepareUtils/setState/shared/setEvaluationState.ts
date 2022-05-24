import { BracketsAnalysisResult } from '../../redundancies/analyzeRedundantBrackets';
import { AnalyzeEmptyStatement } from '../../redundancies/analyzeEmptyStatement';
import { EvaluationState } from '../../../../../../shared/types/evaluationState';

export class SetEvaluationState {
  public static set(statementBoundaryIndexes: BracketsAnalysisResult, evaluationState: EvaluationState): number {
    evaluationState.lastRedundantOpenBracketIndex = statementBoundaryIndexes.lastRedundantOpenBracketIndex;
    evaluationState.currentStatementStartIndex = statementBoundaryIndexes.start + 1;
    evaluationState.currentStatementEndIndex = statementBoundaryIndexes.end - 1;
    evaluationState.isCurrentlyEvaluatingConditions = !AnalyzeEmptyStatement.isEmpty(evaluationState);
    return evaluationState.currentStatementStartIndex - 1;
  }
}
