import { ShouldExpandSelectionStartPastCloseBracket } from './expandSelectionStartPastCloseBracket';
import { StartPositionDetails } from '../../../../../../../shared/types/inversionRangeDetails';
import { IsStartOnOrBeforeConditionIndicator } from './isStartOnOrBeforeConditionIndicator';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { FirstFoundToken } from 'shared/inverter/src/shared/types/firstFoundToken';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { TokensJSON } from 'shared/inverter/src/shared/types/tokensJSON';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { IsTextHighlighted } from '../shared/isTextHighlighted';
import { Range, TextEditor } from 'vscode';

export class ExpandSelectionStartToIndicator {
  private static readonly stopSymbols = { [')']: true, [';']: true, [':']: true, ['{']: true } as TokensJSON;

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

  // stop token is a token that should end further expansion
  private static isStopToken(fullLineTokens: Tokens, { index, token }: FirstFoundToken, isHighlighted: boolean): boolean {
    return (
      (fullLineTokens[index] !== ')' || ShouldExpandSelectionStartPastCloseBracket.check(fullLineTokens, index, isHighlighted)) &&
      (ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(fullLineTokens, index, false) ||
        ExpandSelectionStartToIndicator.stopSymbols[token as keyof typeof ExpandSelectionStartToIndicator.stopSymbols])
    );
  }

  // REF - 1334
  // prettier-ignore
  private static searchLineFromIndex(
      line: number, lineTokens: Tokens, endIndex: number, fullLineTokens: Tokens, isHighlighted: boolean): StartPositionDetails {
    const tokens = lineTokens.slice(0, endIndex);
    const conditionIndicatorTokens = { ...LineTokenTraversalUtils.conditionIndicators, ...ExpandSelectionStartToIndicator.stopSymbols } as TokensJSON;
    const firstFoundConditionIndicatorToken = TraversalUtil.findFirstTokenFromSelection(tokens, 0, conditionIndicatorTokens, false);
    if (firstFoundConditionIndicatorToken) {
      if (ExpandSelectionStartToIndicator.isStopToken(fullLineTokens, firstFoundConditionIndicatorToken, isHighlighted)) {
        return ExpandSelectionStartToIndicator.generateNewStartPositionDetails(line, lineTokens, firstFoundConditionIndicatorToken);
      }
      // prettier-ignore
      return ExpandSelectionStartToIndicator.searchLineFromIndex(
        line, tokens, firstFoundConditionIndicatorToken.index, fullLineTokens, isHighlighted);
    }
    return { position: { line, character: 0 } };
  }

  private static searchLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): StartPositionDetails {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    const nonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, lineTokens.length - 1, false);
    if (nonSpaceTokenIndex > -1) {
      const fullLineTokens = LineTokenTraversalUtils.getFullLineTokens(editor, line);
      const isHighlighted = IsTextHighlighted.check(editor.selection);
      return ExpandSelectionStartToIndicator.searchLineFromIndex(line, lineTokens, nonSpaceTokenIndex + 1, fullLineTokens, isHighlighted);
    }
    if (line === 0) return { position: { line: 0, character: 0 } };
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
