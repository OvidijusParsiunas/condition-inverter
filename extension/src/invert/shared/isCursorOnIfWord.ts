import { RangeCreator } from './rangeCreator';
import { TextEditor } from 'vscode';

export class IsCursorOnIfWord {
  private static isCursorOnTheLeftOfIfStatement(stringAroundStatement: string): boolean {
    return stringAroundStatement.substring(1, 3) === 'if';
  }

  // this will return true if the actual cursor is at start of line (which is perfectly ok)
  private static isCursorInMiddleOfIfStatementWord(stringAroundStatement: string): boolean {
    return stringAroundStatement.substring(0, 2) === 'if';
  }

  public static getStartIndexIfTrue(editor: TextEditor, lineNum: number, cursorNumber: number, checkIsOnLeftOfIf = true): number {
    const oneIndexBehindCursor = Math.max(cursorNumber - 1, 0);
    const twoIndexAheadCursor = cursorNumber + 2;
    const stringAroundStatement = editor.document.getText(
      RangeCreator.create({ line: lineNum, character: oneIndexBehindCursor }, { line: lineNum, character: twoIndexAheadCursor }),
    );
    if (IsCursorOnIfWord.isCursorInMiddleOfIfStatementWord(stringAroundStatement)) {
      return oneIndexBehindCursor;
    } else if (checkIsOnLeftOfIf && IsCursorOnIfWord.isCursorOnTheLeftOfIfStatement(stringAroundStatement)) {
      return cursorNumber;
    }
    return -1;
  }
}
