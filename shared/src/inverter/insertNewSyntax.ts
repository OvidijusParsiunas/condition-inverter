import { Tokens } from '../shared/types/tokens';

export class InsertNewSyntax {
  private static insertStringAfterNewLineString(tokens: Tokens, token: string, arrayIndex: number, newValue: string): number {
    tokens[arrayIndex] = `${token.substring(0, 2)}${newValue}${token.substring(2, token.length)}`;
    return 0;
  }
  public static insert(tokens: Tokens, arrayIndex: number, newValue: string): number {
    const token = tokens[arrayIndex] as string;
    if (token.substring(0, 2) === `\n`) {
      return InsertNewSyntax.insertStringAfterNewLineString(tokens, token, arrayIndex, newValue);
    }
    tokens.splice(arrayIndex, 0, newValue);
    return 1;
  }
}
