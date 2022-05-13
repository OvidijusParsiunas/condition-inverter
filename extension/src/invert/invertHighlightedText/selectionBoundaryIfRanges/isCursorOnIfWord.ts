import { GetIfStatementPositionAtEdge } from '../shared/getIfStatementPositionAtEdge';
import { GetStringFromRange } from '../shared/getStringAroundSelection';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

export class IsCursorOnIfWord {
  private static readonly spacesAroundSelection = 2;

  private static isCursorOnTheLeftOfIfStatement(stringAroundSelection: string, cursorPositionRelativeToSubstring: number): boolean {
    return stringAroundSelection.substring(cursorPositionRelativeToSubstring, cursorPositionRelativeToSubstring + 2) === 'if';
  }

  private static isCursorInMiddleOfIfStatementWord(stringAroundSelection: string, cursorPositionRelativeToSubstring: number): boolean {
    return (
      stringAroundSelection.charAt(cursorPositionRelativeToSubstring - 1) === 'i' &&
      stringAroundSelection.charAt(cursorPositionRelativeToSubstring) === 'f'
    );
  }

  private static getCursorPositionRelativeToExtractedString(cursorNumber: number): number {
    return cursorNumber - IsCursorOnIfWord.spacesAroundSelection > -1 ? IsCursorOnIfWord.spacesAroundSelection : cursorNumber;
  }

  // the reason why this is not checking rightOfIfStatement is because all use cases would be traversing to left anyway
  public static getStartIndexIfTrue(editor: TextEditor, lineNum: number, cursorNumber: number, checkIsOnLeftOfIf = true): number {
    const stringAroundSelection = GetStringFromRange.get(editor, lineNum, cursorNumber, cursorNumber, IsCursorOnIfWord.spacesAroundSelection);
    const tokens = Tokenizer.tokenize(stringAroundSelection);
    // the reason why we need this is because a string can simply have a name with the if substring (naifme), hence to make sure
    // that an actual if statement is captured - we need to tokenizer the string
    // prettier-ignore
    const ifStatementIndex = GetIfStatementPositionAtEdge.validateAndGetTokenIndex(
      editor, tokens, lineNum, cursorNumber, cursorNumber, true, IsCursorOnIfWord.spacesAroundSelection);
    if (ifStatementIndex > -1) {
      const cursorPositionRelativeToSubstring = IsCursorOnIfWord.getCursorPositionRelativeToExtractedString(cursorNumber);
      if (IsCursorOnIfWord.isCursorInMiddleOfIfStatementWord(stringAroundSelection, cursorPositionRelativeToSubstring)) {
        return Math.max(cursorNumber - 1, 0);
      } else if (checkIsOnLeftOfIf && IsCursorOnIfWord.isCursorOnTheLeftOfIfStatement(stringAroundSelection, cursorPositionRelativeToSubstring)) {
        return cursorNumber;
      }
    }
    return -1;
  }
}
