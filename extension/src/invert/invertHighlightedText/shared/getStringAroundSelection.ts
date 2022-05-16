import { RangeCreator } from '../../shared/rangeCreator';
import { TextEditor } from 'vscode';

export class GetStringFromRange {
  public static get(editor: TextEditor, lineNum: number, startChar: number, endChar: number, delta: number): string {
    const startPosition = { line: lineNum, character: Math.max(startChar - delta, 0) };
    const endPosition = { line: lineNum, character: endChar + delta };
    return editor.document.getText(RangeCreator.create(startPosition, endPosition));
  }
}
