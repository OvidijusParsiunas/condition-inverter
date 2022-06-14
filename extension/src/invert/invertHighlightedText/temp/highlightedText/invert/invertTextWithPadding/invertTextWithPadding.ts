import { InversionRangeDetails } from '../../../../../../shared/types/inversionRangeDetails';
import { InvertTextWithStartPadding } from './inverTextWithStartPadding';
import { InvertTextWithEndPadding } from './inverTextWithEndPadding';
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
