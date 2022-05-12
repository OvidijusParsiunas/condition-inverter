import { InvertHighlightedText } from './invertHighlightedText/invertHighlightedText';
import { InvertSelectedText } from './invertSelectedText/invertSelectedText';
import { ErrorHandling } from './shared/errorHandling';
import { window } from 'vscode';

export class Invert {
  private static start(): void {
    const editor = window.activeTextEditor;
    if (editor) {
      const { start, end } = editor.selection;
      if (start.line === end.line && start.character === end.character) {
        InvertSelectedText.invert(editor);
      } else {
        InvertHighlightedText.invert(editor);
      }
    }
  }

  public static execute(): void {
    try {
      Invert.start();
    } catch (error) {
      ErrorHandling.printErrorMessageOnConsole(error as Error);
    }
  }
}
