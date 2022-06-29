import { LogicalOrAssignmentOperatorExpansion } from './operatorExpansion/logicalOrAssignmentOperatorExpansion';
import { GreaterOrLessThanOperatorExpansion } from './operatorExpansion/greaterOrLessThanOperatorExpansion';
import { QuestionMarkOperatorExpansion } from './operatorExpansion/questionMarkOperatorExpansion';
import { ComparisonOperatorExpansion } from './operatorExpansion/comparisonOperatorExpansion';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

// gets expansion delta even for non-conditional symbol collections - e.g. >>> or =
export class ExpandIfCursorOnPotentialConditionOperator {
  private static getExpansionIfBeforeHighlightSelectionStart(tokens: Tokens, index: number): number {
    const token = tokens[index] as string;
    switch (token) {
      case '|':
      case '&':
        return LogicalOrAssignmentOperatorExpansion.getForHighlightSelectionStart(tokens, index);
      case '<':
      case '>':
        return GreaterOrLessThanOperatorExpansion.getForSelectionStart(tokens, index);
      case '=':
      case '!':
        return ComparisonOperatorExpansion.getForHighlightSelectionStart(tokens, index);
      default:
        return 0;
    }
  }

  private static getExpansionIfBeforeSelectionStart(tokens: Tokens, index: number): number {
    const token = tokens[index] as string;
    switch (token) {
      case '|':
      case '&':
        return LogicalOrAssignmentOperatorExpansion.getForSelectionStart(tokens, index);
      case '<':
      case '>':
        return GreaterOrLessThanOperatorExpansion.getForSelectionStart(tokens, index);
      case '=':
      case '!':
        return ComparisonOperatorExpansion.getForSelectionStart(tokens, index);
      default:
        return 0;
    }
  }

  public static getExpansionIfBeforeStart(tokens: Tokens, index: number, isHighlighted: boolean): number {
    return isHighlighted
      ? ExpandIfCursorOnPotentialConditionOperator.getExpansionIfBeforeHighlightSelectionStart(tokens, index)
      : ExpandIfCursorOnPotentialConditionOperator.getExpansionIfBeforeSelectionStart(tokens, index);
  }

  private static getExpansionIfAfterHighlightSelectionEnd(tokens: Tokens, index: number): number {
    const token = tokens[index] as string;
    switch (token) {
      case '|':
      case '&':
        return LogicalOrAssignmentOperatorExpansion.getForHighlightSelectionEnd(tokens, index);
      case '<':
      case '>':
        return GreaterOrLessThanOperatorExpansion.getForSelectionEnd(tokens, index);
      case '=':
      case '!':
        return ComparisonOperatorExpansion.getForHighlightSelectionEnd(tokens, index);
      case '?':
        return QuestionMarkOperatorExpansion.getForSelectionEnd(tokens, index);
      default:
        return 0;
    }
  }

  private static getExpansionIfAfterSelectionEnd(tokens: Tokens, index: number): number {
    const token = tokens[index] as string;
    switch (token) {
      case '|':
      case '&':
        return LogicalOrAssignmentOperatorExpansion.getForSelectionEnd(tokens, index);
      case '<':
      case '>':
        return GreaterOrLessThanOperatorExpansion.getForSelectionEnd(tokens, index);
      case '=':
      case '!':
        return ComparisonOperatorExpansion.getForSelectionEnd(tokens, index);
      case '?':
        return QuestionMarkOperatorExpansion.getForSelectionEnd(tokens, index);
      default:
        return 0;
    }
  }

  public static getExpansionIfAfterEnd(tokens: Tokens, index: number, isHighlighted: boolean): number {
    return isHighlighted
      ? ExpandIfCursorOnPotentialConditionOperator.getExpansionIfAfterHighlightSelectionEnd(tokens, index)
      : ExpandIfCursorOnPotentialConditionOperator.getExpansionIfAfterSelectionEnd(tokens, index);
  }
}
