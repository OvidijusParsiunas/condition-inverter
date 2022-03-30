import { Position as VSCodePosition, Range, TextEditor } from 'vscode';
import InvertConditions from '../../../shared/out/invert';

interface Position {
  line: number;
  character: number;
}

export class InvertViaCursorPosition {
  private static getInvertedText(editor: TextEditor, ifStatementRange: Range): string {
    const ifStatementText = editor.document.getText(ifStatementRange);
    return InvertConditions.runInvert(ifStatementText);
  }

  private static getIfCloseBracketPosition(editor: TextEditor, text: string, lineNumber: number, charNumber: number, openBrackets = 0): Position {
    if (charNumber > text.length - 1) {
      lineNumber += 1;
      text = editor.document.lineAt(lineNumber).text;
      charNumber = 0;
    }
    const nextCharacter = text.charAt(charNumber);
    if (nextCharacter === '(') {
      return InvertViaCursorPosition.getIfCloseBracketPosition(editor, text, lineNumber, charNumber + 1, openBrackets + 1);
    }
    if (nextCharacter === ')') {
      if (openBrackets === 1) {
        return { character: charNumber, line: lineNumber };
      }
      return InvertViaCursorPosition.getIfCloseBracketPosition(editor, text, lineNumber, charNumber + 1, openBrackets - 1);
    }
    return InvertViaCursorPosition.getIfCloseBracketPosition(editor, text, lineNumber, charNumber + 1, openBrackets);
  }

  private static setSameLineCharIfNotAvailable(
    textBefore: string,
    start: Position,
    lineText: string,
    numOfOpenBrackets: number,
    lineNumber: number,
  ): boolean {
    const doesTextBeforeOpenbracket = textBefore.indexOf('(') > -1;
    if (doesTextBeforeOpenbracket && numOfOpenBrackets === 0 && start.line !== lineNumber) {
      const ifStatementIndex = lineText.indexOf('if');
      if (ifStatementIndex > -1) {
        start.character = ifStatementIndex;
      } else {
        return false;
      }
    }
    return true;
  }

  private static getNumberOfOpenBrackets(startToCursorText: string): number {
    const matchedBrackets = startToCursorText.match(/\(|\)/g);
    if (matchedBrackets) {
      const numberOfOpenBrackets = matchedBrackets.filter((bracket) => bracket === '(').length;
      const numberOfClosed = matchedBrackets.filter((bracket) => bracket === ')').length;
      return numberOfOpenBrackets - numberOfClosed;
    }
    return 0;
  }

  private static getTextBeforeSelectedLine(editor: TextEditor, startLineNumber: number, selectedLine: number): string {
    const startLineToSelectedLineRange = InvertViaCursorPosition.createRange(
      { line: startLineNumber, character: 0 },
      { line: selectedLine, character: 0 },
    );
    return editor.document.getText(startLineToSelectedLineRange);
  }

  private static getIfStatementRangeFromStart(editor: TextEditor, selectedLineNumber: number, start: Position, text: string): Range | null {
    const textBeforeSelectedLine = InvertViaCursorPosition.getTextBeforeSelectedLine(editor, start.line, selectedLineNumber);
    const numOfOpenBrackets = InvertViaCursorPosition.getNumberOfOpenBrackets(textBeforeSelectedLine);
    const wasSet = InvertViaCursorPosition.setSameLineCharIfNotAvailable(textBeforeSelectedLine, start, text, numOfOpenBrackets, selectedLineNumber);
    if (!wasSet) return null;
    const charStartPosition = start.line === selectedLineNumber ? start.character : 0;
    const end = InvertViaCursorPosition.getIfCloseBracketPosition(editor, text, selectedLineNumber, charStartPosition, numOfOpenBrackets);
    end.character += 1;
    return InvertViaCursorPosition.createRange(start, end);
  }

  private static getIfStatementOnSameLineStartIfNoIfBeforeCursor(lineText: string, lineNumber: number): Position | null {
    const ifStatementIndex = lineText.indexOf('if');
    if (ifStatementIndex > -1) {
      return { line: lineNumber, character: ifStatementIndex };
    }
    return null;
  }

  private static createRange(start: Position, end: Position): Range {
    return new Range(new VSCodePosition(start.line, start.character), new VSCodePosition(end.line, end.character));
  }

  private static getIfStatementStartPositionInUpperLine(editor: TextEditor, lineNumber: number): Position | null {
    const upperLineNumber = lineNumber - 1;
    if (upperLineNumber < 0) {
      return null;
    }
    const endOfLineProperties = editor.document.lineAt(upperLineNumber).range;
    const stringAroundStatement = editor.document.getText(
      InvertViaCursorPosition.createRange(
        { line: upperLineNumber, character: 0 },
        { line: upperLineNumber, character: endOfLineProperties.end.character },
      ),
    );
    const ifIndex = stringAroundStatement.lastIndexOf('if');
    if (ifIndex < 0) {
      return InvertViaCursorPosition.getIfStatementStartPositionInUpperLine(editor, upperLineNumber);
    }
    return { line: upperLineNumber, character: ifIndex };
  }

  private static getIfStatementStartIfCursorAfterIfWord(editor: TextEditor, lineNumber: number): number {
    const startToCursorText = editor.document.getText(
      InvertViaCursorPosition.createRange({ line: lineNumber, character: 0 }, { line: lineNumber, character: editor.selection.active.character }),
    );
    return startToCursorText.lastIndexOf('if');
  }

  private static getIfStatementStartIfCursorOnIfWord(editor: TextEditor, lineNumber: number): number {
    const stringAroundStatement = editor.document.getText(
      InvertViaCursorPosition.createRange(
        { line: lineNumber, character: Math.max(editor.selection.active.character - 1, 0) },
        { line: lineNumber, character: editor.selection.active.character + 2 },
      ),
    );
    if (stringAroundStatement.substring(0, 2) === 'if') {
      return Math.max(editor.selection.active.character - 1, 0);
    } else if (stringAroundStatement.substring(1, 3) === 'if') {
      return editor.selection.active.character;
    }
    return -1;
  }

  private static getIfStatementStartPosition(editor: TextEditor, lineNumber: number, lineText: string): Position | null {
    const cursorOnIfWordStartIndex = InvertViaCursorPosition.getIfStatementStartIfCursorOnIfWord(editor, lineNumber);
    if (cursorOnIfWordStartIndex < 0) {
      const cursorAfterIfIndex = InvertViaCursorPosition.getIfStatementStartIfCursorAfterIfWord(editor, lineNumber);
      if (cursorAfterIfIndex < 0) {
        const startPosition = InvertViaCursorPosition.getIfStatementStartPositionInUpperLine(editor, lineNumber);
        if (!startPosition) {
          return InvertViaCursorPosition.getIfStatementOnSameLineStartIfNoIfBeforeCursor(lineText, lineNumber);
        }
        return startPosition;
      }
      return { line: lineNumber, character: cursorAfterIfIndex };
    }
    return { line: lineNumber, character: cursorOnIfWordStartIndex };
  }

  private static getIfStatementRange(editor: TextEditor, selectedLineNumber: number): Range | null {
    const text = editor.document.lineAt(selectedLineNumber).text;
    const start = InvertViaCursorPosition.getIfStatementStartPosition(editor, selectedLineNumber, text);
    if (!start) return start;
    return InvertViaCursorPosition.getIfStatementRangeFromStart(editor, selectedLineNumber, start, text);
  }

  public static invert(editor: TextEditor): void {
    editor.edit((selectedText) => {
      const lineNumber = editor.selection.active.line;
      const ifStatementRange = InvertViaCursorPosition.getIfStatementRange(editor, lineNumber);
      if (ifStatementRange) {
        const invertedText = InvertViaCursorPosition.getInvertedText(editor, ifStatementRange);
        selectedText.replace(ifStatementRange, invertedText);
      }
      // WORK - get lines before and after if if statement does not end
      // WORK - if selected outside of if statement, don't invert
    });
  }
}
