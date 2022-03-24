"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
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
        const lineProperties = activeEditor?.document.lineAt(activeEditor.selection.active.line);
        var selection = activeEditor?.selection;
        var text = activeEditor?.document.getText(selection);
        activeEditor?.edit((selectedText) => {
            if (lineProperties?.range) {
                selectedText.replace(lineProperties?.range, 'asdasdsad');
            }
        });
        // vscode.window.showInformationMessage(text || 'please highlight a line of text');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map