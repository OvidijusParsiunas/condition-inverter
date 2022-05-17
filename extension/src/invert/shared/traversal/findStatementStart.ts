import { IsCursorOnStatementWord } from '../../invertHighlightedText/selectionBoundaryIfRanges/isCursorOnStatementWord';
import { GetStringFromRange } from '../../invertHighlightedText/shared/getStringAroundSelection';
import { STATEMENT_JSON } from '../../../../../shared/out/inverter/src/shared/consts/statements';
import { Position } from '../../../shared/types/invertHighlightedText/invertHighlightedText';
import { StatementIndexUtil } from '../../../shared/functionality/statementIndexUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { TextEditor } from 'vscode';

export class FindStatementStart {
  private static getIndexIfNextTokenIsStatement(tokens: Tokens): number {
    for (let i = 0; i < tokens.length; i += 1) {
      if (STATEMENT_JSON[tokens[i] as keyof typeof STATEMENT_JSON]) {
        return i;
      } else if (tokens[i] !== ' ') {
        return -1;
      }
    }
    return -1;
  }

  // console.log(dog) | if (dog && cat) -> will find the if statement on the right
  // console.lo|g(dog) if (dog && cat) -> will not find the if statement
  private static getStatementPositionOnRightOfCursor(editor: TextEditor, line: number, startChar: number): Position | null {
    const newText = GetStringFromRange.get(editor, line, startChar, editor.document.lineAt(line).range.end.character, 0);
    const tokens = Tokenizer.tokenize(newText);
    const lastStatementIndex = FindStatementStart.getIndexIfNextTokenIsStatement(tokens);
    if (lastStatementIndex > -1) {
      return { line: line, character: startChar + tokens.slice(0, lastStatementIndex).join('').length };
    }
    return null;
  }

  private static getStatementStartPositionInUpperLine(editor: TextEditor, line: number): Position | null {
    const upperLineNum = line - 1;
    if (upperLineNum < 0) {
      return null;
    }
    const endOfLineProperties = editor.document.lineAt(upperLineNum).range;
    const characterNum = StatementIndexUtil.findViaRangeAndValidate(editor, upperLineNum, 0, endOfLineProperties.end.character, false);
    if (characterNum < 0) {
      return FindStatementStart.getStatementStartPositionInUpperLine(editor, upperLineNum);
    }
    return { line: upperLineNum, character: characterNum };
  }

  // WORK - have a solution for this
  // this is a pontial flaw as we should probably not be inverting an arbitrary statement in an upper line
  private static searchUpAndRight(editor: TextEditor, line: number, startChar: number, autoInvertStatementOnRight: boolean): Position | null {
    const startPosition = FindStatementStart.getStatementStartPositionInUpperLine(editor, line);
    if (autoInvertStatementOnRight && !startPosition) {
      return FindStatementStart.getStatementPositionOnRightOfCursor(editor, line, startChar);
    }
    return startPosition;
  }

  public static find(editor: TextEditor, line: number, startChar: number, autoInvertStatementOnRight = true): Position | null {
    // i|f (dog)  or  |if (dog)
    // need to run this as the code below does not check area around cursor to get if statement
    const cursorOnIfWordStartIndex = IsCursorOnStatementWord.getIndexIfTrue(editor, line, startChar);
    if (cursorOnIfWordStartIndex === -1) {
      // if| (dog)  or  if (dog) | if (dog) - gets the left one of the cursor
      const cursorAfterIfIndex = StatementIndexUtil.findViaRangeAndValidate(editor, line, 0, startChar, false);
      if (cursorAfterIfIndex === -1) {
        return FindStatementStart.searchUpAndRight(editor, line, startChar, autoInvertStatementOnRight);
      }
      return { line: line, character: cursorAfterIfIndex };
    }
    return { line: line, character: cursorOnIfWordStartIndex };
  }
}
