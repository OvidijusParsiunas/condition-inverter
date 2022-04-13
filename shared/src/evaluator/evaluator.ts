import { AnalyzeIfStatement } from './analyzeIfStatement/analyzeIfStatement';
import { EvaluationStateUtil } from './evaluationState/evaluationStateUtil';
import { Tokens } from '../shared/types/tokens';
import TraversalUtils from '../traversalUtils';

export default class Evaluator {
  public static evaluate(tokens: Tokens) {
    const evaluationState = EvaluationStateUtil.generateNewState();
    evaluationState.currentIfStatementCloseBracketIndex = tokens.length - 1;
    for (let index = 0; index < tokens.length; index += 1) {
      if (evaluationState.isCurrentlyEvaluatingIfStatement) {
        index = AnalyzeIfStatement.analyze(tokens, index, evaluationState);
      } else if (tokens[index] === 'if') {
        evaluationState.currentIfStatementCloseBracketIndex = TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index);
        const bracketIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
        evaluationState.startOfCurrentlyEvaluatedStatementIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(
          tokens,
          bracketIndex + 1,
        );
        index = evaluationState.startOfCurrentlyEvaluatedStatementIndex - 1;
        evaluationState.isCurrentlyEvaluatingIfStatement = true;
      }
    }
    return evaluationState.syntaxToBeInverted;
  }
}
