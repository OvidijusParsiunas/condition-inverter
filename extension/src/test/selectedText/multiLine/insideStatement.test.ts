const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite('Selected Inside Statement Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: 'for (let i = 0;\n',
          output: 'for (let i = 0;',
        },
        {
          input: 'i < 10;\n',
          output: '!i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0\n',
          output: 'for (let i = 0',
        },
        {
          input: ';i < 10;\n',
          output: ';!i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
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
          input: 'for (let i = 0;\n',
          output: 'for (let i = 0;',
        },
        {
          input: 'i < 10;\n',
          output: 'i < !10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 6),
        end: new vscode.Position(1, 6),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0;\n',
          output: 'for (let i = 0;',
        },
        {
          input: 'i < 10\n',
          output: 'i < !10',
        },
        {
          input: ';i += 1)\n',
          output: ';i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 6),
        end: new vscode.Position(1, 6),
      },
    },
  ]);
});
