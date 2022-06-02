import { BracketsAnalysisResult } from '../../redundancies/analyzeRedundantBrackets';
import { EvaluationState } from '../../../../../../../shared/types/evaluationState';
import { AnalyzeEmptyStatement } from '../../redundancies/analyzeEmptyStatement';

export class SetEvaluationState {
  public static set(statementBoundaryIndexes: BracketsAnalysisResult, evaluationState: EvaluationState): number {
    evaluationState.lastRedundantOpenBracketIndex = statementBoundaryIndexes.lastRedundantOpenBracketIndex;
    evaluationState.currentConditionStartIndex = statementBoundaryIndexes.start + 1;
    evaluationState.conditionSequenceEndIndex = statementBoundaryIndexes.end - 1;
    evaluationState.isEvaluatingConditions = !AnalyzeEmptyStatement.isEmpty(evaluationState);
    return evaluationState.currentConditionStartIndex;
  }
}
