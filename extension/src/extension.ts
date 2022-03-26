// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import InvertConditions from '../../shared/out/invert';
import { InvertSelection } from './invertSelection';

function invertLine(activeEditor: vscode.TextEditor | undefined) {
  activeEditor?.edit((selectedText) => {
    const lineProperties = activeEditor.document.lineAt(activeEditor.selection.active.line);
    if (lineProperties?.range) {
      const result = InvertConditions.runInvert(lineProperties.text);
      selectedText.replace(lineProperties.range, result);
      // WORK - get lines before and after if if statement does not end
    }
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
