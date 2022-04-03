const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite('Highlighted Text Suite - Single Line -', () => {
  vscode.window.showInformationMessage('Start all tests.');

  const textEditorObj: { textEditor: vscode.TextEditor | null } = { textEditor: null };

  mocha.before(() => TestUtil.crateTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.removeTextDocument());

  TestUtil.runInversionTests(textEditorObj, `Single line testing`, [
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) }\n`,
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 10),
      },
    },
  ]);
});
