import { Position } from '../../../shared/types/invertHighlightedText/invertHighlightedText';
import { StatementIndexUtil } from '../../../shared/functionality/statementIndexUtil';
import { TextEditor } from 'vscode';

export class FindStatementAtSelectionEnd {
  private static searchFromSelectionStart(editor: TextEditor, line: number, startChar: number, end: Position): number {
    const endOfLineChar = editor.document.lineAt(line).range.end.character;
    const endChar = end.line === line ? end.character : endOfLineChar;
    // WORK: needs to be expandable for elif, also tests for highlighted/selected scenarios
    return StatementIndexUtil.findViaRangeAndValidate(editor, line, startChar, endChar, false);
  }

  private static searchForStatementInLine(editor: TextEditor, line: number, start: Position, end: Position): Position | null {
    const startChar = start.line === line ? start.character : 0;
    const relativeStatementIndexToSelection = FindStatementAtSelectionEnd.searchFromSelectionStart(editor, line, startChar, end);
    if (relativeStatementIndexToSelection > -1) {
      return { line: line, character: relativeStatementIndexToSelection + startChar };
    }
    return null;
  }

  public static upwardLineTraversal(editor: TextEditor, line: number, start: Position, end: Position): Position | null {
    if (line === start.line) {
      return FindStatementAtSelectionEnd.searchForStatementInLine(editor, line, start, end);
    }
    const positionResult = FindStatementAtSelectionEnd.searchForStatementInLine(editor, line, start, end);
    if (positionResult) return positionResult;
    return FindStatementAtSelectionEnd.upwardLineTraversal(editor, line - 1, start, end);
  }
}
