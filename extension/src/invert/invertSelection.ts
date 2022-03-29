import { TextEditor, Selection, Range, Position } from 'vscode';
import InvertConditions from '../../../shared/out/invert';

export class InvertSelection {
  private static getIfPreviousCharacterIsIfStatement(
    editor: TextEditor,
    selection: Selection,
    currentLineNumber: number,
    currentIndex: number,
  ): boolean {
    const range = new Range(new Position(currentLineNumber, currentIndex), new Position(currentLineNumber, currentIndex - 1));
    const character = editor.document.getText(range);
    if (character === ' ') {
      return InvertSelection.getIfPreviousCharacterIsIfStatement(editor, selection, currentLineNumber, currentIndex - 1);
    } else if (character === 'f') {
      const range2 = new Range(new Position(currentLineNumber, currentIndex - 1), new Position(currentLineNumber, currentIndex - 2));
      const character2 = editor.document.getText(range2);
      if (character2 === 'i') {
        const range3 = new Range(new Position(currentLineNumber, currentIndex - 2), new Position(currentLineNumber, currentIndex - 3));
        const character3 = editor.document.getText(range3);
        if (character3 === ' ') {
          return true;
        }
      }
    }
    return false;
  }

  private static getPrefixNumber(editor: TextEditor, selection: Selection, currentIndex: number, numberOfCloses: number): number {
    const range = new Range(new Position(selection.start.line, currentIndex), new Position(selection.start.line, currentIndex - 1));
    const character = editor.document.getText(range);
    if (character === ')') {
      numberOfCloses += 1;
    } else if (character === '(') {
      numberOfCloses -= 1;
    }
    if (numberOfCloses === 0) {
      if (InvertSelection.getIfPreviousCharacterIsIfStatement(editor, selection, selection.start.line, currentIndex)) {
        return currentIndex;
      }
      return -1;
    }
    return InvertSelection.getPrefixNumber(editor, selection, currentIndex, numberOfCloses);
  }

  private static getPrefixIfStatementStartLocation(
    editor: TextEditor,
    selection: Selection,
    text: string,
    currentIndex: number,
    numberOfCloses = 0,
  ): number {
    if (currentIndex === 0) {
      if (numberOfCloses === 0) {
        return 0;
      }
      return InvertSelection.getPrefixNumber(editor, selection, currentIndex, numberOfCloses);
    }
    const currentChar = text.charAt(currentIndex - 1);
    if (currentChar === ')') {
      numberOfCloses += 1;
    } else if (currentChar === '(') {
      numberOfCloses -= 1;
    }
    return InvertSelection.getPrefixIfStatementStartLocation(editor, selection, text, currentIndex - 1, numberOfCloses);
  }

  private static getOverallIfStatementRange(editor: TextEditor, selection: Selection): Range {
    const text = editor?.document.getText(selection);
    const closingBracketIndex = text.indexOf(')');
    const ifIndex = text.indexOf('if');
    if (ifIndex === -1) {
    }
    if (closingBracketIndex && closingBracketIndex < ifIndex) {
      const startLocation = InvertSelection.getPrefixIfStatementStartLocation(editor, selection, text, closingBracketIndex);
      return new Range(new Position(selection.start.line, startLocation), new Position(selection.end.line, selection.end.character));
    }
    return selection;
  }

  public static invert(editor: TextEditor | undefined, selection: Selection | undefined): void {
    editor?.edit((selectedText) => {
      if (selection) {
        const range = InvertSelection.getOverallIfStatementRange(editor, selection);
        const text = editor?.document.getText(range);
        const result = InvertConditions.runInvert(text);
        selectedText.replace(range, result);
        // WORK - only invert the if statement(s) that is/are highlighted
      }
    });
  }
}
