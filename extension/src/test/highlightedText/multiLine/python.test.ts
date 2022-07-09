const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite('Highlighted Python Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `if dog and\n`,
          output: 'if !dog or',
        },
        {
          input: `cat: print\n`,
          output: 'cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: `if dog and\n`,
          output: 'if dog or',
        },
        {
          input: `cat: print\n`,
          output: 'cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: `if dog and\n`,
          output: 'if dog or',
        },
        {
          input: `cat: print\n`,
          output: 'cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: `if dog and\n`,
          output: 'if dog and',
        },
        {
          input: `cat: print\n`,
          output: '!cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(1, 3),
      },
    },
    {
      lines: [
        {
          input: `if dog and\n`,
          output: 'if dog and',
        },
        {
          input: `cat: print\n`,
          output: '!cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 3),
      },
    },
    {
      lines: [
        {
          input: `if dog and\n`,
          output: 'if dog and',
        },
        {
          input: `cat: print\n`,
          output: '!cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 4),
      },
    },
    {
      lines: [
        {
          input: `if (dog and\n`,
          output: 'if (!dog or',
        },
        {
          input: `cat): print\n`,
          output: '!cat): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 4),
      },
    },
    {
      lines: [
        {
          input: `if (dog and\n`,
          output: 'if (!dog or',
        },
        {
          input: `cat): print\n`,
          output: '!cat): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 5),
      },
    },
    {
      lines: [
        {
          input: `if (dog and\n`,
          output: 'if (!dog or',
        },
        {
          input: `cat): print\n`,
          output: 'cat): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `if (dog and\n`,
          output: 'if (dog and',
        },
        {
          input: `cat): print\n`,
          output: '!cat): print',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 5),
      },
    },
    {
      lines: [
        {
          input: `if (dog and\n`,
          output: 'if (dog and',
        },
        {
          input: `cat): print\n`,
          output: '!cat): print',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 3),
      },
    },
    {
      lines: [
        {
          input: `if (dog and\n`,
          output: 'if (dog and',
        },
        {
          input: `cat): print\n`,
          output: '!cat): print',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 4),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `): print\n`,
          output: '): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `): print\n`,
          output: '): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `): print\n`,
          output: '): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `): print\n`,
          output: '): print',
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
          input: `if (\n`,
          output: 'if (',
        },
        {
          input: `dog): print\n`,
          output: '!dog): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(1, 3),
      },
    },
    {
      lines: [
        {
          input: `if (\n`,
          output: 'if (',
        },
        {
          input: `dog): print\n`,
          output: '!dog): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(1, 4),
      },
    },
    {
      lines: [
        {
          input: `if (\n`,
          output: 'if (',
        },
        {
          input: `dog): print\n`,
          output: '!dog): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(1, 5),
      },
    },
  ]);
});
