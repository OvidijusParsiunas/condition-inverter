import { AnalyzeEmptyIfStatement } from './analyzeIfStatement/analyzeRedundancies/analyzeEmptyIfStatement';
import { AnalyzeIfStatement } from './analyzeIfStatement/analyzeIfStatement';
import { EvaluationStateUtil } from './evaluationState/evaluationStateUtil';
import { SyntaxToBeInverted } from '../shared/types/evaluationState';
import { Tokens } from '../shared/types/tokens';

export class Evaluator {
  public static evaluate(tokens: Tokens): SyntaxToBeInverted[] {
    const evaluationState = EvaluationStateUtil.generateNewState();
    evaluationState.currentIfStatementCloseBracketIndex = tokens.length - 1;
    for (let index = 0; index < tokens.length; index += 1) {
      if (evaluationState.isCurrentlyInsideIfStatement) {
        index = AnalyzeIfStatement.analyze(tokens, index, evaluationState);
      } else if (tokens[index] === 'if') {
        index = AnalyzeIfStatement.setNewIfStatementState(tokens, index, evaluationState);
        const isEmpty = AnalyzeEmptyIfStatement.isEmpty(tokens, evaluationState);
        if (isEmpty) return [];
      }
    }
    return evaluationState.syntaxToBeInverted;
  }
}
