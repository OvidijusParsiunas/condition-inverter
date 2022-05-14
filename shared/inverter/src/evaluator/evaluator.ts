import { AnalyzeEmptyIfStatement } from './analyzeIfStatement/analyzeRedundancies/analyzeEmptyIfStatement';
import { AnalyzeIfStatement } from './analyzeIfStatement/analyzeIfStatement';
import { EvaluationStateUtil } from './evaluationState/evaluationStateUtil';
import { SyntaxToBeInverted } from '../shared/types/evaluationState';
import { STATEMENT_JSON } from '../shared/consts/statements';
import { Tokens } from '../shared/types/tokens';

export class Evaluator {
  public static evaluate(tokens: Tokens): SyntaxToBeInverted[] {
    const evaluationState = EvaluationStateUtil.generateNewState();
    evaluationState.currentIfStatementCloseBracketIndex = tokens.length - 1;
    for (let index = 0; index < tokens.length; index += 1) {
      if (evaluationState.isCurrentlyInsideIfStatement) {
        index = AnalyzeIfStatement.updateState(tokens, index, evaluationState);
      } else if (STATEMENT_JSON[tokens[index] as keyof typeof STATEMENT_JSON]) {
        index = AnalyzeIfStatement.setNewIfStatementState(tokens, index, evaluationState);
        const isEmpty = AnalyzeEmptyIfStatement.isEmpty(evaluationState);
        if (isEmpty) return [];
      }
    }
    return evaluationState.syntaxToBeInverted;
  }
}
