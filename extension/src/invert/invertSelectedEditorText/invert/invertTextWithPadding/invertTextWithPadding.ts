import { SetPostInvertionSelection } from '../../shared/functionality/setPositionInvertionSelection';
import { InversionRangeDetails } from '../../shared/types/inversionRangeDetails';
import { InvertTextWithStartPadding } from './invertTextWithStartPadding';
import { InvertTextWithPaddingImpl } from './InvertTextWithPaddingImpl';
import { InvertTextWithEndPadding } from './invertTextWithEndPadding';
import { Inverter } from 'shared/inverter/src/inverter';
import { Selection, TextEditorEdit } from 'vscode';

export class InvertTextWithPadding {
  private static setNewRangeIfStart(inversionRangeDetails: InversionRangeDetails): void {
    if (inversionRangeDetails.startOperatorPadding.length > 0) {
      inversionRangeDetails.range = InvertTextWithStartPadding.generateRange(inversionRangeDetails);
    }
  }

  // prettier-ignore
  private static processTextViaPaddingClasses(
      text: string, process: keyof InvertTextWithPaddingImpl, paddingInversionClasses: InvertTextWithPaddingImpl[]): string {
    let processedText = text;
    paddingInversionClasses.forEach((invertTextWithPaddingClass) => {
      processedText = invertTextWithPaddingClass[process](processedText);
    });
    return processedText;
  }

  private static getInvertWithPaddingClasses(inversionRangeDetails: InversionRangeDetails): InvertTextWithPaddingImpl[] {
    const paddingInversionClasses: InvertTextWithPaddingImpl[] = [];
    if (inversionRangeDetails.startOperatorPadding.length > 0) {
      paddingInversionClasses.push(new InvertTextWithStartPadding(inversionRangeDetails.startOperatorPadding));
    }
    if (inversionRangeDetails.endOperatorPadding.length > 0) {
      paddingInversionClasses.push(new InvertTextWithEndPadding(inversionRangeDetails.endOperatorPadding));
    }
    return paddingInversionClasses;
  }

  // prettier-ignore
  public static invertAndReplace(selection: Selection, inversionRangeDetails: InversionRangeDetails, textToInvert: string,
      selectedText: TextEditorEdit): void {
    const paddingInversionClasses = InvertTextWithPadding.getInvertWithPaddingClasses(inversionRangeDetails);
    const paddedConditionText = InvertTextWithPadding.processTextViaPaddingClasses(textToInvert, 'prepareText', paddingInversionClasses);
    const invertedText = Inverter.invert(paddedConditionText);
    const processedInvertedText = InvertTextWithPadding.processTextViaPaddingClasses(invertedText, 'processInvertedText', paddingInversionClasses);
    InvertTextWithPadding.setNewRangeIfStart(inversionRangeDetails);
    selectedText.replace(inversionRangeDetails.range, processedInvertedText);
    SetPostInvertionSelection.set(selection, paddedConditionText, invertedText);
  }
}
