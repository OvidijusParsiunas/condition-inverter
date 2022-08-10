import { InversionRangeDetailsFactory } from './inversionRangeDetails/inversionRangeDetailsFactory';
import { InvertTextWithPadding } from './invert/invertTextWithPadding/invertTextWithPadding';
import { InvertText } from './invert/invertText/invertText';
import { TextEditor } from 'vscode';

export class InvertSelectedEditorText {
  public static invert(editor: TextEditor): void {
    editor.edit((selectedText) => {
      const inversionRangeDetails = InversionRangeDetailsFactory.create(editor);
      const textToInvert = editor.document.getText(inversionRangeDetails.range);
      if (inversionRangeDetails.startOperatorPadding.length > 0 || inversionRangeDetails.endOperatorPadding.length > 0) {
        InvertTextWithPadding.invertAndReplace(editor.selection, inversionRangeDetails, textToInvert, selectedText);
      } else {
        InvertText.invertAndReplace(editor.selection, inversionRangeDetails.range, textToInvert, selectedText);
      }
    });
  }
}
