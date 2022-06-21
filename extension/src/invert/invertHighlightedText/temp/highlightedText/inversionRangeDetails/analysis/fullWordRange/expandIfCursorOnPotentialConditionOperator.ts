import { LogicalOrAssignmentOperatorExpansion } from './operatorExpansion/logicalOrAssignmentOperatorExpansion';
import { GreaterOrLessThanOperatorExpansion } from './operatorExpansion/greaterOrLessThanOperatorExpansion';
import { QuestionMarkOperatorExpansion } from './operatorExpansion/questionMarkOperatorExpansion';
import { ComparisonOperatorExpansion } from './operatorExpansion/comparisonOperatorExpansion';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

// gets expansion delta even for non-conditional symbol collections - e.g. >>>
// token symbol is always before the cursoror - |&&
export class ExpandIfCursorOnPotentialConditionOperator {
  public static getExpansionIfBeforeStart(tokens: Tokens, index: number): number {
    const token = tokens[index] as string;
    switch (token) {
      case '|':
      case '&':
        return LogicalOrAssignmentOperatorExpansion.getForSelectionStart(tokens, index);
      case '<':
      case '>':
        return GreaterOrLessThanOperatorExpansion.getForSelectionStart(tokens, index);
      case '=':
        return ComparisonOperatorExpansion.getForSelectionStart(tokens, index - 1);
      default:
        return 0;
    }
  }

  public static getExpansionIfAfterEnd(tokens: Tokens, index: number): number {
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
}
