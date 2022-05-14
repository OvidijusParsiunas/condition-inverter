import { FindStatementFullRange } from '../../shared/traversal/findStatementFullRange';
import { FindStatementStart } from '../../shared/traversal/findStatementStart';
import { TextEditor, Range } from 'vscode';

export class SelectionStartIfRange {
  private static doesStatementAfterBeforeSelectionStart(statementRange: Range, startLine: number, startCharacter: number): boolean {
    return statementRange.end.line >= startLine && (statementRange.end.line > startLine || statementRange.end.character > startCharacter);
  }

  public static getStartSelectionStatementFullRange(editor: TextEditor): Range | null {
    const { line: startLine, character: startCharacter } = editor.selection.start;
    const { text } = editor.document.lineAt(startLine);
    const start = FindStatementStart.find(editor, startLine, editor.selection.start.character, '', false);
    if (!start) return null;
    const statementRange = FindStatementFullRange.findFromStartPosition(editor, startLine, start, text);
    if (statementRange && SelectionStartIfRange.doesStatementAfterBeforeSelectionStart(statementRange, startLine, startCharacter)) {
      return statementRange;
    }
    return null;
  }
}
