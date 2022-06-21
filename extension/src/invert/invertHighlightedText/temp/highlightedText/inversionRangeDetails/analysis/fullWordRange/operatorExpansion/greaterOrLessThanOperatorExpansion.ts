import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class GreaterOrLessThanOperatorExpansion {
  private static getLengthOfGreaterOrLessThanComparisonOperator(tokens: Tokens, index: number, delta: number, length: number): number {
    if (tokens[index] === tokens[index + delta]) {
      return GreaterOrLessThanOperatorExpansion.getLengthOfGreaterOrLessThanComparisonOperator(tokens, index + delta, delta, length + 1);
    }
    if (tokens[index + delta] === '=') return length + 1;
    return length;
  }

  private static get(tokens: Tokens, index: number, delta: number, length = 0): number {
    if (tokens[index - 1] !== tokens[index]) return 0;
    // when start - length starts with 0 as |< does not need to expand backwards
    // when end - length starts with 1 as |< means there is a need for 1 expantion
    return GreaterOrLessThanOperatorExpansion.getLengthOfGreaterOrLessThanComparisonOperator(tokens, index, delta, length);
  }

  public static getForSelectionStart(tokens: Tokens, index: number): number {
    return GreaterOrLessThanOperatorExpansion.get(tokens, index, -1);
  }

  public static getForSelectionEnd(tokens: Tokens, index: number): number {
    return GreaterOrLessThanOperatorExpansion.get(tokens, index, 1, 1);
  }
}
