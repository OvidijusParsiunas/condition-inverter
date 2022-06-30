import { ExpandIfCursorOnPotentialConditionOperatorUtil as SelectionExpansionUtil } from '../util/selectionExpansionUtil';
import { GreaterOrLessThanOperatorExpansion } from './greaterOrLessThanOperatorExpansion';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class ComparisonOperatorExpansion {
  private static getEndOfOperator(tokens: Tokens, index: number): number {
    const initialExpansion = 1;
    if (tokens[index + 1] === '=') {
      return SelectionExpansionUtil.getEqualsExpansionUntilItEnds(tokens, index, initialExpansion);
    }
    return initialExpansion;
  }

  public static getForHighlightSelectionEnd(tokens: Tokens, index: number): number {
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

  public static getForSelectionEnd(tokens: Tokens, index: number): number {
    if (tokens[index + 1] === '=') {
      return SelectionExpansionUtil.getEqualsExpansionUntilItEnds(tokens, index + 1, 1);
    }
    // expand over an equals no matter if it is a condition or not
    // this is most used for situations as follows
    // <<|= &&|=
    return 1;
  }

  private static getTotalStartExpansion(tokens: Tokens, index: number, length: number): number {
    const token = tokens[index];
    if (token !== '=' && token !== '!') {
      return length;
    }
    return ComparisonOperatorExpansion.getTotalStartExpansion(tokens, index - 1, length + 1);
  }

  public static getForHighlightSelectionStart(tokens: Tokens, index: number): number {
    // WORK - How does this work for <<=
    const initialLength = 0;
    // =|
    if (tokens[index + 1] !== '=') {
      return initialLength;
    }
    // =|=, ==|=, =|==, !=|=
    return ComparisonOperatorExpansion.getTotalStartExpansion(tokens, index - 1, initialLength + 1);
  }

  public static getForSelectionStart(tokens: Tokens, index: number): number {
    const equalsExpansion = ComparisonOperatorExpansion.getTotalStartExpansion(tokens, index - 1, 1);
    if (SelectionExpansionUtil.isGreaterLessThanSymbol(tokens[index - equalsExpansion])) {
      const greaterOrLessThanExpansion = GreaterOrLessThanOperatorExpansion.getForSelectionStart(tokens, index - equalsExpansion);
      return equalsExpansion + greaterOrLessThanExpansion;
    }
    return equalsExpansion;
  }
}
