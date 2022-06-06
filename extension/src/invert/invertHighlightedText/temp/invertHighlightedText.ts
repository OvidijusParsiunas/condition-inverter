import { ConditionDetails, OutsideHighlightDetails } from '../../../shared/types/invertHighlightedText/conditionDetails';
import { InvertConditionTextViaPadding } from './conditionRange/outsideHighlight/invert/invertConditionTextViaPadding';
import { InvertConditionText } from './conditionRange/insideHighlight/invert/invertConditionText';
import { HighlightedConditionRange } from './conditionRange/highlightedConditionRange';
import { TextEditor } from 'vscode';

export class InvertHighlightedTextNew {
  private static isOutsideHighlightDetails(conditionDetails: ConditionDetails): conditionDetails is OutsideHighlightDetails {
    return Boolean((conditionDetails as OutsideHighlightDetails).replacableOperatorLength);
  }

  public static invert(editor: TextEditor): void {
    editor.edit((selectedText) => {
      const conditionDetails = HighlightedConditionRange.get(editor);
      const conditionText = editor.document.getText(conditionDetails.range);
      if (InvertHighlightedTextNew.isOutsideHighlightDetails(conditionDetails)) {
        InvertConditionTextViaPadding.invertAndReplaceText(conditionDetails, conditionText, selectedText);
      } else {
        InvertConditionText.invertAndReplace(conditionDetails, conditionText, selectedText);
      }
    });
  }
}
