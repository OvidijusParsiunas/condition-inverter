import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class DjangoFlaskUtil {
  public static isCloseClauseStartingWthPercentage(tokens: Tokens, index: number): boolean {
    return tokens[index] === '%' && tokens[index + 1] === '}';
  }

  public static isCloseClauseStartingWthCloseBrace(fullLineTokens: Tokens, index: number): boolean {
    return fullLineTokens[index - 1] === '%';
  }
}
