import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { GetPositionIfSelectionBeforeTagStart } from './shared/getPositionIfSelectionBeforeTagStart';
import { SelectionPositionForHTMLTagShared } from './shared/selectionPositionForHTMLTagShared';
import { MultiLineSearchResult } from '../../../../../shared/types/multilineSearchResult';
import { LineTokenTraversalUtil } from '../../../shared/lineTokenTraversalUtil';
import { Position } from '../../../../../shared/types/position';
import { TextEditor, Range } from 'vscode';

// REF - 1335
export class SelectionEndPositionForHTMLTag {
  // prettier-ignore
  private static getPositionIfSelectionAfterCloseTag(
      fullWordRange: Range, nextTokenDetails: MultiLineSearchResult | null, previousTokenDetails: MultiLineSearchResult | null): Position | null {
    if (previousTokenDetails?.token === '>') {
      // change >|< to ><| to prevent inversion
      if (nextTokenDetails?.token === '<') {
        return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex + 1);
      }
      // if previous token is before start selection, stay on current position
      if (!SelectionPositionForHTMLTagShared.isTokenAfterSelection(previousTokenDetails, fullWordRange.start)) {
        return fullWordRange.end;
      }
      // change div>| to div|> when at end of text editor to prevent inversion
      // change div>|asdas to div|>asdas when on element to prevent inversion
      if (!nextTokenDetails ||
          (nextTokenDetails.token !== '<' && AnalyzeHTMLTag.isTagEndSymbol(previousTokenDetails.fullLineTokens, previousTokenDetails.tokenIndex))){
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
