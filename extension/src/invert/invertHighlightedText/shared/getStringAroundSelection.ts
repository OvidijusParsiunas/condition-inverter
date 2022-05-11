import { RangeCreator } from '../../shared/rangeCreator';
import { TextEditor } from 'vscode';

export class GetStringFromRange {
  public static get(editor: TextEditor, lineNum: number, startChar: number, endChar: number, delta: number): string {
    return editor.document.getText(
      RangeCreator.create({ line: lineNum, character: Math.max(startChar - delta, 0) }, { line: lineNum, character: endChar + delta }),
    );
  }
}
