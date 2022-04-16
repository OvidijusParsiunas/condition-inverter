import { FindIfStatementFullRange } from '../shared/traversal/findIfStatementFullRange';
import { FindIfStatementStart } from '../shared/traversal/findIfStatementStart';
import { InvertConditions } from '../../../../shared/out/invert';
import { Range, TextEditor } from 'vscode';

export class InvertSelectedText {
  private static getInvertedText(editor: TextEditor, ifStatementRange: Range): string {
    const ifStatementText = editor.document.getText(ifStatementRange);
    return InvertConditions.runInvert(ifStatementText);
  }

  private static getIfStatementRange(editor: TextEditor): Range | null {
    const lineNum = editor.selection.active.line;
    const { text } = editor.document.lineAt(lineNum);
    const start = FindIfStatementStart.find(editor, lineNum, editor.selection.active.character, text);
    if (!start) return start;
    return FindIfStatementFullRange.findFromStartPosition(editor, lineNum, start, text);
  }

  public static invert(editor: TextEditor): void {
    editor.edit((selectedText) => {
      const ifStatementRange = InvertSelectedText.getIfStatementRange(editor);
      if (ifStatementRange) {
        const invertedText = InvertSelectedText.getInvertedText(editor, ifStatementRange);
        selectedText.replace(ifStatementRange, invertedText);
      }
    });
  }
}
