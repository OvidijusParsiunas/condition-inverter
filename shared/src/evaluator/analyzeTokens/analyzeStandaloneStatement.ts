import { EvaluationState } from '../../shared/types/evaluationState';
import { Tokens } from '../../shared/types/tokens';
import TraversalUtils from '../../traversalUtils';

export class AnalyzeStandaloneStatements {
  private static markForBracketAddition(tokens: Tokens, index: number, evaluationState: EvaluationState): void {
    const endIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index - 1, false);
    evaluationState.conditionsToBeInverted.push({
      brackets: true,
      start: evaluationState.startOfCurrentlyEvaluatedStatementIndex,
      end: endIndex,
    });
  }

  private static markForVariableInversion(evaluationState: EvaluationState): void {
    evaluationState.conditionsToBeInverted.push({ start: evaluationState.startOfCurrentlyEvaluatedStatementIndex });
  }

  private static markForBooleanLiteralInversion(evaluationState: EvaluationState): void {
    evaluationState.conditionsToBeInverted.push({
      start: evaluationState.startOfCurrentlyEvaluatedStatementIndex,
      invertBooleanLiteral: evaluationState.invertBooleanLiteral,
    });
  }

  private static markForNegatedBracketRemoval(tokens: Tokens, evaluationState: EvaluationState): void {
    const { startOfCurrentlyEvaluatedStatementIndex, conditionsToBeInverted } = evaluationState;
    const endIndex = TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, startOfCurrentlyEvaluatedStatementIndex - 1);
    conditionsToBeInverted.push({
      start: startOfCurrentlyEvaluatedStatementIndex,
      removeNegationBrackets: { start: startOfCurrentlyEvaluatedStatementIndex, end: endIndex },
    });
  }

  // a look back to see if previous syntax defines a standalone statement
  public static markStandaloneStatementsForInversion(tokens: Tokens, index: number, evaluationState: EvaluationState): void {
    if (evaluationState.shouldBracketsBeRemoved) {
      AnalyzeStandaloneStatements.markForNegatedBracketRemoval(tokens, evaluationState);
    } else if (evaluationState.invertBooleanLiteral && !evaluationState.isOperationWrappableInBrackets) {
      AnalyzeStandaloneStatements.markForBooleanLiteralInversion(evaluationState);
    } else if (!evaluationState.comparisonOperatorFound) {
      AnalyzeStandaloneStatements.markForVariableInversion(evaluationState);
    }
    if (evaluationState.isOperationWrappableInBrackets && !evaluationState.areBracketsAlreadyPresent) {
      AnalyzeStandaloneStatements.markForBracketAddition(tokens, index, evaluationState);
    }
  }
}
