import { StatementTraversalCallbackUtil } from '../../../shared/functionality/statementTraversalCallbackUtil';
import { TextTraversalUtil } from '../../../shared/functionality/textTraversalUtil';
import { GetStringFromRange } from '../shared/getStringAroundSelection';
import { GetStatementIndex } from '../shared/getStatementIndex';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

export class IsCursorOnStatementWord {
  private static getCursorPositionRelativeToExtractedString(cursorNumber: number, spacesAroundSelection: number): number {
    return cursorNumber - spacesAroundSelection > -1 ? spacesAroundSelection : cursorNumber;
  }

  // prettier-ignore
  private static getCursorPosition(
      statement: string, cursorNumber: number, stringAroundSelection: string, checkIsOnLeftOfStatement: boolean): number {
    const cursorPositionRelativeToSubstring = IsCursorOnStatementWord.getCursorPositionRelativeToExtractedString(cursorNumber, statement.length);
    const { word, index } = TextTraversalUtil.getWordAtCursor(stringAroundSelection, cursorPositionRelativeToSubstring);
    // cannot reuse the result of statementIndex here as we do not tokenize its full line, hence cannot use the cursorNumber
    if (statement === word) {
      if (index === 0 && !checkIsOnLeftOfStatement) {
        return -1;
      }
      return cursorNumber - (cursorPositionRelativeToSubstring - index);
    }
    // this occurs when the cursor is on the right side of the statement e.g. if|
    return -1;
  }

  // WORK - optimize as string should not be tokenized multiple times
  private static getIndex(statement: string, editor: TextEditor, lineNum: number, cursorNumber: number, checkIsOnLeftOfStatement: boolean): number {
    const stringAroundSelection = GetStringFromRange.get(editor, lineNum, cursorNumber, cursorNumber, statement.length);
    const tokens = Tokenizer.tokenize(stringAroundSelection);
    // the reason why we need this is because a string can simply have a name with the if substring (naifme), hence to make sure
    // that an actual if statement is captured - we need to tokenize the string
    // prettier-ignore
    const statementIndex = GetStatementIndex.findViaTokensAndValidate(editor, tokens, lineNum, cursorNumber, cursorNumber, true, statement);
    if (statementIndex > -1) {
      return IsCursorOnStatementWord.getCursorPosition(statement, cursorNumber, stringAroundSelection, checkIsOnLeftOfStatement);
    }
    return -1;
  }

  // gets the index of statement if cursor on left-of or on statement
  // the reason why this is not checking right-of statement is because we always traverse to the left
  public static getIndexIfTrue(editor: TextEditor, lineNum: number, cursorNumber: number, checkIsOnLeftOfStatement = true): number {
    return StatementTraversalCallbackUtil.traverse(IsCursorOnStatementWord.getIndex, editor, lineNum, cursorNumber, checkIsOnLeftOfStatement);
  }
}
