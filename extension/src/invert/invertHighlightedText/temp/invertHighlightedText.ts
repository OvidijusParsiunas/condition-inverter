import { ConditionRange, HighlightedConditionRange } from './conditionRange/highlightedConditionRange';
import { RangeCreator } from '../../shared/rangeCreator';
import { Inverter } from 'shared/inverter/src/inverter';
import { TextEditor } from 'vscode';

export class InvertHighlightedTextNew {
  private static getInvertedText(editor: TextEditor, conditionRange: ConditionRange): string {
    const statementText = editor.document.getText(conditionRange.invertionRange);
    return Inverter.invert(statementText);
  }

  private static processInvertedText(invertedText: string, paddingText: string): string {
    return invertedText.substring(paddingText.length, invertedText.length);
  }

  private static getPaddedConditionText(paddingText: string, statementLength: number, conditionText: string): string {
    return `${paddingText}${conditionText.substring(statementLength, conditionText.length)}`;
  }

  private static getPaddingText(statementLength: number): string {
    return statementLength - 2 > -1 ? `${' '.repeat(statementLength - 2)}if ` : 'if ';
  }

  private static invertWithPadding(conditionRange: Required<ConditionRange>, conditionText: string): string {
    const paddingText = InvertHighlightedTextNew.getPaddingText(conditionRange.statementLength);
    const newConditionText = InvertHighlightedTextNew.getPaddedConditionText(paddingText, conditionRange.statementLength, conditionText);
    const invertedText = Inverter.invert(newConditionText);
    conditionRange.invertionRange = RangeCreator.create(
      {
        line: conditionRange.invertionRange.start.line,
        character: conditionRange.invertionRange.start.character + conditionRange.statementLength,
      },
      conditionRange.invertionRange.end,
    );
    return InvertHighlightedTextNew.processInvertedText(invertedText, paddingText);
  }

  public static invert(editor: TextEditor): void {
    editor.edit((selectedText) => {
      const conditionRange = HighlightedConditionRange.get(editor);
      const conditionText = editor.document.getText(conditionRange.invertionRange);
      const invertedText =
        conditionRange.statementLength !== undefined
          ? InvertHighlightedTextNew.invertWithPadding(conditionRange as Required<ConditionRange>, conditionText)
          : InvertHighlightedTextNew.getInvertedText(editor, conditionRange);
      selectedText.replace(conditionRange.invertionRange, invertedText);
    });
  }
}
