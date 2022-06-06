import { ConditionIndicatorBeforeStart } from './outsideHighlight/analysis/conditionIndicatorBeforeStart';
import { ConditionDetails } from '../../../../shared/types/invertHighlightedText/conditionDetails';
import { CanInversionStart } from './insideHighlight/analysis/canInversionStart';
import { FullWordRange } from './insideHighlight/analysis/fullWordRange';
import { RangeCreator } from '../../../shared/rangeCreator';
import { TextEditor, Range } from 'vscode';

export class HighlightedConditionRange {
  private static findConditionStartRangeBeyondHiglight(editor: TextEditor, currentRange: Range): ConditionDetails | null {
    const conditionIndicatorPosition = ConditionIndicatorBeforeStart.search(editor, currentRange.start.character);
    if (conditionIndicatorPosition) {
      return {
        range: RangeCreator.create(conditionIndicatorPosition.position, editor.selection.end),
        replacableOperatorLength: conditionIndicatorPosition.statementLength,
      };
    }
    return null;
  }
  // click rules:
  // if not traverse further back on the same line to see if statement
  // if no symbol on the left traverse up to do the same
  // if nothing found
  // try to see if logical/ternary operator on the right

  // highlight rules
  // same process for above when nothing inside highlighted text
  // WORK - _ that is next to the string should be regarded as part of it
  public static get(editor: TextEditor): ConditionDetails {
    const conditionDetails: ConditionDetails = { range: FullWordRange.extract(editor) };
    const canInversionStart = CanInversionStart.verifyUsingAnalyzers(conditionDetails.range, editor);
    if (!canInversionStart) {
      const rangeBeyondHighlight = HighlightedConditionRange.findConditionStartRangeBeyondHiglight(editor, conditionDetails.range);
      if (rangeBeyondHighlight) return rangeBeyondHighlight;
      // WORK - return null so that no inversion takes place
    }
    return conditionDetails;
  }
}
