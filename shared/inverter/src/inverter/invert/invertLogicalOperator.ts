import { TraversalUtil } from '../../shared/functionality/traversalUtil';
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

  // mostly used for Python - this a simple logical not operator that is used for negation - either not hello  or  not(hello)
  // which will result in  hello  or  (hello)
  public static removeNot(tokens: Tokens, tokenIndex: number, tokenIndexDelta: number): number {
    const siblinTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, tokenIndex + 1);
    tokens.splice(tokenIndex, siblinTokenIndex - tokenIndex);
    return tokenIndexDelta - 2;
  }
}
