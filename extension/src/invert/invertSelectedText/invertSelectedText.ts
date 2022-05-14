import { FindStatementFullRange } from '../shared/traversal/findStatementFullRange';
import { IfInverter } from '../../../../shared/out/inverter/src/ifInverter';
import { FindStatementStart } from '../shared/traversal/findStatementStart';
import { Range, TextEditor } from 'vscode';

export class InvertSelectedText {
  private static getInvertedText(editor: TextEditor, statementRange: Range): string {
    const statementText = editor.document.getText(statementRange);
    return IfInverter.invert(statementText);
  }

  private static getStatementRange(editor: TextEditor): Range | null {
    const lineNum = editor.selection.active.line;
    const { text } = editor.document.lineAt(lineNum);
    const start = FindStatementStart.find(editor, lineNum, editor.selection.active.character, text);
    if (!start) return start;
    return FindStatementFullRange.findFromStartPosition(editor, lineNum, start, text);
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
