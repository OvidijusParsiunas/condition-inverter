import InvertConditions from '../../../shared/out/invert';
import * as vscode from 'vscode';

export class InvertCursorPosition {
  private static getIndexOfLastBracketOfIfStatement(text: string, index: number, openBrackets = 0): number {
    if (index > text.length - 1) {
      console.log('index out of bounds');
      return -1;
    }
    if (text.charAt(index + 1) === '(') {
      return InvertCursorPosition.getIndexOfLastBracketOfIfStatement(text, index + 1, openBrackets + 1);
    }
    if (text.charAt(index + 1) === ')') {
      if (openBrackets === 1) {
        return index + 1;
      }
      return InvertCursorPosition.getIndexOfLastBracketOfIfStatement(text, index + 1, openBrackets - 1);
    }
    return InvertCursorPosition.getIndexOfLastBracketOfIfStatement(text, index + 1, openBrackets);
  }

  // WORK - only invert the if statement that is selected/highlighted (including if cursor is inside)
  public static invert(activeEditor: vscode.TextEditor | undefined): void {
    activeEditor?.edit((selectedText) => {
      const startToCursorText = activeEditor.document.getText(
        new vscode.Range(
          new vscode.Position(activeEditor.selection.active.line, 0),
          new vscode.Position(activeEditor.selection.active.line, activeEditor.selection.active.character),
        ),
      );
      const stringAroundStatement = activeEditor.document.getText(
        new vscode.Range(
          new vscode.Position(
            activeEditor.selection.active.line,
            Math.max(activeEditor.selection.active.character - 1, 0),
          ),
          new vscode.Position(activeEditor.selection.active.line, activeEditor.selection.active.character + 2),
        ),
      );
      let firstIfStatementIndex = 0;
      if (stringAroundStatement.substring(0, 2) === 'if') {
        firstIfStatementIndex = Math.max(activeEditor.selection.active.character - 1, 0);
      } else if (stringAroundStatement.substring(1, 3) === 'if') {
        firstIfStatementIndex = activeEditor.selection.active.character;
      } else {
        firstIfStatementIndex = startToCursorText.lastIndexOf('if');
      }
      const lineProperties = activeEditor.document.lineAt(activeEditor.selection.active.line);
      const finalIndex =
        InvertCursorPosition.getIndexOfLastBracketOfIfStatement(lineProperties.text, firstIfStatementIndex) + 1;
      const rangeToBeReplaced = new vscode.Range(
        new vscode.Position(activeEditor.selection.active.line, firstIfStatementIndex),
        new vscode.Position(activeEditor.selection.active.line, finalIndex),
      );
      const ifStatementText = lineProperties.text.substring(firstIfStatementIndex, finalIndex);
      const result = InvertConditions.runInvert(ifStatementText);
      selectedText.replace(rangeToBeReplaced, result);
      // WORK - get lines before and after if if statement does not end
    });
  }
}
