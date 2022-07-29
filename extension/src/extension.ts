// The module 'vscode' contains the VS Code extensibility API
import { Invert } from './invert/invert';
import * as vscode from 'vscode';

// this method is called when the extension is activated
// your extension is activated the very first time the 'condition-inverter.invert' command is executed
export function activate(context: vscode.ExtensionContext): void {
  console.log('Congratulations, your extension "condition-inverter" is now active!');
  const disposable = vscode.commands.registerCommand('condition-inverter.invert', Invert.execute);
  context.subscriptions.push(disposable);
}

// this method is called when the extension is deactivated
export function deactivate(): void {}
