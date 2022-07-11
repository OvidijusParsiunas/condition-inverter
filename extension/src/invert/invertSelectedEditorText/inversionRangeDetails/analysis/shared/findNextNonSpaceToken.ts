import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { LineTokenTraversalUtil } from './lineTokenTraversalUtil';
import { Token } from 'shared/inverter/src/shared/types/tokens';
import { TextEditor } from 'vscode';

export class FindNextNonSpaceToken {
  public static getLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): Token | null {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, line, endChar);
    const nonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, lineTokens.length - 1, false);
    if (nonSpaceTokenIndex > -1) {
      return lineTokens[nonSpaceTokenIndex];
    }
    if (line - 1 < 0) return null;
    return FindNextNonSpaceToken.getLeftAndUpwards(editor, line - 1);
  }
}
