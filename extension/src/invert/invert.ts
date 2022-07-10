import { InvertSelectedEditorText } from './invertSelectedEditorText/invertEditorText';
import { ErrorHandling } from './invertSelectedEditorText/shared/functionality/errorHandling';
import { window } from 'vscode';

export class Invert {
  private static start(): void {
    const editor = window.activeTextEditor;
    if (editor) {
      InvertSelectedEditorText.invert(editor);
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
