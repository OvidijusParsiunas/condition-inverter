import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class GreaterOrLessThanOperatorExpansion {
  private static getLengthOfGreaterOrLessThanComparisonOperator(tokens: Tokens, index: number, delta: number, length: number): number {
    if (tokens[index] === tokens[index + delta]) {
      return GreaterOrLessThanOperatorExpansion.getLengthOfGreaterOrLessThanComparisonOperator(tokens, index + delta, delta, length + 1);
    }
    // this is for rightwards tranversal in end
    if (tokens[index + delta] === '=') return length + 1;
    return length;
  }

  public static getForSelectionStart(tokens: Tokens, index: number): number {
    // <|=
    if (tokens[index + 1] === '=') return 1;
    // length starts with 0 as <| does not mean expansion will be needed
    return GreaterOrLessThanOperatorExpansion.getLengthOfGreaterOrLessThanComparisonOperator(tokens, index, -1, 0);
  }

  public static getForSelectionEnd(tokens: Tokens, index: number): number {
    // |<
    if (tokens[index - 1] !== tokens[index]) return 0;
    // length starts with 1 as <|< means there is a need for at least 1 expantion
    return GreaterOrLessThanOperatorExpansion.getLengthOfGreaterOrLessThanComparisonOperator(tokens, index, 1, 1);
  }
}
