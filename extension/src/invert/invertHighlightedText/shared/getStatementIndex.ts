import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { GetStringFromRange } from './getStringAroundSelection';
import { RangeCreator } from '../../shared/rangeCreator';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

export class GetStatementIndex {
  private static getIndex(key: string, editor: TextEditor, lineNum: number, startChar: number, endChar: number): number {
    const text = GetStringFromRange.get(editor, lineNum, startChar, endChar, 0);
    const tokens = Tokenizer.tokenize(text);
    return tokens.indexOf(key);
  }

  // prettier-ignore
  private static getIndexIfValid(
      editor: TextEditor, tokens: Tokens, lineNum: number, startChar: number, endChar: number, index: number, key?: string): number {
    const token = tokens[index] as keyof typeof STATEMENT_JSON;
    const isToken = key ? key === token : STATEMENT_JSON[token];
    if (isToken) {
      if (index === 0) {
        // left
        const result = GetStatementIndex.getIndex(token, editor, lineNum, startChar - token.length - 1, startChar + token.length);
        if (result > -1) return index;
      } else if (index === tokens.length - 1) {
        // right
        const result = GetStatementIndex.getIndex(token, editor, lineNum, endChar - token.length, endChar + token.length + 1);
        if (result > -1) return index;
      } else {
        return index;
      }
    }
    return -1;
  }

  // when the cursor is at the end or start of an if statement, but it is at the edge of selection, by simply tokenizing the selection
  // the token will appear to have a normal if, howerver that if could be an extension of a full word, e.g:
  // helloif| or |ifhello
  // prettier-ignore
  public static findViaTokensAndValidate(
    editor: TextEditor, tokens: Tokens, lineNum: number, startChar: number, endChar: number, traverseFromStart: boolean, key?: string,
  ): number {
    if (traverseFromStart) {
      for (let i = 0; i < tokens.length; i += 1) {
        const result = GetStatementIndex.getIndexIfValid(editor, tokens, lineNum, startChar, endChar, i, key);
        if (result > -1) return result;
      }
      return -1;
    }
    for (let i = tokens.length - 1; i >= 0; i -= 1) {
      const result = GetStatementIndex.getIndexIfValid(editor, tokens, lineNum, startChar, endChar, i, key);
      if (result > -1) return result;
    }
    return -1;
  }

  // WORK - optimize
  public static findViaRangeAndValidate(editor: TextEditor, line: number, startChar: number, endChar: number, traverseFromStart: boolean): number {
    const lineRange = RangeCreator.create({ line, character: startChar }, { line, character: endChar });
    const lineText = editor.document.getText(lineRange);
    const tokens = Tokenizer.tokenize(lineText);
    const statementIndex = GetStatementIndex.findViaTokensAndValidate(editor, tokens, line, startChar, endChar, traverseFromStart);
    if (statementIndex > -1) {
      return tokens.slice(0, statementIndex).join('').length;
    }
    return -1;
  }
}
