import { ConditionRange, HighlightedConditionRange } from './conditionRange/highlightedConditionRange';
import { InvertWithPadding } from './invert/invertWithPadding';
import { Inverter } from 'shared/inverter/src/inverter';
import { TextEditor } from 'vscode';

export class InvertHighlightedTextNew {
  private static getInvertedText(editor: TextEditor, conditionRange: ConditionRange): string {
    const statementText = editor.document.getText(conditionRange.invertionRange);
    return Inverter.invert(statementText);
  }

  public static invert(editor: TextEditor): void {
    editor.edit((selectedText) => {
      const conditionRange = HighlightedConditionRange.get(editor);
      const conditionText = editor.document.getText(conditionRange.invertionRange);
      if (conditionRange.initStatementLength) {
        InvertWithPadding.invertAndReplaceSelectedText(conditionRange as Required<ConditionRange>, conditionText, selectedText);
      } else {
        const invertedText = InvertHighlightedTextNew.getInvertedText(editor, conditionRange);
        selectedText.replace(conditionRange.invertionRange, invertedText);
      }
    });
  }
}
