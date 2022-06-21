import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class LogicalOrAssignmentOperatorExpansion {
  public static getForSelectionEnd(tokens: Tokens, index: number): number {
    if (tokens[index] === tokens[index - 1]) {
      // &|&=
      if (tokens[index + 1] === '=') {
        return 2;
      }
      // &|&
      return 1;
    }
    return 0;
  }

  public static getForSelectionStart(tokens: Tokens, index: number): number {
    return Number(tokens[index] === tokens[index - 1]);
  }
}
