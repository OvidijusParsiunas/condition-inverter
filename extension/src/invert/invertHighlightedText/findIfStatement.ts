import { Position } from '../../types/invertHighlightedText/invertHighlightedText';
import { SharedUtils } from './sharedUtils';
import { TextEditor } from 'vscode';

export class FindIfStatement {
  private static getIfStatementIndex(editor: TextEditor, line: number, startChar: number, endChar: number): number {
    const lineRange = SharedUtils.createRange({ line, character: startChar }, { line: line, character: endChar });
    const lineText = editor.document.getText(lineRange);
    return lineText.lastIndexOf('if');
  }

  private static searchFromSelectionStart(editor: TextEditor, line: number, startChar: number, end: Position): number {
    const endOfLineChar = editor.document.lineAt(line).range.end.character;
    const endChar = end.line === line ? end.character : endOfLineChar;
    return FindIfStatement.getIfStatementIndex(editor, line, startChar, endChar);
  }

  private static searchForIfStatementInLine(editor: TextEditor, line: number, start: Position, end: Position): Position | null {
    const startChar = start.line === line ? start.character : 0;
    const relativeIfStatementIndexToSelection = FindIfStatement.searchFromSelectionStart(editor, line, startChar, end);
    if (relativeIfStatementIndexToSelection > -1) {
      return { line: line, character: relativeIfStatementIndexToSelection + startChar };
    }
    return null;
  }

  public static traverseLinesUpwards(editor: TextEditor, line: number, start: Position, end: Position): Position | null {
    if (line === start.line) {
      return FindIfStatement.searchForIfStatementInLine(editor, line, start, end);
    }
    const positionResult = FindIfStatement.searchForIfStatementInLine(editor, line, start, end);
    if (positionResult) return positionResult;
    return FindIfStatement.traverseLinesUpwards(editor, line - 1, start, end);
  }
}
