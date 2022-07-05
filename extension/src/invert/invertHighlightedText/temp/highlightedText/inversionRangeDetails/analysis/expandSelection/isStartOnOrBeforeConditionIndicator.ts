import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { IsTextHighlighted } from '../shared/isTextHighlighted';
import { TextEditor, Position } from 'vscode';

export class IsStartOnOrBeforeConditionIndicator {
  // technically a ternary operator is recognised as a condition indicator, however we do not want it to be recognised as one when the user
  // has selected the cursor on the left of itself which would stop the expansion to the condition on the left
  private static acknowledgeTernaryOperatorAsIndicator(editor: TextEditor, isConditionIndicator: boolean): boolean {
    return IsTextHighlighted.check(editor.selection) ? isConditionIndicator : false;
  }

  private static isTokenConditionIndicator(editor: TextEditor, line: number, lineTokens: Tokens, startChar: number): boolean {
    // the following line is used to help evaluate more detailed operators like a ternary operator which needs to make sure that there is are no
    // particular symbols before it as otherwise the logic would not recognise it as a ternary operator and return false. Additionally we can trust
    // startChar to not be in the middle of a word due to prior analysis at FullWordRange
    const tokensBeforeChar = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, startChar);
    const allLineTokens = tokensBeforeChar.concat(lineTokens);
    // tokensBeforeChar.length is used to get the token at startChar
    const isConditionIndicator = ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(allLineTokens, tokensBeforeChar.length);
    if (allLineTokens[tokensBeforeChar.length] === '?') {
      return IsStartOnOrBeforeConditionIndicator.acknowledgeTernaryOperatorAsIndicator(editor, isConditionIndicator);
    }
    return isConditionIndicator;
  }

  private static isLeftSiblingOfOpenBracketStatementWord(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const tokensLeftOfStartChar = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    const leftSiblingOfOpenBracketIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokensLeftOfStartChar, tokensLeftOfStartChar.length - 1, false);
    // strategy here is to not invert condition if the close bracket on the right of cursor is for condition group:
    // if (hello |) will not be inverted
    if (leftSiblingOfOpenBracketIndex > -1) {
      return STATEMENT_JSON[tokensLeftOfStartChar[leftSiblingOfOpenBracketIndex] as keyof typeof STATEMENT_JSON];
    }
    if (line === 0) return false;
    return IsStartOnOrBeforeConditionIndicator.isLeftSiblingOfOpenBracketStatementWord(editor, line - 1);
  }

  private static isTokenBeforeCloseBracketConditionIndicator(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const tokensLeftOfStartChar = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    const openBracketIndex = TraversalUtil.getIndexOfOpenBracket(tokensLeftOfStartChar, tokensLeftOfStartChar.length, 1);
    if (openBracketIndex > -1) {
      // prettier-ignore
      return IsStartOnOrBeforeConditionIndicator.isLeftSiblingOfOpenBracketStatementWord(
        editor, line, LineTokenTraversalUtils.getTokenStringIndex(tokensLeftOfStartChar, openBracketIndex),
      );
    }
    if (line === 0) return false;
    return IsStartOnOrBeforeConditionIndicator.isTokenBeforeCloseBracketConditionIndicator(editor, line - 1);
  }

  // prettier-ignore
  private static isConditionIndicator(
      editor: TextEditor, line: number, character: number, lineTokens: Tokens, nonSpaceTokensBeforeStart: boolean, nonSpaceIndex: number): boolean {
    // when start selection before :, can safely assume that it is for end of python if statement and do not need to check if there is a character
    // before it using nonSpaceTokensBeforeStart as the app is not inverting when the end is after statement start; if |dog  =  if |dog
    // e.g. if dog|:  =  if dog|: or if dog |:  =  if dog |:
    if (lineTokens[nonSpaceIndex] === ':') return true;
    if (lineTokens[nonSpaceIndex] === ')' && IsTextHighlighted.check(editor.selection)) {
      return IsStartOnOrBeforeConditionIndicator.isTokenBeforeCloseBracketConditionIndicator(editor, line, character);
    }
    const isConditionIndicator = IsStartOnOrBeforeConditionIndicator.isTokenConditionIndicator(editor, line, lineTokens, character);
    // if start on/before condition and there are no symbol tokens on the same line before it, do not expand further
    return isConditionIndicator ? nonSpaceTokensBeforeStart : false;
  }

  private static isStartBeforeConditionIndicator(editor: TextEditor, line: number, nonSpaceTokensBeforeStart: boolean, startChar?: number): boolean {
    startChar ??= 0;
    const lineTokens = LineTokenTraversalUtils.getLineTokensAfterCharNumber(editor, line, startChar);
    const nonSpaceIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, 0);
    if (nonSpaceIndex > -1 && nonSpaceIndex < lineTokens.length) {
      return IsStartOnOrBeforeConditionIndicator.isConditionIndicator(editor, line, startChar, lineTokens, nonSpaceTokensBeforeStart, nonSpaceIndex);
    }
    if (editor.document.lineCount - 1 < line + 1) return false;
    return IsStartOnOrBeforeConditionIndicator.isStartBeforeConditionIndicator(editor, line + 1, nonSpaceTokensBeforeStart);
  }

  private static areThereNonSpaceTokensBeforeStartOnSameLine(editor: TextEditor, highlightStart: Position): boolean {
    const tokensLeftOfStartChar = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, highlightStart.line, highlightStart.character);
    const leftSiblingIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokensLeftOfStartChar, tokensLeftOfStartChar.length - 1, false);
    return tokensLeftOfStartChar.length === 0 || leftSiblingIndex !== tokensLeftOfStartChar.length - 1;
  }

  public static check(editor: TextEditor, highlightStart: Position): boolean {
    const { line, character } = highlightStart;
    const nonSpaceTokensBeforeStart = IsStartOnOrBeforeConditionIndicator.areThereNonSpaceTokensBeforeStartOnSameLine(editor, highlightStart);
    return IsStartOnOrBeforeConditionIndicator.isStartBeforeConditionIndicator(editor, line, nonSpaceTokensBeforeStart, character);
  }
}
