import { Tokens } from '../../shared/types/tokens';

export class InvertLogicalOperator {
  public static invertSymbol(tokens: Tokens, tokenIndex: number): void {
    const newToken = tokens[tokenIndex] === '|' ? '&' : '|';
    tokens[tokenIndex] = newToken;
    tokens[tokenIndex + 1] = newToken;
  }

  // mostly used for Python
  public static invertKeyword(tokens: Tokens, tokenIndex: number): void {
    const newToken = tokens[tokenIndex] === 'and' ? 'or' : 'and';
    tokens[tokenIndex] = newToken;
  }
}
