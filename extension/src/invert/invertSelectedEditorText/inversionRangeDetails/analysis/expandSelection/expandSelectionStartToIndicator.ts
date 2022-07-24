import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { ShouldExpandSelectionStartPastCloseBracket } from './expandSelectionStartPastCloseBracket';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { STRING_QUOTE_JSON } from 'shared/inverter/src/shared/consts/specialTokens';
import { StartPositionDetails } from '../../../shared/types/inversionRangeDetails';
import { FirstFoundToken } from 'shared/inverter/src/shared/types/firstFoundToken';
import { LineTokenTraversalUtil } from '../shared/lineTokenTraversalUtil';
import { CurlyBracketSyntaxUtil } from '../shared/curlyBracketSyntaxUtil';
import { TokensJSON } from 'shared/inverter/src/shared/types/tokensJSON';
import { IsStartBeforeStopToken } from './isStartBeforeStopToken';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { HTMLTagUtil } from '../shared/htmlTagUtil';
import { Range, TextEditor } from 'vscode';

export class ExpandSelectionStartToIndicator {
  private static readonly auxStopSymbols = { [')']: true, [';']: true, [':']: true, ['{']: true } as TokensJSON;
  private static readonly stopSymbols = {
    ...LineTokenTraversalUtil.conditionIndicators,
    ...ExpandSelectionStartToIndicator.auxStopSymbols,
    ...STRING_QUOTE_JSON,
  } as TokensJSON;

  private static isStartOrEndOfHTMLRelatedSymbol(index: number, fullLineTokens: Tokens): boolean {
    return (
      AnalyzeHTMLTag.isTagStartSymbol(fullLineTokens, index) ||
      AnalyzeHTMLTag.isTagEndSymbol(fullLineTokens, index) ||
      STRING_QUOTE_JSON[fullLineTokens[index] as keyof typeof STRING_QUOTE_JSON]
    );
  }

  // prettier-ignore
  private static generateNewStartPositionDetails(
      line: number, lineTokens: Tokens, { index, token }: FirstFoundToken, fullLineTokens: Tokens): StartPositionDetails {
    // if start cursor is before a ternary operator or html start/end tag sybol, do not include it in inversion text to not invert anything before it
    if (token === '?' || ExpandSelectionStartToIndicator.isStartOrEndOfHTMLRelatedSymbol(index, fullLineTokens)) {
      return { position: { line, character: LineTokenTraversalUtil.getTokenStringIndex(lineTokens, index) + 1 } };
    }
    const startPositionDetails: StartPositionDetails = {
      position: { line, character: LineTokenTraversalUtil.getTokenStringIndex(lineTokens, index) },
    };
    if (!ExpandSelectionStartToIndicator.auxStopSymbols[token as keyof typeof ExpandSelectionStartToIndicator.auxStopSymbols]) {
      startPositionDetails.startOperatorPadding = token as string;
    }
    return startPositionDetails;
  }

  private static isStringEndQuoteForHtmlAttribute(fullLineTokens: Tokens, index: number): boolean {
    if (STRING_QUOTE_JSON[fullLineTokens[index] as keyof typeof STRING_QUOTE_JSON]) {
      // }"|
      const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, index - 1, false);
      if (fullLineTokens[previousTokenIndex] === '}') return AnalyzeHTMLTag.isCloseBraceForHTMLAttribribute(fullLineTokens, previousTokenIndex);
      // ="dog"|
      const openStringQuoteIndex = TraversalUtil.findTokenIndex(fullLineTokens, index, fullLineTokens[index], false);
      if (openStringQuoteIndex > -1) {
        const tokenIndexBeforeOpenStringQuote = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, openStringQuoteIndex - 1, false);
        return fullLineTokens[tokenIndexBeforeOpenStringQuote] === '=';
      }
    }
    return false;
  }

  // stop token is a token that should end further expansion
  private static isStopToken(fullLineTokens: Tokens, { index, token }: FirstFoundToken): boolean {
    if (ExpandSelectionStartToIndicator.isStringEndQuoteForHtmlAttribute(fullLineTokens, index)) return true;
    return (
      (fullLineTokens[index] !== ')' || !ShouldExpandSelectionStartPastCloseBracket.check(fullLineTokens, index)) &&
      !CurlyBracketSyntaxUtil.isStringTemplateOpenToken(fullLineTokens, index) &&
      (ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(fullLineTokens, index, false) ||
        ExpandSelectionStartToIndicator.auxStopSymbols[token as keyof typeof ExpandSelectionStartToIndicator.auxStopSymbols])
    );
  }

  // REF - 1334
  private static searchLineFromIndex(line: number, lineTokens: Tokens, endIndex: number, fullLineTokens: Tokens): StartPositionDetails {
    const tokens = lineTokens.slice(0, endIndex);
    // prettier-ignore
    const firstFoundConditionIndicatorToken = TraversalUtil.findFirstTokenFromSelection(
      tokens, tokens.length - 1, ExpandSelectionStartToIndicator.stopSymbols, false);
    if (firstFoundConditionIndicatorToken) {
      if (ExpandSelectionStartToIndicator.isStopToken(fullLineTokens, firstFoundConditionIndicatorToken)) {
        return ExpandSelectionStartToIndicator.generateNewStartPositionDetails(line, lineTokens, firstFoundConditionIndicatorToken, fullLineTokens);
      }
      return ExpandSelectionStartToIndicator.searchLineFromIndex(line, tokens, firstFoundConditionIndicatorToken.index, fullLineTokens);
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
    const position = HTMLTagUtil.getPositionIfStartOnHTMLTagSymbol(editor, fullWordRange);
    if (position) return { position };
    const highlightStart = fullWordRange.start;
    if (!IsStartBeforeStopToken.check(editor, highlightStart)) {
      return ExpandSelectionStartToIndicator.searchLeftAndUpwards(editor, highlightStart.line, highlightStart.character);
    }
    return { position: highlightStart };
  }
}
