import { BracketsAnalysisResult } from '../../redundancies/analyzeRedundantBrackets';
import { EvaluationState } from '../../../../../../../shared/types/evaluationState';
import { AnalyzeEmptyStatement } from '../../redundancies/analyzeEmptyStatement';
import { Tokens } from '../../../../../../../shared/types/tokens';

export class SetEvaluationState {
  // prettier-ignore
  private static setEndAndIsEvaluatingState(
      statementBoundaryIndexes: BracketsAnalysisResult, evaluationState: EvaluationState, tokens: Tokens): void {
    if (statementBoundaryIndexes.end === -1) {
      // statementBoundaryIndexes.end = -1 is regarded as no end within the tokens, meaning that evaluation is safe to continue
      // to the last token index
      evaluationState.conditionSequenceEndIndex = tokens.length - 1;
      evaluationState.isEvaluatingConditions = true;
    } else {
      evaluationState.conditionSequenceEndIndex = statementBoundaryIndexes.end - 1;
      evaluationState.isEvaluatingConditions = !AnalyzeEmptyStatement.isEmpty(evaluationState);
    }
  }

  public static set(statementBoundaryIndexes: BracketsAnalysisResult, evaluationState: EvaluationState, tokens: Tokens): number {
    evaluationState.lastRedundantOpenBracketIndex = statementBoundaryIndexes.lastRedundantOpenBracketIndex;
    evaluationState.currentConditionStartIndex = statementBoundaryIndexes.start + 1;
    SetEvaluationState.setEndAndIsEvaluatingState(statementBoundaryIndexes, evaluationState, tokens);
    return evaluationState.currentConditionStartIndex;
  }
}
