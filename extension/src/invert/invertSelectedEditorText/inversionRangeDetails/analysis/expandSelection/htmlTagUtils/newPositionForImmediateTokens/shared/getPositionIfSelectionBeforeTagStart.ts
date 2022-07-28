import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { MultiLineSearchResult } from '../../../../../../shared/types/multilineSearchResult';
import { SelectionPositionForHTMLTagShared } from './selectionPositionForHTMLTagShared';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { Position } from '../../../../../../shared/types/position';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { TextEditor } from 'vscode';

// REF - 1335
export class GetPositionIfSelectionBeforeTagStart {
  // prettier-ignore
  private static getNewPositionForEnd(
      nextTokenDetails: MultiLineSearchResult, previousTokenDetails: MultiLineSearchResult | null): Position | null {
    // change >|< to ><| to prevent inversion
    if (!previousTokenDetails || previousTokenDetails.fullLineTokens[previousTokenDetails.tokenIndex] === '>') {
      return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex + 1);
    }
    return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex);
  }

  // prettier-ignore
  private static getNewPositionForStart(
      editor: TextEditor, nextTokenDetails: MultiLineSearchResult, previousTokenDetails: MultiLineSearchResult | null): Position | null {
    // change |< to <| if selection is at start of the text editor
    if (!previousTokenDetails) {
      return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex + 1);
    }
    // change >|< to |>< to prevent inversion
    if (previousTokenDetails.fullLineTokens[previousTokenDetails.tokenIndex] === '>') {
      return SelectionPositionForHTMLTagShared.getNewPosition(previousTokenDetails, previousTokenDetails.tokenIndex);
    }
    // keep |</ as |</ to prevent inversion
    if (nextTokenDetails.fullLineTokens[nextTokenDetails.tokenIndex + 1] === '/') {
      return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex);
    }
    // keep start position if next token is after selection end
    if (SelectionPositionForHTMLTagShared.isTokenAfterSelection(nextTokenDetails, editor.selection.end)) {
      return editor.selection.start;
    }
    // change |< to <|
    return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex + 1);
  }

  // when |<word, the < symbol is assumed to be a tag start symbol when at the start of a line without a check for the > symbol
  private static isTagStartSymbolRelaxed(fullLineTokens: Tokens, tokenIndex: number): boolean {
    return (
      AnalyzeHTMLTag.isHTMLTagWord(fullLineTokens[tokenIndex + 1]) &&
      TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, tokenIndex - 1, false) === -1
    );
  }

  private static isTagStartSymbol(nextTokenDetails: MultiLineSearchResult, previousTokenDetails: MultiLineSearchResult | null): boolean {
    return (
      // >|<
      previousTokenDetails?.token === '>' ||
      // |<div>
      AnalyzeHTMLTag.isTagStartSymbol(nextTokenDetails.fullLineTokens, nextTokenDetails.tokenIndex) ||
      // |<div
      GetPositionIfSelectionBeforeTagStart.isTagStartSymbolRelaxed(nextTokenDetails.fullLineTokens, nextTokenDetails.tokenIndex)
    );
  }

  // prettier-ignore
  public static get(editor: TextEditor, isStart: boolean,
      nextTokenDetails: MultiLineSearchResult | null, previousTokenDetails: MultiLineSearchResult | null): Position | null {
    if (nextTokenDetails?.token === '<' && GetPositionIfSelectionBeforeTagStart.isTagStartSymbol(nextTokenDetails, previousTokenDetails)) {
      if (isStart) {
        return GetPositionIfSelectionBeforeTagStart.getNewPositionForStart(editor, nextTokenDetails, previousTokenDetails);
      }
      return GetPositionIfSelectionBeforeTagStart.getNewPositionForEnd(nextTokenDetails, previousTokenDetails);
    }
    return null;
  }
}
