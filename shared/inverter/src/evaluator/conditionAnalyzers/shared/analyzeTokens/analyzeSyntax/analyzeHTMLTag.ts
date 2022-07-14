import { TraversalUtil } from '../../../../../shared/functionality/traversalUtil';
import { Token, Tokens } from '../../../../../shared/types/tokens';

export class AnalyzeHTMLTag {
  // no numbers or symbols
  private static isHTMLTagWord(word: Token): boolean {
    return Boolean((word as string).match(/\b[a-zA-Z]+\b/g));
  }

  public static isStartTagSymbol(tokens: Tokens, currentIndex: number): boolean {
    if (tokens[currentIndex] === '<' && currentIndex < tokens.length - 1) {
      if (tokens[currentIndex + 1] === '/') return true;
      if (AnalyzeHTMLTag.isHTMLTagWord(tokens[currentIndex + 1])) {
        const htmlTagCloseSymbol = TraversalUtil.findTokenIndex(tokens, currentIndex, '>');
        return htmlTagCloseSymbol > -1;
      }
    }
    return false;
  }

  public static isEndTagSymbol(tokens: Tokens, currentIndex: number): boolean {
    if (tokens[currentIndex] === '>') {
      const htmlTagOpenSymbol = TraversalUtil.findTokenIndex(tokens, currentIndex, '<', false);
      if (htmlTagOpenSymbol > -1) {
        return AnalyzeHTMLTag.isStartTagSymbol(tokens, htmlTagOpenSymbol);
      }
    }
    return false;
  }

  public static isGreaterThanSymbolForEndOfOpenTag(tokens: Tokens, greaterThanSymbolIndex: number): boolean {
    const previousSiblingIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, greaterThanSymbolIndex - 1, false);
    if (tokens[previousSiblingIndex] === '}') {
      const openBraceIndex = TraversalUtil.getIndexOfOpenBrace(tokens, previousSiblingIndex, 1);
      if (openBraceIndex > -1) {
        return tokens[openBraceIndex - 1] === '=';
      }
    }
    return Boolean(tokens[previousSiblingIndex] === '"' || tokens[previousSiblingIndex] === `'` || tokens[previousSiblingIndex] === '`');
  }

  public static findEndOfOpenTagIndex(tokens: Tokens, startIndex: number): number {
    const greaterThanSymbolIndex = TraversalUtil.findTokenIndex(tokens, startIndex, '>');
    if (greaterThanSymbolIndex < tokens.length) {
      if (AnalyzeHTMLTag.isGreaterThanSymbolForEndOfOpenTag(tokens, greaterThanSymbolIndex)) {
        return greaterThanSymbolIndex;
      }
    }
    return -1;
  }
}
