import { InvertTextWithPaddingImpl } from './InvertTextWithPaddingImpl';

export class InvertTextWithEndPadding implements InvertTextWithPaddingImpl {
  private paddingTextLength = 0;

  constructor(private readonly endOperatorPadding: string) {}

  public prepareText(textToInvert: string): string {
    this.paddingTextLength = this.endOperatorPadding.length;
    return `${textToInvert} ${this.endOperatorPadding}`;
  }

  public processInvertedText(invertedText: string): string {
    // + 1 for the prefix space
    return invertedText.substring(0, invertedText.length - (this.paddingTextLength + 1));
  }
}
