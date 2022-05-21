import { FindStatementFullRange } from '../shared/traversal/findStatementFullRange';
import { FindStatementStart } from '../shared/traversal/findStatementStart';
import { Inverter } from '../../../../shared/out/inverter/src/inverter';
import { Range, TextEditor } from 'vscode';

export class InvertSelectedText {
  private static getInvertedText(editor: TextEditor, statementRange: Range): string {
    const statementText = editor.document.getText(statementRange);
    return Inverter.invert(statementText);
  }

  private static getStatementRange(editor: TextEditor): Range | null {
    const lineNum = editor.selection.active.line;
    const start = FindStatementStart.find(editor, lineNum, editor.selection.active.character);
    if (!start) return start;
    return FindStatementFullRange.findFromStatementStart(editor, lineNum, start);
  }

  public static invert(editor: TextEditor): void {
    editor.edit((selectedText) => {
      const statementRange = InvertSelectedText.getStatementRange(editor);
      if (statementRange) {
        const invertedText = InvertSelectedText.getInvertedText(editor, statementRange);
        selectedText.replace(statementRange, invertedText);
      }
    });
  }
}
