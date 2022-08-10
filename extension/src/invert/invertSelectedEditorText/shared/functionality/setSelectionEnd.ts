import { Position, Selection, TextEditor } from 'vscode';

export class SetSelectionEnd {
  private static getEndCharacterPosition(editor: TextEditor, textInvert: string, invertedText: string): number {
    const lengthDiffBetweenOriginalAndInvertedText = invertedText.length - textInvert.length;
    return editor.selection.end.character + lengthDiffBetweenOriginalAndInvertedText;
  }

  public static set(editor: TextEditor, textInvert: string, invertedText: string): void {
    // cannot do this for multiline highlight as it is impossible to know the text length difference exclusively for the statement
    // highlighted on the end selection line
    if (editor.selection.start.line !== editor.selection.end.line) return;
    const newCharacterPosition = SetSelectionEnd.getEndCharacterPosition(editor, textInvert, invertedText);
    // needs to be at the end of event loop as otherwise the extension command overwrites the position
    setTimeout(() => {
      editor.selection = new Selection(editor.selection.start, new Position(editor.selection.end.line, newCharacterPosition));
    });
  }
}
