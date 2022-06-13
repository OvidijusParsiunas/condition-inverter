import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from './conditionIndicatorValidator';
import { TokensJSON } from 'shared/inverter/src/shared/types/tokensJSON';
import { LineTokenTraversalUtils } from './lineTokenTraversalUtils';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { Range, TextEditor } from 'vscode';

export class ConditionIndicatorPresence {
  private static isInTokens(tokens: Tokens, tokenIndex: number, allTokens: Tokens): boolean {
    const tokenSlice = tokens.slice(0, tokenIndex);
    const result = TraversalUtil.findFirstTokenFromSelection(tokenSlice, 0, LineTokenTraversalUtils.conditionIndicators as TokensJSON, false);
    if (result) {
      if (ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(allTokens, result.index, false)) {
        return true;
      }
      return ConditionIndicatorPresence.isInTokens(tokenSlice, result.index, allTokens);
    }
    return false;
  }

  public static isInRange(editor: TextEditor, range: Range): boolean {
    const text = editor.document.getText(range);
    const lineTokens = Tokenizer.tokenize(text);
    return ConditionIndicatorPresence.isInTokens(lineTokens, lineTokens.length - 1, lineTokens);
  }
}
