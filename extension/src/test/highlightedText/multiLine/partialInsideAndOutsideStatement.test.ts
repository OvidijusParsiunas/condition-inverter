const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite.only('Highlighted Partial Inside and Outside Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: 'if (dog &&\n',
          output: 'if (!dog ||',
        },
        {
          input: 'cat || mouse) { console.log(2) }',
          output: 'cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'if (dog\n',
          output: 'if (!dog',
        },
        {
          input: '&& cat || mouse) { console.log(2) }',
          output: '&& cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if (dog\n',
          output: 'if (dog',
        },
        {
          input: '&& cat || mouse) { console.log(2) }',
          output: '|| cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: 'if (dog\n',
          output: 'if (dog',
        },
        {
          input: '&& cat || mouse) { console.log(2) }',
          output: '|| !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 15),
      },
    },
    {
      lines: [
        {
          input: 'if (dog\n',
          output: 'if (dog',
        },
        {
          input: '&&\n',
          output: '||',
        },
        {
          input: 'cat || mouse) { console.log(2) }',
          output: 'cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 2),
      },
    },
  ]);
});
