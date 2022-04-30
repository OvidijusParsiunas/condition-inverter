import { SelectionStartIfRange } from './selectionBoundaryIfRanges/selectionStartIfRange';
import { Position } from '../../shared/types/invertHighlightedText/invertHighlightedText';
import { SelectionEndIfRange } from './selectionBoundaryIfRanges/selectionEndIfRange';
import { IfInverter } from '../../../../inverter/out/src/ifInverter';
import { RangeCreator } from '../shared/rangeCreator';
import { Range, TextEditor } from 'vscode';

export class InvertHighlightedText {
  private static getInvertedText(editor: TextEditor, ifStatementRange: Range): string {
    const ifStatementText = editor.document.getText(ifStatementRange);
    return IfInverter.invert(ifStatementText);
  }

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

  private static combineRanges(editor: TextEditor, startStatementRange: Range | null, endStatementRange: Range | null): Range | null {
    const startPosition = startStatementRange?.start || editor.selection.start;
    const endPosition = InvertHighlightedText.getEndPosition(editor, startStatementRange, endStatementRange);
    return RangeCreator.create(startPosition, endPosition);
  }

  private static getIfStatementsRange(editor: TextEditor): Range | null {
    const startStatementRange = SelectionStartIfRange.getStartSelectionIfStatementFullRange(editor);
    const endStatementRange = SelectionEndIfRange.get(editor, startStatementRange);
    if (startStatementRange || endStatementRange) {
      return InvertHighlightedText.combineRanges(editor, startStatementRange, endStatementRange);
    }
    return null;
  }

  public static invert(editor: TextEditor): void {
    editor.edit((selectedText) => {
      const ifStatementRange = InvertHighlightedText.getIfStatementsRange(editor);
      if (ifStatementRange) {
        const invertedText = InvertHighlightedText.getInvertedText(editor, ifStatementRange);
        selectedText.replace(ifStatementRange, invertedText);
      }
    });
  }
}
