import { ConditionIndicatorBeforeStart } from './analysisOutsideHighlight/conditionIndicatorBeforeStart';
import { CanInversionStart } from './analysisInsideHighlight/canInversionStart';
import { FullWordRange } from './analysisInsideHighlight/fullWordRange';
import { RangeCreator } from '../../../shared/rangeCreator';
import { TextEditor, Range } from 'vscode';

// WORK - refactor
export interface ConditionRange {
  invertionRange: Range;
  initStatementLength?: number;
}

export class HighlightedConditionRange {
  private static findConditionStartRangeBeyondHiglight(editor: TextEditor, currentRange: Range): ConditionRange | null {
    const conditionIndicatorPosition = ConditionIndicatorBeforeStart.search(editor, currentRange.start.character);
    if (conditionIndicatorPosition) {
      return {
        invertionRange: RangeCreator.create(conditionIndicatorPosition.position, editor.selection.end),
        initStatementLength: conditionIndicatorPosition.statementLength,
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
  public static get(editor: TextEditor): ConditionRange {
    const conditionRange: ConditionRange = { invertionRange: FullWordRange.extract(editor) };
    const canInversionStart = CanInversionStart.verifyUsingAnalyzers(conditionRange.invertionRange, editor);
    if (!canInversionStart) {
      const rangeBeyondHighlight = HighlightedConditionRange.findConditionStartRangeBeyondHiglight(editor, conditionRange.invertionRange);
      if (rangeBeyondHighlight) return rangeBeyondHighlight;
      // WORK - return null so that no inversion takes place
    }
    return conditionRange;
  }
}
