import { InsideHighlightDetails } from '../../../../../../shared/types/invertHighlightedText/conditionDetails';
import { Inverter } from 'shared/inverter/src/inverter';
import { TextEditorEdit } from 'vscode';

export class InvertConditionText {
  public static invertAndReplace(conditionDetails: InsideHighlightDetails, conditionText: string, selectedText: TextEditorEdit): void {
    const invertedText = Inverter.invert(conditionText);
    selectedText.replace(conditionDetails.range, invertedText);
  }
}
