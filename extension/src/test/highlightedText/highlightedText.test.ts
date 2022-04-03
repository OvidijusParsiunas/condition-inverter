const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Highlighted Text Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  let textEditor: vscode.TextEditor;
  const COMMAND_EXECUTION_TIME_ML = 10;

  mocha.before(() => {
    return new Promise((resolve) => {
      vscode.workspace.openTextDocument().then((textDocument) => {
        vscode.window.showTextDocument(textDocument).then((textEditorArg) => {
          textEditor = textEditorArg;
          resolve(true);
        });
      });
    });
  });

  mocha.after(() => {
    return vscode.commands.executeCommand('workbench.action.closeActiveEditor');
  });

  mocha.beforeEach(async () => {
    return new Promise((resolve) => {
      textEditor
        ?.edit((editBuild) => {
          for (let i = 0; i < textEditor.document.lineCount; i += 1) {
            const range = new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i + 1, 0));
            editBuild.delete(range);
          }
        })
        .then(() => {
          resolve(true);
        });
    });
  });

  function runInversionTests(
    testName: string,
    testProps: {
      lines: { input: string; output: string }[];
      selection: { start: vscode.Position; end: vscode.Position };
    }[],
  ): void {
    testProps.forEach(({ lines, selection }) => {
      test(testName, (done) => {
        textEditor
          .edit((editBuild) => {
            // insert text
            lines.forEach((line) => {
              editBuild.insert(new vscode.Position(0, 0), line.input);
            });
          })
          .then(() => {
            // select text
            textEditor.selection = new vscode.Selection(selection.start, selection.end);
            // execute the inversion command
            vscode.commands.executeCommand('condition-inverter.invert').then(() => {
              // wait for command to perform its operation
              setTimeout(() => {
                // select text on the first line
                textEditor.selection = new vscode.Selection(selection.start, selection.end);
                // compare result
                lines.forEach((line, index) => {
                  const resultTextOutput = textEditor.document.lineAt(index).text;
                  assert.strictEqual(resultTextOutput, line.output);
                });
                done();
              }, COMMAND_EXECUTION_TIME_ML);
            });
          });
      });
    });
  }

  runInversionTests(`Outside of if statement testing`, [
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) }\n`,
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: `if (mouse && cat) { console.log(2) }\n`,
          output: 'if (mouse && cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) }\n`,
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: `if (mouse && cat) { console.log(2) }\n`,
          output: 'if (mouse && cat) { console.log(2) }',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
      ],
      selection: {
        start: new vscode.Position(6, 1),
        end: new vscode.Position(6, 1),
      },
    },
    {
      lines: [
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: `if (dog && cat || mouse) { console.log(2) }\n`,
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: `if (mouse && cat) { console.log(2) }\n`,
          output: 'if (mouse && cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 1),
      },
    },
    {
      lines: [
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: `if (dog && cat || mouse) { console.log(2) }\n`,
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: `if (mouse && cat) { console.log(2) }\n`,
          output: 'if (mouse && cat) { console.log(2) }',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
      ],
      selection: {
        start: new vscode.Position(6, 1),
        end: new vscode.Position(6, 1),
      },
    },
  ]);
});
