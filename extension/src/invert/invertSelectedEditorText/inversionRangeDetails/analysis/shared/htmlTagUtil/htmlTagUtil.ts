import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { ExpandIfCursorOnPotentialConditionOperatorUtil } from '../../fullWordRange/util/selectionExpansionUtil';
import { GetPositionIfSelectionBeforeOpenTag } from './getPositionIfSelectionBeforeOpenTag';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { STRING_QUOTE_JSON } from 'shared/inverter/src/shared/consts/specialTokens';
import { LineTokenTraversalUtil } from '../lineTokenTraversalUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Position } from '../../../../shared/types/position';
import { Range, TextEditor } from 'vscode';

// the generic strategy is not to include < > as partial highlighting of a tag will cause inverter to invert these symbols
export class HTMLTagUtil {
  private static getPositionIfStartAfterTagStart(editor: TextEditor, line: number, tokensBeforeChar: Tokens, prvNnSpcIndex: number): Position | null {
    if (tokensBeforeChar[prvNnSpcIndex] === '<' || tokensBeforeChar[prvNnSpcIndex] === '/') {
      if (tokensBeforeChar[prvNnSpcIndex] === '/') prvNnSpcIndex -= 1;
      // prettier-ignore
      const tokensAfterWthLessThan = LineTokenTraversalUtil.getLineTokensAfterCharNumber(
        editor, line, LineTokenTraversalUtil.getTokenStringIndex(tokensBeforeChar, prvNnSpcIndex));
      if (AnalyzeHTMLTag.isTagStartSymbol(tokensAfterWthLessThan, 0)) {
        // do not include < if open tag, include if close tag
        const increaseDelta = tokensAfterWthLessThan[1] === '/' ? -1 : 1;
        return { line, character: LineTokenTraversalUtil.getTokenStringIndex(tokensBeforeChar, prvNnSpcIndex) + increaseDelta };
      }
    }
    return null;
  }

  private static getPositionIfStartAfterTagSymbol(editor: TextEditor, highlightStart: Position): Position | null {
    const { line, character } = highlightStart;
    const tokensBeforeChar = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, line, character);
    const previousNonSpaceIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokensBeforeChar, tokensBeforeChar.length - 1, false);
    return HTMLTagUtil.getPositionIfStartAfterTagStart(editor, line, tokensBeforeChar, previousNonSpaceIndex);
  }

  // prettier-ignore
  private static getPositionIfStartBeforeTagEnd(
      editor: TextEditor, selection: Position, tokensAfterChar: Tokens, nextNonSpaceIndex: number): Position | null {
    if (tokensAfterChar[nextNonSpaceIndex] === '>') {
    const tokensBeforeChar = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, selection.line, selection.character);
    // prettier-ignore
      const tokensBeforeWthGreaterThan = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(
        editor, selection.line, selection.character + LineTokenTraversalUtil.getTokenStringIndex(tokensAfterChar, nextNonSpaceIndex) + 1);
      // not using editor to get fullLineTokens as the sub arrays are already present in some functions invoking this
      const fullLineTokens = tokensBeforeChar.concat(tokensAfterChar);
      if (AnalyzeHTMLTag.isTagEndSymbol(fullLineTokens, tokensBeforeWthGreaterThan.length - 1)) {
        // do not include >
        return {
          line: selection.line,
          character: selection.character + LineTokenTraversalUtil.getTokenStringIndex(tokensAfterChar, nextNonSpaceIndex) + 1,
        };
      }
    }
    return null;
  }

  private static isNextNonSpaceCharAfterStartBeforeEnd(nextNonSpaceChar: number, highlightStart: Position, highlightEnd: Position): boolean {
    return (
      highlightStart.line < highlightEnd.line ||
      highlightStart.line > highlightEnd.line ||
      highlightStart.character + nextNonSpaceChar < highlightEnd.character
    );
  }

  private static getPositionIfStartBeforeTagSymbol(editor: TextEditor, fullWordRange: Range): Position | null {
    const highlightStart = fullWordRange.start;
    const { line, character } = highlightStart;
    const tokensAfterChar = LineTokenTraversalUtil.getLineTokensAfterCharNumber(editor, line, character);
    const nextNonSpaceIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokensAfterChar, 0);
    if (!HTMLTagUtil.isNextNonSpaceCharAfterStartBeforeEnd(nextNonSpaceIndex, highlightStart, fullWordRange.end)) return null;
    return (
      GetPositionIfSelectionBeforeOpenTag.get(editor, highlightStart, true) ||
      HTMLTagUtil.getPositionIfStartBeforeTagEnd(editor, highlightStart, tokensAfterChar, nextNonSpaceIndex)
    );
  }

  public static getPositionIfStartOnHTMLTagSymbol(editor: TextEditor, fullWordRange: Range): Position | null {
    return (
      HTMLTagUtil.getPositionIfStartBeforeTagSymbol(editor, fullWordRange) ||
      HTMLTagUtil.getPositionIfStartAfterTagSymbol(editor, fullWordRange.start)
    );
  }

  private static getPositionIfEndBeforeTagEnd(editor: TextEditor, highlightEnd: Position): Position | null {
    const { line, character } = highlightEnd;
    const tokensAfterChar = LineTokenTraversalUtil.getLineTokensAfterCharNumber(editor, line, character);
    const nextNonSpaceIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokensAfterChar, 0);
    if (tokensAfterChar[nextNonSpaceIndex] === '>') {
      const position = HTMLTagUtil.getPositionIfStartBeforeTagEnd(editor, highlightEnd, tokensAfterChar, nextNonSpaceIndex);
      if (position) {
        // do not include the > symbol
        position.character = position.character - 1;
        return position;
      }
    }
    return null;
  }

  public static getPositionIfEndOnHTMLTagSymbol(editor: TextEditor, highlightEnd: Position): Position | null {
    return HTMLTagUtil.getPositionIfEndBeforeTagEnd(editor, highlightEnd) || GetPositionIfSelectionBeforeOpenTag.get(editor, highlightEnd, false);
  }

  private static ifNextTokenStringQuoteIsPartOfHTMLAttribute(fullLineTokens: Tokens, equalsIndex: number, stringQuoteIndex: number): boolean {
    if (STRING_QUOTE_JSON[fullLineTokens[stringQuoteIndex] as keyof typeof STRING_QUOTE_JSON] || fullLineTokens[stringQuoteIndex] === ']') {
      return ExpandIfCursorOnPotentialConditionOperatorUtil.getEqualsExpansionUntilItEnds(fullLineTokens, equalsIndex) === 1;
    }
    return false;
  }

  public static isEqualsForHTMLAttribute(fullLineTokens: Tokens, equalsIndex: number): boolean {
    const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, equalsIndex - 1);
    const isPreviousTokenForHTMLAttribute = HTMLTagUtil.ifNextTokenStringQuoteIsPartOfHTMLAttribute(fullLineTokens, equalsIndex, previousTokenIndex);
    if (isPreviousTokenForHTMLAttribute) return true;
    const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, equalsIndex + 1);
    return HTMLTagUtil.ifNextTokenStringQuoteIsPartOfHTMLAttribute(fullLineTokens, equalsIndex, nextTokenIndex);
  }
}
