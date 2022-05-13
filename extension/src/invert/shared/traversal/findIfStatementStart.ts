import { GetIfStatementPositionAtEdge } from '../../invertHighlightedText/shared/getIfStatementPositionAtEdge';
import { IsCursorOnIfWord } from '../../invertHighlightedText/selectionBoundaryIfRanges/isCursorOnIfWord';
import { Position } from '../../../shared/types/invertHighlightedText/invertHighlightedText';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

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

  private static getIfStatementStartPositionInUpperLine(editor: TextEditor, line: number): Position | null {
    const upperLineNum = line - 1;
    if (upperLineNum < 0) {
      return null;
    }
    const endOfLineProperties = editor.document.lineAt(upperLineNum).range;
    const characterNum = GetIfStatementPositionAtEdge.validateAndGetCharIndex(editor, upperLineNum, 0, endOfLineProperties.end.character);
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
      const cursorAfterIfIndex = GetIfStatementPositionAtEdge.validateAndGetCharIndex(editor, line, 0, startChar);
      if (cursorAfterIfIndex < 0) {
        return FindIfStatementStart.searchUpAndRight(editor, line, lineText, autoInvertIfStatementOnRight);
      }
      return { line: line, character: cursorAfterIfIndex };
    }
    return { line: line, character: cursorOnIfWordStartIndex };
  }
}
