import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/specialTokens';
import { LineTokenTraversalUtil } from '../shared/lineTokenTraversalUtil';
import { CurlyBracketSyntaxUtil } from '../shared/curlyBracketSyntaxUtil';
import { CharacterAnalysisUtil } from '../shared/characterAnalysisUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { IsTextHighlighted } from '../shared/isTextHighlighted';
import { TextEditor, Position, Selection } from 'vscode';

export class IsEndAfterStopToken {
  private static isStopToken(lineTokens: Tokens, nonSpaceTokenIndex: number): boolean {
    return (
      ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(lineTokens, nonSpaceTokenIndex, false) ||
      lineTokens[nonSpaceTokenIndex] === ';' ||
      // stop when colon for properties but do not stop when colon for golang short-declare
      (lineTokens[nonSpaceTokenIndex] === ':' && lineTokens[nonSpaceTokenIndex + 1] !== '=') ||
      CurlyBracketSyntaxUtil.isScopeOpenToken(lineTokens, nonSpaceTokenIndex)
    );
  }

  private static isPreviousCharAndUpwardsCondition(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, line, endChar);
    const fullLineTokens = LineTokenTraversalUtil.getFullLineTokens(editor, line);
    const nonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, lineTokens.length - 1, false);
    if (nonSpaceTokenIndex > -1) {
      return IsTextHighlighted.check(editor.selection)
        ? IsEndAfterStopToken.isStopToken(fullLineTokens, nonSpaceTokenIndex)
        : STATEMENT_JSON[fullLineTokens[nonSpaceTokenIndex] as keyof typeof STATEMENT_JSON];
    }
    if (line - 1 < 0) return false;
    return IsEndAfterStopToken.isPreviousCharAndUpwardsCondition(editor, line - 1);
  }

  private static isTokensEndConditionIndicator(editor: TextEditor, line: number, lineTokens: Tokens): boolean {
    // if |(  or  && |dog
    const isNextNonSpaceTokenCondition = IsEndAfterStopToken.isPreviousCharAndUpwardsCondition(editor, line, lineTokens.join('').length);
    if (isNextNonSpaceTokenCondition) return true;
    return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(lineTokens, lineTokens.length - 1, false);
  }

  private static considerOpenBracketConditionIndicator(fullLineTokens: Tokens, nonSpaceTokenIndex: number, selection: Selection): boolean {
    return (
      fullLineTokens[nonSpaceTokenIndex] === '(' &&
      (IsTextHighlighted.check(selection) ||
        TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, nonSpaceTokenIndex + 1) === fullLineTokens.length)
    );
  }

  private static isEndAfterConditionIndicator(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, line, endChar);
    const nonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, lineTokens.length - 1, false);
    if (nonSpaceTokenIndex > -1) {
      const fullLineTokens = LineTokenTraversalUtil.getFullLineTokens(editor, line);
      if (IsEndAfterStopToken.considerOpenBracketConditionIndicator(fullLineTokens, nonSpaceTokenIndex, editor.selection)) {
        return IsEndAfterStopToken.isTokensEndConditionIndicator(editor, line, lineTokens.slice(0, nonSpaceTokenIndex - 1));
      }
      return IsEndAfterStopToken.isStopToken(fullLineTokens, nonSpaceTokenIndex);
    }
    if (line - 1 < 0) return false;
    return IsEndAfterStopToken.isEndAfterConditionIndicator(editor, line - 1);
  }

  // prettier-ignore
  private static isLeftTokenOnSameLineConditionIndicator(
      editor: TextEditor, highlightEnd: Position, lineTokens: Tokens, fullLineTokens: Tokens, siblingLeftTokenIndex: number): boolean {
    const analysisTokens = IsEndAfterStopToken.considerOpenBracketConditionIndicator(fullLineTokens, siblingLeftTokenIndex, editor.selection)
      ? lineTokens.slice(0, siblingLeftTokenIndex) : lineTokens;
    const isIndicator = IsEndAfterStopToken.isTokensEndConditionIndicator(editor, highlightEnd.line, analysisTokens);
    if (IsTextHighlighted.check(editor.selection)) {
      return isIndicator;
    }
    // when selection cursor is beside an open bracket after a statment - do not invert, otherwise invert
    // if |(dog)  =  if |(dog)
    // if |dog  =  if |!dog
    const nextSiblingIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, siblingLeftTokenIndex + 1);
    return isIndicator && fullLineTokens[nextSiblingIndex] === '(';
  }

  // cannot simply use nonSpaceTokensAfterEnd like nonSpaceTokensBeforeStart in isStartOnOrBEforeConditionIndicator as we do not want to invert
  // conditions like if |(dog) into if |(!dog), hence the logic here takes care of it simply here
  private static isImmediateTokenConditionIndicator(editor: TextEditor, highlightEnd: Position): boolean {
    const lineTokens = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, highlightEnd.line, highlightEnd.character);
    const siblingLeftTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, lineTokens.length - 1, false);
    const fullLineTokens = LineTokenTraversalUtil.getFullLineTokens(editor, highlightEnd.line);
    if (siblingLeftTokenIndex === -1 && IsTextHighlighted.check(editor.selection)) {
      // when text is highlighted and there are no non space characters before end of selection, traverse upwards to check if the above line
      // ends with a '(' symbol and if it does, do not proceed to invert text after the end selection
      const leftNonSpaceToken = LineTokenTraversalUtil.getPreviousTokenOnSameLineOrAbove(editor, highlightEnd.line, 0);
      if (leftNonSpaceToken?.token === '(') return true;
    }
    return IsEndAfterStopToken.isLeftTokenOnSameLineConditionIndicator(editor, highlightEnd, lineTokens, fullLineTokens, siblingLeftTokenIndex);
  }

  // this is used to prevent further extension of range when has already been extended over a logical operator in FullWordRange,
  // e.g: cat|&&dog  to  cat&&|dog  -  the inversion should result: cat||dog
  public static wasExtendedOverLogicalOperator(editor: TextEditor, highlightEnd: Position): boolean {
    if (editor.selection.end.character !== highlightEnd.character) {
      const lineTokens = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, highlightEnd.line, highlightEnd.character);
      if (lineTokens[lineTokens.length - 1] === '|' || lineTokens[lineTokens.length - 1] === '&') {
        return ConditionIndicatorValidator.isLogicalOperator(lineTokens, lineTokens.length - 1, false);
      }
    }
    return false;
  }

  public static check(editor: TextEditor, highlightEnd: Position): boolean {
    const wasExtendedOverLogicalOperator = IsEndAfterStopToken.wasExtendedOverLogicalOperator(editor, highlightEnd);
    if (wasExtendedOverLogicalOperator) return true;
    if (CharacterAnalysisUtil.isNextSelectionCharacterAnotherChar(editor, highlightEnd)) {
      return IsEndAfterStopToken.isImmediateTokenConditionIndicator(editor, highlightEnd);
    }
    return IsEndAfterStopToken.isEndAfterConditionIndicator(editor, highlightEnd.line, highlightEnd.character);
  }
}
