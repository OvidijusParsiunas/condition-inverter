import { ExpandIfCursorOnPotentialConditionOperator } from './expandIfCursorOnPotentialConditionOperator';
import { Position } from '../../../../../../../shared/types/position';
import { RangeCreator } from '../../../../../../shared/rangeCreator';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { Range, TextEditor } from 'vscode';

export class FullWordRange {
  // this is used as part of an optimisation approach to reduce the amount of tokenization and token traversal to determine if cursor
  // is on a potential condition operator
  private static readonly conditionDelta = 20;

  private static getIndexOfWordOrSymbolOnSelection(lineString: string, selectionChar: number, isStart: boolean): number {
    const tokens = Tokenizer.tokenize(lineString);
    let currentStringIndex = 0;
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i] as string;
      currentStringIndex += token.length;
      if (isStart || i === 0) {
        if (currentStringIndex > selectionChar) {
          const expansion = ExpandIfCursorOnPotentialConditionOperator.getExpansionIfBeforeStart(tokens, i);
          return currentStringIndex - token.length - expansion;
        }
      } else if (currentStringIndex >= selectionChar) {
        const expansion = ExpandIfCursorOnPotentialConditionOperator.getExpansionIfAfterEnd(tokens, i);
        return currentStringIndex + expansion;
      }
    }
    return selectionChar;
  }

  private static getLineStartToCharSelectionText(editor: TextEditor, selection: Position, startCharNumber: number): string {
    return editor.document.getText(
      RangeCreator.create(
        { line: selection.line, character: startCharNumber },
        {
          line: selection.line,
          character: Math.min(selection.character + FullWordRange.conditionDelta, editor.document.lineAt(selection.line).range.end.character),
        },
      ),
    );
  }

  private static getPositionOfWordOrSymbol(editor: TextEditor, position: Position, isStart: boolean): Position {
    const startCharNumber = Math.max(position.character - FullWordRange.conditionDelta, 0);
    const lineString = FullWordRange.getLineStartToCharSelectionText(editor, position, startCharNumber);
    const newCharNumber = FullWordRange.getIndexOfWordOrSymbolOnSelection(lineString, position.character - startCharNumber, isStart);
    return { line: position.line, character: startCharNumber + newCharNumber };
  }

  public static extract(editor: TextEditor): Range {
    const startSelectionPosition = FullWordRange.getPositionOfWordOrSymbol(editor, editor.selection.start, true);
    // IF false, check if end
    // check ternary operator too
    const endSelectionPosition = FullWordRange.getPositionOfWordOrSymbol(editor, editor.selection.end, false);
    return RangeCreator.create(startSelectionPosition, endSelectionPosition);
  }
}
