import * as assert from 'assert';
import * as vscode from 'vscode';

export class TestUtil {
  private static readonly commandExecutionTimeMl = 10;

  public static crateTextDocument(textEditorObj: { textEditor: vscode.TextEditor | null }): Promise<boolean> {
    return new Promise((resolve) => {
      vscode.workspace.openTextDocument().then((textDocument) => {
        vscode.window.showTextDocument(textDocument).then((textEditorArg) => {
          textEditorObj.textEditor = textEditorArg;
          resolve(true);
        });
      });
    });
  }

  public static removeTextFromEditor(textEditorObj: { textEditor: vscode.TextEditor | null }): Promise<boolean> {
    return new Promise((resolve) => {
      textEditorObj.textEditor
        ?.edit((editBuild) => {
          if (textEditorObj.textEditor) {
            for (let i = 0; i < textEditorObj.textEditor.document.lineCount; i += 1) {
              const range = new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i + 1, 0));
              editBuild.delete(range);
            }
          }
        })
        .then(() => {
          resolve(true);
        });
    });
  }

  public static async removeTextDocument(): Promise<void> {
    return vscode.commands.executeCommand('workbench.action.closeActiveEditor');
  }

  public static runInversionTests(
    textEditorObj: { textEditor: vscode.TextEditor | null },
    testName: string,
    testProps: {
      lines: { input: string; output: string }[];
      selection: { start: vscode.Position; end: vscode.Position };
    }[],
  ): void {
    testProps.forEach(({ lines, selection }) => {
      test(testName, (done) => {
        if (textEditorObj.textEditor) {
          textEditorObj.textEditor
            .edit((editBuild) => {
              // insert text
              lines.forEach((line) => {
                editBuild.insert(new vscode.Position(0, 0), line.input);
              });
            })
            .then(() => {
              if (textEditorObj.textEditor) {
                // select text
                textEditorObj.textEditor.selection = new vscode.Selection(selection.start, selection.end);
                // execute the inversion command
                vscode.commands.executeCommand('condition-inverter.invert').then(() => {
                  // wait for command to perform its operation
                  setTimeout(() => {
                    // select text on the first line
                    if (textEditorObj.textEditor) {
                      textEditorObj.textEditor.selection = new vscode.Selection(selection.start, selection.end);
                      // compare result
                      lines.forEach((line, index) => {
                        if (textEditorObj.textEditor) {
                          const resultTextOutput = textEditorObj.textEditor.document.lineAt(index).text;
                          assert.strictEqual(resultTextOutput, line.output);
                        }
                      });
                      done();
                    }
                  }, TestUtil.commandExecutionTimeMl);
                });
              }
            });
        }
      });
    });
  }
}
