import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { ExpandIfCursorOnPotentialConditionOperatorUtil } from '../fullWordRange/util/selectionExpansionUtil';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { STRING_QUOTE_JSON } from 'shared/inverter/src/shared/consts/specialTokens';
import { LineTokenTraversalUtil } from './lineTokenTraversalUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Position } from '../../../shared/types/position';
import { TextEditor } from 'vscode';

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
    const previousNonSpaceIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokensBeforeChar, tokensBeforeChar.length - 1);
    return HTMLTagUtil.getPositionIfStartAfterTagStart(editor, line, tokensBeforeChar, previousNonSpaceIndex);
  }

  // prettier-ignore
  private static getPositionIfStartBeforeTagEnd(
      editor: TextEditor, highlightStart: Position, tokensAfterChar: Tokens, nextNonSpaceIndex: number): Position | null {
    if (tokensAfterChar[nextNonSpaceIndex] === '>') {
      // prettier-ignore
      const tokensBeforeWthGreaterThan = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(
        editor, highlightStart.line, highlightStart.character + LineTokenTraversalUtil.getTokenStringIndex(tokensAfterChar, nextNonSpaceIndex) + 1);
      if (AnalyzeHTMLTag.isTagEndSymbol(tokensBeforeWthGreaterThan, tokensBeforeWthGreaterThan.length - 1)) {
        // do not include >
        return {
          line: highlightStart.line,
          character: highlightStart.character + LineTokenTraversalUtil.getTokenStringIndex(tokensAfterChar, nextNonSpaceIndex) + 1,
        };
      }
    }
    return null;
  }

  private static getPositionIfStartBeforeTagStart(highlightStart: Position, tokensAfterChar: Tokens, nextNonSpaceIndex: number): Position | null {
    if (
      tokensAfterChar[nextNonSpaceIndex] === '<' &&
      tokensAfterChar[nextNonSpaceIndex + 1] !== '/' &&
      AnalyzeHTMLTag.isTagStartSymbol(tokensAfterChar, nextNonSpaceIndex)
    ) {
      // do not include < if open tag but do if close tag
      return {
        line: highlightStart.line,
        character: highlightStart.character + LineTokenTraversalUtil.getTokenStringIndex(tokensAfterChar, nextNonSpaceIndex) + 1,
      };
    }
    return null;
  }

  private static getPositionIfStartBeforeTagSymbol(editor: TextEditor, highlightStart: Position): Position | null {
    const { line, character } = highlightStart;
    const tokensAfterChar = LineTokenTraversalUtil.getLineTokensAfterCharNumber(editor, line, character);
    const nextNonSpaceIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokensAfterChar, 0);
    return (
      HTMLTagUtil.getPositionIfStartBeforeTagStart(highlightStart, tokensAfterChar, nextNonSpaceIndex) ||
      HTMLTagUtil.getPositionIfStartBeforeTagEnd(editor, highlightStart, tokensAfterChar, nextNonSpaceIndex)
    );
  }

  public static getPositionIfOnHTMLTagSymbol(editor: TextEditor, highlightStart: Position): Position | null {
    return (
      HTMLTagUtil.getPositionIfStartBeforeTagSymbol(editor, highlightStart) || HTMLTagUtil.getPositionIfStartAfterTagSymbol(editor, highlightStart)
    );
  }

  public static isEqualsForHTMLAttribute(fullLineTokens: Tokens, equalsIndex: number): boolean {
    const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, equalsIndex - 1);
    if (STRING_QUOTE_JSON[fullLineTokens[previousTokenIndex] as keyof typeof STRING_QUOTE_JSON] || fullLineTokens[previousTokenIndex] === ']') {
      return ExpandIfCursorOnPotentialConditionOperatorUtil.getEqualsExpansionUntilItEnds(fullLineTokens, equalsIndex) === 1;
    }
    return false;
  }
}