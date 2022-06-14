import { FirstFoundToken } from '../types/firstFoundToken';
import { SPACE_JSON } from '../consts/specialTokens';
import { TokensJSON } from '../types/tokensJSON';
import { Token, Tokens } from '../types/tokens';

export class TraversalUtil {
  public static findTokenIndex(tokens: Tokens, startIndex: number, token: Token, traverseForwards = true): number {
    if (traverseForwards) return startIndex + tokens.slice(startIndex).indexOf(token);
    return tokens.slice(0, startIndex).lastIndexOf(token);
  }

  private static generateResultIfTokenFound(tokens: Tokens, targetTokens: TokensJSON, index: number): FirstFoundToken | null {
    if (targetTokens[tokens[index] as keyof typeof targetTokens]) {
      return { token: tokens[index], index };
    }
    return null;
  }

  // prettier-ignore
  public static findFirstTokenFromSelection(
      tokens: Tokens, startIndex: number, targetTokens: TokensJSON, traverseForwards = true): FirstFoundToken | null {
    if (traverseForwards) {
      for (let i = startIndex; i < tokens.length; i += 1) {
        const result = TraversalUtil.generateResultIfTokenFound(tokens, targetTokens, i);
        if (result) return result;
      }
    } else {
      for (let i = tokens.length - 1; i >= 0; i -= 1) {
        const result = TraversalUtil.generateResultIfTokenFound(tokens, targetTokens, i);
        if (result) return result;
      }
    }
    return null;
  }

  public static getSiblingNonSpaceTokenIndex(tokens: Tokens, index: number, traverseForwards = true): number {
    if (!SPACE_JSON[tokens[index] as string]) {
      return index;
    }
    const newIndex = traverseForwards ? index + 1 : index - 1;
    return TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, newIndex, traverseForwards);
  }

  public static getEndQuoteIndex(tokens: Tokens, index: number, quoteString: `'` | '`' | '"'): number {
    if (tokens[index] === quoteString) {
      return index;
    }
    return TraversalUtil.getEndQuoteIndex(tokens, index + 1, quoteString);
  }

  private static getIndexOfClosingSyntaxToken(tokens: Tokens, index: number, openSyntax: string, closeSyntax: string, openBrackets: number): number {
    if (index > tokens.length - 1) {
      return -1;
    }
    if (tokens[index + 1] === openSyntax) {
      return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, index + 1, openSyntax, closeSyntax, openBrackets + 1);
    }
    if (tokens[index + 1] === closeSyntax) {
      if (openBrackets === 1) {
        return index + 1;
      }
      return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, index + 1, openSyntax, closeSyntax, openBrackets - 1);
    }
    return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, index + 1, openSyntax, closeSyntax, openBrackets);
  }

  public static getIndexOfClosingBracket(tokens: Tokens, index: number, openBrackets = 0): number {
    return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, index, '(', ')', openBrackets);
  }

  public static getIndexOfClosingBrace(tokens: Tokens, index: number, openBrackets = 0): number {
    return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, index, '{', '}', openBrackets);
  }

  public static getIndexOfCurrentTernaryColon(tokens: Tokens, index: number, openBrackets = 0): number {
    return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, index, '?', ':', openBrackets);
  }
}
