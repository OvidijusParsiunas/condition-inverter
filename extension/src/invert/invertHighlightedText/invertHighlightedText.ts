import { SelectionStartIfRange } from './selectionBoundaryIfRanges/selectionStartIfRange';
import { Position } from '../../shared/types/invertHighlightedText/invertHighlightedText';
import { SelectionEndIfRange } from './selectionBoundaryIfRanges/selectionEndIfRange';
import { InvertConditions } from '../../../../shared/out/invert';
import { RangeCreator } from '../shared/rangeCreator';
import { Range, TextEditor } from 'vscode';

export class InvertHighlightedText {
  private static getInvertedText(editor: TextEditor, ifStatementRange: Range): string {
    const ifStatementText = editor.document.getText(ifStatementRange);
    return InvertConditions.runInvert(ifStatementText);
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

  // no logic to find exactly where the if statement is (line, character) as the inversion algorithm will traverse the full string either way
  private static findIfStatementInsideSelection(editor: TextEditor): boolean {
    const { start, end } = editor.selection;
    const selectionRange = RangeCreator.create(start, end);
    const selectionText = editor.document.getText(selectionRange);
    return selectionText.indexOf('if') > -1;
  }

  private static haveIfStatementsBeenFound(editor: TextEditor, startStatementRange: Range | null, endStatementRange: Range | null): boolean {
    if (!startStatementRange && !endStatementRange) {
      const isIfStatementBetweenSelection = InvertHighlightedText.findIfStatementInsideSelection(editor);
      if (!isIfStatementBetweenSelection) return false;
    }
    return true;
  }

  private static getIfStatementsRange(editor: TextEditor): Range | null {
    const startStatementRange = SelectionStartIfRange.getStartSelectionIfStatementFullRange(editor);
    const endStatementRange = SelectionEndIfRange.get(editor, startStatementRange);
    const haveIfStatementsBeenFound = InvertHighlightedText.haveIfStatementsBeenFound(editor, startStatementRange, endStatementRange);
    if (!haveIfStatementsBeenFound) return null;
    return InvertHighlightedText.combineRanges(editor, startStatementRange, endStatementRange);
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
