import { ConditionIndicatorBeforeStart } from './traverseOutsideSelection/conditionIndicatorBeforeStart';
import { RangeCreator } from '../../shared/rangeCreator';
import { CanInversionStart } from './canInversionStart';
import { FullWordRange } from './fullWordRange';
import { TextEditor, Range } from 'vscode';

export interface ConditionRange {
  rangeToInvert: Range;
  statementLength?: number;
}

export class TempFile {
  // click rules:
  // if not traverse further back on the same line to see if statement
  // if no symbol on the left traverse up to do the same
  // if nothing found
  // try to see if logical/ternary operator on the right

  // highlight rules
  // same process for above when nothing inside highlighted text
  // WORK - _ that is next to the string should be regarded as part of it
  public static getConditionRange(editor: TextEditor): ConditionRange {
    let result: ConditionRange = { rangeToInvert: FullWordRange.extract(editor) };
    const canInversionStart = CanInversionStart.verifyUsingAnalyzers(result.rangeToInvert, editor);
    if (!canInversionStart) {
      const outsideStatementStartPosition = ConditionIndicatorBeforeStart.search(editor, result.rangeToInvert.start.character);
      if (outsideStatementStartPosition) {
        result = {
          rangeToInvert: RangeCreator.create(outsideStatementStartPosition.position, {
            line: editor.selection.end.line,
            character: result.rangeToInvert.end.character,
          }),
          statementLength: outsideStatementStartPosition.statementLength,
        };
      }
    }
    return result;
  }
}
