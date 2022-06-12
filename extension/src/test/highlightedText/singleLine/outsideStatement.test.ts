const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite.only('Highlighted Outside Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `typeof dog && cat`,
          output: `!typeof dog || !cat`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: `typeof dog && myFunc()`,
          output: `!typeof dog || !myFunc()`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `const dog = cat && dog`,
          output: `const dog = !cat && dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: `const dog = cat && dog`,
          output: `const dog = !cat || dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `const dog = cat && dog`,
          output: `const dog = cat || !dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: `const dog = cat && dog`,
          output: `const dog = cat && !dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 22),
      },
    },
  ]);
});
