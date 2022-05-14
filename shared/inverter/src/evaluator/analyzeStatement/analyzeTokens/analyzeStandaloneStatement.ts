import { TraversalUtil } from '../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';

export class UpdateStateForStandaloneStatements {
  private static markForBracketAddition(tokens: Tokens, index: number, evaluationState: EvaluationState): void {
    const endIndex = TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, index - 1, false);
    evaluationState.syntaxToBeInverted.push({
      insertNewBrackets: true,
      start: evaluationState.startOfCurrentStatementInsideIndex,
      end: endIndex,
    });
  }

  private static markForVariableInversion(evaluationState: EvaluationState): void {
    evaluationState.syntaxToBeInverted.push({ start: evaluationState.startOfCurrentStatementInsideIndex });
  }

  private static markForBooleanLiteralInversion(evaluationState: EvaluationState): void {
    evaluationState.syntaxToBeInverted.push({
      start: evaluationState.startOfCurrentStatementInsideIndex,
      invertBooleanLiteral: evaluationState.invertBooleanLiteral,
    });
  }

  private static markForNegatedBracketRemoval(tokens: Tokens, evaluationState: EvaluationState): void {
    const { startOfCurrentStatementInsideIndex, syntaxToBeInverted } = evaluationState;
    const endIndex = TraversalUtil.getIndexOfLastBracketOfStatement(tokens, startOfCurrentStatementInsideIndex - 1);
    syntaxToBeInverted.push({
      start: startOfCurrentStatementInsideIndex,
      removeNegatedBrackets: { start: startOfCurrentStatementInsideIndex, end: endIndex },
    });
  }

  // a look back to see if previous syntax defines a standalone statement
  public static markStandaloneStatementsForInversion(tokens: Tokens, index: number, evaluationState: EvaluationState): void {
    if (evaluationState.shouldBracketsBeRemoved) {
      UpdateStateForStandaloneStatements.markForNegatedBracketRemoval(tokens, evaluationState);
    } else if (evaluationState.invertBooleanLiteral && !evaluationState.isOperationWrappableInBrackets) {
      UpdateStateForStandaloneStatements.markForBooleanLiteralInversion(evaluationState);
    } else if (!evaluationState.comparisonOperatorFound) {
      UpdateStateForStandaloneStatements.markForVariableInversion(evaluationState);
    }
    if (evaluationState.isOperationWrappableInBrackets && !evaluationState.areBracketsAlreadyPresent) {
      UpdateStateForStandaloneStatements.markForBracketAddition(tokens, index, evaluationState);
    }
  }
}
