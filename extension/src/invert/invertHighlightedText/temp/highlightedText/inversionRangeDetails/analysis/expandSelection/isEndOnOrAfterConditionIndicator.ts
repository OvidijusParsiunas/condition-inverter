import { SPACE_JSON, STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';
import { RangeCreator } from '../../../../../../shared/rangeCreator';
import { TextEditor, Position } from 'vscode';

export class IsEndOnOrAfterConditionIndicator {
  private static getNonSpaceCharacterLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): Token | null {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      if (!SPACE_JSON[lineTokens[i] as string]) {
        return lineTokens[i];
      }
    }
    if (line - 1 < 0) return null;
    return IsEndOnOrAfterConditionIndicator.getNonSpaceCharacterLeftAndUpwards(editor, line - 1);
  }

  private static isAfterStatementToken(editor: TextEditor, line: number, lineTokens: Tokens): boolean {
    const siblingTokenResult = IsEndOnOrAfterConditionIndicator.getNonSpaceCharacterLeftAndUpwards(editor, line, lineTokens.join('').length);
    return STATEMENT_JSON[siblingTokenResult as keyof typeof STATEMENT_JSON];
  }

  private static isConditionIndicator(editor: TextEditor, line: number, lineTokens: Tokens): boolean {
    const isAfterStatementToken = IsEndOnOrAfterConditionIndicator.isAfterStatementToken(editor, line, lineTokens);
    if (isAfterStatementToken) return true;
    return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(lineTokens, lineTokens.length - 1, false);
  }

  private static isEndAfterConditionIndicator(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      if (!SPACE_JSON[lineTokens[i] as string]) {
        if (lineTokens[i] === '(') {
          // WORK - should not be a problem for statements with no brackets (check)
          // it is ok that this does not work for for loops for (let i = 0;| dog > cat
          return IsEndOnOrAfterConditionIndicator.isConditionIndicator(editor, line, lineTokens.slice(0, i - 1));
        }
        return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(lineTokens, i, false);
      }
    }
    if (line - 1 < 0) return false;
    return IsEndOnOrAfterConditionIndicator.isEndAfterConditionIndicator(editor, line - 1);
  }

  // WORK - what about the else word in else if
  public static check(editor: TextEditor, highlightEnd: Position): boolean {
    const charAfterEnd = editor.document.getText(
      RangeCreator.create(highlightEnd, { line: highlightEnd.line, character: highlightEnd.character + 1 }),
    );
    if (Object.keys(SPACE_JSON).indexOf(charAfterEnd) === -1 && charAfterEnd !== '') {
      const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, highlightEnd.line, highlightEnd.character);
      return IsEndOnOrAfterConditionIndicator.isConditionIndicator(editor, highlightEnd.line, lineTokens);
    }
    return IsEndOnOrAfterConditionIndicator.isEndAfterConditionIndicator(editor, highlightEnd.line, highlightEnd.character);
  }
}
