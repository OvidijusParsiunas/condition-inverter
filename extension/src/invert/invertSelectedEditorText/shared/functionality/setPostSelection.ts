import { IsTextHighlighted } from '../../inversionRangeDetails/analysis/shared/isTextHighlighted';
import { Position, Selection, TextEditor } from 'vscode';

export class SetPostInvertionSelection {
  // newCharacter cannot be before the start character for situations where you want selection |!dog = |dog
  // and not result in = | dog
  private static getCharacterinBounds(startCharacter: number, newCharacter: number): number {
    return newCharacter < startCharacter ? startCharacter : newCharacter;
  }

  private static getStartCharacter(selection: Selection, endCharacter: number): number {
    // when user has selected, the selection start and end should stick together
    const character = IsTextHighlighted.check(selection) ? selection.start.character : endCharacter;
    return SetPostInvertionSelection.getCharacterinBounds(selection.start.character, character);
  }

  private static getEndCharacter(selection: Selection, textInvert: string, invertedText: string): number {
    const lengthDiffBetweenOriginalAndInvertedText = invertedText.length - textInvert.length;
    const character = selection.end.character + lengthDiffBetweenOriginalAndInvertedText;
    return SetPostInvertionSelection.getCharacterinBounds(selection.start.character, character);
  }

  private static getNewSelection(selection: Selection, textInvert: string, invertedText: string): Selection {
    const endCharacter = SetPostInvertionSelection.getEndCharacter(selection, textInvert, invertedText);
    const startCharacter = SetPostInvertionSelection.getStartCharacter(selection, endCharacter);
    return new Selection(new Position(selection.start.line, startCharacter), new Position(selection.end.line, endCharacter));
  }

  public static set(editor: TextEditor, textInvert: string, invertedText: string): void {
    // cannot do this for multiline highlight as it is impossible to know the text length difference exclusively for the statement
    // highlighted on the end selection line
    if (editor.selection.start.line !== editor.selection.end.line) return;
    const newSelection = SetPostInvertionSelection.getNewSelection(editor.selection, textInvert, invertedText);
    // needs to be at the end of event loop as otherwise the extension command overwrites the position
    setTimeout(() => (editor.selection = newSelection));
  }
}
