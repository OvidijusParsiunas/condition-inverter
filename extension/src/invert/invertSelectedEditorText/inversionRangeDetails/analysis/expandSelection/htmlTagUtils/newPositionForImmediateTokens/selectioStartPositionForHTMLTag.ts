import { GetPositionIfSelectionBeforeTagStart } from './shared/getPositionIfSelectionBeforeTagStart';
import { SelectionPositionForHTMLTagShared } from './shared/selectionPositionForHTMLTagShared';
import { LineTokenTraversalUtil } from '../../../shared/lineTokenTraversalUtil';
import { Position } from '../../../../../shared/types/position';
import { TextEditor } from 'vscode';

// REF - 1335
export class SelectionStartPositionForHTMLTag {
  public static getNewPositionIfOnTag(editor: TextEditor, highlightStart: Position): Position | null {
    const nextTokenDetails = LineTokenTraversalUtil.getNextTokenOnSameLineOrBelow(editor, highlightStart.line, highlightStart.character);
    if (!nextTokenDetails) return null;
    const previousTokenDetails = LineTokenTraversalUtil.getPreviousTokenOnSameLineOrAbove(editor, highlightStart.line, highlightStart.character);
    return (
      GetPositionIfSelectionBeforeTagStart.get(editor, true, nextTokenDetails, previousTokenDetails) ||
      SelectionPositionForHTMLTagShared.getPositionIfSelectionBeforeTagEnd(editor, nextTokenDetails, true)
    );
  }
}
