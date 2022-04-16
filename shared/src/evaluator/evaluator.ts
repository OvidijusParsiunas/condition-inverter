import { AnalyzeIfStatement } from './analyzeIfStatement/analyzeIfStatement';
import { EvaluationStateUtil } from './evaluationState/evaluationStateUtil';
import { Tokens } from '../shared/types/tokens';

export default class Evaluator {
  public static evaluate(tokens: Tokens) {
    const evaluationState = EvaluationStateUtil.generateNewState();
    evaluationState.currentIfStatementCloseBracketIndex = tokens.length - 1;
    for (let index = 0; index < tokens.length; index += 1) {
      if (evaluationState.isCurrentlyInsideIfStatement) {
        index = AnalyzeIfStatement.analyze(tokens, index, evaluationState);
      } else if (tokens[index] === 'if') {
        index = AnalyzeIfStatement.setNewIfStatementState(tokens, index, evaluationState);
      }
    }
    return evaluationState.invertableSyntaxIndexes;
  }
}
