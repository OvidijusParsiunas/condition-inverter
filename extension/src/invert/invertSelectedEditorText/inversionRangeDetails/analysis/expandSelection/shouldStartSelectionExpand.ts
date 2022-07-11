import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { LineTokenTraversalUtil } from '../shared/lineTokenTraversalUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { IsTextHighlighted } from '../shared/isTextHighlighted';
import { TextEditor, Position } from 'vscode';

export class ShouldStartSelectionExpand {
  // technically a ternary operator is recognised as a condition indicator, however we do not want it to be recognised as one when the user
  // has selected the cursor on the left of itself which would stop the expansion to the condition on the left
  private static acknowledgeTernaryOperatorAsIndicator(editor: TextEditor, isConditionIndicator: boolean): boolean {
    return IsTextHighlighted.check(editor.selection) ? isConditionIndicator : false;
  }

  private static isTokenConditionIndicator(editor: TextEditor, fullLineTokens: Tokens, tokenIndex: number): boolean {
    const isConditionIndicator = ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(fullLineTokens, tokenIndex);
    if (fullLineTokens[tokenIndex] === '?') {
      return ShouldStartSelectionExpand.acknowledgeTernaryOperatorAsIndicator(editor, isConditionIndicator);
    }
    return isConditionIndicator;
  }

  // prettier-ignore
  private static isConditionIndicatorForSelect(
      editor: TextEditor, fullLineTokens: Tokens, nonSpaceIndex: number, charIndexForFullLine: number, nonSpaceTokensBeforeStart: boolean): boolean {
    const isConditionIndicator = ShouldStartSelectionExpand.isTokenConditionIndicator(editor, fullLineTokens, charIndexForFullLine)
      || fullLineTokens[nonSpaceIndex + charIndexForFullLine] === ';';
    // if start on/before condition and there are no symbol tokens on the same line before it, do not expand further
    return isConditionIndicator ? nonSpaceTokensBeforeStart : false;
  }

  private static isLeftSiblingOfOpenBracketStatementWord(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const tokensLeftOfStartChar = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, line, endChar);
    const leftSiblingOfOpenBracketIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokensLeftOfStartChar, tokensLeftOfStartChar.length - 1, false);
    // strategy here is to not invert condition if the close bracket on the right of cursor is for condition group:
    // if (hello |) will not be inverted
    if (leftSiblingOfOpenBracketIndex > -1) {
      return STATEMENT_JSON[tokensLeftOfStartChar[leftSiblingOfOpenBracketIndex] as keyof typeof STATEMENT_JSON];
    }
    if (line === 0) return false;
    return ShouldStartSelectionExpand.isLeftSiblingOfOpenBracketStatementWord(editor, line - 1);
  }

  private static isTokenBeforeCloseBracketConditionIndicator(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const tokensLeftOfStartChar = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, line, endChar);
    const openBracketIndex = TraversalUtil.getIndexOfOpenBracket(tokensLeftOfStartChar, tokensLeftOfStartChar.length, 1);
    if (openBracketIndex > -1) {
      // prettier-ignore
      return ShouldStartSelectionExpand.isLeftSiblingOfOpenBracketStatementWord(
        editor, line, LineTokenTraversalUtil.getTokenStringIndex(tokensLeftOfStartChar, openBracketIndex),
      );
    }
    if (line === 0) return false;
    return ShouldStartSelectionExpand.isTokenBeforeCloseBracketConditionIndicator(editor, line - 1);
  }

  // prettier-ignore
  private static isConditionIndicatorForHighlight(
      editor: TextEditor, line: number, character: number, fullLineTokens: Tokens, tokenIndex: number): boolean {
    // when start selection before :, can safely assume that it is for end of python if statement
    // when start selection before ;, can safely assume end of for loop conditional statement
    if (fullLineTokens[tokenIndex] === ':' || fullLineTokens[tokenIndex] === ';') return true;
    if (fullLineTokens[tokenIndex] === ')') {
      return ShouldStartSelectionExpand.isTokenBeforeCloseBracketConditionIndicator(editor, line, character);
    }
    return ShouldStartSelectionExpand.isTokenConditionIndicator(editor, fullLineTokens, tokenIndex);
  }

  // prettier-ignore
  private static isConditionIndicator(
      editor: TextEditor, line: number, character: number, fullLineTokens: Tokens,
      nonSpaceIndex: number, nonSpaceTokensBeforeStart: boolean): boolean {
    const charIndexForFullLine = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, line, character).length;
    if (IsTextHighlighted.check(editor.selection)) {
      // prettier-ignore
      return ShouldStartSelectionExpand.isConditionIndicatorForHighlight(
        editor, line, character, fullLineTokens, nonSpaceIndex + charIndexForFullLine);
    }
    // the reason why nonSpaceTokensBeforeStart needs to be passed down from the very start is because a multiline selection could start with if (dog|
    // however, isStartBeforeConditionIndicator method will traverse downwards causing startChar to be at the start of a new line, hence preventing
    // the identification of whether the selection did have non space characters before it or not at |&& cat - on the next line
    // prettier-ignore
    return ShouldStartSelectionExpand.isConditionIndicatorForSelect(
      editor, fullLineTokens, nonSpaceIndex, charIndexForFullLine, nonSpaceTokensBeforeStart);
  }

  private static isStartBeforeConditionIndicator(editor: TextEditor, line: number, nonSpaceTokensBeforeStart: boolean, startChar?: number): boolean {
    startChar ??= 0;
    const lineTokens = LineTokenTraversalUtil.getLineTokensAfterCharNumber(editor, line, startChar);
    const nonSpaceIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, 0);
    if (nonSpaceIndex > -1 && nonSpaceIndex < lineTokens.length) {
      // fullLineTokens is used to help evaluate more detailed operators like a ternary operator which needs to make sure that there are no
      // particular symbols before it as otherwise the logic would not recognise it as a ternary operator and return false.
      const fullLineTokens = LineTokenTraversalUtil.getFullLineTokens(editor, line);
      return ShouldStartSelectionExpand.isConditionIndicator(editor, line, startChar, fullLineTokens, nonSpaceIndex, nonSpaceTokensBeforeStart);
    }
    if (editor.document.lineCount - 1 < line + 1) return false;
    return ShouldStartSelectionExpand.isStartBeforeConditionIndicator(editor, line + 1, nonSpaceTokensBeforeStart);
  }

  private static areThereNonSpaceTokensBeforeStartOnSameLine(editor: TextEditor, highlightStart: Position): boolean {
    const tokensLeftOfStartChar = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, highlightStart.line, highlightStart.character);
    const leftSiblingIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokensLeftOfStartChar, tokensLeftOfStartChar.length - 1, false);
    return tokensLeftOfStartChar.length === 0 || leftSiblingIndex !== tokensLeftOfStartChar.length - 1;
  }

  public static check(editor: TextEditor, highlightStart: Position): boolean {
    const { line, character } = highlightStart;
    const nonSpaceTokensBeforeStart = ShouldStartSelectionExpand.areThereNonSpaceTokensBeforeStartOnSameLine(editor, highlightStart);
    return ShouldStartSelectionExpand.isStartBeforeConditionIndicator(editor, line, nonSpaceTokensBeforeStart, character);
  }
}
