import InvertConditions from '../../../shared/out/invert';
import * as vscode from 'vscode';

interface Range {
  start: number;
  end: number;
}

interface Position {
  line: number;
  character: number;
}

export class InvertViaCursorPosition {
  private static replaceExistingText(
    selectedText: vscode.TextEditorEdit,
    ifStatementIndexRange: Range,
    lineNumber: number,
    invertedText: string,
  ): void {
    const rangeToBeReplaced = InvertViaCursorPosition.createRange(
      { line: lineNumber, character: ifStatementIndexRange.start },
      { line: lineNumber, character: ifStatementIndexRange.end },
    );
    selectedText.replace(rangeToBeReplaced, invertedText);
  }

  private static getInvertedText(lineText: string, ifStatementIndexRange: Range): string {
    const ifStatementText = lineText.substring(ifStatementIndexRange.start, ifStatementIndexRange.end);
    return InvertConditions.runInvert(ifStatementText);
  }

  private static getIndexOfCloseIfStatementBracket(text: string, index: number, openBrackets = 0): number {
    if (index > text.length - 1) {
      console.log('index out of bounds');
      return -1;
    }
    const nextIndex = index + 1;
    const nextCharacter = text.charAt(nextIndex);
    if (nextCharacter === '(') {
      return InvertViaCursorPosition.getIndexOfCloseIfStatementBracket(text, nextIndex, openBrackets + 1);
    }
    if (nextCharacter === ')') {
      if (openBrackets === 1) {
        return nextIndex;
      }
      return InvertViaCursorPosition.getIndexOfCloseIfStatementBracket(text, nextIndex, openBrackets - 1);
    }
    return InvertViaCursorPosition.getIndexOfCloseIfStatementBracket(text, nextIndex, openBrackets);
  }

  private static createRange(start: Position, end: Position): vscode.Range {
    return new vscode.Range(
      new vscode.Position(start.line, start.character),
      new vscode.Position(end.line, end.character),
    );
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

  private static getIfStatementStartIndex(activeEditor: vscode.TextEditor, lineNumber: number): number {
    const startIndex = InvertViaCursorPosition.getIfStatementStartIfCursorOnIfWord(activeEditor, lineNumber);
    if (startIndex < 0) {
      return InvertViaCursorPosition.getIfStatementStartIfCursorAfterIfWord(activeEditor, lineNumber);
    }
    return startIndex;
  }

  private static getIfStatementIndexRange(activeEditor: vscode.TextEditor, lineNumber: number, lineText: string): Range {
    const start = InvertViaCursorPosition.getIfStatementStartIndex(activeEditor, lineNumber);
    const end = InvertViaCursorPosition.getIndexOfCloseIfStatementBracket(lineText, start) + 1;
    return { start, end };
  }

  public static invert(activeEditor: vscode.TextEditor): void {
    activeEditor.edit((selectedText) => {
      const lineNumber = activeEditor.selection.active.line;
      const lineText = activeEditor.document.lineAt(lineNumber).text;
      const ifStatementIndexRange = InvertViaCursorPosition.getIfStatementIndexRange(activeEditor, lineNumber, lineText);
      const invertedText = InvertViaCursorPosition.getInvertedText(lineText, ifStatementIndexRange);
      InvertViaCursorPosition.replaceExistingText(selectedText, ifStatementIndexRange, lineNumber, invertedText);
      // WORK - get lines before and after if if statement does not end
    });
  }
}
