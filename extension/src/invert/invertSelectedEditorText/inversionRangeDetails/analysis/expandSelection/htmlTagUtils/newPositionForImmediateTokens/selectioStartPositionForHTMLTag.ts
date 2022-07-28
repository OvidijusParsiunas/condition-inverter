import { GetPositionIfSelectionBeforeTagStart } from './shared/getPositionIfSelectionBeforeTagStart';
import { SelectionPositionForHTMLTagShared } from './shared/selectionPositionForHTMLTagShared';
import { MultiLineSearchResult } from '../../../../../shared/types/multilineSearchResult';
import { LineTokenTraversalUtil } from '../../../shared/lineTokenTraversalUtil';
import { Position } from '../../../../../shared/types/position';
import { TextEditor } from 'vscode';

// REF - 1335
export class SelectionStartPositionForHTMLTag {
  // prettier-ignore
  private static getPositionIfSelectionAtEditorStart(
      nextTokenDetails: MultiLineSearchResult, previousTokenDetails: MultiLineSearchResult | null): Position | null {
    // change |< to <| if at start of text editor
    if (!previousTokenDetails && nextTokenDetails?.token === '<') {
        return SelectionPositionForHTMLTagShared.getNewPosition(nextTokenDetails, nextTokenDetails.tokenIndex + 1);
      }
    return null;
  }

  public static getNewPositionIfOnTag(editor: TextEditor, highlightStart: Position): Position | null {
    const nextTokenDetails = LineTokenTraversalUtil.getNextTokenOnSameLineOrBelow(editor, highlightStart.line, highlightStart.character);
    if (!nextTokenDetails) return null;
    const previousTokenDetails = LineTokenTraversalUtil.getPreviousTokenOnSameLineOrAbove(editor, highlightStart.line, highlightStart.character);
    return (
      GetPositionIfSelectionBeforeTagStart.get(editor, true, nextTokenDetails, previousTokenDetails) ||
      SelectionStartPositionForHTMLTag.getPositionIfSelectionAtEditorStart(nextTokenDetails, previousTokenDetails) ||
      SelectionPositionForHTMLTagShared.getPositionIfSelectionBeforeTagEnd(editor, nextTokenDetails, true)
    );
  }
}
