import { StartPositionDetails } from '../../../../../../shared/types/inversionRangeDetails';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from './shared/conditionIndicatorValidator';
import { LineTraversalTokenUtils } from './shared/lineTraversalTokenUtils';
import { TokensJSON } from 'shared/inverter/src/shared/types/tokensJSON';
import { Position } from '../../../../../../shared/types/position';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { TextEditor } from 'vscode';

export class ConditionIndicatorBeforeStart {
  private static searchLineFromIndex(line: number, lineTokens: Tokens, tokenIndex: number, allTokens: Tokens): StartPositionDetails {
    const tokens = lineTokens.slice(0, tokenIndex);
    const result = TraversalUtil.findFirstTokenFromSelection(tokens, 0, LineTraversalTokenUtils.conditionIndicators as TokensJSON, false);
    if (result) {
      if (ConditionIndicatorValidator.isIndexOnConditionIndicator(allTokens, result.index, false)) {
        return {
          position: { line, character: LineTraversalTokenUtils.getTokenStringIndex(lineTokens, result.index) },
          replaceableStartOperatorLength: (result.token as string).length,
        };
      }
      return ConditionIndicatorBeforeStart.searchLineFromIndex(line, tokens, result.index, allTokens);
    }
    return { position: { line, character: 0 }, replaceableStartOperatorLength: 0 };
  }

  // WORK - this would thow error if no line above
  private static searchLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): StartPositionDetails {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTraversalTokenUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      if (!LineTraversalTokenUtils.isSpaceToken(lineTokens[i])) {
        return ConditionIndicatorBeforeStart.searchLineFromIndex(line, lineTokens, i + 1, lineTokens);
      }
    }
    return ConditionIndicatorBeforeStart.searchLeftAndUpwards(editor, line - 1);
  }

  // WORK - this would thow error if no line above
  private static isStartOnOrAfterConditionIndicator(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= 0;
    const lineTokens = LineTraversalTokenUtils.getLineTokensAfterCharNumber(editor, line, endChar);
    for (let i = 0; i < lineTokens.length; i += 1) {
      if (!LineTraversalTokenUtils.isSpaceToken(lineTokens[i])) {
        return ConditionIndicatorValidator.isIndexOnConditionIndicator(lineTokens, i);
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
