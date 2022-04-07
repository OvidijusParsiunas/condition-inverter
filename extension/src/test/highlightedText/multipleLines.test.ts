const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../types/tests/tests';
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite.only('Highlighted Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.removeTextDocument());

  TestUtil.runInversionTests(textEditorObj, `Multi Line`, [
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (dog',
        },
        {
          input: `&& cat\n`,
          output: '&& cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '|| mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 18),
        end: new vscode.Position(2, 22),
      },
    },
  ]);
});
