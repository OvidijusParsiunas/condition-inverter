import { InversionRangeDetails } from '../../../../../../shared/types/inversionRangeDetails';
import { Inverter } from 'shared/inverter/src/inverter';
import { TextEditorEdit } from 'vscode';

export class InvertTextWithEndPadding {
  private static invertPaddingAtEndAndUpdate(textToInvert: string): string {
    const paddedText = `${textToInvert} &&`;
    const invertedText = Inverter.invert(paddedText);
    return invertedText.substring(0, invertedText.length - 3);
  }

  public static invertAndReplace(inversionRangeDetails: InversionRangeDetails, textToInvert: string, selectedText: TextEditorEdit): void {
    const newPaddingText = InvertTextWithEndPadding.invertPaddingAtEndAndUpdate(textToInvert);
    selectedText.replace(inversionRangeDetails.range, newPaddingText);
  }
}
