import { FirstFoundToken } from '../types/firstFoundToken';
import { SPACE_JSON } from '../consts/specialTokens';
import { TokensJSON } from '../types/tokensJSON';
import { Token, Tokens } from '../types/tokens';

export class TraversalUtil {
  public static findTokenIndex(tokens: Tokens, startIndex: number, token: Token, traverseForwards = true): number {
    if (traverseForwards) return tokens.indexOf(token, startIndex);
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
    if (tokens[index] === quoteString || index > tokens.length - 1) {
      return index;
    }
    return TraversalUtil.getEndQuoteIndex(tokens, index + 1, quoteString);
  }

  // prettier-ignore
  private static getIndexOfClosingSyntaxToken(
      tokens: Tokens, index: number, openSyntax: string, closeSyntax: string, openSyntaxes: number, traverseForwards = true): number {
    if (traverseForwards) {
      if (index > tokens.length - 1) return -1;
    } else if (index < 0) return -1;
    const nextIndex = traverseForwards ? index + 1 : index - 1;
    if (tokens[nextIndex] === openSyntax) {
      return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, nextIndex, openSyntax, closeSyntax, openSyntaxes + 1, traverseForwards);
    }
    if (tokens[nextIndex] === closeSyntax) {
    if (openSyntaxes === 1) {
        return nextIndex;
      }
      return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, nextIndex, openSyntax, closeSyntax, openSyntaxes - 1, traverseForwards);
    }
    return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, nextIndex, openSyntax, closeSyntax, openSyntaxes, traverseForwards);
  }

  public static getIndexOfClosingBracket(tokens: Tokens, index: number, openBrackets = 0): number {
    return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, index, '(', ')', openBrackets);
  }

  public static getIndexOfOpenBracket(tokens: Tokens, index: number, closeBrackets = 0): number {
    return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, index, ')', '(', closeBrackets, false);
  }

  public static getIndexOfClosingBrace(tokens: Tokens, index: number, openBrackets = 0): number {
    return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, index, '{', '}', openBrackets);
  }

  public static getIndexOfOpenBrace(tokens: Tokens, index: number, openBrackets = 0): number {
    return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, index, '}', '{', openBrackets, false);
  }

  public static getIndexOfCurrentTernaryColon(tokens: Tokens, index: number, openBrackets = 0): number {
    return TraversalUtil.getIndexOfClosingSyntaxToken(tokens, index, '?', ':', openBrackets);
  }
}
