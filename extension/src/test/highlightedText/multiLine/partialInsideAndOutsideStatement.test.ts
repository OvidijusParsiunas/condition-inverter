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
    {
      lines: [
        {
          input: 'for (let i = 0;\n',
          output: 'for (let i = 0;',
        },
        {
          input: 'i < 10;\n',
          output: 'i >= 10;',
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
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 7),
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
          output: 'i >= 10;',
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
        end: new vscode.Position(3, 2),
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
          output: 'i >= 10;',
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
        end: new vscode.Position(1, 7),
      },
    },
    {
      lines: [
        {
          input: `!cat\n`,
          output: `cat`,
        },
        {
          input: `||\n`,
          output: `||`,
        },
        {
          input: `dog\n`,
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `&&\n`,
          output: `&&`,
        },
        {
          input: `dog\n`,
          output: `!dog`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 2),
        end: new vscode.Position(2, 0),
      },
    },
  ]);
});
