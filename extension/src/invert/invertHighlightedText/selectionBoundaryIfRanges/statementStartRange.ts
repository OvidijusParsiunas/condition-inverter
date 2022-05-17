import { FindStatementFullRange } from '../../shared/traversal/findStatementFullRange';
import { FindStatementStart } from '../../shared/traversal/findStatementStart';
import { TextEditor, Range } from 'vscode';

export class StatementStartRange {
  private static isStatementAfterBeforeSelectionStart(statementRange: Range, startLine: number, startCharacter: number): boolean {
    return statementRange.end.line >= startLine && (statementRange.end.line > startLine || statementRange.end.character > startCharacter);
  }

  public static getStartSelectionStatementFullRange(editor: TextEditor): Range | null {
    const { line: startLine, character: startCharacter } = editor.selection.start;
    const start = FindStatementStart.find(editor, startLine, editor.selection.start.character, false);
    if (!start) return null;
    const statementRange = FindStatementFullRange.findFromStatementStart(editor, startLine, start);
    if (statementRange && StatementStartRange.isStatementAfterBeforeSelectionStart(statementRange, startLine, startCharacter)) {
      return statementRange;
    }
    return null;
  }
}
