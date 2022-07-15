import { jstsReservedTerminatingWords } from '../../../../../shared/consts/jstsReservedTerminatingWords';
import { TraversalUtil } from '../../../../../shared/functionality/traversalUtil';
import { STRING_QUOTE_JSON } from '../../../../../shared/consts/specialTokens';
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

  private static isHTMLAttributeBeforeGreaterThanSymbol(tokens: Tokens, index: number): boolean {
    if (index < 0 || jstsReservedTerminatingWords[tokens[index] as keyof typeof jstsReservedTerminatingWords]) return false;
    if (tokens[index] === '=') {
      const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index + 1);
      if (STRING_QUOTE_JSON[tokens[nextTokenIndex] as keyof typeof STRING_QUOTE_JSON]) {
        return true;
      }
    }
    return AnalyzeHTMLTag.isHTMLAttributeBeforeGreaterThanSymbol(tokens, index - 1);
  }

  public static isEndTagSymbol(tokens: Tokens, currentIndex: number): boolean {
    if (tokens[currentIndex] === '>') {
      const htmlTagOpenSymbol = TraversalUtil.findTokenIndex(tokens, currentIndex, '<', false);
      if (htmlTagOpenSymbol > -1) {
        return AnalyzeHTMLTag.isStartTagSymbol(tokens, htmlTagOpenSymbol);
      }
      // identifies if a html attribute appears before a > symbol - identifying an end of tag
      return AnalyzeHTMLTag.isHTMLAttributeBeforeGreaterThanSymbol(tokens, currentIndex);
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
    return STRING_QUOTE_JSON[tokens[previousSiblingIndex] as keyof typeof STRING_QUOTE_JSON];
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
