const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite.only('Highlighted Full Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: 'if\n',
          output: 'if',
        },
        {
          input: '(\n',
          output: '(',
        },
        {
          input: 'dog\n',
          output: '!dog',
        },
        {
          input: '&&\n',
          output: '||',
        },
        {
          input: 'cat\n',
          output: '!cat',
        },
        {
          input: ')\n',
          output: ')',
        },
        {
          input: '{\n',
          output: '{',
        },
        {
          input: 'console\n',
          output: 'console',
        },
        {
          input: '.\n',
          output: '.',
        },
        {
          input: 'log\n',
          output: 'log',
        },
        {
          input: '(\n',
          output: '(',
        },
        {
          input: '2\n',
          output: '2',
        },
        {
          input: ')\n',
          output: ')',
        },
        {
          input: '}',
          output: '}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(13, 1),
      },
    },
    {
      lines: [
        {
          input: 'if\n',
          output: 'if',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '(\n',
          output: '(',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: 'dog\n',
          output: '!dog',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '&&\n',
          output: '||',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: 'cat\n',
          output: '!cat',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: ')\n',
          output: ')',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '{\n',
          output: '{',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: 'console\n',
          output: 'console',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '.\n',
          output: '.',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: 'log\n',
          output: 'log',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '(\n',
          output: '(',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '2\n',
          output: '2',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: ')\n',
          output: ')',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '}',
          output: '}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(26, 1),
      },
    },
  ]);
});
