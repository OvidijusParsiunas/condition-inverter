import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class QuestionMarkOperatorExpansion {
  public static getForSelectionEnd(tokens: Tokens, index: number, length = 0): number {
    if (tokens[index] !== '?' && tokens[index] !== '=') return length;
    return QuestionMarkOperatorExpansion.getForSelectionEnd(tokens, index - 1, length + 1);
  }
}
