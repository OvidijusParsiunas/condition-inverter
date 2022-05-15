import { IsCursorOnStatementWord } from '../../invertHighlightedText/selectionBoundaryIfRanges/isCursorOnStatementWord';
import { StatementTraversalCallbackUtil } from '../../../shared/functionality/statementTraversalCallbackUtil';
import { GetStatementPositionAtEdge } from '../../invertHighlightedText/shared/getStatementPositionAtEdge';
import { Position } from '../../../shared/types/invertHighlightedText/invertHighlightedText';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

export class FindStatementStart {
  private static getStatementIndex(statement: string, tokens: Tokens): number {
    return tokens.lastIndexOf(statement);
  }

  private static getCharacterIndexInText(text: string): number {
    const tokens = Tokenizer.tokenize(text);
    const lastStatementIndex = StatementTraversalCallbackUtil.traverse(FindStatementStart.getStatementIndex, tokens);
    if (lastStatementIndex > -1) return tokens.slice(0, lastStatementIndex).join('').length;
    return -1;
  }

  // console.log(dog) | if (dog && cat) -> will find the if statement on the right
  private static getStatementOnSameLineStartIfNoIfBeforeCursor(lineText: string, line: number): Position | null {
    const characterIndex = FindStatementStart.getCharacterIndexInText(lineText);
    if (characterIndex > -1) {
      return { line: line, character: characterIndex };
    }
    return null;
  }

  private static getStatementStartPositionInUpperLine(editor: TextEditor, line: number): Position | null {
    const upperLineNum = line - 1;
    if (upperLineNum < 0) {
      return null;
    }
    const endOfLineProperties = editor.document.lineAt(upperLineNum).range;
    // prettier-ignore
    const characterNum = StatementTraversalCallbackUtil.traverse(
      GetStatementPositionAtEdge.validateAndGetCharIndex, editor, upperLineNum, 0, endOfLineProperties.end.character,
    );
    if (characterNum < 0) {
      return FindStatementStart.getStatementStartPositionInUpperLine(editor, upperLineNum);
    }
    return { line: upperLineNum, character: characterNum };
  }

  private static searchUpAndRight(editor: TextEditor, line: number, lineText: string, autoInvertStatementOnRight: boolean): Position | null {
    const startPosition = FindStatementStart.getStatementStartPositionInUpperLine(editor, line);
    if (autoInvertStatementOnRight && !startPosition) {
      return FindStatementStart.getStatementOnSameLineStartIfNoIfBeforeCursor(lineText, line);
    }
    return startPosition;
  }

  public static find(editor: TextEditor, line: number, startChar: number, lineText: string, autoInvertStatementOnRight = true): Position | null {
    // i|f (dog)  or  |if (dog)
    const cursorOnIfWordStartIndex = StatementTraversalCallbackUtil.traverse(IsCursorOnStatementWord.getIndexIfTrue, editor, line, startChar);
    if (cursorOnIfWordStartIndex < 0) {
      // if| (dog)  or  if (dog) | if (dog) - gets the left one of the cursor
      // prettier-ignore
      const cursorAfterIfIndex = StatementTraversalCallbackUtil.traverse(
        GetStatementPositionAtEdge.validateAndGetCharIndex, editor, line, 0, startChar);
      if (cursorAfterIfIndex < 0) {
        return FindStatementStart.searchUpAndRight(editor, line, lineText, autoInvertStatementOnRight);
      }
      return { line: line, character: cursorAfterIfIndex };
    }
    return { line: line, character: cursorOnIfWordStartIndex };
  }
}
