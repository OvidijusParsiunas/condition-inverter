import { SPACE_JSON, STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';
import { RangeCreator } from '../../../../../../shared/rangeCreator';
import { IsTextHighlighted } from '../shared/isTextHighlighted';
import { TextEditor, Position, Selection } from 'vscode';

export class IsEndOnOrAfterConditionIndicator {
  private static getNonSpaceCharacterLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): Token | null {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    const nonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, lineTokens.length - 1, false);
    if (nonSpaceTokenIndex > -1) {
      return lineTokens[nonSpaceTokenIndex];
    }
    if (line - 1 < 0) return null;
    return IsEndOnOrAfterConditionIndicator.getNonSpaceCharacterLeftAndUpwards(editor, line - 1);
  }

  private static isAfterStatementToken(editor: TextEditor, line: number, lineTokens: Tokens): boolean {
    const siblingTokenResult = IsEndOnOrAfterConditionIndicator.getNonSpaceCharacterLeftAndUpwards(editor, line, lineTokens.join('').length);
    return STATEMENT_JSON[siblingTokenResult as keyof typeof STATEMENT_JSON];
  }

  private static isTokensEndConditionIndicator(editor: TextEditor, line: number, lineTokens: Tokens): boolean {
    const isAfterStatementToken = IsEndOnOrAfterConditionIndicator.isAfterStatementToken(editor, line, lineTokens);
    if (isAfterStatementToken) return true;
    return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(lineTokens, lineTokens.length - 1, false);
  }

  private static considerOpenBracketConditionIndicator(token: Token, selection: Selection): boolean {
    return token === '(' && IsTextHighlighted.check(selection);
  }

  private static isEndAfterConditionIndicator(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    const nonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, lineTokens.length - 1, false);
    if (nonSpaceTokenIndex > -1) {
      // cursor selected after open bracket - traverse further
      if (IsEndOnOrAfterConditionIndicator.considerOpenBracketConditionIndicator(lineTokens[nonSpaceTokenIndex], editor.selection)) {
        // WORK - should not be a problem for statements with no brackets (check)
        // it is ok that this does not work for for loops for (let i = 0;| dog > cat
        return IsEndOnOrAfterConditionIndicator.isTokensEndConditionIndicator(editor, line, lineTokens.slice(0, nonSpaceTokenIndex - 1));
      }
      return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(lineTokens, nonSpaceTokenIndex, false);
    }
    if (line - 1 < 0) return false;
    return IsEndOnOrAfterConditionIndicator.isEndAfterConditionIndicator(editor, line - 1);
  }

  // cannot simply use nonSpaceTokensAfterEnd like nonSpaceTokensBeforeStart in isStartOnOrBEforeConditionIndicator as we do not want to invert
  // conditions like if |(dog) into if |(!dog), hence the logic here takes care of it simply here
  private static isImmediateTokenConditionIndicator(editor: TextEditor, highlightEnd: Position): boolean {
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, highlightEnd.line, highlightEnd.character);
    const siblingLeftTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, lineTokens.length - 1, false);
    const analysisTokens = IsEndOnOrAfterConditionIndicator.considerOpenBracketConditionIndicator(lineTokens[siblingLeftTokenIndex], editor.selection)
      ? lineTokens.slice(0, siblingLeftTokenIndex)
      : lineTokens;
    const isIndicator = IsEndOnOrAfterConditionIndicator.isTokensEndConditionIndicator(editor, highlightEnd.line, analysisTokens);
    const isHighlighted = IsTextHighlighted.check(editor.selection);
    // do not want to stop expansion when cursor selection is after a statement e.g. if |dog
    return isIndicator ? isHighlighted : false;
  }

  // WORK - what about the else word in else if
  public static check(editor: TextEditor, highlightEnd: Position): boolean {
    const charAfterEnd = editor.document.getText(
      RangeCreator.create(highlightEnd, { line: highlightEnd.line, character: highlightEnd.character + 1 }),
    );
    if (Object.keys(SPACE_JSON).indexOf(charAfterEnd) === -1 && charAfterEnd !== '') {
      return IsEndOnOrAfterConditionIndicator.isImmediateTokenConditionIndicator(editor, highlightEnd);
    }
    return IsEndOnOrAfterConditionIndicator.isEndAfterConditionIndicator(editor, highlightEnd.line, highlightEnd.character);
  }
}
