import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { MultiLineSearchResult } from '../../../shared/types/multiLineSearchResult';
import { STATEMENT_JSON } from 'shared/inverter/src/shared/consts/specialTokens';
import { RangeCreator } from '../../../shared/functionality/rangeCreator';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

export class LineTokenTraversalUtil {
  // prettier-ignore
  public static readonly conditionIndicators = {
    ['&']: true, ['|']: true, ['and']: true, ['or']: true, ['<']: true, ['>']: true, ['=']: true, ['?']: true, ...STATEMENT_JSON };

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

  public static getNextTokenOnSameLineOrBelow(editor: TextEditor, line: number, startChar?: number): MultiLineSearchResult | null {
    startChar ??= 0;
    const lineTokensAfterChar = LineTokenTraversalUtil.getLineTokensAfterCharNumber(editor, line, startChar);
    const nonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokensAfterChar, 0);
    if (nonSpaceTokenIndex < lineTokensAfterChar.length) {
      const lineTokensBeforeChar = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, line, startChar);
      const fullLineTokens = LineTokenTraversalUtil.getFullLineTokens(editor, line);
      return { token: lineTokensAfterChar[nonSpaceTokenIndex], tokenIndex: lineTokensBeforeChar.length + nonSpaceTokenIndex, line, fullLineTokens };
    }
    if (editor.document.lineCount - 1 < line + 1) return null;
    return LineTokenTraversalUtil.getNextTokenOnSameLineOrBelow(editor, line + 1);
  }

  public static getPreviousTokenOnSameLineOrAbove(editor: TextEditor, line: number, endChar?: number): MultiLineSearchResult | null {
    endChar = endChar === undefined || endChar < 0 ? editor.document.lineAt(line).range.end.character : endChar;
    const lineTokensBeforeChar = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, line, endChar);
    const nonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokensBeforeChar, lineTokensBeforeChar.length - 1, false);
    if (nonSpaceTokenIndex > -1) {
      const fullLineTokens = LineTokenTraversalUtil.getFullLineTokens(editor, line);
      return { token: lineTokensBeforeChar[nonSpaceTokenIndex], tokenIndex: nonSpaceTokenIndex, line, fullLineTokens };
    }
    if (line === 0) return null;
    return LineTokenTraversalUtil.getPreviousTokenOnSameLineOrAbove(editor, line - 1);
  }
}
