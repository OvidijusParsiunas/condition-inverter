import InvertConditions from '../../../shared/out/invert';
import * as vscode from 'vscode';

export class InvertSelection {
  private static getIfPreviousCharacterIsIfStatement(
    activeEditor: vscode.TextEditor,
    selection: vscode.Selection,
    currentLineNumber: number,
    currentIndex: number,
  ): boolean {
    const range = new vscode.Range(
      new vscode.Position(currentLineNumber, currentIndex),
      new vscode.Position(currentLineNumber, currentIndex - 1),
    );
    const character = activeEditor.document.getText(range);
    if (character === ' ') {
      return InvertSelection.getIfPreviousCharacterIsIfStatement(
        activeEditor,
        selection,
        currentLineNumber,
        currentIndex - 1,
      );
    } else if (character === 'f') {
      const range2 = new vscode.Range(
        new vscode.Position(currentLineNumber, currentIndex - 1),
        new vscode.Position(currentLineNumber, currentIndex - 2),
      );
      const character2 = activeEditor.document.getText(range2);
      if (character2 === 'i') {
        const range3 = new vscode.Range(
          new vscode.Position(currentLineNumber, currentIndex - 2),
          new vscode.Position(currentLineNumber, currentIndex - 3),
        );
        const character3 = activeEditor.document.getText(range3);
        if (character3 === ' ') {
          return true;
        }
      }
    }
    return false;
  }

  private static getPrefixNumber(
    activeEditor: vscode.TextEditor,
    selection: vscode.Selection,
    currentIndex: number,
    numberOfCloses: number,
  ): number {
    const range = new vscode.Range(
      new vscode.Position(selection.start.line, currentIndex),
      new vscode.Position(selection.start.line, currentIndex - 1),
    );
    const character = activeEditor.document.getText(range);
    if (character === ')') {
      numberOfCloses += 1;
    } else if (character === '(') {
      numberOfCloses -= 1;
    }
    if (numberOfCloses === 0) {
      if (
        InvertSelection.getIfPreviousCharacterIsIfStatement(activeEditor, selection, selection.start.line, currentIndex)
      ) {
        return currentIndex;
      }
      return -1;
    }
    return InvertSelection.getPrefixNumber(activeEditor, selection, currentIndex, numberOfCloses);
  }

  private static getPrefixIfStatementStartLocation(
    activeEditor: vscode.TextEditor,
    selection: vscode.Selection,
    text: string,
    currentIndex: number,
    numberOfCloses = 0,
  ): number {
    if (currentIndex === 0) {
      if (numberOfCloses === 0) {
        return 0;
      }
      return InvertSelection.getPrefixNumber(activeEditor, selection, currentIndex, numberOfCloses);
    }
    const currentChar = text.charAt(currentIndex - 1);
    if (currentChar === ')') {
      numberOfCloses += 1;
    } else if (currentChar === '(') {
      numberOfCloses -= 1;
    }
    return InvertSelection.getPrefixIfStatementStartLocation(
      activeEditor,
      selection,
      text,
      currentIndex - 1,
      numberOfCloses,
    );
  }

  private static getOverallIfStatementRange(activeEditor: vscode.TextEditor, selection: vscode.Selection): vscode.Range {
    const text = activeEditor?.document.getText(selection);
    const closingBracketIndex = text.indexOf(')');
    const ifIndex = text.indexOf('if');
    if (ifIndex === -1) {
    }
    if (closingBracketIndex && closingBracketIndex < ifIndex) {
      const startLocation = InvertSelection.getPrefixIfStatementStartLocation(
        activeEditor,
        selection,
        text,
        closingBracketIndex,
      );
      return new vscode.Range(
        new vscode.Position(selection.start.line, startLocation),
        new vscode.Position(selection.end.line, selection.end.character),
      );
    }
    return selection;
  }

  public static invert(activeEditor: vscode.TextEditor | undefined, selection: vscode.Selection | undefined) {
    activeEditor?.edit((selectedText) => {
      if (selection) {
        const range = InvertSelection.getOverallIfStatementRange(activeEditor, selection);
        const text = activeEditor?.document.getText(range);
        console.log(text);
        const result = InvertConditions.runInvert(text);
        selectedText.replace(range, result);
        // WORK - only invert the if statement(s) that is/are highlighted
      }
    });
  }
}
