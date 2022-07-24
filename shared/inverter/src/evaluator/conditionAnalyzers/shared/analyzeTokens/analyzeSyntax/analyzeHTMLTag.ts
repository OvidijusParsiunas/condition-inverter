import { jstsReservedTerminatingWords } from '../../../../../shared/consts/jstsReservedTerminatingWords';
import { TraversalUtil } from '../../../../../shared/functionality/traversalUtil';
import { STRING_QUOTE_JSON } from '../../../../../shared/consts/specialTokens';
import { Token, Tokens } from '../../../../../shared/types/tokens';

export class AnalyzeHTMLTag {
  // not a space or symbol
  private static isHTMLTagWord(word: Token): boolean {
    return Boolean((word as string).match(/\w+/));
  }

  public static isTagStartSymbol(tokens: Tokens, currentIndex: number): boolean {
    if (tokens[currentIndex] === '/' && tokens[currentIndex - 1] === '<') return true;
    if (tokens[currentIndex] === '<' && currentIndex < tokens.length - 1) {
      if (tokens[currentIndex + 1] === '/') return true;
      if (AnalyzeHTMLTag.isHTMLTagWord(tokens[currentIndex + 1])) {
        const htmlTagCloseSymbol = TraversalUtil.findTokenIndex(tokens, currentIndex, '>');
        return htmlTagCloseSymbol > -1;
      }
      // backbone.js/ASP.NET <% if (dog)
      if (tokens[currentIndex + 1] === '%') return true;
    }
    return false;
  }

  private static isOpenBraceForHTMLAttribute(tokens: Tokens, indexOfOpenBrace: number): boolean {
    const tokenIndexBeforeOpenBrace = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, indexOfOpenBrace - 1, false);
    // if ={
    if (tokens[tokenIndexBeforeOpenBrace] === '=') return true;
    // if ="{
    // if ="class-name {{" - ember
    const stringQuoteToken = TraversalUtil.findFirstTokenFromSelection(tokens, tokenIndexBeforeOpenBrace, STRING_QUOTE_JSON, false);
    if (stringQuoteToken) {
      const tokenIndexBeforeStringQuote = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, stringQuoteToken.index - 1, false);
      return tokens[tokenIndexBeforeStringQuote] === '=';
    }
    return false;
  }

  public static isCloseBraceForHTMLAttribribute(tokens: Tokens, indexOfCloseBrace: number): boolean {
    const openBraceIndex = TraversalUtil.getIndexOfOpenBrace(tokens, indexOfCloseBrace, 1);
    if (openBraceIndex > -1) return AnalyzeHTMLTag.isOpenBraceForHTMLAttribute(tokens, openBraceIndex);
    return false;
  }

  private static isHTMLAttributeIndicatorBeforeGreaterThanSymbol(tokens: Tokens, index: number): boolean {
    if (index < 0 || jstsReservedTerminatingWords[tokens[index] as keyof typeof jstsReservedTerminatingWords]) return false;
    if (tokens[index] === '=') {
      const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index + 1);
      if (STRING_QUOTE_JSON[tokens[nextTokenIndex] as keyof typeof STRING_QUOTE_JSON]) {
        return true;
      }
    }
    if (tokens[index] === '}') return AnalyzeHTMLTag.isCloseBraceForHTMLAttribribute(tokens, index);
    return AnalyzeHTMLTag.isHTMLAttributeIndicatorBeforeGreaterThanSymbol(tokens, index - 1);
  }

  public static isTagEndSymbol(tokens: Tokens, currentIndex: number): boolean {
    if (tokens[currentIndex] === '>') {
      const htmlTagOpenSymbol = TraversalUtil.findTokenIndex(tokens, currentIndex, '<', false);
      if (htmlTagOpenSymbol > -1) {
        return AnalyzeHTMLTag.isTagStartSymbol(tokens, htmlTagOpenSymbol);
      }
      // backbone.js/ASP.NET if (dog) %>
      if (tokens[currentIndex - 1] === '%') return true;
      // assumption (relatively dangerous) that if a string quote appears before >, > is for tag end symbol
      const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, currentIndex - 1, false);
      if (STRING_QUOTE_JSON[tokens[previousTokenIndex] as keyof typeof STRING_QUOTE_JSON]) return true;
      // identifies if a html attribute appears before a > symbol - identifying an end of tag
      return AnalyzeHTMLTag.isHTMLAttributeIndicatorBeforeGreaterThanSymbol(tokens, currentIndex);
    }
    return false;
  }

  public static findEndOfOpenTagIndex(tokens: Tokens, startIndex: number): number {
    const greaterThanSymbolIndex = TraversalUtil.findTokenIndex(tokens, startIndex, '>');
    if (AnalyzeHTMLTag.isTagEndSymbol(tokens, greaterThanSymbolIndex)) {
      return greaterThanSymbolIndex;
    }
    return -1;
  }
}
