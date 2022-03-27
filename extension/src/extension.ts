// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import InvertConditions from '../../shared/out/invert';
import { InvertSelection } from './invertSelection';

function getIndexOfLastBracketOfIfStatement(text: string, index: number, openBrackets = 0): any {
  if (index > text.length - 1) {
    console.log('index out of bounds');
    return -1;
  }
  if (text.charAt(index + 1) === '(') {
    return getIndexOfLastBracketOfIfStatement(text, index + 1, openBrackets + 1);
  }
  if (text.charAt(index + 1) === ')') {
    if (openBrackets === 1) {
      return index + 1;
    }
    return getIndexOfLastBracketOfIfStatement(text, index + 1, openBrackets - 1);
  }
  return getIndexOfLastBracketOfIfStatement(text, index + 1, openBrackets);
}

// WORK - only invert the if statement that is selected/highlighted (including if cursor is inside)
function invertLine(activeEditor: vscode.TextEditor | undefined) {
  activeEditor?.edit((selectedText) => {
    const startToCursorText = activeEditor.document.getText(
      new vscode.Range(
        new vscode.Position(activeEditor.selection.active.line, 0),
        new vscode.Position(activeEditor.selection.active.line, activeEditor.selection.active.character),
      ),
    );
    const stringAroundStatement = activeEditor.document.getText(
      new vscode.Range(
        new vscode.Position(activeEditor.selection.active.line, Math.max(activeEditor.selection.active.character - 1, 0)),
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
    const finalIndex = getIndexOfLastBracketOfIfStatement(lineProperties.text, firstIfStatementIndex) + 1;
    const rangeToBeReplaced = new vscode.Range(
      new vscode.Position(activeEditor.selection.active.line, firstIfStatementIndex),
      new vscode.Position(activeEditor.selection.active.line, finalIndex),
    );
    const ifStatementText = lineProperties.text.substring(firstIfStatementIndex, finalIndex);
    console.log(JSON.stringify(ifStatementText));
    console.log(JSON.stringify(finalIndex));
    const result = InvertConditions.runInvert(ifStatementText);
    selectedText.replace(rangeToBeReplaced, result);
    // WORK - get lines before and after if if statement does not end
  });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "condition-inverter" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('condition-inverter.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    const activeEditor = vscode.window.activeTextEditor;
    var selection = activeEditor?.selection;

    if (selection) {
      const { start, end } = selection;
      if (start.line === end.line) {
        invertLine(activeEditor);
      } else {
        InvertSelection.invert(activeEditor, selection);
      }
    }

    // vscode.window.showInformationMessage(text || 'please highlight a line of text');
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
