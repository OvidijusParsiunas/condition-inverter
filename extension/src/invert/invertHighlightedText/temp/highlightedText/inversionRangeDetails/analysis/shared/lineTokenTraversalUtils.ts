import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';
import { RangeCreator } from '../../../../../../shared/rangeCreator';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

export class LineTokenTraversalUtils {
  private static readonly spaceTokens = { [' ']: true, ['\n']: true, ['\r']: true };

  public static isSpaceToken(token: Token): boolean {
    return LineTokenTraversalUtils.spaceTokens[token as keyof typeof LineTokenTraversalUtils.spaceTokens];
  }

  // prettier-ignore
  public static readonly conditionIndicators = {
    ['&']: true, ['|']: true, ['and']: true, ['or']: true, ['<']: true, ['>']: true, ['=']: true, ...STATEMENT_JSON };

  public static getTokenStringIndex(tokens: Tokens, index: number): number {
    return tokens.slice(0, index).join('').length;
  }

  public static getLineTokensAfterCharNumber(editor: TextEditor, line: number, charNumber: number): Tokens {
    const stringAfterCharNumber = editor.document.getText(
      RangeCreator.create({ line, character: charNumber }, { line, character: editor.document.lineAt(line).range.end.character }),
    );
    return Tokenizer.tokenize(stringAfterCharNumber);
  }

  public static getLineTokensBeforeCharNumber(editor: TextEditor, line: number, charNumber: number): Tokens {
    const stringBeforeCharNumber = editor.document.getText(RangeCreator.create({ line, character: 0 }, { line, character: charNumber }));
    return Tokenizer.tokenize(stringBeforeCharNumber);
  }

  public static getFullLineTokens(editor: TextEditor, line: number): Tokens {
    const stringBeforeCharNumber = editor.document.getText(
      RangeCreator.create({ line, character: 0 }, { line, character: editor.document.lineAt(line).range.end.character }),
    );
    return Tokenizer.tokenize(stringBeforeCharNumber);
  }
}
