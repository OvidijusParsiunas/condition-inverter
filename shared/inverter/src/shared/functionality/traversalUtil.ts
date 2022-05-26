import { FirstFoundToken } from '../types/firstFoundToken';
import { Token, Tokens } from '../types/tokens';

export class TraversalUtil {
  public static findTokenIndex(tokens: Tokens, startIndex: number, token: Token, traverseForwards = true): number {
    if (traverseForwards) return startIndex + tokens.slice(startIndex).indexOf(token);
    return tokens.slice(0, startIndex).lastIndexOf(token);
  }

  public static findFirstTokenFromSelection(tokens: Tokens, startIndex: number, tokensToSearchFor: Tokens): FirstFoundToken {
    const tokensToSearchForJSON = Object.fromEntries(new Map(tokensToSearchFor.map((obj) => [obj as string, true])));
    for (let i = startIndex; i < tokens.length; i += 1) {
      if (tokensToSearchForJSON[tokens[i] as keyof typeof tokensToSearchForJSON]) {
        return { token: tokens[i], index: i };
      }
    }
    return { token: null, index: tokens.length - 1 };
  }

  public static getSiblingNonSpaceTokenIndex(tokens: Tokens, index: number, traverseForwards = true): number {
    if (tokens[index] !== ' ' && tokens[index] !== '\n' && tokens[index] !== '\r') {
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
      return tokens.length - 1;
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
