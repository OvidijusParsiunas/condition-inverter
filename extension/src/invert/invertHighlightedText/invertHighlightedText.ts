import { StatementTraversalCallbackUtil } from '../../shared/functionality/statementTraversalCallbackUtil';
import { Position } from '../../shared/types/invertHighlightedText/invertHighlightedText';
import { StatementStartRange } from './selectionBoundaryIfRanges/statementStartRange';
import { StatementEndRange } from './selectionBoundaryIfRanges/statementEndRange';
import { IfInverter } from '../../../../shared/out/inverter/src/ifInverter';
import { Range, TextEditor, Position as VSCodePosition } from 'vscode';
import { RangeCreator } from '../shared/rangeCreator';

export class InvertHighlightedText {
  private static getInvertedText(editor: TextEditor, statementRange: Range): string {
    const statementText = editor.document.getText(statementRange);
    return IfInverter.invert(statementText);
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
  private static changePositionIfStatementAtEnd(statement: string, editor: TextEditor): VSCodePosition | null {
    const text = InvertHighlightedText.getSelectionRangeText(editor);
    if (editor.selection.end.character > statement.length && text.substring(text.length - statement.length, text.length) === statement) {
      return new VSCodePosition(editor.selection.end.line, editor.selection.end.character - statement.length);
    }
    return null;
  }

  private static getEndPosition(editor: TextEditor, startStatementRange: Range | null, endStatementRange: Range | null): Position {
    if (endStatementRange) {
      return endStatementRange.end;
    }
    const endSelectionPosition = editor.selection.end;
    if (startStatementRange && InvertHighlightedText.doesStartStatementEndLaterThanSelectionEnd(startStatementRange.end, endSelectionPosition)) {
      return startStatementRange.end;
    }
    return StatementTraversalCallbackUtil.traverseNullable(InvertHighlightedText.changePositionIfStatementAtEnd, editor.selection.end, editor);
  }

  // the reason why the position is changed is because if previous traversal has not found an if statement from start of selection
  // returning editor.selection.start would not make sense as the if at the start is not an actual if, but part of another word
  private static changePositionIfStatementAtStart(statement: string, editor: TextEditor): VSCodePosition | null {
    const text = InvertHighlightedText.getSelectionRangeText(editor);
    if (editor.selection.start.character > 0 && text.substring(0, statement.length) === statement) {
      return new VSCodePosition(editor.selection.start.line, editor.selection.start.character + statement.length);
    }
    return null;
  }

  private static getStartPosition(editor: TextEditor, startStatementRange: Range | null): Position {
    if (startStatementRange) return startStatementRange.start;
    return StatementTraversalCallbackUtil.traverseNullable(InvertHighlightedText.changePositionIfStatementAtStart, editor.selection.start, editor);
  }

  private static combineRanges(editor: TextEditor, startStatementRange: Range | null, endStatementRange: Range | null): Range | null {
    const startPosition = InvertHighlightedText.getStartPosition(editor, startStatementRange);
    const endPosition = InvertHighlightedText.getEndPosition(editor, startStatementRange, endStatementRange);
    return RangeCreator.create(startPosition, endPosition);
  }

  private static getStatementsRange(editor: TextEditor): Range | null {
    const startStatementRange = StatementStartRange.getStartSelectionStatementFullRange(editor);
    const endStatementRange = StatementEndRange.get(editor, startStatementRange);
    if (startStatementRange || endStatementRange) {
      return InvertHighlightedText.combineRanges(editor, startStatementRange, endStatementRange);
    }
    return null;
  }

  public static invert(editor: TextEditor): void {
    editor.edit((selectedText) => {
      const statementsRange = InvertHighlightedText.getStatementsRange(editor);
      if (statementsRange) {
        const invertedText = InvertHighlightedText.getInvertedText(editor, statementsRange);
        selectedText.replace(statementsRange, invertedText);
      }
    });
  }
}
