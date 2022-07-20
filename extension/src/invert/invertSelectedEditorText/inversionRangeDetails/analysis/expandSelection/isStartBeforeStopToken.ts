// prettier-ignore
import {
  AnalyzeConditionOutsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/specialTokens';
import { LineTokenTraversalUtil } from '../shared/lineTokenTraversalUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { IsTextHighlighted } from '../shared/isTextHighlighted';
import { TextEditor, Position } from 'vscode';

export class IsStartBeforeStopToken {
  // prettier-ignore
  private static isConditionIndicatorForSelect(
      fullLineTokens: Tokens, nonSpaceIndex: number, charIndexForFullLine: number, isNonSymbolBeforeStart: boolean): boolean {
    const isConditionIndicator = ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(fullLineTokens, charIndexForFullLine)
      || fullLineTokens[nonSpaceIndex + charIndexForFullLine] === ';';
    // if start on/before condition and there are no symbol tokens on the same line before it, do not expand further
    return isConditionIndicator ? isNonSymbolBeforeStart : false;
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
    return IsStartBeforeStopToken.isLeftSiblingOfOpenBracketStatementWord(editor, line - 1);
  }

  private static isTokenBeforeCloseBracketConditionIndicator(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const tokensLeftOfStartChar = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, line, endChar);
    const openBracketIndex = TraversalUtil.getIndexOfOpenBracket(tokensLeftOfStartChar, tokensLeftOfStartChar.length, 1);
    if (openBracketIndex > -1) {
      // prettier-ignore
      return IsStartBeforeStopToken.isLeftSiblingOfOpenBracketStatementWord(
        editor, line, LineTokenTraversalUtil.getTokenStringIndex(tokensLeftOfStartChar, openBracketIndex),
      );
    }
    if (line === 0) return false;
    return IsStartBeforeStopToken.isTokenBeforeCloseBracketConditionIndicator(editor, line - 1);
  }

  // prettier-ignore
  private static isConditionIndicatorForHighlight(
      editor: TextEditor, line: number, character: number, fullLineTokens: Tokens, tokenIndex: number): boolean {
    // when start selection before :, can safely assume that it is for end of python if statement
    // when start selection before ;, can safely assume end of for loop conditional statement
    if (fullLineTokens[tokenIndex] === ':' || fullLineTokens[tokenIndex] === ';') return true;
    if (fullLineTokens[tokenIndex] === ')') {
      return IsStartBeforeStopToken.isTokenBeforeCloseBracketConditionIndicator(editor, line, character);
    }
    return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(fullLineTokens, tokenIndex);
  }

  // prettier-ignore
  private static isConditionIndicator(
      editor: TextEditor, line: number, character: number, fullLineTokens: Tokens,
      nonSpaceIndex: number, isNonSymbolBeforeStart: boolean): boolean {
    const charIndexForFullLine = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, line, character).length;
    if (IsTextHighlighted.check(editor.selection)) {
      // prettier-ignore
      return IsStartBeforeStopToken.isConditionIndicatorForHighlight(
        editor, line, character, fullLineTokens, nonSpaceIndex + charIndexForFullLine);
    }
    // the reason why isNonSymbolBeforeStart needs to be passed down from the very start is because a multiline selection could start with if (dog|
    // however, isStartBeforeConditionIndicator method will traverse downwards causing startChar to be at the start of a new line, hence preventing
    // the identification of whether the selection was at very start or had a space before it at |&& cat - on the next line
    return IsStartBeforeStopToken.isConditionIndicatorForSelect(fullLineTokens, nonSpaceIndex, charIndexForFullLine, isNonSymbolBeforeStart);
  }

  private static isStartBeforeConditionIndicator(editor: TextEditor, line: number, isNonSymbolBeforeStart: boolean, startChar?: number): boolean {
    startChar ??= 0;
    const lineTokens = LineTokenTraversalUtil.getLineTokensAfterCharNumber(editor, line, startChar);
    const nonSpaceIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, 0);
    if (nonSpaceIndex > -1 && nonSpaceIndex < lineTokens.length) {
      // fullLineTokens is used to help evaluate more detailed operators like a ternary operator which needs to make sure that there are no
      // particular symbols before it as otherwise the logic would not recognise it as a ternary operator and return false.
      const fullLineTokens = LineTokenTraversalUtil.getFullLineTokens(editor, line);
      return IsStartBeforeStopToken.isConditionIndicator(editor, line, startChar, fullLineTokens, nonSpaceIndex, isNonSymbolBeforeStart);
    }
    if (editor.document.lineCount - 1 < line + 1) return false;
    return IsStartBeforeStopToken.isStartBeforeConditionIndicator(editor, line + 1, isNonSymbolBeforeStart);
  }

  // no token before start or space
  private static isNonSymbolBeforeStartOnSameLine(editor: TextEditor, highlightStart: Position): boolean {
    const tokensLeftOfStartChar = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, highlightStart.line, highlightStart.character);
    const leftSiblingIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokensLeftOfStartChar, tokensLeftOfStartChar.length - 1, false);
    return tokensLeftOfStartChar.length === 0 || leftSiblingIndex !== tokensLeftOfStartChar.length - 1;
  }

  // this is used to prevent further extension of range when has already been extended over a logical operator in FullWordRange,
  // e.g: cat&&d|og  to  cat|&&dog  -  the inversion should result: cat||dog
  public static wasExtendedOverLogicalOperator(editor: TextEditor, highlightStart: Position): boolean {
    if (editor.selection.start.character !== highlightStart.character) {
      const lineTokens = LineTokenTraversalUtil.getLineTokensAfterCharNumber(editor, highlightStart.line, highlightStart.character);
      if (lineTokens[0] === '|' || lineTokens[0] === '&') {
        return AnalyzeConditionOutsideStatement.isLogicalOperatorToken(lineTokens, 0);
      }
    }
    return false;
  }

  public static check(editor: TextEditor, highlightStart: Position): boolean {
    const wasExtendedOverLogicalOperator = IsStartBeforeStopToken.wasExtendedOverLogicalOperator(editor, highlightStart);
    if (wasExtendedOverLogicalOperator) return true;
    const { line, character } = highlightStart;
    const isNonSymbolBeforeStart = IsStartBeforeStopToken.isNonSymbolBeforeStartOnSameLine(editor, highlightStart);
    return IsStartBeforeStopToken.isStartBeforeConditionIndicator(editor, line, isNonSymbolBeforeStart, character);
  }
}
