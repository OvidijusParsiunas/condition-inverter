import { IsCursorOnIfWord } from '../../invertHighlightedText/selectionBoundaryIfRanges/isCursorOnIfWord';
import { Position } from '../../../shared/types/invertHighlightedText/invertHighlightedText';
import { Tokens } from '../../../../../shared/inverter/src/shared/types/tokens';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { RangeCreator } from '../rangeCreator';
import { TextEditor } from 'vscode';

interface FindToken {
  tokens: Tokens;
  lastIndex: number;
}

export class FindIfStatementStart {
  private static getCharacterIndexInText(text: string): number {
    const tokens = Tokenizer.tokenize(text);
    const lastIfIndex = tokens.lastIndexOf('if');
    if (lastIfIndex > -1) return tokens.slice(0, lastIfIndex).join('').length;
    return -1;
  }

  // console.log(dog) | if (dog && cat) -> will find the if statement on the right
  private static getIfStatementOnSameLineStartIfNoIfBeforeCursor(lineText: string, line: number): Position | null {
    const characterIndex = FindIfStatementStart.getCharacterIndexInText(lineText);
    if (characterIndex > -1) {
      return { line: line, character: characterIndex };
    }
    return null;
  }

  private static findLastSpecifiedTokenInString(editor: TextEditor, line: number, finalIndex: number): FindToken {
    const startToCursorText = editor.document.getText(RangeCreator.create({ line: line, character: 0 }, { line: line, character: finalIndex }));
    const tokens = Tokenizer.tokenize(startToCursorText);
    return { tokens, lastIndex: tokens.lastIndexOf('if') };
  }

  // this is required to prevent issues of falsely detecting an if statement token that due a last index cutoff:
  // console.log('asdasd') if|hello
  private static verifyIfStatementIsPresent(editor: TextEditor, line: number, finalIndex: number, tokens: Tokens, lastIndex: number): boolean {
    if (lastIndex === tokens.length - 1) {
      const { lastIndex: lastIndex2 } = FindIfStatementStart.findLastSpecifiedTokenInString(editor, line, finalIndex + 1);
      return lastIndex === lastIndex2;
    }
    return true;
  }

  private static getIfIndexOnLineFromStartToSpecifiedIndex(editor: TextEditor, line: number, finalIndex: number): number {
    // WORK - reuse
    const { tokens, lastIndex } = FindIfStatementStart.findLastSpecifiedTokenInString(editor, line, finalIndex);
    if (lastIndex > -1 && FindIfStatementStart.verifyIfStatementIsPresent(editor, line, finalIndex, tokens, lastIndex)) {
      return tokens.slice(0, lastIndex).join('').length;
    }
    return -1;
  }

  private static getIfStatementStartPositionInUpperLine(editor: TextEditor, line: number): Position | null {
    const upperLineNum = line - 1;
    if (upperLineNum < 0) {
      return null;
    }
    const endOfLineProperties = editor.document.lineAt(upperLineNum).range;
    const characterNum = FindIfStatementStart.getIfIndexOnLineFromStartToSpecifiedIndex(editor, upperLineNum, endOfLineProperties.end.character);
    if (characterNum < 0) {
      return FindIfStatementStart.getIfStatementStartPositionInUpperLine(editor, upperLineNum);
    }
    return { line: upperLineNum, character: characterNum };
  }

  private static searchUpAndRight(editor: TextEditor, line: number, lineText: string, autoInvertIfStatementOnRight: boolean): Position | null {
    const startPosition = FindIfStatementStart.getIfStatementStartPositionInUpperLine(editor, line);
    if (autoInvertIfStatementOnRight && !startPosition) {
      return FindIfStatementStart.getIfStatementOnSameLineStartIfNoIfBeforeCursor(lineText, line);
    }
    return startPosition;
  }

  public static find(editor: TextEditor, line: number, startChar: number, lineText: string, autoInvertIfStatementOnRight = true): Position | null {
    // i|f (dog)  or  |if (dog)
    const cursorOnIfWordStartIndex = IsCursorOnIfWord.getStartIndexIfTrue(editor, line, startChar);
    if (cursorOnIfWordStartIndex < 0) {
      // if| (dog)  or  if (dog) | if (dog) - gets the left one of the cursor
      const cursorAfterIfIndex = FindIfStatementStart.getIfIndexOnLineFromStartToSpecifiedIndex(editor, line, startChar);
      if (cursorAfterIfIndex < 0) {
        return FindIfStatementStart.searchUpAndRight(editor, line, lineText, autoInvertIfStatementOnRight);
      }
      return { line: line, character: cursorAfterIfIndex };
    }
    return { line: line, character: cursorOnIfWordStartIndex };
  }
}
