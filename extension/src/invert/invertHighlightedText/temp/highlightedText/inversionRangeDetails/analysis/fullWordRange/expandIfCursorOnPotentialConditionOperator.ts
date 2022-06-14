import { Tokens } from 'shared/inverter/src/shared/types/tokens';

// this class gets expansion delta even for non-condition symbol collections - e.g. >>>
export class ExpandIfCursorOnPotentialConditionOperator {
  private static getQuestionMarkExpansionForEnd(tokens: Tokens, index: number, length = 0): number {
    if (tokens[index] !== '?' && tokens[index] !== '=') return length;
    return ExpandIfCursorOnPotentialConditionOperator.getQuestionMarkExpansionForEnd(tokens, index - 1, length + 1);
  }

  private static getComparisonOperatorExtensionForEnd(tokens: Tokens, index: number, length = 0): number {
    if (tokens[index] === '=') return ExpandIfCursorOnPotentialConditionOperator.getComparisonOperatorExtensionForEnd(tokens, index + 1, length + 1);
    return length;
  }

  private static getComparisonOperatorExtensionForStart(tokens: Tokens, index: number, length = 0): number {
    if (tokens[index] !== '!' && tokens[index] !== '=' && tokens[index] !== '<' && tokens[index] !== '>') return length;
    return ExpandIfCursorOnPotentialConditionOperator.getComparisonOperatorExtensionForStart(tokens, index - 1, length + 1);
  }

  private static getLengthOfGreaterOrLessThanComparisonOperator(tokens: Tokens, index: number, delta: number, length: number): number {
    if (tokens[index] === tokens[index + delta]) {
      return ExpandIfCursorOnPotentialConditionOperator.getLengthOfGreaterOrLessThanComparisonOperator(tokens, index + delta, delta, length + 1);
    }
    return length;
  }

  private static getGreaterOrLessSymbolsExpansion(tokens: Tokens, index: number, delta: number): number {
    // only used for the end where < is the current token
    // <<|=
    if (tokens[index + 1] === '=') {
      return 1;
    }
    return ExpandIfCursorOnPotentialConditionOperator.getLengthOfGreaterOrLessThanComparisonOperator(tokens, index, delta, 0);
  }

  private static getLogicalOperatorOrAssignmentExpansionForEnd(tokens: Tokens, index: number): number {
    const currentToken = tokens[index];
    // uses the value on the left
    // &|& and &|&=
    // &&| and &&|=
    if (currentToken === tokens[index + 1]) {
      if (tokens[index + 2] === '=') {
        return 2;
      }
      return 1;
    }
    if (currentToken === tokens[index - 1]) {
      if (tokens[index + 1] === '=') {
        return 2;
      }
      return 1;
    }
    return 0;
  }

  public static getExpansionIfBeforeStart(tokens: Tokens, index: number): number {
    const token = tokens[index] as string;
    switch (token) {
      case '|':
      case '&':
        // &|& and &|&=
        return Number(tokens[index] === tokens[index - 1]);
      case '<':
      case '>':
        return ExpandIfCursorOnPotentialConditionOperator.getGreaterOrLessSymbolsExpansion(tokens, index, -1);
      case '=':
        return ExpandIfCursorOnPotentialConditionOperator.getComparisonOperatorExtensionForStart(tokens, index - 1);
      default:
        return 0;
    }
  }

  public static getExpansionIfAfterEnd(tokens: Tokens, index: number): number {
    const token = tokens[index] as string;
    switch (token) {
      case '|':
      case '&':
        return ExpandIfCursorOnPotentialConditionOperator.getLogicalOperatorOrAssignmentExpansionForEnd(tokens, index);
      case '<':
      case '>':
        return ExpandIfCursorOnPotentialConditionOperator.getGreaterOrLessSymbolsExpansion(tokens, index, 1);
      case '=':
      case '!':
        return ExpandIfCursorOnPotentialConditionOperator.getComparisonOperatorExtensionForEnd(tokens, index + 1);
      case '?':
        return ExpandIfCursorOnPotentialConditionOperator.getQuestionMarkExpansionForEnd(tokens, index);
      default:
        return 0;
    }
  }
}
