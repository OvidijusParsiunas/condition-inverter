import { TraversalUtil } from '../../../../../shared/out/inverter/src/shared/functionality/traversalUtil';
import { Token, Tokens } from '../../../../../shared/out/inverter/src/shared/types/tokens';
import { Tokenizer } from '../../../../../shared/out/tokenizer/tokenizer';
import { Position } from '../../../shared/types/position';
import { RangeCreator } from '../rangeCreator';
import { Range, TextEditor } from 'vscode';

export class FindStatementFullRange {
  private static getFullRangeOfNonBracketedStatement(lineTokens: Tokens, selectedLine: number, endIndex: number, statementStart: Position): Range {
    const end = { line: selectedLine, character: lineTokens.slice(0, endIndex).join('').length + statementStart.character + 1 };
    return RangeCreator.create(statementStart, end);
  }

  private static tokenizeDownToEndOfLine(editor: TextEditor, startLine: number, startChar: number, selectedLine: number): Tokens {
    const startLineToSelectedLineRange = RangeCreator.create(
      { line: startLine, character: startChar },
      { line: selectedLine, character: editor.document.lineAt(selectedLine).range.end.character },
    );
    const text = editor.document.getText(startLineToSelectedLineRange);
    return Tokenizer.tokenize(text);
  }

  public static getIfCloseBracketPosition(editor: TextEditor, text: string, lineNum: number, charNumber: number, openBrackets: number): Position {
    if (charNumber > text.length - 1) {
      lineNum += 1;
      text = editor.document.lineAt(lineNum).text;
      charNumber = 0;
    }
    const nextCharacter = text.charAt(charNumber);
    if (nextCharacter === '(') {
      return FindStatementFullRange.getIfCloseBracketPosition(editor, text, lineNum, charNumber + 1, openBrackets + 1);
    }
    if (nextCharacter === ')') {
      if (openBrackets === 1) {
        return { character: charNumber, line: lineNum };
      }
      return FindStatementFullRange.getIfCloseBracketPosition(editor, text, lineNum, charNumber + 1, openBrackets - 1);
    }
    return FindStatementFullRange.getIfCloseBracketPosition(editor, text, lineNum, charNumber + 1, openBrackets);
  }

  // prettier-ignore
  private static getFullRangeOfBracketedStatement(
      editor: TextEditor, selectedLine: number, statementStart: Position, numOfOpenBracketsAbove: number): Range {
    const charStartPosition = statementStart.line === selectedLine ? statementStart.character : 0;
    const { text } = editor.document.lineAt(selectedLine);
    const end = FindStatementFullRange.getIfCloseBracketPosition(editor, text, selectedLine, charStartPosition, numOfOpenBracketsAbove);
    end.character += 1;
    return RangeCreator.create(statementStart, end);
  }

  private static getSiblingNonSpaceCharacterIndex(editor: TextEditor, selectedLine: number, statementStart: Position): Token {
    // prettier-ignore
    const statementStartToSelectionTokens = FindStatementFullRange.tokenizeDownToEndOfLine(
      editor, statementStart.line, statementStart.character, selectedLine);
    const siblingTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(statementStartToSelectionTokens, 1, true);
    if (!statementStartToSelectionTokens[siblingTokenIndex]) {
      return FindStatementFullRange.getSiblingNonSpaceCharacterIndex(editor, selectedLine + 1, statementStart);
    }
    return statementStartToSelectionTokens[siblingTokenIndex];
  }

  // prettier-ignore
  private static getStatementEndPosition(
      editor: TextEditor, selectedLine: number, statementStart: Position, numOfOpenBracketsAbove: number): Range {
    const siblingNonSpaceToken = FindStatementFullRange.getSiblingNonSpaceCharacterIndex(editor, selectedLine, statementStart);
    if (siblingNonSpaceToken === '(') {
      return FindStatementFullRange.getFullRangeOfBracketedStatement(editor, selectedLine, statementStart, numOfOpenBracketsAbove);
    }
    const lineTokens = FindStatementFullRange.tokenizeDownToEndOfLine(editor, selectedLine, statementStart.character, selectedLine);
    const pythonEndStatementIndex = lineTokens.indexOf(':');
    // if (pythonEndStatementIndex > -1) {
      return FindStatementFullRange.getFullRangeOfNonBracketedStatement(lineTokens, selectedLine, pythonEndStatementIndex, statementStart);
    // }
    // WORK - used for GO, need to do other work for GO as multiline statements are allowed without brackets
    // const goEndStatementIndex = lineTokens.indexOf('{');
    // return FindStatementFullRange.getFullRangeOfPythonIfStatement(lineTokens, selectedLine, goEndStatementIndex, statementStart);
  }

  // python if statements that do not have brackets can only span one line
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

  private static getTextFromStartToBeforeCurrentLine(editor: TextEditor, startLineNumber: number, selectedLine: number): string {
    const startLineToSelectedLineRange = RangeCreator.create({ line: startLineNumber, character: 0 }, { line: selectedLine, character: 0 });
    return editor.document.getText(startLineToSelectedLineRange);
  }

  // WORK - This will not be required for highlighted text
  // this is used to find if the current selection is within an if statement already and where is its end
  public static findFromStatementStart(editor: TextEditor, selectedLine: number, statementStart: Position): Range | null {
    // WORK - these 3 lines will not be required when only inverting within the bounds of selected text
    const textFromStartToBeforeCurrentLine = FindStatementFullRange.getTextFromStartToBeforeCurrentLine(editor, statementStart.line, selectedLine);
    const numOfOpenBracketsAbove = FindStatementFullRange.getNumberOfOpenBrackets(textFromStartToBeforeCurrentLine);
    const shouldContinue = FindStatementFullRange.shouldContinueToAnalyse(textFromStartToBeforeCurrentLine, numOfOpenBracketsAbove);
    if (!shouldContinue) return null;
    return FindStatementFullRange.getStatementEndPosition(editor, selectedLine, statementStart, numOfOpenBracketsAbove);
  }
}
