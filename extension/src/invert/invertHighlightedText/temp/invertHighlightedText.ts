import { HighlightedConditionRange } from './conditionRange/highlightedConditionRange';
import { RangeCreator } from '../../shared/rangeCreator';
import { Inverter } from 'shared/inverter/src/inverter';
import { TextEditor, Range } from 'vscode';

export class InvertHighlightedTextNew {
  private static getInvertedText(editor: TextEditor, statementRange: { rangeToInvert: Range; statementLength?: number }): string {
    const statementText = editor.document.getText(statementRange.rangeToInvert);
    return Inverter.invert(statementText);
  }

  public static invert(editor: TextEditor): void {
    editor.edit((selectedText) => {
      const statementsRange = HighlightedConditionRange.get(editor);
      let invertedText = '';
      if (statementsRange.statementLength !== undefined) {
        let statementText = editor.document.getText(statementsRange.rangeToInvert);
        const paddingStatement = statementsRange.statementLength - 2 > -1 ? `${' '.repeat(statementsRange.statementLength - 2)}if ` : 'if ';
        statementText = `${paddingStatement}${statementText.substring(statementsRange.statementLength, statementText.length)}`;
        invertedText = Inverter.invert(statementText);
        invertedText = invertedText.substring(paddingStatement.length, invertedText.length);
        statementsRange.rangeToInvert = RangeCreator.create(
          {
            line: statementsRange.rangeToInvert.start.line,
            character: statementsRange.rangeToInvert.start.character + statementsRange.statementLength,
          },
          statementsRange.rangeToInvert.end,
        );
      } else {
        invertedText = InvertHighlightedTextNew.getInvertedText(editor, statementsRange);
      }
      selectedText.replace(statementsRange.rangeToInvert, invertedText);
    });
  }
}
