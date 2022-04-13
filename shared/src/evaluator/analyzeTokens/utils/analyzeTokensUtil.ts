import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';
import TraversalUtils from '../../../traversalUtils';

export class AnalyzeTokensUtil {
  public static refreshState(evaluationState: EvaluationState) {
    evaluationState.isOperationWrappableInBrackets = false;
    evaluationState.shouldBracketsBeRemoved = false;
    evaluationState.areBracketsAlreadyPresent = false;
    evaluationState.revertBooleanLiteral = false;
  }

  // a look back to see if previous syntax defines a standalone statement
  public static dealWithStandaloneStatements(tokens: Tokens, currentTokenIndex, evaluationState: EvaluationState) {
    if (evaluationState.shouldBracketsBeRemoved) {
      const endIndex = TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, evaluationState.startOfCurrentlyEvaluatedStatementIndex - 1);
      evaluationState.conditionsToBeInverted.push({
        start: evaluationState.startOfCurrentlyEvaluatedStatementIndex,
        removeNegationBrackets: { start: evaluationState.startOfCurrentlyEvaluatedStatementIndex, end: endIndex },
      });
    } else if (evaluationState.revertBooleanLiteral && !evaluationState.isOperationWrappableInBrackets) {
      evaluationState.conditionsToBeInverted.push({
        start: evaluationState.startOfCurrentlyEvaluatedStatementIndex,
        revertBooleanLiteral: evaluationState.revertBooleanLiteral,
      });
    } else if (!evaluationState.comparisonOperatorFound) {
      evaluationState.conditionsToBeInverted.push({ start: evaluationState.startOfCurrentlyEvaluatedStatementIndex });
    }
    if (evaluationState.isOperationWrappableInBrackets && !evaluationState.areBracketsAlreadyPresent) {
      const endIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, currentTokenIndex - 1, false);
      evaluationState.conditionsToBeInverted.push({
        brackets: true,
        start: evaluationState.startOfCurrentlyEvaluatedStatementIndex,
        end: endIndex,
      });
    }
  }
}
