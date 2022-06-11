import { Inverter } from 'shared/inverter/src/inverter';
import { Range, TextEditorEdit } from 'vscode';

export class InvertText {
  public static invertAndReplace(range: Range, textToInvert: string, selectedText: TextEditorEdit): void {
    const invertedText = Inverter.invert(textToInvert);
    selectedText.replace(range, invertedText);
  }
}
