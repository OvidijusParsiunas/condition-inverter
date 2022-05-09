import { Tokenizer } from '../../../../shared/out/tokenizer/tokenizer';
import { RangeCreator } from './rangeCreator';
import { TextEditor } from 'vscode';

export class IsCursorOnIfWord {
  private static readonly selectionStartDelta = 2;

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
    return cursorNumber - IsCursorOnIfWord.selectionStartDelta > -1
      ? // the following returns 2 if there was enough space to extract before the cursor
        IsCursorOnIfWord.selectionStartDelta
      : // the following returns 1 if we ran out of 1 space before the cursor (-1)
        // or returns 0 if we ran out of 2 spaces before cursor position (-2)
        Math.abs(cursorNumber - IsCursorOnIfWord.selectionStartDelta) % IsCursorOnIfWord.selectionStartDelta;
  }

  private static getStringAroundSelection(editor: TextEditor, lineNum: number, cursorNumber: number): string {
    const characterStartNumber = Math.max(cursorNumber - IsCursorOnIfWord.selectionStartDelta, 0);
    const characterEndNumber = cursorNumber + 3;
    return editor.document.getText(
      RangeCreator.create({ line: lineNum, character: characterStartNumber }, { line: lineNum, character: characterEndNumber }),
    );
  }

  // the reason why this is not checking rightOfIfStatement is because all use cases would be traversing to left anyway
  public static getStartIndexIfTrue(editor: TextEditor, lineNum: number, cursorNumber: number, checkIsOnLeftOfIf = true): number {
    const stringAroundSelection = IsCursorOnIfWord.getStringAroundSelection(editor, lineNum, cursorNumber);
    const tokens = Tokenizer.tokenize(stringAroundSelection);
    // the reason why we need this is because a string can simply have a name with the if substring (naifme), hence to make sure
    // that an actual if statement is captured - we need to tokenizer the string
    if (tokens.indexOf('if') > -1) {
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
