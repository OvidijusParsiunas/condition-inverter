import { SelectionStartIfRange } from './selectionBoundaryIfRanges/selectionStartIfRange';
import { SelectionEndIfRange } from './selectionBoundaryIfRanges/selectionEndIfRange';
import { Position } from '../../types/invertHighlightedText/invertHighlightedText';
import InvertConditions from '../../../../shared/out/invert';
import { RangeCreator } from '../shared/rangeCreator';
import { Range, TextEditor } from 'vscode';

export class InvertHighlightedText {
  private static doesStartStatementEndLaterThanSelectionEnd(startStatementEnd: Position, endSelectionPosition: Position): boolean {
    return (
      startStatementEnd.line > endSelectionPosition.line ||
      (startStatementEnd.line === endSelectionPosition.line && startStatementEnd.character > endSelectionPosition.character)
    );
  }

  private static getEndPosition(editor: TextEditor, startStatementRange: Range | null, endStatementRange: Range | null): Position {
    if (endStatementRange) {
      return endStatementRange.end;
    }
    const endSelectionPosition = editor.selection.end;
    if (startStatementRange && InvertHighlightedText.doesStartStatementEndLaterThanSelectionEnd(startStatementRange.end, endSelectionPosition)) {
      return startStatementRange.end;
    }
    return endSelectionPosition;
  }

  private static combineRanges(editor: TextEditor, startStatementRange: Range | null, endStatementRange: Range | null): Range {
    const startPosition = startStatementRange?.start || editor.selection.start;
    const endPosition = InvertHighlightedText.getEndPosition(editor, startStatementRange, endStatementRange);
    return RangeCreator.create(startPosition, endPosition);
  }

  private static getIfStatementRange(editor: TextEditor): Range {
    const startStatementRange = SelectionStartIfRange.getStartSelectionIfStatementFullRange(editor);
    const endStatementRange = SelectionEndIfRange.get(editor, startStatementRange);
    return InvertHighlightedText.combineRanges(editor, startStatementRange, endStatementRange);
  }

  public static invert(editor: TextEditor): void {
    editor.edit((selectedText) => {
      const ifStatementRange = InvertHighlightedText.getIfStatementRange(editor);
      // WORK - if statement range should be null if no if statements found
      const ifStatementText = editor.document.getText(ifStatementRange);
      const invertedText = InvertConditions.runInvert(ifStatementText);
      selectedText.replace(ifStatementRange, invertedText);
    });
  }
}
