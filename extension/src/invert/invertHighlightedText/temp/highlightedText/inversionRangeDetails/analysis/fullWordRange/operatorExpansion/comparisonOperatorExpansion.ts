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

  private static getTotalStartExpansion(tokens: Tokens, index: number, length: number): number {
    const token = tokens[index];
    if (token !== '=' && token !== '!') {
      return length;
    }
    return ComparisonOperatorExpansion.getTotalStartExpansion(tokens, index - 1, length + 1);
  }

  public static getForSelectionStart(tokens: Tokens, index: number, length = 0): number {
    // =|
    if (tokens[index + 1] !== '=') {
      return length;
    }
    // =|=, ==|=, =|==, !=|=
    return ComparisonOperatorExpansion.getTotalStartExpansion(tokens, index - 1, length + 1);
  }
}
