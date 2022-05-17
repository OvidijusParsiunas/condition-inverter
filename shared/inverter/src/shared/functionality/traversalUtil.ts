import { INDEX_OUT_OF_BOUNDS_DURING_TRAVERSAL } from '../consts/errors';
import { Token, Tokens } from '../types/tokens';

export class TraversalUtil {
  public static findNextTokenIndex(tokens: Tokens, startIndex: number, token: Token): number {
    return startIndex + tokens.slice(startIndex).indexOf(token);
  }

  public static getSiblingNonSpaceTokenIndex(tokens: Tokens, index: number, traverseForwards = true): number {
    if (tokens[index] !== ' ' && tokens[index] !== `\n` && tokens[index] !== `\r`) {
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
      throw new Error(INDEX_OUT_OF_BOUNDS_DURING_TRAVERSAL);
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
}
