import { InversionRangeDetails } from '../../../../../../shared/types/inversionRangeDetails';
import { InvertTextWithStartPadding } from './invertTextWithStartPadding';
import { InvertTextWithEndPadding } from './invertTextWithEndPadding';
import { TextEditorEdit } from 'vscode';

export class InvertTextWithPadding {
  public static invertAndReplace(inversionRangeDetails: InversionRangeDetails, textToInvert: string, selectedText: TextEditorEdit): void {
    if (inversionRangeDetails.endOperatorPadding.length > 0) {
      InvertTextWithEndPadding.invertAndReplace(inversionRangeDetails, textToInvert, selectedText);
    } else {
      InvertTextWithStartPadding.invertAndReplace(inversionRangeDetails, textToInvert, selectedText);
    }
  }
}
