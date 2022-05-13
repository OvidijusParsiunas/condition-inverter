import { SelectionStartIfRange } from './selectionBoundaryIfRanges/selectionStartIfRange';
import { Position } from '../../shared/types/invertHighlightedText/invertHighlightedText';
import { SelectionEndIfRange } from './selectionBoundaryIfRanges/selectionEndIfRange';
import { IfInverter } from '../../../../shared/out/inverter/src/ifInverter';
import { Range, TextEditor, Position as VSCodePosition } from 'vscode';
import { RangeCreator } from '../shared/rangeCreator';

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

  private static getSelectionRangeText(editor: TextEditor): string {
    const range = RangeCreator.create(editor.selection.start, editor.selection.end);
    return editor.document.getText(range);
  }

  // the reason why the position is changed is because if previous traversal has not found an if statement at end of selection
  // returning editor.selection.end would not make sense as the if at the end is not an actual if, but part of another word
  private static changePositionIfStatementAtEnd(editor: TextEditor): Position {
    const text = InvertHighlightedText.getSelectionRangeText(editor);
    if (editor.selection.end.character > 2 && text.substring(text.length - 2, text.length) === 'if') {
      return new VSCodePosition(editor.selection.end.line, editor.selection.end.character - 2);
    }
    return editor.selection.end;
  }

  private static getEndPosition(editor: TextEditor, startStatementRange: Range | null, endStatementRange: Range | null): Position {
    if (endStatementRange) {
      return endStatementRange.end;
    }
    const endSelectionPosition = editor.selection.end;
    if (startStatementRange && InvertHighlightedText.doesStartStatementEndLaterThanSelectionEnd(startStatementRange.end, endSelectionPosition)) {
      return startStatementRange.end;
    }
    return InvertHighlightedText.changePositionIfStatementAtEnd(editor);
  }

  // the reason why the position is changed is because if previous traversal has not found an if statement from start of selection
  // returning editor.selection.start would not make sense as the if at the start is not an actual if, but part of another word
  private static changePositionIfStatementAtStart(editor: TextEditor): Position {
    const text = InvertHighlightedText.getSelectionRangeText(editor);
    if (editor.selection.start.character > 0 && text.substring(0, 2) === 'if') {
      return new VSCodePosition(editor.selection.start.line, editor.selection.start.character + 2);
    }
    return editor.selection.start;
  }

  private static getStartPosition(editor: TextEditor, startStatementRange: Range | null): Position {
    if (startStatementRange) return startStatementRange.start;
    return InvertHighlightedText.changePositionIfStatementAtStart(editor);
  }

  private static combineRanges(editor: TextEditor, startStatementRange: Range | null, endStatementRange: Range | null): Range | null {
    const startPosition = InvertHighlightedText.getStartPosition(editor, startStatementRange);
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
