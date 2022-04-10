import { Position } from '../../../shared/types/invertHighlightedText/invertHighlightedText';
import { FindIfStatementFullRange } from '../../shared/traversal/findIfStatementFullRange';
import { FindIfStatementAtSelectionEnd } from '../traversal/findIfStatementAtSelectionEnd';
import { IsCursorOnIfWord } from '../../shared/isCursorOnIfWord';
import { Range, TextEditor } from 'vscode';

export class SelectionEndIfRange {
  private static isEndIfStatementSameAsStart(endIfStatementPosition: Position, startIfStatementRange: Range | null): boolean {
    return Boolean(
      startIfStatementRange &&
        endIfStatementPosition.line === startIfStatementRange.start.line &&
        endIfStatementPosition.character === startIfStatementRange.start.character,
    );
  }

  private static getIfStatementEndPosition(editor: TextEditor, start: Position, end: Position): Position | null {
    const cursorOnIfWordStartIndex = IsCursorOnIfWord.getStartIndexIfTrue(editor, end.line, end.character, false);
    if (cursorOnIfWordStartIndex === -1) {
      return FindIfStatementAtSelectionEnd.upwardLineTraversal(editor, end.line, start, end);
    }
    return { line: end.line, character: cursorOnIfWordStartIndex };
  }

  private static findEndSelectionIfStatementRange(editor: TextEditor, startIfStatementRange: Range | null): Range | null {
    const startPosition = startIfStatementRange?.end || editor.selection.start;
    const endIfStatementPosition = SelectionEndIfRange.getIfStatementEndPosition(editor, startPosition, editor.selection.end);
    if (endIfStatementPosition && !SelectionEndIfRange.isEndIfStatementSameAsStart(endIfStatementPosition, startIfStatementRange)) {
      const { text } = editor.document.lineAt(endIfStatementPosition.line);
      return FindIfStatementFullRange.findFromStartPosition(editor, endIfStatementPosition.line, endIfStatementPosition, text);
    }
    return null;
  }

  private static doesSelectionEndAfterStartIfStatementEnds(selectionEnd: Position, startIfStatementRangeEnd: Position): boolean {
    const { line: startIfEndLine, character: startIfEndChar } = startIfStatementRangeEnd;
    const { line: selectionEndLine, character: selectionEndChar } = selectionEnd;
    return startIfEndLine < selectionEndLine || (startIfEndLine === selectionEndLine && startIfEndChar < selectionEndChar);
  }

  public static get(editor: TextEditor, startIfStatementRange: Range | null): Range | null {
    if (!startIfStatementRange || SelectionEndIfRange.doesSelectionEndAfterStartIfStatementEnds(editor.selection.end, startIfStatementRange.end)) {
      return SelectionEndIfRange.findEndSelectionIfStatementRange(editor, startIfStatementRange);
    }
    return null;
  }
}
