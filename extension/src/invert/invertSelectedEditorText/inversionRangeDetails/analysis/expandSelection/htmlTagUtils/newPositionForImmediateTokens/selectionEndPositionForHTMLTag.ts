import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { GetPositionIfSelectionBeforeTagStart } from './shared/getPositionIfSelectionBeforeTagStart';
import { SelectionPositionForHTMLTagShared } from './shared/selectionPositionForHTMLTagShared';
import { MultiLineSearchResult } from '../../../../../shared/types/multilineSearchResult';
import { LineTokenTraversalUtil } from '../../../shared/lineTokenTraversalUtil';
import { Position } from '../../../../../shared/types/position';
import { TextEditor, Range } from 'vscode';

// REF - 1335
export class SelectionEndPositionForHTMLTag {
  private static isTokenBeforeSelection(previousToken: MultiLineSearchResult, selection: Position): boolean {
    return (
      previousToken.line < selection.line ||
      (previousToken.line === selection.line &&
        LineTokenTraversalUtil.getTokenStringIndex(previousToken.fullLineTokens, previousToken.tokenIndex) < selection.character)
    );
  }

  // prettier-ignore
  private static getPositionIfSelectionAfterCloseTag(
      fullWordRange: Range, nextTokenDetails: MultiLineSearchResult | null, previousTokenDetails: MultiLineSearchResult | null): Position | null {
    if (previousTokenDetails?.token === '>' && AnalyzeHTMLTag.isTagEndSymbol(previousTokenDetails.fullLineTokens, previousTokenDetails.tokenIndex)) {
      // change >|< to ><| to prevent inversion
      if (nextTokenDetails?.token === '<') {
        return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex + 1);
      }
      // if previous token is before start selection, stay on current position
      if (SelectionEndPositionForHTMLTag.isTokenBeforeSelection(previousTokenDetails, fullWordRange.start)) {
        return fullWordRange.end;
      }
      // change div>| to div> to prevent its inversion
      if (!nextTokenDetails || nextTokenDetails.token !== '<') {
        return SelectionPositionForHTMLTagShared.getNewPosition(previousTokenDetails, previousTokenDetails.tokenIndex);
      }
    }
    return null;
  }

  public static getNewPositionIfOnTag(fullWordRange: Range, editor: TextEditor): Position | null {
    const selectionEnd = fullWordRange.end;
    const nextTokenDetails = LineTokenTraversalUtil.getNextTokenOnSameLineOrBelow(editor, selectionEnd.line, selectionEnd.character);
    const previousTokenDetails = LineTokenTraversalUtil.getPreviousTokenOnSameLineOrAbove(editor, selectionEnd.line, selectionEnd.character);
    return (
      SelectionEndPositionForHTMLTag.getPositionIfSelectionAfterCloseTag(fullWordRange, nextTokenDetails, previousTokenDetails) ||
      SelectionPositionForHTMLTagShared.getPositionIfSelectionBeforeTagEnd(editor, nextTokenDetails, false) ||
      GetPositionIfSelectionBeforeTagStart.get(editor, false, nextTokenDetails, previousTokenDetails)
    );
  }
}
