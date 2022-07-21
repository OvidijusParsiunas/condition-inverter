import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';

export class ExpandIfCursorOnPotentialConditionOperatorUtil {
  public static isGreaterLessThanSymbol(token: Token): boolean {
    return token === '<' || token === '>';
  }

  public static isBitwiseAssignment(token: Token): boolean {
    return token === '&' || token === '|';
  }

  public static isEqualityOperator(token: Token): boolean {
    return token === '=' || token === '!';
  }

  public static getEqualsExpansionUntilItEnds(tokens: Tokens, index: number, expansion = 0): number {
    if (tokens[index] === '=') {
      return ExpandIfCursorOnPotentialConditionOperatorUtil.getEqualsExpansionUntilItEnds(tokens, index + 1, expansion + 1);
    }
    return expansion;
  }
}
