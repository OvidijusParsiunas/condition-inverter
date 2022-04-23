import { FindIfStatementFullRange } from '../../shared/functionality/traversal/findIfStatementFullRange';
import { FindIfStatementStart } from '../../shared/functionality/traversal/findIfStatementStart';
import { TextEditor, Range } from 'vscode';

export class SelectionStartIfRange {
  private static doesIfStatementAfterBeforeSelectionStart(ifStatementRange: Range, startLine: number, startCharacter: number): boolean {
    return ifStatementRange.end.line >= startLine && (ifStatementRange.end.line > startLine || ifStatementRange.end.character > startCharacter);
  }

  public static getStartSelectionIfStatementFullRange(editor: TextEditor): Range | null {
    const { line: startLine, character: startCharacter } = editor.selection.start;
    const { text } = editor.document.lineAt(startLine);
    const start = FindIfStatementStart.find(editor, startLine, editor.selection.start.character, '', false);
    if (!start) return null;
    const ifStatementRange = FindIfStatementFullRange.findFromStartPosition(editor, startLine, start, text);
    if (ifStatementRange && SelectionStartIfRange.doesIfStatementAfterBeforeSelectionStart(ifStatementRange, startLine, startCharacter)) {
      return ifStatementRange;
    }
    return null;
  }
}
