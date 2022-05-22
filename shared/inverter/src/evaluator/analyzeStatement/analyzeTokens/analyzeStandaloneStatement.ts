import { TraversalUtil } from '../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';

export class UpdateStateForStandaloneStatements {
  private static markForBracketAddition(tokens: Tokens, index: number, evaluationState: EvaluationState): void {
    const endIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index - 1, false);
    evaluationState.syntaxToBeInverted.push({
      insertNewBrackets: true,
      start: evaluationState.startOfCurrentStatementIndex,
      end: endIndex,
    });
  }

  private static markForVariableInversion(evaluationState: EvaluationState): void {
    evaluationState.syntaxToBeInverted.push({ start: evaluationState.startOfCurrentStatementIndex });
  }

  private static markForBooleanLiteralInversion(evaluationState: EvaluationState): void {
    evaluationState.syntaxToBeInverted.push({
      start: evaluationState.startOfCurrentStatementIndex,
      invertBooleanLiteral: evaluationState.invertBooleanLiteral,
    });
  }

  private static markForNegatedBracketRemoval(tokens: Tokens, evaluationState: EvaluationState): void {
    const { startOfCurrentStatementIndex: startOfCurrentStatementInsideIndex, syntaxToBeInverted } = evaluationState;
    const endIndex = TraversalUtil.getIndexOfClosingBracket(tokens, startOfCurrentStatementInsideIndex - 1);
    syntaxToBeInverted.push({
      start: startOfCurrentStatementInsideIndex,
      removeNegatedBrackets: { start: startOfCurrentStatementInsideIndex, end: endIndex },
    });
  }

  // a look back to see if previous syntax defines a standalone statement
  public static markStandaloneStatementsForInversion(tokens: Tokens, index: number, evaluationState: EvaluationState): void {
    if (!evaluationState.markedForOperatorInversion) {
      if (evaluationState.shouldBracketsBeRemoved) {
        UpdateStateForStandaloneStatements.markForNegatedBracketRemoval(tokens, evaluationState);
      } else if (evaluationState.invertBooleanLiteral && !evaluationState.isOperationWrappableInBrackets) {
        UpdateStateForStandaloneStatements.markForBooleanLiteralInversion(evaluationState);
      } else {
        UpdateStateForStandaloneStatements.markForVariableInversion(evaluationState);
      }
      if (evaluationState.isOperationWrappableInBrackets && !evaluationState.areBracketsAlreadyPresent) {
        UpdateStateForStandaloneStatements.markForBracketAddition(tokens, index, evaluationState);
      }
    }
  }
}
