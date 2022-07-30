import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class BackboneJSASPNETUtil {
  public static isCloseTag(tokens: Tokens, index: number): boolean {
    return tokens[index] === '%' && tokens[index + 1] === '>';
  }

  public static isOpenTag(tokens: Tokens, index: number): boolean {
    return tokens[index] === '%' && tokens[index - 1] === '<';
  }
}
