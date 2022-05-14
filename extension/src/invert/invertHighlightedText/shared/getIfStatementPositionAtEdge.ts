import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { GetStringFromRange } from './getStringAroundSelection';
import { RangeCreator } from '../../shared/rangeCreator';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

type GetIndexCallback = 'indexOf' | 'lastIndexOf';

export class GetIfStatementPositionAtEdge {
  // prettier-ignore
  private static validateEdge(
    target: string, editor: TextEditor, index: number, lineNum: number, startChar: number, endChar: number, getIndex: GetIndexCallback, delta: number,
  ): number {
    const text =
      index === 0
        ? GetStringFromRange.get(editor, lineNum, startChar - 1, endChar, delta)
        : GetStringFromRange.get(editor, lineNum, startChar, endChar + 1, delta);
    const tokens = Tokenizer.tokenize(text);
    return tokens[getIndex](target);
  }

  // when the cursor is at the end or start of an if statement, but it is at the edge of selection, by simply tokenizing the selection
  // the token will appear to have a normal if, howerver that if could be an extension of a full word, e.g:
  // helloif| or |ifhello
  // prettier-ignore
  public static validateAndGetTokenIndex(
    target: string, editor: TextEditor, tokens: Tokens, lineNum: number, startChar: number, endChar: number, traverseFromStart: boolean, delta = 0,
  ): number {
    const getIndex: GetIndexCallback = traverseFromStart ? 'indexOf' : 'lastIndexOf';
    const tokenIndex = tokens[getIndex](target);
    if (tokenIndex > -1) {
      if (tokenIndex === 0 || tokenIndex === tokens.length - 1) {
        return GetIfStatementPositionAtEdge.validateEdge(target, editor, tokenIndex, lineNum, startChar, endChar, getIndex, delta);
      }
      return tokenIndex;
    }
    return -1;
  }

  public static validateAndGetCharIndex(target: string, editor: TextEditor, line: number, startChar: number, endChar: number): number {
    const lineRange = RangeCreator.create({ line, character: startChar }, { line, character: endChar });
    const lineText = editor.document.getText(lineRange);
    const tokens = Tokenizer.tokenize(lineText);
    const ifStatementIndex = GetIfStatementPositionAtEdge.validateAndGetTokenIndex(target, editor, tokens, line, startChar, endChar, false);
    if (ifStatementIndex > -1) {
      return tokens.slice(0, ifStatementIndex).join('').length;
    }
    return -1;
  }
}
