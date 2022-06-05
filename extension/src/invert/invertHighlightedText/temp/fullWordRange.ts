import { Position } from '../../../shared/types/invertHighlightedText/invertHighlightedText';
import { RangeCreator } from '../../shared/rangeCreator';
import { Tokenizer } from 'shared/tokenizer/tokenizer';
import { Range, TextEditor } from 'vscode';

export class FullWordRange {
  private static getIndexOfWordOrSymbolOnSelection(line: string, selectionChar: number, isStart: boolean): number {
    const tokens = Tokenizer.tokenize(line);
    let currentStringIndex = 0;
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i] as string;
      currentStringIndex += token.length;
      if (isStart) {
        if (currentStringIndex > selectionChar) {
          return currentStringIndex - token.length;
        }
      } else if (currentStringIndex >= selectionChar) {
        return currentStringIndex;
      }
    }
    return -1;
  }

  private static getLineStartToCharSelectionText(editor: TextEditor, line: number): string {
    return editor.document.getText(
      RangeCreator.create({ line, character: 0 }, { line, character: editor.document.lineAt(line).range.end.character }),
    );
  }

  private static getPositionOfWordOrSymbol(editor: TextEditor, currentPosition: Position, isStart = true): Position {
    const selectionLine = FullWordRange.getLineStartToCharSelectionText(editor, currentPosition.line);
    const selectionChar = FullWordRange.getIndexOfWordOrSymbolOnSelection(selectionLine, currentPosition.character, isStart);
    return { line: currentPosition.line, character: selectionChar };
  }

  public static extract(editor: TextEditor): Range {
    // WORK - check if upon checking an if/for statement that has brackets, that selection is not after bracket end
    const startSelectionPosition = FullWordRange.getPositionOfWordOrSymbol(editor, editor.selection.start);
    // IF false, check if end
    // check ternary operator too
    const endSelectionPosition = FullWordRange.getPositionOfWordOrSymbol(editor, editor.selection.end, false);
    return RangeCreator.create(startSelectionPosition, endSelectionPosition);
  }
}
