import { Position } from '../../../types/invertHighlightedText/invertHighlightedText';
import { RangeCreator } from '../rangeCreator';
import { Range, TextEditor } from 'vscode';

export class FindIfStatementFullRange {
  public static getIfCloseBracketPosition(editor: TextEditor, text: string, lineNum: number, charNumber: number, openBrackets = 0): Position {
    if (charNumber > text.length - 1) {
      lineNum += 1;
      text = editor.document.lineAt(lineNum).text;
      charNumber = 0;
    }
    const nextCharacter = text.charAt(charNumber);
    if (nextCharacter === '(') {
      return FindIfStatementFullRange.getIfCloseBracketPosition(editor, text, lineNum, charNumber + 1, openBrackets + 1);
    }
    if (nextCharacter === ')') {
      if (openBrackets === 1) {
        return { character: charNumber, line: lineNum };
      }
      return FindIfStatementFullRange.getIfCloseBracketPosition(editor, text, lineNum, charNumber + 1, openBrackets - 1);
    }
    return FindIfStatementFullRange.getIfCloseBracketPosition(editor, text, lineNum, charNumber + 1, openBrackets);
  }

  private static shouldContinueToAnalyse(textAboveSelectedLine: string, numOfOpenBrackets: number): boolean {
    // if there are open brackets from the text above or there are no brackets above to begin with
    return numOfOpenBrackets > 0 || textAboveSelectedLine.indexOf('(') === -1;
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

  private static getTextAboveSelectedLine(editor: TextEditor, startLineNumber: number, selectedLine: number): string {
    const startLineToSelectedLineRange = RangeCreator.create({ line: startLineNumber, character: 0 }, { line: selectedLine, character: 0 });
    return editor.document.getText(startLineToSelectedLineRange);
  }

  public static findFromStartPosition(editor: TextEditor, startLine: number, start: Position, text: string): Range | null {
    const textAboveSelectedLine = FindIfStatementFullRange.getTextAboveSelectedLine(editor, start.line, startLine);
    const numOfOpenBrackets = FindIfStatementFullRange.getNumberOfOpenBrackets(textAboveSelectedLine);
    const shouldContinue = FindIfStatementFullRange.shouldContinueToAnalyse(textAboveSelectedLine, numOfOpenBrackets);
    if (!shouldContinue) return null;
    const charStartPosition = start.line === startLine ? start.character : 0;
    const end = FindIfStatementFullRange.getIfCloseBracketPosition(editor, text, startLine, charStartPosition, numOfOpenBrackets);
    end.character += 1;
    return RangeCreator.create(start, end);
  }
}
