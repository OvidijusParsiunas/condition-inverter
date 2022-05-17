import { Position } from '../../../shared/types/invertHighlightedText/invertHighlightedText';
import { FindStatementAtSelectionEnd } from '../traversal/findStatementAtSelectionEnd';
import { FindStatementFullRange } from '../../shared/traversal/findStatementFullRange';
import { IsCursorOnStatementWord } from './isCursorOnStatementWord';
import { Range, TextEditor } from 'vscode';

export class StatementEndRange {
  private static isEndStatementSameAsStart(endStatementPosition: Position, startStatementRange: Range | null): boolean {
    return Boolean(
      startStatementRange &&
        endStatementPosition.line === startStatementRange.start.line &&
        endStatementPosition.character === startStatementRange.start.character,
    );
  }

  private static getStatementEndPosition(editor: TextEditor, start: Position, end: Position): Position | null {
    const cursorOnIfWordStartIndex = IsCursorOnStatementWord.getIndexIfTrue(editor, end.line, end.character, false);
    if (cursorOnIfWordStartIndex === -1) {
      return FindStatementAtSelectionEnd.upwardLineTraversal(editor, end.line, start, end);
    }
    return { line: end.line, character: cursorOnIfWordStartIndex };
  }

  private static findEndSelectionStatementRange(editor: TextEditor, startStatementRange: Range | null): Range | null {
    const startPosition = startStatementRange?.end || editor.selection.start;
    const endStatementPosition = StatementEndRange.getStatementEndPosition(editor, startPosition, editor.selection.end);
    if (endStatementPosition && !StatementEndRange.isEndStatementSameAsStart(endStatementPosition, startStatementRange)) {
      return FindStatementFullRange.findFromStatementStart(editor, endStatementPosition.line, endStatementPosition);
    }
    return null;
  }

  private static doesSelectionEndAfterStartStatementEnds(selectionEnd: Position, startStatementRangeEnd: Position): boolean {
    const { line: startIfEndLine, character: startIfEndChar } = startStatementRangeEnd;
    const { line: selectionEndLine, character: selectionEndChar } = selectionEnd;
    return startIfEndLine < selectionEndLine || (startIfEndLine === selectionEndLine && startIfEndChar < selectionEndChar);
  }

  public static get(editor: TextEditor, startStatementRange: Range | null): Range | null {
    if (!startStatementRange || StatementEndRange.doesSelectionEndAfterStartStatementEnds(editor.selection.end, startStatementRange.end)) {
      return StatementEndRange.findEndSelectionStatementRange(editor, startStatementRange);
    }
    return null;
  }
}
