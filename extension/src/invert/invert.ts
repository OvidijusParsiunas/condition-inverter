import { InvertHighlightedText } from './invertHighlightedText';
import { InvertSelectedText } from './invertSelectedText';
import { window } from 'vscode';

export class Invert {
  public static exec(): void {
    const editor = window.activeTextEditor;
    const selection = editor?.selection;

    if (selection) {
      const { start, end } = selection;
      if (start.line === end.line && start.character === end.character) {
        InvertSelectedText.invert(editor);
      } else {
        InvertHighlightedText.invert(editor);
      }
    }
  }
}
