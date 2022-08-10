import { SetPostInvertionSelection } from '../../shared/functionality/setPostSelection';
import { Range, Selection, TextEditorEdit } from 'vscode';
import { Inverter } from 'shared/inverter/src/inverter';

export class InvertText {
  public static invertAndReplace(selection: Selection, range: Range, textToInvert: string, selectedText: TextEditorEdit): void {
    const invertedText = Inverter.invert(textToInvert);
    selectedText.replace(range, invertedText);
    SetPostInvertionSelection.set(selection, textToInvert, invertedText);
  }
}
