import { Position } from '../../../../shared/types/invertHighlightedText/invertHighlightedText';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { RangeCreator } from '../../../shared/rangeCreator';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

export class ConditionIndicatorBeforeStart {
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
        const result = ConditionIndicatorBeforeStart.getLogicalOperatorPosition(tokens, i);
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
    return ConditionIndicatorBeforeStart.traverseLeftAndUpwards(editor, line - 1);
  }

  // use AnalyzeConditionOutsideStatement for downwards analysis
  public static search(editor: TextEditor, startChar: number): { position: Position; statementLength: number } | null {
    return ConditionIndicatorBeforeStart.traverseLeftAndUpwards(editor, editor.selection.start.line, startChar);
  }
}
