import { StartPositionDetails } from '../../../../../../../shared/types/inversionRangeDetails';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { FirstFoundToken } from 'shared/inverter/src/shared/types/firstFoundToken';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { SPACE_JSON } from 'shared/inverter/src/shared/consts/statements';
import { TokensJSON } from 'shared/inverter/src/shared/types/tokensJSON';
import { Position } from '../../../../../../../shared/types/position';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { TextEditor } from 'vscode';

export class ConditionIndicatorBeforeStart {
  private static readonly stopSymbols = { [')']: true, [';']: true } as TokensJSON;

  private static generateNewStartPositionDetails(line: number, lineTokens: Tokens, { index, token }: FirstFoundToken): StartPositionDetails {
    const startPositionDetails: StartPositionDetails = {
      position: { line, character: LineTokenTraversalUtils.getTokenStringIndex(lineTokens, index) },
    };
    // if there is a ternary operator before the start, there is no need to replace it with
    // a condition operator to trigger an invertion on the first ternary expression
    // the close bracket is used to stop traversing any further into another conditional expression e.g. if (hello) |
    if (token !== '?' && !ConditionIndicatorBeforeStart.stopSymbols[token as keyof typeof ConditionIndicatorBeforeStart.stopSymbols]) {
      startPositionDetails.startOperatorPadding = token as string;
    }
    return startPositionDetails;
  }

  private static searchLineFromIndex(line: number, lineTokens: Tokens, endIndex: number, fullLineTokens: Tokens): StartPositionDetails {
    const tokens = lineTokens.slice(0, endIndex);
    const conditionIndicatorTokens = { ...LineTokenTraversalUtils.conditionIndicators, ...ConditionIndicatorBeforeStart.stopSymbols } as TokensJSON;
    const result = TraversalUtil.findFirstTokenFromSelection(tokens, 0, conditionIndicatorTokens, false);
    if (result) {
      if (
        ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(fullLineTokens, result.index, false) ||
        ConditionIndicatorBeforeStart.stopSymbols[result.token as keyof typeof ConditionIndicatorBeforeStart.stopSymbols]
      ) {
        return ConditionIndicatorBeforeStart.generateNewStartPositionDetails(line, lineTokens, result);
      }
      return ConditionIndicatorBeforeStart.searchLineFromIndex(line, tokens, result.index, fullLineTokens);
    }
    return { position: { line, character: 0 } };
  }

  // WORK - this would thow error if no line above
  private static searchLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): StartPositionDetails {
    endChar ??= editor.document.lineAt(line).range.end.character;
    if (endChar === 0 && line === 0) return { position: { line: 0, character: 0 } };
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      if (!SPACE_JSON[lineTokens[i] as string]) {
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
      if (!SPACE_JSON[lineTokens[i] as string]) {
        // this is used to help evaluating more detailed operators like a ternary operator which needs to make sure there is a space before it
        // as otherwise the logic is set to not recognise it as a ternary operator as it is better to skip it (or in this case not traverse
        // backwards past over it). Additionally we can trust endChar to not be in the middle of a word due to previous analysis at FullWordRange
        const tokensBeforeChar = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
        return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(tokensBeforeChar.concat(lineTokens), i + tokensBeforeChar.length);
      }
    }
    if (editor.document.lineCount - 1 < line + 1) {
      return false;
    }
    return ConditionIndicatorBeforeStart.isStartOnOrAfterConditionIndicator(editor, line + 1);
  }

  public static getStartPositionDetails(editor: TextEditor, highlightStart: Position): StartPositionDetails {
    if (!ConditionIndicatorBeforeStart.isStartOnOrAfterConditionIndicator(editor, highlightStart.line, highlightStart.character)) {
      return ConditionIndicatorBeforeStart.searchLeftAndUpwards(editor, highlightStart.line, highlightStart.character);
    }
    return { position: highlightStart };
  }
}
