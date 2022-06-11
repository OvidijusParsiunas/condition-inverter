import { InversionRangeDetails } from '../../../../../shared/types/inversionRangeDetails';
import { ConditionIndicatorBeforeStart } from './analysis/conditionIndicatorBeforeStart';
import { ConditionIndicatorAfterEnd } from './analysis/conditionIndicatorAfterEnd';
import { FullWordRange } from './analysis/fullWordRange/fullWordRange';
import { RangeCreator } from '../../../../shared/rangeCreator';
import { TextEditor } from 'vscode';

export class InversionRangeDetailsFactory {
  // WORK - test for when searching upwards and nothing found
  // WORK - use AnalyzeConditionOutsideStatement for downwards analysis
  // selectionStartChar can vary depending on selection position on a word as it will be its start if on word
  // WORK - _ that is next to the string should be regarded as part of it
  // WORK need to return null if no conditions
  public static create(editor: TextEditor): InversionRangeDetails {
    const fullWordRange = FullWordRange.extract(editor);
    const startPositionDetails = ConditionIndicatorBeforeStart.getStartPositionDetails(editor, fullWordRange.start);
    const endPosition = ConditionIndicatorAfterEnd.getEndPosition(editor, fullWordRange.end);
    return {
      range: RangeCreator.create(startPositionDetails.position, endPosition),
      replacableStartOperatorLength: startPositionDetails.replaceableStartOperatorLength,
    };
  }
}

// WORK - to update
// SEARCH STRATEGY:
// Search leftwards and upwards until non space token is identified
// Then proceed to search condition start indicator within the same line starting from the non space token
// This is NAIVE however it is the only current feasable workaround found to not have to traverse the entire
// codebase to search for a start of a statement. It covers most of inversion cases but the expectation is
// that the condition start indicator will have to be on the same line as the highlight start
// ACCEPTED RISKS:
// If the highlighted text is outside of a condition and there is one to the left of it, the condition
// on the left will be inverted
