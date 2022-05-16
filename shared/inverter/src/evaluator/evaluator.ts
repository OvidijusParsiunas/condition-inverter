import { AnalyzeEmptyStatement } from './analyzeStatement/analyzeRedundancies/analyzeEmptyStatement';
import { EvaluationStateUtil } from './evaluationState/evaluationStateUtil';
import { AnalyzeStatement } from './analyzeStatement/analyzeStatement';
import { SyntaxToBeInverted } from '../shared/types/evaluationState';
import { STATEMENT_JSON } from '../shared/consts/statements';
import { Tokens } from '../shared/types/tokens';

export class Evaluator {
  public static evaluate(tokens: Tokens): SyntaxToBeInverted[] {
    const evaluationState = EvaluationStateUtil.generateNewState();
    evaluationState.currentStatementCloseBracketIndex = tokens.length - 1;
    for (let index = 0; index < tokens.length; index += 1) {
      if (evaluationState.isCurrentlyInsideStatement) {
        index = AnalyzeStatement.updateState(tokens, index, evaluationState);
      } else if (STATEMENT_JSON[tokens[index] as keyof typeof STATEMENT_JSON]) {
        index = AnalyzeStatement.setNewStatementState(tokens, index, evaluationState);
        const isEmpty = AnalyzeEmptyStatement.isEmpty(evaluationState);
        // WORK - this should not stop the rest from being analyzed
        if (isEmpty) return [];
      }
    }
    return evaluationState.syntaxToBeInverted;
  }
}
