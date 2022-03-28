import { InvertViaCursorPosition } from './invertViaCursorPosition';
import { InvertSelection } from './invertSelection';
import * as vscode from 'vscode';

export class Invert {
  public static exec(): void {
    const activeEditor = vscode.window.activeTextEditor;
    const selection = activeEditor?.selection;

    if (selection) {
      const { start, end } = selection;
      if (start.line === end.line) {
        InvertViaCursorPosition.invert(activeEditor);
      } else {
        InvertSelection.invert(activeEditor, selection);
      }
    }
  }
}
