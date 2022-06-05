import { Position } from '../../../shared/types/invertHighlightedText/invertHighlightedText';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { RangeCreator } from '../../shared/rangeCreator';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor, Range } from 'vscode';
// prettier-ignore
import {
  AnalyzeConditionOutsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
// prettier-ignore
import AnalyzeConditionInsideStatement
from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionInsideStatement/analyzeConditionInsideStatement';

export class TempFile {
  private static traverseUpwards(editor: TextEditor, line: number): Position | null {
    if (line === -1) return null;
    const stringBeforeSelectionStart = editor.document.getText(editor.document.lineAt(line).range);
    const tokens = Tokenizer.tokenize(stringBeforeSelectionStart);
    let currentStringIndex = stringBeforeSelectionStart.length;
    for (let i = tokens.length - 1; i >= 0; i -= 1) {
      const token = tokens[i];
      currentStringIndex -= (token as string).length;
      if (STATEMENT_JSON[token as keyof typeof STATEMENT_JSON]) {
        return { line: line, character: currentStringIndex };
      }
      if (token !== ' ' && token !== '\n' && token !== '\r' && token !== '(' && token !== '!') {
        return null;
      }
    }
    return TempFile.traverseUpwards(editor, line - 1);
  }

  private static getLogicalOperatorPosition(tokens: Tokens, index: number): { index: number; length: number } | null {
    const currentToken = tokens[index];
    switch (currentToken) {
      case '&':
      case '|':
        return tokens[index - 1] === currentToken ? { index: index - 1, length: 2 } : null;
      case 'and':
      case 'or':
        return { index: index, length: currentToken.length };
      case '<':
      case '>':
        return tokens[index - 1] !== currentToken ? { index: index, length: 1 } : null;
      case '=':
        // no need to increase the length as inverting the first two symbols will do the trick
        return tokens[index - 1] === '=' || tokens[index - 1] === '<' || tokens[index - 1] === '>' || tokens[index - 1] === '!'
          ? { index: index - 1, length: 2 }
          : null;
      default:
        return null;
    }
  }

  private static isLogicalOperator(tokens: Tokens, index: number): boolean {
    const currentToken = tokens[index];
    switch (currentToken) {
      case '&':
      case '|':
        return tokens[index - 1] === currentToken;
      case 'and':
      case 'or':
        return true;
      case '<':
      case '>':
        return tokens[index - 1] !== currentToken;
      case '=':
        return tokens[index - 1] === '=' || tokens[index - 1] === '<' || tokens[index - 1] === '>' || tokens[index - 1] === '!';
      default:
        return false;
    }
  }

  // use AnalyzeConditionOutsideStatement for downwards analysis
  private static isCondition(editor: TextEditor, startLine: number, endChar?: number): boolean {
    const endChararacter = endChar === undefined ? editor.document.lineAt(startLine).range.end.character : endChar;
    const stringBeforeSelectionStart = editor.document.getText(
      RangeCreator.create({ line: startLine, character: 0 }, { line: startLine, character: endChararacter }),
    );
    const tokens = Tokenizer.tokenize(stringBeforeSelectionStart);
    for (let i = tokens.length - 1; i >= 0; i -= 1) {
      const token = tokens[i];
      if (STATEMENT_JSON[token as keyof typeof STATEMENT_JSON]) {
        return true;
      }
      // WORK - use current index to invert so as to turn !dog when only dog is inverted into dog
      // do not update index if ( is present
      // if symbol (and already known not a statement)
      if (token !== ' ' && token !== '\n' && token !== '\r' && token !== '(' && token !== '!' && token !== 'not') {
        // if it is a logical operator
        const result = TempFile.getLogicalOperatorPosition(tokens, i);
        if (result) return true;
        // if there is an if statement on the line
        const searchResult = TraversalUtil.findFirstTokenFromSelection(tokens.slice(0, i), 0, STATEMENT_JSON as { [key: string]: true }, false);
        if (searchResult) return true;
        return false;
      }
    }
    return TempFile.isCondition(editor, startLine - 1);
  }

  // use AnalyzeConditionOutsideStatement for downwards analysis
  private static traverseLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): { position: Position; statementLength: number } | null {
    const endChararacter = endChar === undefined ? editor.document.lineAt(line).range.end.character : endChar;
    const stringBeforeSelectionStart = editor.document.getText(
      RangeCreator.create({ line: line, character: 0 }, { line: line, character: endChararacter }),
    );
    const tokens = Tokenizer.tokenize(stringBeforeSelectionStart);
    let currentStringIndex = endChararacter;
    for (let i = tokens.length - 1; i >= 0; i -= 1) {
      const token = tokens[i];
      currentStringIndex -= (token as string).length;
      if (STATEMENT_JSON[token as keyof typeof STATEMENT_JSON]) {
        return { position: { line, character: currentStringIndex }, statementLength: (token as string).length };
      }
      // if symbol (and already known not a statement)
      if (token !== ' ' && token !== '\n' && token !== '\r' && token !== '(' && token !== '!' && token !== 'not' && token !== 'typeof') {
        // if it is a logical operator
        const result = TempFile.getLogicalOperatorPosition(tokens, i);
        if (result) return { position: { line, character: tokens.slice(0, result.index).join('').length }, statementLength: result.length };
        // if there is an if statement on the line
        const searchResult = TraversalUtil.findFirstTokenFromSelection(tokens.slice(0, i), 0, STATEMENT_JSON as { [key: string]: true }, false);
        if (searchResult)
          return {
            position: { line, character: tokens.slice(0, searchResult.index).join('').length },
            statementLength: (searchResult.token as string).length,
          };
        return null;
      }
    }
    return TempFile.traverseLeftAndUpwards(editor, line - 1);
  }

  private static getIndexOfToken(line: string, position: number, isStart: boolean): number {
    const tokens = Tokenizer.tokenize(line);
    let currentStringIndex = 0;
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];
      if (isStart) {
        if (currentStringIndex + (token as string).length > position) {
          // if left of token is !, not, typeof
          return currentStringIndex;
        }
      } else {
        if (currentStringIndex + (token as string).length >= position) {
          return currentStringIndex + (token as string).length;
        }
      }

      currentStringIndex += (token as string).length;
    }
    return -1;
  }

  private static readonly conditionAnalyzers = [AnalyzeConditionOutsideStatement, AnalyzeConditionInsideStatement];

  private static canInversionStart(highlightedRange: Range, editor: TextEditor): boolean {
    const statementText = editor.document.getText(highlightedRange);
    const tokens = Tokenizer.tokenize(statementText);
    for (let index = 0; index < tokens.length; index += 1) {
      for (let i = 0; i < TempFile.conditionAnalyzers.length; i += 1) {
        if (TempFile.conditionAnalyzers[i].shouldAnalysisStart(tokens, index)) {
          return true;
        }
      }
    }
    return false;
  }

  // click rules:
  // if not traverse further back on the same line to see if statement
  // if no symbol on the left traverse up to do the same
  // if nothing found
  // try to see if logical/ternary operator on the right

  // highlight rules
  // same process for above when nothing inside highlighted text
  // WORK - _ that is next to the string should be regarded as part of it
  public static getStatementRange(editor: TextEditor): { rangeToInvert: Range; statementLength?: number } {
    // traverse rightwards and downwards through spaces and close brackets to see ternary operator
    const startLine = editor.document.getText(
      RangeCreator.create(
        { line: editor.selection.start.line, character: 0 },
        { line: editor.selection.start.line, character: editor.document.lineAt(editor.selection.start.line).range.end.character },
      ),
    );
    const startChar = TempFile.getIndexOfToken(startLine, editor.selection.start.character, true);
    const actualStartPosition: Position = { line: editor.selection.start.line, character: startChar };
    // IF false, check if end
    const endLine = editor.document.getText(
      RangeCreator.create(
        { line: editor.selection.end.line, character: 0 },
        { line: editor.selection.end.line, character: editor.document.lineAt(editor.selection.end.line).range.end.character },
      ),
    );
    const end = TempFile.getIndexOfToken(endLine, editor.selection.end.character, false);
    // WORK - check if upon checking an if/for statement that has brackets, that selection is not after bracket end

    // return length of logical operator (if logical operator) so we can mock it out and not include
    let result: { rangeToInvert: Range; statementLength?: number } = {
      rangeToInvert: RangeCreator.create(actualStartPosition, {
        line: editor.selection.end.line,
        character: end,
      }),
    };
    const isStatementStartable = TempFile.canInversionStart(result.rangeToInvert, editor);
    if (!isStatementStartable) {
      const outsideStatementStartPosition = TempFile.traverseLeftAndUpwards(editor, editor.selection.start.line, startChar);
      if (outsideStatementStartPosition) {
        result = {
          rangeToInvert: RangeCreator.create(outsideStatementStartPosition.position, {
            line: editor.selection.end.line,
            character: end,
          }),
          statementLength: outsideStatementStartPosition.statementLength,
        };
      }
    }
    return result;
  }
}
