import { InversionRangeDetailsFactory } from './inversionRangeDetails/inversionRangeDetailsFactory';
import { InvertTextWithPadding } from './invert/invertTextWithPadding/invertTextWithPadding';
import { InvertText } from './invert/invertText';
import { TextEditor } from 'vscode';

// WORK - rename
export class InvertHighlightedTextNew {
  public static invert(editor: TextEditor): void {
    editor.edit((selectedText) => {
      const inversionRangeDetails = InversionRangeDetailsFactory.create(editor);
      if (!inversionRangeDetails) return;
      const textToInvert = editor.document.getText(inversionRangeDetails.range);
      if (inversionRangeDetails.replacableStartOperatorLength > 0 || inversionRangeDetails.endOperatorPaddingRequired) {
        InvertTextWithPadding.invertAndReplace(inversionRangeDetails, textToInvert, selectedText);
      } else {
        InvertText.invertAndReplace(inversionRangeDetails.range, textToInvert, selectedText);
      }
    });
  }
}
