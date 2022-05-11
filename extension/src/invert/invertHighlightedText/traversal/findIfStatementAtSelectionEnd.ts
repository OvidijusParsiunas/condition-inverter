import { ValidateIfCursorBesideIfStatement } from '../shared/validateIfCursorBesideIfStatement';
import { Position } from '../../../shared/types/invertHighlightedText/invertHighlightedText';
import { Tokenizer } from '../../../../../shared/out/tokenizer/tokenizer';
import { RangeCreator } from '../../shared/rangeCreator';
import { TextEditor } from 'vscode';

export class FindIfStatementAtSelectionEnd {
  // WORK: needs to be expandable for elif, also tests for highlighted/selected scenarios
  private static getIfStatementIndex(editor: TextEditor, line: number, startChar: number, endChar: number): number {
    const lineRange = RangeCreator.create({ line, character: startChar }, { line, character: endChar });
    const lineText = editor.document.getText(lineRange);
    const tokens = Tokenizer.tokenize(lineText);
    if (ValidateIfCursorBesideIfStatement.validate(editor, tokens, line, startChar, endChar, false)) {
      const index = tokens.lastIndexOf('if');
      return tokens.slice(0, index).join('').length;
    }
    return -1;
  }

  private static searchFromSelectionStart(editor: TextEditor, line: number, startChar: number, end: Position): number {
    const endOfLineChar = editor.document.lineAt(line).range.end.character;
    const endChar = end.line === line ? end.character : endOfLineChar;
    return FindIfStatementAtSelectionEnd.getIfStatementIndex(editor, line, startChar, endChar);
  }

  private static searchForIfStatementInLine(editor: TextEditor, line: number, start: Position, end: Position): Position | null {
    const startChar = start.line === line ? start.character : 0;
    const relativeIfStatementIndexToSelection = FindIfStatementAtSelectionEnd.searchFromSelectionStart(editor, line, startChar, end);
    if (relativeIfStatementIndexToSelection > -1) {
      return { line: line, character: relativeIfStatementIndexToSelection + startChar };
    }
    return null;
  }

  public static upwardLineTraversal(editor: TextEditor, line: number, start: Position, end: Position): Position | null {
    if (line === start.line) {
      return FindIfStatementAtSelectionEnd.searchForIfStatementInLine(editor, line, start, end);
    }
    const positionResult = FindIfStatementAtSelectionEnd.searchForIfStatementInLine(editor, line, start, end);
    if (positionResult) return positionResult;
    return FindIfStatementAtSelectionEnd.upwardLineTraversal(editor, line - 1, start, end);
  }
}
