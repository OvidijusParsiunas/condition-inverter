import { Position } from '../../../../shared/types/invertHighlightedText/invertHighlightedText';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { TokensJSON } from 'shared/inverter/src/shared/types/tokensJSON';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { RangeCreator } from '../../../shared/rangeCreator';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

type Result = { position: Position; statementLength: number } | null;

export class ConditionIndicatorBeforeStart {
  private static readonly skippableSymbols = { [' ']: true, ['\n']: true, ['\r']: true, ['(']: true, ['!']: true, not: true, typeof: true };

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

  private static getLineTokens(editor: TextEditor, line: number, endChar: number): Tokens {
    const stringBeforeSelectionStart = editor.document.getText(RangeCreator.create({ line: line, character: 0 }, { line: line, character: endChar }));
    return Tokenizer.tokenize(stringBeforeSelectionStart);
  }

  private static traverseLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): Result {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = ConditionIndicatorBeforeStart.getLineTokens(editor, line, endChar);
    let currentStringIndex = endChar;
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      const token = lineTokens[i];
      currentStringIndex -= (token as string).length;
      if (!ConditionIndicatorBeforeStart.skippableSymbols[token as keyof typeof ConditionIndicatorBeforeStart.skippableSymbols]) {
        return ConditionIndicatorBeforeStart.findConditionIndicatorOnLine(line, lineTokens, i, currentStringIndex);
      }
    }
    return ConditionIndicatorBeforeStart.traverseLeftAndUpwards(editor, line - 1);
  }

  // use AnalyzeConditionOutsideStatement for downwards analysis
  // this can vary due to the fact that if selection is on a word - the start will be at the start of the word
  public static search(editor: TextEditor, selectionStartChar: number): Result {
    return ConditionIndicatorBeforeStart.traverseLeftAndUpwards(editor, editor.selection.start.line, selectionStartChar);
  }
}
