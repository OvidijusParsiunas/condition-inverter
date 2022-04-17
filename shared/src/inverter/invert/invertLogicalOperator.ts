import { Tokens } from '../../shared/types/tokens';

export class InvertLogicalOperator {
  public static invert(tokens: Tokens, tokenIndex: number): void {
    const newToken = tokens[tokenIndex] === '|' ? '&' : '|';
    tokens[tokenIndex] = newToken;
    tokens[tokenIndex + 1] = newToken;
  }
}
