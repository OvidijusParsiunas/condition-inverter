import { Position as VSCodePosition, Range, TextEditor, Selection } from 'vscode';
import InvertConditions from '../../../shared/out/invert';

interface Position {
  line: number;
  character: number;
}

export class InvertHighlightedText {
  private static createRange(start: Position, end: Position): Range {
    return new Range(new VSCodePosition(start.line, start.character), new VSCodePosition(end.line, end.character));
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

  private static combineRanges(editor: TextEditor, startStatementRange: Range | null, endStatementRange: Range | null): Range {
    const startPosition = startStatementRange?.start || editor.selection.start;
    const endPosition = InvertHighlightedText.getEndPosition(editor, startStatementRange, endStatementRange);
    return InvertHighlightedText.createRange(startPosition, endPosition);
  }

  private static traverseToFindIfStatementUntilPosition(editor: TextEditor, start: Position, end: Position, currentLine: number): Position | null {
    if (currentLine === start.line) {
      const endOfLineProperties = editor.document.lineAt(currentLine).range;
      const startToBedOfLine = InvertHighlightedText.createRange(
        { line: currentLine, character: start.character },
        { line: currentLine, character: end.line === start.line ? end.character : endOfLineProperties.end.character },
      );
      const text = editor.document.getText(startToBedOfLine);
      const ifStatement = text.lastIndexOf('if');
      if (ifStatement > -1) {
        const lineRange = InvertHighlightedText.createRange(
          { line: currentLine, character: 0 },
          { line: currentLine, character: end.line === start.line ? end.character : endOfLineProperties.end.character },
        );
        const lineText = editor.document.getText(lineRange);
        const realIfStatement = lineText.lastIndexOf('if');
        return { line: currentLine, character: realIfStatement };
      }
      return null;
    } else {
      return InvertHighlightedText.traverseToFindIfStatementUntilPosition(editor, start, end, currentLine - 1);
    }
  }

  private static getIfStatementStartIfCursorOnIfWord(editor: TextEditor, lineNumber: number, characterNumber: number, isBeside = true): number {
    const stringAroundStatement = editor.document.getText(
      InvertHighlightedText.createRange(
        { line: lineNumber, character: Math.max(characterNumber - 1, 0) },
        { line: lineNumber, character: characterNumber + 2 },
      ),
    );
    if (stringAroundStatement.substring(0, 2) === 'if') {
      return Math.max(characterNumber - 1, 0);
    } else if (isBeside && stringAroundStatement.substring(1, 3) === 'if') {
      return characterNumber;
    }
    return -1;
  }

  private static getIfStatementEndPosition(editor: TextEditor, start: Position, end: Position): Position | null {
    const cursorOnIfWordStartIndex = InvertHighlightedText.getIfStatementStartIfCursorOnIfWord(editor, end.line, end.character, false);
    if (cursorOnIfWordStartIndex < 0) {
      return InvertHighlightedText.traverseToFindIfStatementUntilPosition(editor, start, end, end.line);
    }
    return { line: end.line, character: cursorOnIfWordStartIndex };
  }

  private static isEndIfStatementSameAsStart(endSelectionPosition: Position, firstIfStatementRange: Range | null): boolean {
    return (
      !firstIfStatementRange ||
      endSelectionPosition.line !== firstIfStatementRange.start.line ||
      endSelectionPosition.character !== firstIfStatementRange.start.character
    );
  }

  private static getEndRange(editor: TextEditor, firstIfStatementRange: Range | null): Range | null {
    const startPosition = firstIfStatementRange === null ? editor.selection.start : firstIfStatementRange.end;
    const endSelectionPosition = InvertHighlightedText.getIfStatementEndPosition(editor, startPosition, editor.selection.end);
    if (endSelectionPosition && InvertHighlightedText.isEndIfStatementSameAsStart(endSelectionPosition, firstIfStatementRange)) {
      const { text } = editor.document.lineAt(endSelectionPosition.line);
      return InvertHighlightedText.getIfStatementRangeFromStart(editor, endSelectionPosition.line, endSelectionPosition, text);
    }
    return null;
  }

  private static isSelectionEndAfterFirstIfStatementEnd(selectionEnd: Position, firstIfStatementEnd: Position): boolean {
    const { line: endLine, character: endCharacter } = selectionEnd;
    const { line, character } = firstIfStatementEnd;
    return line < endLine || (line === endLine && character < endCharacter);
  }

  private static isStartInsideIfStatement(selectionStart: Position, firstIfStatementEnd: Position): boolean {
    const { line: startLine, character: startCharacter } = selectionStart;
    const { line, character } = firstIfStatementEnd;
    return line > startLine || (line === startLine && character >= startCharacter);
  }

  private static endSelectionIfStatementFullRange(editor: TextEditor, firstIfStatementRange: Range | null): Range | null {
    if (
      !firstIfStatementRange ||
      // not sure if this is needed
      // InvertHighlightedText.isStartInsideIfStatement(editor.selection.start, firstIfStatementRange.end) &&
      InvertHighlightedText.isSelectionEndAfterFirstIfStatementEnd(editor.selection.end, firstIfStatementRange.end)
    ) {
      return InvertHighlightedText.getEndRange(editor, firstIfStatementRange);
    }
    return null;
  }

  private static getIfCloseBracketPosition(editor: TextEditor, text: string, lineNumber: number, charNumber: number, openBrackets = 0): Position {
    if (charNumber > text.length - 1) {
      lineNumber += 1;
      text = editor.document.lineAt(lineNumber).text;
      charNumber = 0;
    }
    const nextCharacter = text.charAt(charNumber);
    if (nextCharacter === '(') {
      return InvertHighlightedText.getIfCloseBracketPosition(editor, text, lineNumber, charNumber + 1, openBrackets + 1);
    }
    if (nextCharacter === ')') {
      if (openBrackets === 1) {
        return { character: charNumber, line: lineNumber };
      }
      return InvertHighlightedText.getIfCloseBracketPosition(editor, text, lineNumber, charNumber + 1, openBrackets - 1);
    }
    return InvertHighlightedText.getIfCloseBracketPosition(editor, text, lineNumber, charNumber + 1, openBrackets);
  }

  private static setStartCharIfNoIfInUpperLine(
    textBeforeSelectedLine: string,
    start: Position,
    lineText: string,
    numOfOpenBrackets: number,
    lineNumber: number,
  ): boolean {
    const isOpenBracketInUpperLine = textBeforeSelectedLine.indexOf('(') > -1;
    if (isOpenBracketInUpperLine && numOfOpenBrackets === 0 && start.line !== lineNumber) {
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
    const startLineToSelectedLineRange = InvertHighlightedText.createRange(
      { line: startLineNumber, character: 0 },
      { line: selectedLine, character: 0 },
    );
    return editor.document.getText(startLineToSelectedLineRange);
  }

  private static getIfStatementRangeFromStart(editor: TextEditor, startLine: number, start: Position, text: string): Range | null {
    const textBeforeSelectedLine = InvertHighlightedText.getTextBeforeSelectedLine(editor, start.line, startLine);
    const numOfOpenBrackets = InvertHighlightedText.getNumberOfOpenBrackets(textBeforeSelectedLine);
    const wasIfFound = InvertHighlightedText.setStartCharIfNoIfInUpperLine(textBeforeSelectedLine, start, text, numOfOpenBrackets, startLine);
    if (!wasIfFound) return null;
    const charStartPosition = start.line === startLine ? start.character : 0;
    const end = InvertHighlightedText.getIfCloseBracketPosition(editor, text, startLine, charStartPosition, numOfOpenBrackets);
    end.character += 1;
    return InvertHighlightedText.createRange(start, end);
  }

  private static getIfStatementStartPositionInUpperLine(editor: TextEditor, lineNumber: number): Position | null {
    const upperLineNumber = lineNumber - 1;
    if (upperLineNumber < 0) {
      return null;
    }
    const endOfLineProperties = editor.document.lineAt(upperLineNumber).range;
    const stringAroundStatement = editor.document.getText(
      InvertHighlightedText.createRange(
        { line: upperLineNumber, character: 0 },
        { line: upperLineNumber, character: endOfLineProperties.end.character },
      ),
    );
    const ifIndex = stringAroundStatement.lastIndexOf('if');
    if (ifIndex < 0) {
      return InvertHighlightedText.getIfStatementStartPositionInUpperLine(editor, upperLineNumber);
    }
    return { line: upperLineNumber, character: ifIndex };
  }

  private static getIfStatementStartIfCursorAfterIfWord(editor: TextEditor, lineNumber: number): number {
    const startToCursorText = editor.document.getText(
      InvertHighlightedText.createRange({ line: lineNumber, character: 0 }, { line: lineNumber, character: editor.selection.start.character }),
    );
    return startToCursorText.lastIndexOf('if');
  }

  private static getIfStatementStartPosition(editor: TextEditor, lineNumber: number, lineText: string): Position | null {
    const cursorOnIfWordStartIndex = InvertHighlightedText.getIfStatementStartIfCursorOnIfWord(editor, lineNumber, editor.selection.start.character);
    if (cursorOnIfWordStartIndex < 0) {
      const cursorAfterIfIndex = InvertHighlightedText.getIfStatementStartIfCursorAfterIfWord(editor, lineNumber);
      if (cursorAfterIfIndex < 0) {
        return InvertHighlightedText.getIfStatementStartPositionInUpperLine(editor, lineNumber);
      }
      return { line: lineNumber, character: cursorAfterIfIndex };
    }
    return { line: lineNumber, character: cursorOnIfWordStartIndex };
  }

  private static startSelectionIfStatementFullRange(editor: TextEditor): Range | null {
    const { line: startLine, character: startCharacter } = editor.selection.start;
    // this text is not required
    const { text } = editor.document.lineAt(startLine);
    const start = InvertHighlightedText.getIfStatementStartPosition(editor, startLine, text);
    if (!start) return null;
    const startIfStatementRange = InvertHighlightedText.getIfStatementRangeFromStart(editor, startLine, start, text);
    if (
      !startIfStatementRange ||
      startIfStatementRange.end.line < startLine ||
      (startIfStatementRange.end.line === startLine && startIfStatementRange.end.character <= startCharacter)
    ) {
      return null;
    }
    return startIfStatementRange;
  }

  private static getIfStatementRange(editor: TextEditor): Range {
    const startStatementRange = InvertHighlightedText.startSelectionIfStatementFullRange(editor);
    const endStatementRange = InvertHighlightedText.endSelectionIfStatementFullRange(editor, startStatementRange);
    return InvertHighlightedText.combineRanges(editor, startStatementRange, endStatementRange);
  }

  public static invert(editor: TextEditor): void {
    editor.edit((selectedText) => {
      const ifStatementRange = InvertHighlightedText.getIfStatementRange(editor);
      const ifStatementText = editor.document.getText(ifStatementRange);
      const invertedText = InvertConditions.runInvert(ifStatementText);
      selectedText.replace(ifStatementRange, invertedText);
    });
  }
}
