import { IOLineTestProps, TestProps, TextEditorObj } from '../types/tests';
import * as assert from 'assert';
import * as vscode from 'vscode';

export class TestUtil {
  // headless tests aoppear to take longer to finishe executing the invert command
  private static readonly commandExecutionTimeMl = process.env.NODE_ENV ? 200 : 30;

  public static async executCloseEditorCommand(): Promise<void> {
    return vscode.commands.executeCommand('workbench.action.closeActiveEditor');
  }

  private static async executeInversionCommand(): Promise<void> {
    return vscode.commands.executeCommand('condition-inverter.invert');
  }

  public static createTextDocument(textEditorObj: TextEditorObj): Promise<boolean> {
    return new Promise((resolve) => {
      vscode.workspace.openTextDocument().then((textDocument) => {
        vscode.window.showTextDocument(textDocument).then((textEditorArg) => {
          textEditorObj.textEditor = textEditorArg;
          resolve(true);
        });
      });
    });
  }

  private static removeTextByEachLine(textEditor: vscode.TextEditor, editBuild: vscode.TextEditorEdit): void {
    for (let i = 0; i < textEditor.document.lineCount; i += 1) {
      const range = new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i + 1, 0));
      editBuild.delete(range);
    }
  }

  public static removeTextFromEditor(textEditorObj: TextEditorObj): Promise<boolean> {
    return new Promise(async (resolve) => {
      await textEditorObj.textEditor?.edit((editBuild) => {
        if (textEditorObj.textEditor) TestUtil.removeTextByEachLine(textEditorObj.textEditor, editBuild);
      });
      resolve(true);
    });
  }

  private static testOutput(textEditor: vscode.TextEditor, testProps: TestProps, doneCallback: () => void): void {
    const { lines, postSelection } = testProps;
    // compare result by each line
    lines.forEach((line, index) => {
      const resultTextOutput = textEditor.document.lineAt(index).text;
      assert.strictEqual(resultTextOutput, line.output);
    });
    // check cursor position after invertion
    if (postSelection) {
      assert.strictEqual(textEditor.selection.start.character, postSelection.start.character);
      assert.strictEqual(textEditor.selection.end.character, postSelection.end.character);
    }
    doneCallback();
  }

  private static async invertInputTextAndTest(textEditor: vscode.TextEditor, testProps: TestProps, doneCallback: () => void): Promise<void> {
    const { selection } = testProps;
    textEditor.selection = new vscode.Selection(selection.start, selection.end);
    // execute the inversion command
    await TestUtil.executeInversionCommand();
    // test output after command execution
    setTimeout(() => TestUtil.testOutput(textEditor, testProps, doneCallback), TestUtil.commandExecutionTimeMl);
  }

  private static insertText(editBuild: vscode.TextEditorEdit, lines: IOLineTestProps): void {
    lines.forEach((line) => {
      editBuild.insert(new vscode.Position(0, 0), line.input);
    });
  }

  private static async runTest(textEditor: vscode.TextEditor, testProps: TestProps, doneCallback: () => void): Promise<void> {
    await textEditor.edit((editBuild) => TestUtil.insertText(editBuild, testProps.lines));
    TestUtil.invertInputTextAndTest(textEditor, testProps, doneCallback);
  }

  public static runInversionTests(textEditorObj: TextEditorObj, testName: string, multipleTestProps: TestProps[]): void {
    multipleTestProps.forEach((testProps: TestProps) => {
      test(testName, (done) => {
        if (textEditorObj.textEditor) {
          TestUtil.runTest(textEditorObj.textEditor, testProps, done);
        }
      });
    });
  }

  public static runInversionCommandWithNoEditor(doneCallback: () => void): void {
    TestUtil.executeInversionCommand().then(() => {
      setTimeout(doneCallback, TestUtil.commandExecutionTimeMl);
    });
  }
}
