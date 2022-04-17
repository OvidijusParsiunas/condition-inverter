import { Tokens } from '../../shared/types/tokens';

export class InsertNewSyntax {
  public static insert(tokens: Tokens, tokenIndex: number, newSyntax: string): number {
    tokens.splice(tokenIndex, 0, newSyntax);
    return 1;
  }
}
