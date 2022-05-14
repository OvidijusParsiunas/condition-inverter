import { TextTraversalUtil } from '../../../shared/functionality/textTraversalUtil';
import { GetStatementPositionAtEdge } from '../shared/getStatementPositionAtEdge';
import { GetStringFromRange } from '../shared/getStringAroundSelection';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

export class IsCursorOnIfWord {
  private static getCursorPositionRelativeToExtractedString(cursorNumber: number, spacesAroundSelection: number): number {
    return cursorNumber - spacesAroundSelection > -1 ? spacesAroundSelection : cursorNumber;
  }

  // prettier-ignore
  private static getCursorPositionIfOnString(
      statement: string, cursorNumber: number, stringAroundSelection: string, checkIsOnLeftOfIf: boolean): number {
    const cursorPositionRelativeToSubstring = IsCursorOnIfWord.getCursorPositionRelativeToExtractedString(cursorNumber, statement.length);
    const { word, index } = TextTraversalUtil.getWordAtCursor(stringAroundSelection, cursorPositionRelativeToSubstring);
    if (statement === word) {
      if (index === 0 && !checkIsOnLeftOfIf) {
        return -1;
      }
      return cursorNumber - (cursorPositionRelativeToSubstring - index);
    }
    return -1;
  }

  // WORK - optimize as string should not be tokenized multiple times
  // the reason why this is not checking rightOfStatement is because all use cases would be traversing to left anyway
  public static getIndexIfTrue(statement: string, editor: TextEditor, lineNum: number, cursorNumber: number, checkIsOnLeftOfIf = true): number {
    const stringAroundSelection = GetStringFromRange.get(editor, lineNum, cursorNumber, cursorNumber, statement.length);
    const tokens = Tokenizer.tokenize(stringAroundSelection);
    // the reason why we need this is because a string can simply have a name with the if substring (naifme), hence to make sure
    // that an actual if statement is captured - we need to tokenizer the string
    // prettier-ignore
    const statementIndex = GetStatementPositionAtEdge.validateAndGetTokenIndex(
      statement, editor, tokens, lineNum, cursorNumber, cursorNumber, true, statement.length);
    if (statementIndex > -1) {
      return IsCursorOnIfWord.getCursorPositionIfOnString(statement, cursorNumber, stringAroundSelection, checkIsOnLeftOfIf);
    }
    return -1;
  }
}
