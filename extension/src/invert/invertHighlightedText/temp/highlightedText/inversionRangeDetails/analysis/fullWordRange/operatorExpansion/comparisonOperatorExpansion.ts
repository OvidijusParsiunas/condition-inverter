import { ExpandIfCursorOnPotentialConditionOperatorUtil as SelectionExpansionUtil } from '../util/selectionExpansionUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class ComparisonOperatorExpansion {
  private static getEndOfOperator(tokens: Tokens, index: number): number {
    const length = 1;
    if (tokens[index + 1] === '=') {
      return SelectionExpansionUtil.getEqualsExpansionUntilItEnds(tokens, index, length);
    }
    return length;
  }

  public static getForSelectionEnd(tokens: Tokens, index: number): number {
    if (
      (SelectionExpansionUtil.isGreaterLessThanSymbol(tokens[index - 1]) && !SelectionExpansionUtil.isGreaterLessThanSymbol(tokens[index - 2])) ||
      SelectionExpansionUtil.isBitwiseAssignment(tokens[index - 1])
    ) {
      return 1;
    }
    if (SelectionExpansionUtil.isEqualityOperator(tokens[index - 1])) {
      return ComparisonOperatorExpansion.getEndOfOperator(tokens, index);
    }
    return 0;
  }

  public static getForSelectionStart(tokens: Tokens, index: number, length = 0): number {
    if (!SelectionExpansionUtil.isEqualityOperator(tokens[index]) && !SelectionExpansionUtil.isGreaterLessThanSymbol(tokens[index])) {
      return length;
    }
    return ComparisonOperatorExpansion.getForSelectionStart(tokens, index - 1, length + 1);
  }
}
