import { OutsideHighlightDetails } from '../../../../../../shared/types/invertHighlightedText/conditionDetails';
import { RangeCreator } from '../../../../../shared/rangeCreator';
import { Inverter } from 'shared/inverter/src/inverter';
import { Range, TextEditorEdit } from 'vscode';

export class InvertConditionTextViaPadding {
  // the reason why we are using 'if' instead of '&&' is because when there is a bracket between the condition and the operator, we don't
  // want to invert the bracket, e.g:
  // if (dog with the use of if would invert if (dog into if (!dog whereas && (dog would result in if !(dog
  private static readonly paddingConditionStarterText = 'if';

  private static generateRange(conditionDetails: OutsideHighlightDetails): Range {
    return RangeCreator.create(
      {
        line: conditionDetails.range.start.line,
        // need to use + conditionDetails.replaceableOperatorLength because we are always using if and we could be working with &&, while etc.
        character: conditionDetails.range.start.character + conditionDetails.replaceableOperatorLength,
      },
      conditionDetails.range.end,
    );
  }
  private static processInvertedText(invertedText: string, paddingText: string): string {
    return invertedText.substring(paddingText.length, invertedText.length);
  }

  private static getPaddedConditionText(paddingText: string, statementLength: number, conditionText: string): string {
    return `${paddingText}${conditionText.substring(statementLength, conditionText.length)}`;
  }

  // the reason why a whitespace prefix is used is when the identified statement start is longer than the paddingConditionStarterText that is used:
  // identified - while, using - if, the padding text will have to be: '   if'
  // this is done not to distort the ranges and keep the original distances
  private static getPaddingTextWithWhitespacePrefix(statementLength: number): string {
    return `${' '.repeat(statementLength - InvertConditionTextViaPadding.paddingConditionStarterText.length)}${
      InvertConditionTextViaPadding.paddingConditionStarterText
    }`;
  }

  private static getPaddingText(replaceableOperatorLength: number): string {
    const paddingText =
      replaceableOperatorLength - InvertConditionTextViaPadding.paddingConditionStarterText.length > -1
        ? InvertConditionTextViaPadding.getPaddingTextWithWhitespacePrefix(replaceableOperatorLength)
        : InvertConditionTextViaPadding.paddingConditionStarterText;
    // the reason why there is a space after paddingText is because when paddingConditionStarterText is a word, it can merge into another word
    // hence there needs to be a separation between them, e.g:
    // '&&dog' -> will need to be regarded as 'if dog'
    return `${paddingText} `;
  }

  private static invertWithPaddingAndUpdateRange(replaceableOperatorLength: number, conditionText: string): string {
    const paddingText = InvertConditionTextViaPadding.getPaddingText(replaceableOperatorLength);
    const paddedConditionText = InvertConditionTextViaPadding.getPaddedConditionText(paddingText, replaceableOperatorLength, conditionText);
    const invertedText = Inverter.invert(paddedConditionText);
    return InvertConditionTextViaPadding.processInvertedText(invertedText, paddingText);
  }

  public static invertAndReplaceText(conditionDetails: OutsideHighlightDetails, conditionText: string, selectedText: TextEditorEdit): void {
    const invertedText = InvertConditionTextViaPadding.invertWithPaddingAndUpdateRange(conditionDetails.replaceableOperatorLength, conditionText);
    const invertionRangeWithPadding = InvertConditionTextViaPadding.generateRange(conditionDetails);
    selectedText.replace(invertionRangeWithPadding, invertedText);
  }
}
