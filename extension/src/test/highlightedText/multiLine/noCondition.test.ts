const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite.only('Highlighted No Condition Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `dog\n`,
          output: `dog`,
        },
        {
          input: `?\n`,
          output: `?`,
        },
        {
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `:\n`,
          output: `:`,
        },
        {
          input: `dog`,
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(4, 3),
      },
    },
    {
      lines: [
        {
          input: `dog\n`,
          output: `dog`,
        },
        {
          input: `?\n`,
          output: `?`,
        },
        {
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `:\n`,
          output: `:`,
        },
        {
          input: `dog`,
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 3),
      },
    },
    {
      lines: [
        {
          input: `dog\n`,
          output: `dog`,
        },
        {
          input: `?\n`,
          output: `?`,
        },
        {
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `:\n`,
          output: `:`,
        },
        {
          input: `dog`,
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(4, 0),
        end: new vscode.Position(4, 3),
      },
    },
    {
      lines: [
        {
          input: 'if (dog\n',
          output: 'if (dog',
        },
        {
          input: '||\n',
          output: '||',
        },
        {
          input: 'cat || mouse) { console.log(2) }',
          output: 'cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 16),
        end: new vscode.Position(2, 30),
      },
    },
    {
      lines: [
        {
          input: 'if (dog || cat || mouse\n',
          output: 'if (dog || cat || mouse',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 4),
        end: new vscode.Position(1, 18),
      },
    },
    {
      lines: [
        {
          input: 'if (dog ||\n',
          output: 'if (dog ||',
        },
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: 'cat || mouse\n',
          output: 'cat || mouse',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'if (dog\n',
          output: 'if (dog',
        },
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: '|| cat || mouse\n',
          output: '|| cat || mouse',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'if (dog || cat || mouse\n',
          output: 'if (dog || cat || mouse',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: 'if (dog || cat || mouse)\n',
          output: 'if (dog || cat || mouse)',
        },
        {
          input: ' { console.log(2) }',
          output: ' { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: 'if (dog || cat || mouse)\n',
          output: 'if (dog || cat || mouse)',
        },
        {
          input: '{ console.log(2) }\n',
          output: '{ console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 1),
      },
    },
    {
      lines: [
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: 'if (dog || cat || mouse)\n',
          output: 'if (dog || cat || mouse)',
        },
        {
          input: '{ console.log(2) }\n',
          output: '{ console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: 'if (dog || cat || mouse)\n',
          output: 'if (dog || cat || mouse)',
        },
        {
          input: '{ console.log(2) }\n',
          output: '{ console.log(2) }',
        },
        {
          input: ' ',
          output: ' ',
        },
      ],
      selection: {
        start: new vscode.Position(2, 6),
        end: new vscode.Position(3, 1),
      },
    },
    {
      lines: [
        {
          input: 'if (dog || cat || mouse)\n',
          output: 'if (dog || cat || mouse)',
        },
        {
          input: '{ console.log(2) }\n',
          output: '{ console.log(2) }',
        },
        {
          input: ' ',
          output: ' ',
        },
      ],
      selection: {
        start: new vscode.Position(3, 0),
        end: new vscode.Position(3, 1),
      },
    },
    {
      lines: [
        {
          input: 'if\n',
          output: 'if',
        },
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: '(dog || cat || mouse)\n',
          output: '(dog || cat || mouse)',
        },
        {
          input: '{ console.log(2) }\n',
          output: '{ console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
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
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 2),
        end: new vscode.Position(2, 0),
      },
    },
  ]);
});
