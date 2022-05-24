import { TraversalUtil } from '../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';

export class UpdateStateForStandaloneStatements {
  private static markForBracketAddition(endIndex: number, evaluationState: EvaluationState): void {
    evaluationState.syntaxToBeInverted.push({
      insertNewBrackets: true,
      start: evaluationState.currentStatementStartIndex,
      end: endIndex,
    });
  }

  private static markForVariableInversion(evaluationState: EvaluationState): void {
    evaluationState.syntaxToBeInverted.push({ start: evaluationState.currentStatementStartIndex });
  }

  private static markForBooleanLiteralInversion(evaluationState: EvaluationState): void {
    evaluationState.syntaxToBeInverted.push({
      start: evaluationState.currentStatementStartIndex,
      invertBooleanLiteral: evaluationState.invertBooleanLiteral,
    });
  }

  private static markForNegatedBracketRemoval(tokens: Tokens, evaluationState: EvaluationState): void {
    const { currentStatementStartIndex: startOfCurrentStatementInsideIndex, syntaxToBeInverted } = evaluationState;
    const endIndex = TraversalUtil.getIndexOfClosingBracket(tokens, startOfCurrentStatementInsideIndex - 1);
    syntaxToBeInverted.push({
      start: startOfCurrentStatementInsideIndex,
      removeNegatedBrackets: { start: startOfCurrentStatementInsideIndex, end: endIndex },
    });
  }

  // WORK - refactor this as it is not used just for stabdalobe statement
  // a look back to see if previous syntax defines a standalone statement
  public static markStandaloneStatementsForInversion(tokens: Tokens, endIndex: number, evaluationState: EvaluationState): void {
    if (!evaluationState.markedForOperatorInversion) {
      if (evaluationState.shouldBracketsBeRemoved) {
        UpdateStateForStandaloneStatements.markForNegatedBracketRemoval(tokens, evaluationState);
      } else if (evaluationState.invertBooleanLiteral && !evaluationState.isOperationWrappableInBrackets) {
        UpdateStateForStandaloneStatements.markForBooleanLiteralInversion(evaluationState);
      } else {
        UpdateStateForStandaloneStatements.markForVariableInversion(evaluationState);
      }
      if (evaluationState.isOperationWrappableInBrackets && !evaluationState.areBracketsAlreadyPresent) {
        UpdateStateForStandaloneStatements.markForBracketAddition(endIndex, evaluationState);
      }
    }
  }
}
