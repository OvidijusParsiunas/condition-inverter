import { InvertCursorPosition } from './invertCursorPosition';
import { InvertSelection } from './invertSelection';
import * as vscode from 'vscode';

export class Invert {
  public static exec(): void {
    const activeEditor = vscode.window.activeTextEditor;
    const selection = activeEditor?.selection;

    if (selection) {
      const { start, end } = selection;
      if (start.line === end.line) {
        InvertCursorPosition.invert(activeEditor);
      } else {
        InvertSelection.invert(activeEditor, selection);
      }
    }
  }
}
