import { InversionRangeDetails } from '../../../../../../shared/types/inversionRangeDetails';
import { Inverter } from 'shared/inverter/src/inverter';
import { TextEditorEdit } from 'vscode';

export class InvertTextWithEndPadding {
  private static invertPaddingAtEndAndUpdate(textToInvert: string, endOperatorPadding: string): string {
    const paddedText = `${textToInvert} ${endOperatorPadding}`;
    const invertedText = Inverter.invert(paddedText);
    // + 1 for the prefix space
    return invertedText.substring(0, invertedText.length - (endOperatorPadding.length + 1));
  }

  public static invertAndReplace(inversionRangeDetails: InversionRangeDetails, textToInvert: string, selectedText: TextEditorEdit): void {
    const invertedText = InvertTextWithEndPadding.invertPaddingAtEndAndUpdate(textToInvert, inversionRangeDetails.endOperatorPadding);
    selectedText.replace(inversionRangeDetails.range, invertedText);
  }
}
