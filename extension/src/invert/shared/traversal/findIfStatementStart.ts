import { Position } from '../../../types/invertHighlightedText/invertHighlightedText';
import { IsCursorOnIfWord } from '../isCursorOnIfWord';
import { RangeCreator } from '../rangeCreator';
import { TextEditor } from 'vscode';

export class FindIfStatementStart {
  private static getIfStatementOnSameLineStartIfNoIfBeforeCursor(lineText: string, line: number): Position | null {
    const ifStatementIndex = lineText.indexOf('if');
    if (ifStatementIndex > -1) {
      return { line: line, character: ifStatementIndex };
    }
    return null;
  }

  private static getIfStatementStartPositionInUpperLine(editor: TextEditor, line: number): Position | null {
    const upperLineNumber = line - 1;
    if (upperLineNumber < 0) {
      return null;
    }
    const endOfLineProperties = editor.document.lineAt(upperLineNumber).range;
    const stringAroundStatement = editor.document.getText(
      RangeCreator.create({ line: upperLineNumber, character: 0 }, { line: upperLineNumber, character: endOfLineProperties.end.character }),
    );
    const ifIndex = stringAroundStatement.lastIndexOf('if');
    if (ifIndex < 0) {
      return FindIfStatementStart.getIfStatementStartPositionInUpperLine(editor, upperLineNumber);
    }
    return { line: upperLineNumber, character: ifIndex };
  }

  private static getIfStatementStartIfCursorAfterIfWord(editor: TextEditor, line: number, startChar: number): number {
    const startToCursorText = editor.document.getText(RangeCreator.create({ line: line, character: 0 }, { line: line, character: startChar }));
    return startToCursorText.lastIndexOf('if');
  }

  public static find(editor: TextEditor, line: number, startChar: number, lineText: string, autoInvertIfStatementOnRight = true): Position | null {
    const cursorOnIfWordStartIndex = IsCursorOnIfWord.getStartIndexIfTrue(editor, line, startChar);
    if (cursorOnIfWordStartIndex < 0) {
      const cursorAfterIfIndex = FindIfStatementStart.getIfStatementStartIfCursorAfterIfWord(editor, line, startChar);
      if (cursorAfterIfIndex < 0) {
        const startPosition = FindIfStatementStart.getIfStatementStartPositionInUpperLine(editor, line);
        if (autoInvertIfStatementOnRight && !startPosition) {
          return FindIfStatementStart.getIfStatementOnSameLineStartIfNoIfBeforeCursor(lineText, line);
        }
        return startPosition;
      }
      return { line: line, character: cursorAfterIfIndex };
    }
    return { line: line, character: cursorOnIfWordStartIndex };
  }
}
