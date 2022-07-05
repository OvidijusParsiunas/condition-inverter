import { InversionRangeDetails } from '../../../../../../shared/types/inversionRangeDetails';
import { InvertTextWithPaddingImpl } from './InvertTextWithPaddingImpl';
import { RangeCreator } from '../../../../../shared/rangeCreator';
import { Range } from 'vscode';

export class InvertTextWithStartPadding implements InvertTextWithPaddingImpl {
  private paddingTextLength = 0;

  constructor(private readonly startOperatorPadding: string) {}

  private getPaddingText(): string {
    // the reason why we keep original if longer than 1 is because if it is a 'for' then the inversion will have to be processed differently
    // 'and' and 'or' should not be kept as original as their length changes post inversion
    const paddingText =
      this.startOperatorPadding.length < 2 || this.startOperatorPadding === 'and' || this.startOperatorPadding === 'or'
        ? '&&'
        : this.startOperatorPadding;
    // the reason why there is a space after paddingText is because when paddingConditionStarterText is a word, it can merge into another word
    // hence there needs to be a separation between them, e.g:
    // '&&dog' -> will need to be regarded as 'if dog'
    return `${paddingText} `;
  }

  private static getPaddedConditionText(paddingText: string, statementLength: number, textToInvert: string): string {
    return `${paddingText}${textToInvert.substring(statementLength, textToInvert.length)}`;
  }

  public prepareText(textToInvert: string): string {
    const paddingText = this.getPaddingText();
    this.paddingTextLength = paddingText.length;
    return InvertTextWithStartPadding.getPaddedConditionText(paddingText, this.startOperatorPadding.length, textToInvert);
  }

  public processInvertedText(invertedText: string): string {
    return invertedText.substring(this.paddingTextLength, invertedText.length);
  }

  public static generateRange(inversionRangeDetails: InversionRangeDetails): Range {
    return RangeCreator.create(
      {
        line: inversionRangeDetails.range.start.line,
        // need to use + inversionRangeDetails.startOperatorPadding because its length can vary
        character: inversionRangeDetails.range.start.character + inversionRangeDetails.startOperatorPadding.length,
      },
      inversionRangeDetails.range.end,
    );
  }
}
