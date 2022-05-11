import { Tokens } from '../../../../../shared/out/inverter/src/shared/types/tokens';
import { Tokenizer } from '../../../../../shared/out/tokenizer/tokenizer';
import { GetStringFromRange } from './getStringAroundSelection';
import { TextEditor } from 'vscode';

type GetIndexCallback = 'indexOf' | 'lastIndexOf';

export class ValidateIfCursorBesideIfStatement {
  // prettier-ignore
  private static validateEdge(
    editor: TextEditor, index: number, lineNum: number, startChar: number, endChar: number, getIndex: GetIndexCallback, delta: number,
  ): boolean {
    const text =
      index === 0
        ? GetStringFromRange.get(editor, lineNum, startChar - 1, endChar, delta)
        : GetStringFromRange.get(editor, lineNum, startChar, endChar + 1, delta);
    const tokens = Tokenizer.tokenize(text);
    return tokens[getIndex]('if') > -1;
  }

  // when the cursor is at the end or start of an if statement, but it is at the edge of selection, by simply tokenizing the selection
  // the token will appear to have a normal if, howerver that if could be an extension of a full word, e.g:
  // helloif| or |ifhello
  // prettier-ignore
  public static validate(
    editor: TextEditor, tokens: Tokens, lineNum: number, startChar: number, endChar: number, traverseFromStart: boolean, delta = 0,
  ): boolean {
    // WORK - currently works for both indexOf and lastIndexOf - create test to make sure both are used
    const getIndex: GetIndexCallback = traverseFromStart ? 'indexOf' : 'lastIndexOf';
    const tokenIndex = tokens[getIndex]('if');
    if (tokenIndex > -1) {
      if (tokenIndex === 0 || tokenIndex === tokens.length - 1) {
        return ValidateIfCursorBesideIfStatement.validateEdge(editor, tokenIndex, lineNum, startChar, endChar, getIndex, delta);
      }
      return true;
    }
    return false;
  }
}
