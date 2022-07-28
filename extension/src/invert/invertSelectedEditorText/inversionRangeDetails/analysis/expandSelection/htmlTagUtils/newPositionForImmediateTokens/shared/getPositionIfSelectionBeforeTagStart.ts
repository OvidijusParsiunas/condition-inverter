import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { MultiLineSearchResult } from '../../../../../../shared/types/multilineSearchResult';
import { SelectionPositionForHTMLTagShared } from './selectionPositionForHTMLTagShared';
import { Position } from '../../../../../../shared/types/position';
import { TextEditor } from 'vscode';

// REF - 1335
export class GetPositionIfSelectionBeforeTagStart {
  // prettier-ignore
  private static getNewPositionForEnd(
      nextTokenDetails: MultiLineSearchResult, previousTokenDetails: MultiLineSearchResult | null): Position | null {
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

  private static isTagStartSymbol({ token, fullLineTokens, tokenIndex }: MultiLineSearchResult): boolean {
    return token === '<' && AnalyzeHTMLTag.isTagStartSymbol(fullLineTokens, tokenIndex);
  }

  // prettier-ignore
  public static get(editor: TextEditor, isStart: boolean,
      nextTokenDetails: MultiLineSearchResult | null, previousTokenDetails: MultiLineSearchResult | null): Position | null {
    if (nextTokenDetails && GetPositionIfSelectionBeforeTagStart.isTagStartSymbol(nextTokenDetails)) {
      if (isStart) {
        return GetPositionIfSelectionBeforeTagStart.getNewPositionForStart(editor, nextTokenDetails, previousTokenDetails);
      }
      return GetPositionIfSelectionBeforeTagStart.getNewPositionForEnd(nextTokenDetails, previousTokenDetails);
    }
    // WORK - also check if < is after > in another line
    return null;
  }
}
