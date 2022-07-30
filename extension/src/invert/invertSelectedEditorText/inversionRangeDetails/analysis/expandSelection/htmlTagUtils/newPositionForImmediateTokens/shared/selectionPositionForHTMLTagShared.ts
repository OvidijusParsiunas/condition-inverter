import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { ExpandIfCursorOnPotentialConditionOperatorUtil } from '../../../../fullWordRange/util/selectionExpansionUtil';
import { MultiLineSearchResult } from '../../../../../../shared/types/multiLineSearchResult';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { STRING_QUOTE_JSON } from 'shared/inverter/src/shared/consts/specialTokens';
import { LineTokenTraversalUtil } from '../../../../shared/lineTokenTraversalUtil';
import { Position } from '../../../../../../shared/types/position';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { TextEditor } from 'vscode';

// REF - 1335
export class SelectionPositionForHTMLTagShared {
  public static getNewPosition(nextTokenDetails: MultiLineSearchResult, index: number): Position {
    return {
      line: nextTokenDetails.line,
      character: LineTokenTraversalUtil.getTokenStringIndex(nextTokenDetails.fullLineTokens, index),
    };
  }

  public static isTokenAfterSelection(token: MultiLineSearchResult, selection: Position): boolean {
    return (
      token.line > selection.line ||
      (token.line === selection.line && LineTokenTraversalUtil.getTokenStringIndex(token.fullLineTokens, token.tokenIndex + 1) > selection.character)
    );
  }

  // prettier-ignore
  private static getPositionIfSelectionBeforePercentage(editor: TextEditor, nextTokenDetails: MultiLineSearchResult,
      isStart: boolean): Position | null {
    const detailsOfTokenAfterNext = LineTokenTraversalUtil.getNextTokenOnSameLineOrBelow(editor, nextTokenDetails.line,
      LineTokenTraversalUtil.getTokenStringIndex(nextTokenDetails?.fullLineTokens, nextTokenDetails?.tokenIndex) + 1);
    if (detailsOfTokenAfterNext?.token === '>') {
      // keep |%> as |%> 
      if (!isStart || (!SelectionPositionForHTMLTagShared.isTokenAfterSelection(detailsOfTokenAfterNext, editor.selection.end))) {
        return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex);
      }
    }
    return null;
  }

  // prettier-ignore
  private static getPositionIfSelectionBeforeGreaterThan(editor: TextEditor, nextTokenDetails: MultiLineSearchResult,
      previousTokenDetails: MultiLineSearchResult | null, isStart: boolean): Position | null {
    // prettier-ignore
    const detailsOfTokenAfterNext = LineTokenTraversalUtil.getNextTokenOnSameLineOrBelow(editor, nextTokenDetails.line,
      LineTokenTraversalUtil.getTokenStringIndex(nextTokenDetails.fullLineTokens, nextTokenDetails.tokenIndex) + 1);
    // change >|< to |> or |>< to prevent inversion
    if (detailsOfTokenAfterNext?.token === '<') {
      return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex);
    }
    // change %|> to %>| for backboneJS&ASPNET 
    if (previousTokenDetails?.token === '%') {
      return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex + 1);
    }
    // change >| (if at end of text editor)
    if (!detailsOfTokenAfterNext) {
      return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex);
    }
    // change |> to >| if next token is not after selection end (will not take place for end)
    if (isStart && !SelectionPositionForHTMLTagShared.isTokenAfterSelection(detailsOfTokenAfterNext, editor.selection.end)) {
      return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex + 1);
    }
    return null;
  }

  // prettier-ignore
  public static getPositionIfSelectionBeforeTagEnd(
      editor: TextEditor, nextTokenDetails: MultiLineSearchResult | null,
      previousTokenDetails: MultiLineSearchResult | null, isStart: boolean): Position | null {
    if (nextTokenDetails?.token === '>' && AnalyzeHTMLTag.isTagEndSymbol(nextTokenDetails.fullLineTokens, nextTokenDetails.tokenIndex)) {
      return SelectionPositionForHTMLTagShared.getPositionIfSelectionBeforeGreaterThan(editor, nextTokenDetails, previousTokenDetails, isStart);
    }
    if (nextTokenDetails?.token === '%') {
      return SelectionPositionForHTMLTagShared.getPositionIfSelectionBeforePercentage(editor, nextTokenDetails, isStart);
    }
    return null;
  }

  private static ifNextTokenStringQuoteIsPartOfHTMLAttribute(fullLineTokens: Tokens, equalsIndex: number, stringQuoteIndex: number): boolean {
    if (STRING_QUOTE_JSON[fullLineTokens[stringQuoteIndex] as keyof typeof STRING_QUOTE_JSON] || fullLineTokens[stringQuoteIndex] === ']') {
      return ExpandIfCursorOnPotentialConditionOperatorUtil.getEqualsExpansionUntilItEnds(fullLineTokens, equalsIndex) === 1;
    }
    return false;
  }

  public static isEqualsForHTMLAttribute(fullLineTokens: Tokens, equalsIndex: number): boolean {
    const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, equalsIndex - 1);
    // prettier-ignore
    const isPreviousTokenForHTMLAttribute = SelectionPositionForHTMLTagShared.ifNextTokenStringQuoteIsPartOfHTMLAttribute(
      fullLineTokens, equalsIndex, previousTokenIndex);
    if (isPreviousTokenForHTMLAttribute) return true;
    const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, equalsIndex + 1);
    return SelectionPositionForHTMLTagShared.ifNextTokenStringQuoteIsPartOfHTMLAttribute(fullLineTokens, equalsIndex, nextTokenIndex);
  }
}
