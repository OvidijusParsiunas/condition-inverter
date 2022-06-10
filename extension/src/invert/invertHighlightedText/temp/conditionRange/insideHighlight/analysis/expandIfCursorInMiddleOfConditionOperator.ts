import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';

export class ExpandIfCursorInMiddleOfConditionOperator {
  private static isEqualsComparisonOperatorAfterEnd(tokens: Tokens, index: number, length: number): number {
    if (tokens[index] === '=') return ExpandIfCursorInMiddleOfConditionOperator.isEqualsComparisonOperatorAfterEnd(tokens, index + 1, length + 1);
    return length;
  }

  private static isEqualsComparisonOperatorBeforeStart(tokens: Tokens, index: number, length: number): number {
    if (tokens[index] !== '!' && tokens[index] !== '=') return length;
    return ExpandIfCursorInMiddleOfConditionOperator.isEqualsComparisonOperatorBeforeStart(tokens, index - 1, length + 1);
  }

  private static isGreaterOrLessThanComparisonOperator(currentToken: Token, nextToken: Token): number {
    return currentToken === nextToken || '=' === nextToken ? (nextToken as string).length : 0;
  }

  // WORK - &&= should not work
  private static isLogicalOperator(currentToken: Token, nextToken: Token): number {
    return currentToken === nextToken ? (nextToken as string).length : 0;
  }

  public static getExpansionIfBeforeStart(tokens: Tokens, index: number): number {
    const token = tokens[index] as string;
    switch (token) {
      case '|':
      case '&':
        return ExpandIfCursorInMiddleOfConditionOperator.isLogicalOperator(tokens[index], tokens[index - 1]);
      case '<':
      case '>':
        return ExpandIfCursorInMiddleOfConditionOperator.isGreaterOrLessThanComparisonOperator(tokens[index], tokens[index - 1]);
      case '=':
        return ExpandIfCursorInMiddleOfConditionOperator.isEqualsComparisonOperatorBeforeStart(tokens, index - 1, 0);
      default:
        return 0;
    }
  }

  public static getExpansionIfAfterEnd(tokens: Tokens, index: number): number {
    const token = tokens[index] as string;
    switch (token) {
      case '|':
      case '&':
        return ExpandIfCursorInMiddleOfConditionOperator.isLogicalOperator(tokens[index], tokens[index + 1]);
      case '<':
      case '>':
        return ExpandIfCursorInMiddleOfConditionOperator.isGreaterOrLessThanComparisonOperator(tokens[index], tokens[index + 1]);
      case '=':
      case '!':
        return ExpandIfCursorInMiddleOfConditionOperator.isEqualsComparisonOperatorAfterEnd(tokens, index + 1, 0);
      default:
        return 0;
    }
  }
}
