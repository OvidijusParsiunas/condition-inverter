import { EvaluationState } from '../../../shared/types/evaluationState';
import { TraversalUtils } from '../../../traversalUtils';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeStandaloneStatements {
  private static markForBracketAddition(tokens: Tokens, index: number, evaluationState: EvaluationState): void {
    const endIndex = TraversalUtils.getNonSpaceCharacterIndex(tokens, index - 1, false);
    evaluationState.syntaxToBeInverted.push({
      insertNewBrackets: true,
      start: evaluationState.startOfCurrentIfStatementInsideIndex,
      end: endIndex,
    });
  }

  private static markForVariableInversion(evaluationState: EvaluationState): void {
    evaluationState.syntaxToBeInverted.push({ start: evaluationState.startOfCurrentIfStatementInsideIndex });
  }

  private static markForBooleanLiteralInversion(evaluationState: EvaluationState): void {
    evaluationState.syntaxToBeInverted.push({
      start: evaluationState.startOfCurrentIfStatementInsideIndex,
      invertBooleanLiteral: evaluationState.invertBooleanLiteral,
    });
  }

  private static markForNegatedBracketRemoval(tokens: Tokens, evaluationState: EvaluationState): void {
    const { startOfCurrentIfStatementInsideIndex, syntaxToBeInverted } = evaluationState;
    const endIndex = TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, startOfCurrentIfStatementInsideIndex - 1);
    syntaxToBeInverted.push({
      start: startOfCurrentIfStatementInsideIndex,
      removeNegatedBrackets: { start: startOfCurrentIfStatementInsideIndex, end: endIndex },
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
