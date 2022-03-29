import InvertConditions from '../../../shared/out/invert';
import * as vscode from 'vscode';

interface Position {
  line: number;
  character: number;
}

export class InvertViaCursorPosition {
  private static getInvertedText(activeEditor: vscode.TextEditor, ifStatementRange: vscode.Range): string {
    const ifStatementText = activeEditor.document.getText(ifStatementRange);
    return InvertConditions.runInvert(ifStatementText);
  }

  private static getIfStatementCloseBracketPosition(text: string, index: number, openBrackets = 0): number {
    if (index > text.length - 1) {
      console.log('index out of bounds');
      return -1;
    }
    const nextCharacter = text.charAt(index);
    if (nextCharacter === '(') {
      return InvertViaCursorPosition.getIfStatementCloseBracketPosition(text, index + 1, openBrackets + 1);
    }
    if (nextCharacter === ')') {
      if (openBrackets === 1) {
        return index;
      }
      return InvertViaCursorPosition.getIfStatementCloseBracketPosition(text, index + 1, openBrackets - 1);
    }
    return InvertViaCursorPosition.getIfStatementCloseBracketPosition(text, index + 1, openBrackets);
  }

  private static createRange(start: Position, end: Position): vscode.Range {
    return new vscode.Range(
      new vscode.Position(start.line, start.character),
      new vscode.Position(end.line, end.character),
    );
  }

  private static getIfStatementStartPositionInUpperLine(activeEditor: vscode.TextEditor, lineNumber: number): Position {
    const upperLineNumber = lineNumber - 1;
    if (upperLineNumber < 0) {
      return { line: upperLineNumber, character: -1 };
    }
    const endOfLineProperties = activeEditor.document.lineAt(upperLineNumber).range;
    const stringAroundStatement = activeEditor.document.getText(
      InvertViaCursorPosition.createRange(
        { line: upperLineNumber, character: 0 },
        { line: upperLineNumber, character: endOfLineProperties.end.character },
      ),
    );
    const ifIndex = stringAroundStatement.lastIndexOf('if');
    if (ifIndex < 0) {
      return InvertViaCursorPosition.getIfStatementStartPositionInUpperLine(activeEditor, upperLineNumber - 1);
    }
    return { line: upperLineNumber, character: ifIndex };
  }

  private static getIfStatementStartIfCursorAfterIfWord(activeEditor: vscode.TextEditor, lineNumber: number): number {
    const startToCursorText = activeEditor.document.getText(
      InvertViaCursorPosition.createRange(
        { line: lineNumber, character: 0 },
        { line: lineNumber, character: activeEditor.selection.active.character },
      ),
    );
    return startToCursorText.lastIndexOf('if');
  }

  private static getIfStatementStartIfCursorOnIfWord(activeEditor: vscode.TextEditor, lineNumber: number): number {
    const stringAroundStatement = activeEditor.document.getText(
      InvertViaCursorPosition.createRange(
        { line: lineNumber, character: Math.max(activeEditor.selection.active.character - 1, 0) },
        { line: lineNumber, character: activeEditor.selection.active.character + 2 },
      ),
    );
    if (stringAroundStatement.substring(0, 2) === 'if') {
      return Math.max(activeEditor.selection.active.character - 1, 0);
    } else if (stringAroundStatement.substring(1, 3) === 'if') {
      return activeEditor.selection.active.character;
    }
    return -1;
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

  private static getStartToCursorText(activeEditor: vscode.TextEditor, currentLine: number, selectedLine: number): string {
    const startLineToSelectedLineRange = InvertViaCursorPosition.createRange(
      { line: selectedLine, character: 0 },
      { line: currentLine, character: 0 },
    );
    return activeEditor.document.getText(startLineToSelectedLineRange);
  }

  private static getIfStatementStartPosition(activeEditor: vscode.TextEditor, lineNumber: number): Position {
    const cursorOnIfWordStartIndex = InvertViaCursorPosition.getIfStatementStartIfCursorOnIfWord(activeEditor, lineNumber);
    if (cursorOnIfWordStartIndex < 0) {
      const cursorAfterIfIndex = InvertViaCursorPosition.getIfStatementStartIfCursorAfterIfWord(activeEditor, lineNumber);
      if (cursorAfterIfIndex < 0) {
        return InvertViaCursorPosition.getIfStatementStartPositionInUpperLine(activeEditor, lineNumber);
      }
      return { line: lineNumber, character: cursorAfterIfIndex };
    }
    return { line: lineNumber, character: cursorOnIfWordStartIndex };
  }

  private static getIfStatementRange(activeEditor: vscode.TextEditor, currentLineNumber: number): vscode.Range {
    const lineText = activeEditor.document.lineAt(currentLineNumber).text;
    const start = InvertViaCursorPosition.getIfStatementStartPosition(activeEditor, currentLineNumber);
    const charStartPosition = start.line === currentLineNumber ? start.character : 0;
    const startToCursorText = InvertViaCursorPosition.getStartToCursorText(activeEditor, currentLineNumber, start.line);
    const numOfOpenBrackets = InvertViaCursorPosition.getNumberOfOpenBrackets(startToCursorText);
    const end = InvertViaCursorPosition.getIfStatementCloseBracketPosition(lineText, charStartPosition, numOfOpenBrackets);
    return InvertViaCursorPosition.createRange(start, { line: currentLineNumber, character: end + 1 });
  }

  public static invert(activeEditor: vscode.TextEditor): void {
    activeEditor.edit((selectedText) => {
      const lineNumber = activeEditor.selection.active.line;
      const ifStatementRange = InvertViaCursorPosition.getIfStatementRange(activeEditor, lineNumber);
      const invertedText = InvertViaCursorPosition.getInvertedText(activeEditor, ifStatementRange);
      selectedText.replace(ifStatementRange, invertedText);
      // WORK - get lines before and after if if statement does not end
      // WORK - if selected outside of if statement, don't invert
    });
  }
}
