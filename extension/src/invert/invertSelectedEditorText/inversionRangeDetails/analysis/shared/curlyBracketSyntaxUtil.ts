import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class CurlyBracketSyntaxUtil {
  public static isStringTemplateOpenToken(tokens: Tokens, currentIndex: number): boolean {
    return tokens[currentIndex] === '{' && tokens[currentIndex - 1] === '$';
  }

  public static isScopeOpenToken(tokens: Tokens, currentIndex: number): boolean {
    return tokens[currentIndex] === '{' && tokens[currentIndex - 1] !== '$';
  }
}
