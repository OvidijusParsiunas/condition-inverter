import { StartPositionDetails } from '../../../../../../../shared/types/inversionRangeDetails';
import { IsStartOnOrBeforeConditionIndicator } from './isStartOnOrBeforeConditionIndicator';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { FirstFoundToken } from 'shared/inverter/src/shared/types/firstFoundToken';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { SPACE_JSON } from 'shared/inverter/src/shared/consts/statements';
import { TokensJSON } from 'shared/inverter/src/shared/types/tokensJSON';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Range, TextEditor } from 'vscode';

export class ExpandSelectionStartToIndicator {
  private static readonly stopSymbols = { [')']: true, [';']: true, [':']: true, ['{']: true } as TokensJSON;

  // this is mostly used for property access -  e.g. if (name().hello)  or  if (name()['hello'])
  private static isPermittedIfCloseBracket(fullLineTokens: Tokens, index: number): boolean {
    if (fullLineTokens[index] === ')') {
      const nextIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, index + 1);
      return fullLineTokens[nextIndex] !== '.' && fullLineTokens[nextIndex] !== '[';
    }
    return true;
  }

  private static generateNewStartPositionDetails(line: number, lineTokens: Tokens, { index, token }: FirstFoundToken): StartPositionDetails {
    const startPositionDetails: StartPositionDetails = {
      position: { line, character: LineTokenTraversalUtils.getTokenStringIndex(lineTokens, index) },
    };
    // if there is a ternary operator before the start, there is no need to replace it with
    // a condition operator to trigger an invertion on the first ternary expression
    // the close bracket is used to stop traversing any further into another conditional expression e.g. if (hello) |
    if (token !== '?' && !ExpandSelectionStartToIndicator.stopSymbols[token as keyof typeof ExpandSelectionStartToIndicator.stopSymbols]) {
      startPositionDetails.startOperatorPadding = token as string;
    }
    return startPositionDetails;
  }

  private static isValidToken(fullLineTokens: Tokens, { index, token }: FirstFoundToken): boolean {
    return (
      ExpandSelectionStartToIndicator.isPermittedIfCloseBracket(fullLineTokens, index) &&
      (ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(fullLineTokens, index, false) ||
        ExpandSelectionStartToIndicator.stopSymbols[token as keyof typeof ExpandSelectionStartToIndicator.stopSymbols])
    );
  }

  private static searchLineFromIndex(line: number, lineTokens: Tokens, endIndex: number, fullLineTokens: Tokens): StartPositionDetails {
    const tokens = lineTokens.slice(0, endIndex);
    const conditionIndicatorTokens = { ...LineTokenTraversalUtils.conditionIndicators, ...ExpandSelectionStartToIndicator.stopSymbols } as TokensJSON;
    const result = TraversalUtil.findFirstTokenFromSelection(tokens, 0, conditionIndicatorTokens, false);
    if (result) {
      if (ExpandSelectionStartToIndicator.isValidToken(fullLineTokens, result)) {
        return ExpandSelectionStartToIndicator.generateNewStartPositionDetails(line, lineTokens, result);
      }
      return ExpandSelectionStartToIndicator.searchLineFromIndex(line, tokens, result.index, fullLineTokens);
    }
    return { position: { line, character: 0 } };
  }

  private static searchLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): StartPositionDetails {
    endChar ??= editor.document.lineAt(line).range.end.character;
    if (endChar === 0 && line === 0) return { position: { line: 0, character: 0 } };
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      if (!SPACE_JSON[lineTokens[i] as string]) {
        const fullLineTokens = LineTokenTraversalUtils.getFullLineTokens(editor, line);
        return ExpandSelectionStartToIndicator.searchLineFromIndex(line, lineTokens, i + 1, fullLineTokens);
      }
    }
    return ExpandSelectionStartToIndicator.searchLeftAndUpwards(editor, line - 1);
  }

  public static getNewPositionDetails(editor: TextEditor, fullWordRange: Range): StartPositionDetails {
    const highlightStart = fullWordRange.start;
    if (!IsStartOnOrBeforeConditionIndicator.check(editor, highlightStart)) {
      return ExpandSelectionStartToIndicator.searchLeftAndUpwards(editor, highlightStart.line, highlightStart.character);
    }
    return { position: highlightStart };
  }
}
