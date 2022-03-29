import { InvertViaCursorPosition } from './invertViaCursorPosition';
import { InvertSelection } from './invertSelection';
import { window } from 'vscode';

export class Invert {
  public static exec(): void {
    const editor = window.activeTextEditor;
    const selection = editor?.selection;

    if (selection) {
      const { start, end } = selection;
      if (start.line === end.line) {
        InvertViaCursorPosition.invert(editor);
      } else {
        InvertSelection.invert(editor, selection);
      }
    }
  }
}
