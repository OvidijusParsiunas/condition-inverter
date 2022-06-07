import { Position } from '../../../../../../shared/types/invertHighlightedText/invertHighlightedText';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { IsTokenWord } from 'shared/inverter/src/shared/functionality/isTokenWord';
import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { TokensJSON } from 'shared/inverter/src/shared/types/tokensJSON';
import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';
import { RangeCreator } from '../../../../../shared/rangeCreator';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

type Result = { position: Position; statementLength: number } | null;

interface TraversalState {
  wasPreviousTokenOpenBracket: boolean;
}

export class ConditionIndicatorBeforeStart {
  private static readonly skippableTokens = { [' ']: true, ['\n']: true, ['\r']: true, ['(']: true, ['!']: true, not: true, typeof: true };

  private static getTokenIndexAsString(tokens: Tokens, index: number): number {
    return tokens.slice(0, index).join('').length;
  }

  private static findStatementStartOnLine(line: number, lineTokens: Tokens, tokenIndex: number): Result {
    const searchResult = TraversalUtil.findFirstTokenFromSelection(lineTokens.slice(0, tokenIndex), 0, STATEMENT_JSON as TokensJSON, false);
    if (searchResult) {
      return {
        position: { line, character: ConditionIndicatorBeforeStart.getTokenIndexAsString(lineTokens, searchResult.index) },
        statementLength: (searchResult.token as string).length,
      };
    }
    return null;
  }
  private static getLogicalOperatorDetails(tokens: Tokens, index: number): { index: number; statementLength: number } | null {
    const currentToken = tokens[index];
    switch (currentToken) {
      case '&':
      case '|':
        return tokens[index - 1] === currentToken ? { index: index - 1, statementLength: 2 } : null;
      case 'and':
      case 'or':
        return { index: index, statementLength: currentToken.length };
      case '<':
      case '>':
        return tokens[index - 1] !== currentToken ? { index: index, statementLength: 1 } : null;
      case '=':
        // no need to increase the length as inverting based on the first two symbols will do the trick
        return tokens[index - 1] === '=' || tokens[index - 1] === '<' || tokens[index - 1] === '>' || tokens[index - 1] === '!'
          ? { index: index - 1, statementLength: 2 }
          : null;
      default:
        return null;
    }
  }

  private static getPositionIfLogicalOperator(line: number, lineTokens: Tokens, tokenIndex: number): Result {
    const logicalOperatorDetails = ConditionIndicatorBeforeStart.getLogicalOperatorDetails(lineTokens, tokenIndex);
    if (logicalOperatorDetails) {
      const characterNumber = ConditionIndicatorBeforeStart.getTokenIndexAsString(lineTokens, logicalOperatorDetails.index);
      return {
        position: { line, character: characterNumber },
        statementLength: logicalOperatorDetails.statementLength,
      };
    }
    return null;
  }

  private static getPositionIfStatementStart(line: number, lineTokens: Tokens, tokenIndex: number, stringIndex: number): Result {
    const token = lineTokens[tokenIndex] as keyof typeof STATEMENT_JSON;
    if (STATEMENT_JSON[token]) {
      return { position: { line, character: stringIndex }, statementLength: token.length };
    }
    return null;
  }

  private static findConditionIndicatorOnLine(line: number, lineTokens: Tokens, tokenIndex: number, currentStringIndex: number): Result {
    const statementPosition = ConditionIndicatorBeforeStart.getPositionIfStatementStart(line, lineTokens, tokenIndex, currentStringIndex);
    if (statementPosition) return statementPosition;
    // if it is a logical operator
    const logicalOperatorPosition = ConditionIndicatorBeforeStart.getPositionIfLogicalOperator(line, lineTokens, tokenIndex);
    if (logicalOperatorPosition) return logicalOperatorPosition;
    // if there is an if statement on the line
    return ConditionIndicatorBeforeStart.findStatementStartOnLine(line, lineTokens, tokenIndex);
  }

  private static isFunctionInvocation(token: Token): boolean {
    return IsTokenWord.check(token);
  }

  private static isSkipFunctionInvocationToken(token: Token, wasPreviousTokenOpenBracket: boolean): boolean {
    return wasPreviousTokenOpenBracket && ConditionIndicatorBeforeStart.isFunctionInvocation(token);
  }

  private static shouldTokenBeSkipped(token: Token, wasPreviousTokenOpenBracket: boolean): boolean {
    return (
      !ConditionIndicatorBeforeStart.skippableTokens[token as keyof typeof ConditionIndicatorBeforeStart.skippableTokens] &&
      !ConditionIndicatorBeforeStart.isSkipFunctionInvocationToken(token, wasPreviousTokenOpenBracket)
    );
  }

  private static getLineTokens(editor: TextEditor, line: number, endChar: number): Tokens {
    const stringBeforeSelectionStart = editor.document.getText(RangeCreator.create({ line: line, character: 0 }, { line: line, character: endChar }));
    return Tokenizer.tokenize(stringBeforeSelectionStart);
  }

  private static traverseLeftAndUpwards(editor: TextEditor, line: number, traversalState: TraversalState, endChar?: number): Result {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = ConditionIndicatorBeforeStart.getLineTokens(editor, line, endChar);
    let currentStringIndex = endChar;
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      const token = lineTokens[i];
      currentStringIndex -= (token as string).length;
      if (ConditionIndicatorBeforeStart.shouldTokenBeSkipped(token, traversalState.wasPreviousTokenOpenBracket)) {
        return ConditionIndicatorBeforeStart.findConditionIndicatorOnLine(line, lineTokens, i, currentStringIndex);
      }
      traversalState.wasPreviousTokenOpenBracket = token === '(';
    }
    return ConditionIndicatorBeforeStart.traverseLeftAndUpwards(editor, line - 1, traversalState);
  }

  private static setWasPreviousTokenOpenBracketInTraversalState(editor: TextEditor, traversalState: TraversalState): void {
    const startPosition = editor.selection.start;
    const charAfterStartPosition = editor.document.getText(
      RangeCreator.create(startPosition, { line: startPosition.line, character: startPosition.character + 1 }),
    );
    traversalState.wasPreviousTokenOpenBracket = charAfterStartPosition === '(';
  }

  // WORK - test for when searching upwards and nothing found
  // WORK - use AnalyzeConditionOutsideStatement for downwards analysis
  // selectionStartChar can vary depending on selection position of a word as it will be at the start if on word
  public static search(editor: TextEditor, selectionStartChar: number): Result {
    const traversalState: TraversalState = { wasPreviousTokenOpenBracket: false };
    ConditionIndicatorBeforeStart.setWasPreviousTokenOpenBracketInTraversalState(editor, traversalState);
    return ConditionIndicatorBeforeStart.traverseLeftAndUpwards(editor, editor.selection.start.line, traversalState, selectionStartChar);
  }
}

// SEARCH STRATEGY:
// Search leftwards and upwards until non skippable token is identified
// If it is a statement start token (e.g. if, while...), return the position of that token
// If a logical operator token, return the position of that token
// If neither of the above - search for statement start anywhere on the current line, if found - return position
// which is NAIVE however it is the only current feasable workaround found to not have to traverse the entire
// codebase to search for a start of a statement which has a high chance of of being a start to a statement
// not part of the condition highlighted. The expectation here is that the statement will have to start on
// the same line which in most of the cases is correct
