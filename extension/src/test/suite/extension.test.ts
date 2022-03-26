const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
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

  mocha.afterEach(async () => {
    return new Promise((resolve) => {
      textEditor
        ?.edit((editBuild) => {
          editBuild.delete(textEditor.document.lineAt(0).range);
        })
        .then(() => {
          resolve(true);
        });
    });
  });

  function runSingleLineInversionTests(testProps: { input: string; output: string }[]) {
    testProps.forEach(({ input, output: expectedOutput }) => {
      test(`Single line inversion test for input: ${input}`, (done) => {
        textEditor
          .edit((editBuild) => {
            // insert text
            editBuild.insert(new vscode.Position(0, 0), input);
          })
          .then(() => {
            // select text
            textEditor.selection = new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(0, 10));
            // execute the inversion command
            vscode.commands.executeCommand('condition-inverter.helloWorld').then(() => {
              // wait for command to perform its operation
              setTimeout(() => {
                // select text on the first line
                textEditor.selection = new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(0, 10));
                const resultTextOutput = textEditor.document.lineAt(0).text;
                // compare result
                assert.strictEqual(resultTextOutput, expectedOutput);
                done();
              }, COMMAND_EXECUTION_TIME_ML);
            });
          });
      });
    });
  }

  runSingleLineInversionTests([
    {
      input: 'if (dog && cat || mouse) { console.log(2) }',
      output: 'if (!dog || !cat && !mouse) { console.log(2) }',
    },
    {
      input: 'if (mouse && cat) { console.log(2) }',
      output: 'if (!mouse || !cat) { console.log(2) }',
    },
  ]);
});
