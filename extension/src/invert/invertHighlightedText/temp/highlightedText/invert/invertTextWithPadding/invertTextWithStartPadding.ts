import { InversionRangeDetails } from '../../../../../../shared/types/inversionRangeDetails';
import { RangeCreator } from '../../../../../shared/rangeCreator';
import { Inverter } from 'shared/inverter/src/inverter';
import { Range, TextEditorEdit } from 'vscode';

export class InvertTextWithStartPadding {
  private static generateRange(inversionRangeDetails: InversionRangeDetails): Range {
    return RangeCreator.create(
      {
        line: inversionRangeDetails.range.start.line,
        // need to use + inversionRangeDetails.startOperatorPadding because we are always using if and we could be working with < etc.
        character: inversionRangeDetails.range.start.character + inversionRangeDetails.startOperatorPadding.length,
      },
      inversionRangeDetails.range.end,
    );
  }
  private static processInvertedText(invertedText: string, paddingText: string): string {
    return invertedText.substring(paddingText.length, invertedText.length);
  }

  private static getPaddedConditionText(paddingText: string, statementLength: number, textToInvert: string): string {
    return `${paddingText}${textToInvert.substring(statementLength, textToInvert.length)}`;
  }

  private static getPaddingText(startOperatorPadding: string): string {
    // the reason why we keep original if longer than 1 is because if it is a 'for' then the inversion will have to be processed differently
    const paddingText = startOperatorPadding.length < 2 ? '&&' : startOperatorPadding;
    // the reason why there is a space after paddingText is because when paddingConditionStarterText is a word, it can merge into another word
    // hence there needs to be a separation between them, e.g:
    // '&&dog' -> will need to be regarded as 'if dog'
    return `${paddingText} `;
  }

  private static invertPaddAndUpdateRange(startOperatorPadding: string, textToInvert: string): string {
    const paddingText = InvertTextWithStartPadding.getPaddingText(startOperatorPadding);
    const paddedConditionText = InvertTextWithStartPadding.getPaddedConditionText(paddingText, startOperatorPadding.length, textToInvert);
    const invertedText = Inverter.invert(paddedConditionText);
    return InvertTextWithStartPadding.processInvertedText(invertedText, paddingText);
  }

  public static invertAndReplace(inversionRangeDetails: InversionRangeDetails, textToInvert: string, selectedText: TextEditorEdit): void {
    const invertedText = InvertTextWithStartPadding.invertPaddAndUpdateRange(inversionRangeDetails.startOperatorPadding, textToInvert);
    const invertionRangeWithPadding = InvertTextWithStartPadding.generateRange(inversionRangeDetails);
    selectedText.replace(invertionRangeWithPadding, invertedText);
  }
}
