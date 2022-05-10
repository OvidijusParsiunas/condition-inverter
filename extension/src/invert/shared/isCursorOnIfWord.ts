import { Tokens } from '../../../../shared/inverter/src/shared/types/tokens';
import { Tokenizer } from '../../../../shared/out/tokenizer/tokenizer';
import { RangeCreator } from './rangeCreator';
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

  private static getStringAroundSelection(editor: TextEditor, lineNum: number, cursorNumber: number, startDelta: number, endDelta: number): string {
    const characterStartNumber = Math.max(cursorNumber - IsCursorOnIfWord.spacesAroundSelection + startDelta, 0);
    const characterEndNumber = cursorNumber + IsCursorOnIfWord.spacesAroundSelection + endDelta;
    return editor.document.getText(
      RangeCreator.create({ line: lineNum, character: characterStartNumber }, { line: lineNum, character: characterEndNumber }),
    );
  }

  private static verifyIfStatementIsPresent(tokens: Tokens, editor: TextEditor, lineNum: number, cursorNumber: number): boolean {
    const tokenIndex = tokens.indexOf('if');
    if (tokenIndex > -1) {
      // this is required to make sure that if 'if' was found, it is not because due to substring cutoff e.g:
      // helloif| - should not return true when spacesAroundSelection is 2
      // likewise it should not be true for |ifhello
      if (tokenIndex === 0 || tokenIndex === tokens.length - 1) {
        const text =
          tokenIndex === 0
            ? IsCursorOnIfWord.getStringAroundSelection(editor, lineNum, cursorNumber, -1, 0)
            : IsCursorOnIfWord.getStringAroundSelection(editor, lineNum, cursorNumber, 0, 1);
        const tokens = Tokenizer.tokenize(text);
        return tokens.indexOf('if') > -1;
      }
      return true;
    }
    return false;
  }

  // the reason why this is not checking rightOfIfStatement is because all use cases would be traversing to left anyway
  public static getStartIndexIfTrue(editor: TextEditor, lineNum: number, cursorNumber: number, checkIsOnLeftOfIf = true): number {
    const stringAroundSelection = IsCursorOnIfWord.getStringAroundSelection(editor, lineNum, cursorNumber, 0, 0);
    const tokens = Tokenizer.tokenize(stringAroundSelection);
    // the reason why we need this is because a string can simply have a name with the if substring (naifme), hence to make sure
    // that an actual if statement is captured - we need to tokenizer the string
    if (IsCursorOnIfWord.verifyIfStatementIsPresent(tokens, editor, lineNum, cursorNumber)) {
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
