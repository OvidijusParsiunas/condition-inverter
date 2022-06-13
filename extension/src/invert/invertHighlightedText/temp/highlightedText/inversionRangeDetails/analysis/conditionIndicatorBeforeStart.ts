import { StartPositionDetails } from '../../../../../../shared/types/inversionRangeDetails';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from './shared/conditionIndicatorValidator';
import { LineTokenTraversalUtils } from './shared/lineTokenTraversalUtils';
import { TokensJSON } from 'shared/inverter/src/shared/types/tokensJSON';
import { Position } from '../../../../../../shared/types/position';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { TextEditor } from 'vscode';

export class ConditionIndicatorBeforeStart {
  private static searchLineFromIndex(line: number, lineTokens: Tokens, tokenIndex: number, fullLineTokens: Tokens): StartPositionDetails {
    const tokens = lineTokens.slice(0, tokenIndex);
    const result = TraversalUtil.findFirstTokenFromSelection(tokens, 0, LineTokenTraversalUtils.conditionIndicators as TokensJSON, false);
    if (result) {
      if (ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(fullLineTokens, result.index, false)) {
        return {
          position: { line, character: LineTokenTraversalUtils.getTokenStringIndex(lineTokens, result.index) },
          replaceableStartOperatorLength: (result.token as string).length,
        };
      }
      return ConditionIndicatorBeforeStart.searchLineFromIndex(line, tokens, result.index, fullLineTokens);
    }
    return { position: { line, character: 0 }, replaceableStartOperatorLength: 0 };
  }

  // WORK - this would thow error if no line above
  private static searchLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): StartPositionDetails {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      if (!LineTokenTraversalUtils.isSpaceToken(lineTokens[i])) {
        const fullLineTokens = LineTokenTraversalUtils.getFullLineTokens(editor, line);
        return ConditionIndicatorBeforeStart.searchLineFromIndex(line, lineTokens, i + 1, fullLineTokens);
      }
    }
    return ConditionIndicatorBeforeStart.searchLeftAndUpwards(editor, line - 1);
  }

  // WORK - this would thow error if no line above
  private static isStartOnOrAfterConditionIndicator(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= 0;
    const lineTokens = LineTokenTraversalUtils.getLineTokensAfterCharNumber(editor, line, endChar);
    for (let i = 0; i < lineTokens.length; i += 1) {
      if (!LineTokenTraversalUtils.isSpaceToken(lineTokens[i])) {
        return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(lineTokens, i);
      }
    }
    if (editor.document.lineCount - 1 < line + 1) {
      return false;
    }
    return ConditionIndicatorBeforeStart.isStartOnOrAfterConditionIndicator(editor, line + 1);
  }

  public static getStartPositionDetails(editor: TextEditor, highlightStart: Position): StartPositionDetails {
    if (!ConditionIndicatorBeforeStart.isStartOnOrAfterConditionIndicator(editor, highlightStart.line, highlightStart.character)) {
      const conditionIndicatorPosition = ConditionIndicatorBeforeStart.searchLeftAndUpwards(editor, highlightStart.line, highlightStart.character);
      if (conditionIndicatorPosition) return conditionIndicatorPosition;
    }
    return { position: highlightStart, replaceableStartOperatorLength: 0 };
  }
}
