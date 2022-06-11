import { InversionRangeDetails } from '../../../../../shared/types/inversionRangeDetails';
import { RangeCreator } from '../../../../shared/rangeCreator';
import { Inverter } from 'shared/inverter/src/inverter';
import { Range, TextEditorEdit } from 'vscode';

export class InvertTextWithStartPadding {
  // the reason why we are using 'if' instead of '&&' is because when there is a bracket between the condition and the operator, we don't
  // want to invert the bracket, e.g:
  // if (dog with the use of if would invert if (dog into if (!dog whereas && (dog would result in if !(dog
  private static readonly paddingConditionStarterText = 'if';

  private static generateRange(inversionRangeDetails: InversionRangeDetails): Range {
    return RangeCreator.create(
      {
        line: inversionRangeDetails.range.start.line,
        // need to use + inversionRangeDetails.replacableStartOperatorLength because we are always using if and we could be working with while etc.
        character: inversionRangeDetails.range.start.character + inversionRangeDetails.replacableStartOperatorLength,
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

  // the reason why a whitespace prefix is used is when the identified statement start is longer than the paddingConditionStarterText that is used:
  // identified - while, using - if, the padding text will have to be: '   if'
  // this is done not to distort the ranges and keep the original distances
  private static getPaddingTextWithWhitespacePrefix(statementLength: number): string {
    return `${' '.repeat(statementLength - InvertTextWithStartPadding.paddingConditionStarterText.length)}${
      InvertTextWithStartPadding.paddingConditionStarterText
    }`;
  }

  private static getPaddingText(replacableStartOperatorLength: number): string {
    const paddingText =
      replacableStartOperatorLength - InvertTextWithStartPadding.paddingConditionStarterText.length > -1
        ? InvertTextWithStartPadding.getPaddingTextWithWhitespacePrefix(replacableStartOperatorLength)
        : InvertTextWithStartPadding.paddingConditionStarterText;
    // the reason why there is a space after paddingText is because when paddingConditionStarterText is a word, it can merge into another word
    // hence there needs to be a separation between them, e.g:
    // '&&dog' -> will need to be regarded as 'if dog'
    return `${paddingText} `;
  }

  private static invertPaddAndUpdateRange(replacableStartOperatorLength: number, textToInvert: string): string {
    const paddingText = InvertTextWithStartPadding.getPaddingText(replacableStartOperatorLength);
    const paddedConditionText = InvertTextWithStartPadding.getPaddedConditionText(paddingText, replacableStartOperatorLength, textToInvert);
    const invertedText = Inverter.invert(paddedConditionText);
    return InvertTextWithStartPadding.processInvertedText(invertedText, paddingText);
  }

  public static invertAndReplaceText(inversionRangeDetails: InversionRangeDetails, textToInvert: string, selectedText: TextEditorEdit): void {
    const invertedText = InvertTextWithStartPadding.invertPaddAndUpdateRange(inversionRangeDetails.replacableStartOperatorLength, textToInvert);
    const invertionRangeWithPadding = InvertTextWithStartPadding.generateRange(inversionRangeDetails);
    selectedText.replace(invertionRangeWithPadding, invertedText);
  }
}
