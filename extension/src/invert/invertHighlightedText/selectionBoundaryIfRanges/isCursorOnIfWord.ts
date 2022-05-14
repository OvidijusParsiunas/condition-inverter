import { GetIfStatementPositionAtEdge } from '../shared/getIfStatementPositionAtEdge';
import { TextTraversalUtil } from '../../../shared/functionality/textTraversalUtil';
import { GetStringFromRange } from '../shared/getStringAroundSelection';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

export class IsCursorOnIfWord {
  private static getCursorPositionRelativeToExtractedString(cursorNumber: number, spacesAroundSelection: number): number {
    return cursorNumber - spacesAroundSelection > -1 ? spacesAroundSelection : cursorNumber;
  }

  // prettier-ignore
  private static getCursorPositionIfOnString(
      target: string, cursorNumber: number, stringAroundSelection: string, checkIsOnLeftOfIf: boolean): number {
    const cursorPositionRelativeToSubstring = IsCursorOnIfWord.getCursorPositionRelativeToExtractedString(cursorNumber, target.length);
    const { word, index } = TextTraversalUtil.getWordAtCursor(stringAroundSelection, cursorPositionRelativeToSubstring);
    if (target === word) {
      if (index === 0 && !checkIsOnLeftOfIf) {
        return -1;
      }
      return cursorNumber - (cursorPositionRelativeToSubstring - index);
    }
    return -1;
  }

  // WORK - optimize as string should not be tokenized multiple times
  // the reason why this is not checking rightOfIfStatement is because all use cases would be traversing to left anyway
  public static getIndexIfTrue(target: string, editor: TextEditor, lineNum: number, cursorNumber: number, checkIsOnLeftOfIf = true): number {
    const spacesAroundSelection = target.length;
    const stringAroundSelection = GetStringFromRange.get(editor, lineNum, cursorNumber, cursorNumber, spacesAroundSelection);
    const tokens = Tokenizer.tokenize(stringAroundSelection);
    // the reason why we need this is because a string can simply have a name with the if substring (naifme), hence to make sure
    // that an actual if statement is captured - we need to tokenizer the string
    // prettier-ignore
    const ifStatementIndex = GetIfStatementPositionAtEdge.validateAndGetTokenIndex(
      target, editor, tokens, lineNum, cursorNumber, cursorNumber, true, target.length);
    if (ifStatementIndex > -1) {
      return IsCursorOnIfWord.getCursorPositionIfOnString(target, cursorNumber, stringAroundSelection, checkIsOnLeftOfIf);
    }
    return -1;
  }
}
