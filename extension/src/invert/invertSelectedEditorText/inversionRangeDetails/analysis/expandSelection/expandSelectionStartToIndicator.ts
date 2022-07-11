import { ShouldExpandSelectionStartPastCloseBracket } from './expandSelectionStartPastCloseBracket';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { StartPositionDetails } from '../../../shared/types/inversionRangeDetails';
import { FirstFoundToken } from 'shared/inverter/src/shared/types/firstFoundToken';
import { LineTokenTraversalUtil } from '../shared/lineTokenTraversalUtil';
import { CurlyBracketSyntaxUtil } from '../shared/curlyBracketSyntaxUtil';
import { ShouldStartSelectionExpand } from './shouldStartSelectionExpand';
import { TokensJSON } from 'shared/inverter/src/shared/types/tokensJSON';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Range, TextEditor } from 'vscode';

export class ExpandSelectionStartToIndicator {
  private static readonly stopSymbols = { [')']: true, [';']: true, [':']: true, ['{']: true } as TokensJSON;

  private static generateNewStartPositionDetails(line: number, lineTokens: Tokens, { index, token }: FirstFoundToken): StartPositionDetails {
    const startPositionDetails: StartPositionDetails = {
      position: { line, character: LineTokenTraversalUtil.getTokenStringIndex(lineTokens, index) },
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
  private static isStopToken(fullLineTokens: Tokens, { index, token }: FirstFoundToken): boolean {
    return (
      (fullLineTokens[index] !== ')' || ShouldExpandSelectionStartPastCloseBracket.check(fullLineTokens, index)) &&
      !CurlyBracketSyntaxUtil.isStringTemplateOpenToken(fullLineTokens, index) &&
      (ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(fullLineTokens, index, false) ||
        ExpandSelectionStartToIndicator.stopSymbols[token as keyof typeof ExpandSelectionStartToIndicator.stopSymbols])
    );
  }

  // REF - 1334
  private static searchLineFromIndex(line: number, lineTokens: Tokens, endIndex: number, fullLineTokens: Tokens): StartPositionDetails {
    const tokens = lineTokens.slice(0, endIndex);
    const conditionIndicatorTokens = { ...LineTokenTraversalUtil.conditionIndicators, ...ExpandSelectionStartToIndicator.stopSymbols } as TokensJSON;
    const firstFoundConditionIndicatorToken = TraversalUtil.findFirstTokenFromSelection(tokens, 0, conditionIndicatorTokens, false);
    if (firstFoundConditionIndicatorToken) {
      if (ExpandSelectionStartToIndicator.isStopToken(fullLineTokens, firstFoundConditionIndicatorToken)) {
        return ExpandSelectionStartToIndicator.generateNewStartPositionDetails(line, lineTokens, firstFoundConditionIndicatorToken);
      }
      // prettier-ignore
      return ExpandSelectionStartToIndicator.searchLineFromIndex(
        line, tokens, firstFoundConditionIndicatorToken.index, fullLineTokens);
    }
    return { position: { line, character: 0 } };
  }

  private static searchLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): StartPositionDetails {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtil.getLineTokensBeforeCharNumber(editor, line, endChar);
    const nonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(lineTokens, lineTokens.length - 1, false);
    if (nonSpaceTokenIndex > -1) {
      const fullLineTokens = LineTokenTraversalUtil.getFullLineTokens(editor, line);
      return ExpandSelectionStartToIndicator.searchLineFromIndex(line, lineTokens, nonSpaceTokenIndex + 1, fullLineTokens);
    }
    if (line === 0) return { position: { line: 0, character: 0 } };
    return ExpandSelectionStartToIndicator.searchLeftAndUpwards(editor, line - 1);
  }

  public static getNewPositionDetails(editor: TextEditor, fullWordRange: Range): StartPositionDetails {
    const highlightStart = fullWordRange.start;
    if (!ShouldStartSelectionExpand.check(editor, highlightStart)) {
      return ExpandSelectionStartToIndicator.searchLeftAndUpwards(editor, highlightStart.line, highlightStart.character);
    }
    return { position: highlightStart };
  }
}
