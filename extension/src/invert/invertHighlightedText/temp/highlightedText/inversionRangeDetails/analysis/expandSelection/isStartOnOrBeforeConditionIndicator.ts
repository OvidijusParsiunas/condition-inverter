import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { SPACE_JSON } from 'shared/inverter/src/shared/consts/statements';
import { RangeCreator } from '../../../../../../shared/rangeCreator';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { IsTextHighlighted } from '../shared/isTextHighlighted';
import { TextEditor, Position } from 'vscode';

export class IsStartOnOrBeforeConditionIndicator {
  // technically a ternary operator is recognised as a condition indicator, however we do not want it to be recognised as one when the user
  // has selected the cursor on itself which would stop the expansion to the tokens on the left
  private static acknowledgeTernaryOperatorAsIndicator(editor: TextEditor, isConditionIndicator: boolean): boolean {
    return IsTextHighlighted.check(editor.selection) ? isConditionIndicator : false;
  }

  private static isConditionIndicator(editor: TextEditor, line: number, lineTokens: Tokens, startChar: number): boolean {
    // the following line is used to help evaluate more detailed operators like a ternary operator which needs to make sure that there is are no
    // particular symbols before it as otherwise the logic would not recognise it as a ternary operator and return false. Additionally we can trust
    // startChar to not be in the middle of a word due to prior analysis at FullWordRange
    const tokensBeforeChar = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, startChar);
    const allLineTokens = tokensBeforeChar.concat(lineTokens);
    const isConditionIndicator = ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(allLineTokens, tokensBeforeChar.length);
    if (allLineTokens[tokensBeforeChar.length] === '?') {
      return IsStartOnOrBeforeConditionIndicator.acknowledgeTernaryOperatorAsIndicator(editor, isConditionIndicator);
    }
    return isConditionIndicator;
  }

  private static isStartBeforeConditionIndicator(editor: TextEditor, line: number, startChar?: number): boolean {
    startChar ??= 0;
    const lineTokens = LineTokenTraversalUtils.getLineTokensAfterCharNumber(editor, line, startChar);
    for (let i = 0; i < lineTokens.length; i += 1) {
      if (!SPACE_JSON[lineTokens[i] as string]) {
        return IsStartOnOrBeforeConditionIndicator.isConditionIndicator(editor, line, lineTokens, startChar);
      }
    }
    if (editor.document.lineCount - 1 < line + 1) return false;
    return IsStartOnOrBeforeConditionIndicator.isStartBeforeConditionIndicator(editor, line + 1);
  }

  public static check(editor: TextEditor, highlightStart: Position): boolean {
    const { line, character } = highlightStart;
    const charBeforeStart = editor.document.getText(RangeCreator.create({ line, character: Math.max(0, character - 1) }, highlightStart));
    // if the cursor is on the right of a non-space, check if it is a condition
    // this brings an advantage to check for a case where the start cursor is at the end of
    // a line and the condition indicator is at the start of the next
    if (Object.keys(SPACE_JSON).indexOf(charBeforeStart) === -1 && charBeforeStart !== '') {
      const lineTokens = LineTokenTraversalUtils.getLineTokensAfterCharNumber(editor, line, character);
      return IsStartOnOrBeforeConditionIndicator.isConditionIndicator(editor, line, lineTokens, character);
    }
    return IsStartOnOrBeforeConditionIndicator.isStartBeforeConditionIndicator(editor, line, character);
  }
}
