import { ConditionRange } from '../conditionRange/highlightedConditionRange';
import { RangeCreator } from '../../../shared/rangeCreator';
import { Inverter } from 'shared/inverter/src/inverter';
import { Range, TextEditorEdit } from 'vscode';

export class InvertWithPadding {
  // the reason why we are using 'if' instead of '&&' is because when there is a bracket between the condition and the operator, we don't
  // want to invert the bracket, e.g:
  // if (dog with the use of if would invert if (dog into if (!dog whereas && (dog would result in if !(dog
  private static readonly paddingConditionStarterText = 'if';

  private static generateRange(conditionRange: Required<ConditionRange>): Range {
    return RangeCreator.create(
      {
        line: conditionRange.invertionRange.start.line,
        // need to use + conditionRange.statementRange because we are always using if and we could be working with &&, while etc.
        character: conditionRange.invertionRange.start.character + conditionRange.initStatementLength,
      },
      conditionRange.invertionRange.end,
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
    return `${' '.repeat(statementLength - InvertWithPadding.paddingConditionStarterText.length)}${InvertWithPadding.paddingConditionStarterText}`;
  }

  private static getPaddingText(statementLength: number): string {
    const paddingText =
      statementLength - InvertWithPadding.paddingConditionStarterText.length > -1
        ? InvertWithPadding.getPaddingTextWithWhitespacePrefix(statementLength)
        : InvertWithPadding.paddingConditionStarterText;
    // the reason why there is a space after paddingText is because when paddingConditionStarterText is a word, it can merge into another word
    // hence there needs to be a separation between them, e.g:
    // '&&dog' -> will need to be regarded as 'if dog'
    return `${paddingText} `;
  }

  private static invertWithPaddingAndUpdateRange(conditionRange: Required<ConditionRange>, conditionText: string): string {
    const paddingText = InvertWithPadding.getPaddingText(conditionRange.initStatementLength);
    const paddedConditionText = InvertWithPadding.getPaddedConditionText(paddingText, conditionRange.initStatementLength, conditionText);
    const invertedText = Inverter.invert(paddedConditionText);
    return InvertWithPadding.processInvertedText(invertedText, paddingText);
  }

  public static invertAndReplaceSelectedText(conditionRange: Required<ConditionRange>, conditionText: string, selectedText: TextEditorEdit): void {
    const invertedText = InvertWithPadding.invertWithPaddingAndUpdateRange(conditionRange as Required<ConditionRange>, conditionText);
    const invertionRangeWithPadding = InvertWithPadding.generateRange(conditionRange);
    selectedText.replace(invertionRangeWithPadding, invertedText);
  }
}
