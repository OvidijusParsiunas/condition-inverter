import { TraversalUtil } from '../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';

export class MarkValueForInversion {
  private static markForBracketAddition(endIndex: number, evaluationState: EvaluationState): void {
    evaluationState.syntaxToBeInverted.push({
      insertNewBrackets: true,
      start: evaluationState.currentConditionStartIndex,
      end: endIndex,
    });
  }

  private static markForVariableInversion(evaluationState: EvaluationState): void {
    evaluationState.syntaxToBeInverted.push({ start: evaluationState.currentConditionStartIndex });
  }

  private static markForBooleanLiteralInversion(evaluationState: EvaluationState): void {
    evaluationState.syntaxToBeInverted.push({
      start: evaluationState.currentConditionStartIndex,
      invertBooleanLiteral: evaluationState.invertBooleanLiteral,
    });
  }

  private static markForNegatedBracketRemoval(tokens: Tokens, evaluationState: EvaluationState): void {
    const { currentConditionStartIndex: startOfCurrentStatementInsideIndex, syntaxToBeInverted } = evaluationState;
    const endIndex = TraversalUtil.getIndexOfClosingBracket(tokens, startOfCurrentStatementInsideIndex - 1);
    syntaxToBeInverted.push({
      start: startOfCurrentStatementInsideIndex,
      removeNegatedBrackets: { start: startOfCurrentStatementInsideIndex, end: endIndex },
    });
  }

  public static mark(tokens: Tokens, endIndex: number, evaluationState: EvaluationState): void {
    if (!evaluationState.markedForOperatorInversion) {
      if (evaluationState.shouldBracketsBeRemoved) {
        MarkValueForInversion.markForNegatedBracketRemoval(tokens, evaluationState);
      } else if (evaluationState.invertBooleanLiteral && !evaluationState.isOperationWrappableInBrackets) {
        MarkValueForInversion.markForBooleanLiteralInversion(evaluationState);
      } else {
        MarkValueForInversion.markForVariableInversion(evaluationState);
      }
      if (evaluationState.isOperationWrappableInBrackets && !evaluationState.areBracketsAlreadyPresent) {
        MarkValueForInversion.markForBracketAddition(endIndex, evaluationState);
      }
    }
  }
}
