const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../shared/types/tests';
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite('Highlighted Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multiple Lines', [
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(2, 28),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
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
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 2),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 4),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 2),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 4),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 4),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 4),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
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
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
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
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(1, 3),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
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
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(2, 2),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(2, 5),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(2, 10),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
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
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
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
          input: `|| !cat\n`,
          output: '&& cat',
        },
        {
          input: `|| !mouse) { console.log(2) }`,
          output: '&& mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 3),
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
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 5),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(2, 2),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(2, 5),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(2, 10),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 2),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 5),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 10),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 12),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 15),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 8),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 9),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 8),
        end: new vscode.Position(2, 9),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 7),
        end: new vscode.Position(2, 9),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 8),
        end: new vscode.Position(2, 10),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '&& !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 5),
        end: new vscode.Position(2, 15),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 5),
        end: new vscode.Position(1, 10),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 5),
        end: new vscode.Position(2, 10),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(2, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'const inverterVariable = 2;\n',
          output: 'const inverterVariable = 2;',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'const inverterVariable = 2;\n',
          output: 'const inverterVariable = 2;',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(4, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: 'const inverterVariable = 2;\n',
          output: 'const inverterVariable = 2;',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 40),
        end: new vscode.Position(1, 10),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: 'const inverterVariable = 2;\n',
          output: 'const inverterVariable = 2;',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 40),
        end: new vscode.Position(2, 10),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: 'const inverterVariable = 2;\n',
          output: 'const inverterVariable = 2;',
        },
        {
          input: 'const inverterVariable = 2;\n',
          output: 'const inverterVariable = 2;',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: 'const inverterVariable = 2;\n',
          output: 'const inverterVariable = 2;',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(3, 40),
        end: new vscode.Position(5, 10),
      },
    },
    {
      lines: [
        {
          input: `if (myFunc(\n`,
          output: 'if (!myFunc(',
        },
        {
          input: `dog < cat\n`,
          output: 'dog < cat',
        },
        {
          input: `)) { console.log(2) }`,
          output: ')) { console.log(2) }',
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
          input: `if (myFunc(\n`,
          output: 'if (!myFunc(',
        },
        {
          input: `dog < cat\n`,
          output: 'dog < cat',
        },
        {
          input: `)) { console.log(2) }`,
          output: ')) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 2),
        end: new vscode.Position(1, 4),
      },
    },
    {
      lines: [
        {
          input: `if (myFunc(\n`,
          output: 'if (!myFunc(',
        },
        {
          input: `dog < cat\n`,
          output: 'dog < cat',
        },
        {
          input: `)) { console.log(2) }`,
          output: ')) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 4),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: `if (myFunc(\n`,
          output: 'if (!myFunc(',
        },
        {
          input: `dog < cat\n`,
          output: 'dog < cat',
        },
        {
          input: `)) { console.log(2) }`,
          output: ')) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 4),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: `console.log(dog) if (dogif && \n`,
          output: `console.log(dog) if (!dogif || `,
        },
        {
          input: `cat || mouseif) { console.log(2) }`,
          output: '!cat && !mouseif) { console.log(2) }',
        },
        {
          input: `\n`,
          output: '',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: `dogif\n`,
          output: `dogif`,
        },
        {
          input: `\n`,
          output: '',
        },
        {
          input: `if (\n`,
          output: `if (`,
        },
        {
          input: `dogif && \n`,
          output: `!dogif || `,
        },
        {
          input: `cat || mouseif) { console.log(2) }`,
          output: '!cat && !mouseif) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(3, 3),
        end: new vscode.Position(4, 1),
      },
    },
    {
      lines: [
        {
          input: `if (\n`,
          output: `if (`,
        },
        {
          input: `dogif && \n`,
          output: `!dogif || `,
        },
        {
          input: `cat || mouseif) { console.log(2) }`,
          output: '!cat && !mouseif) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 5),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: `if (\n`,
          output: `if (`,
        },
        {
          input: `dogif && \n`,
          output: `!dogif || `,
        },
        {
          input: `cat || mouseif) { console.log(2) }`,
          output: '!cat && !mouseif) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: `console.log(dog)\n`,
          output: `console.log(dog)`,
        },
        {
          input: `if (dogif && cat || mouseif) { console.log(2) }`,
          output: 'if (!dogif || !cat && !mouseif) { console.log(2) }',
        },
        {
          input: `\n`,
          output: '',
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
          input: `console.log(dog)\n`,
          output: `console.log(dog)`,
        },
        {
          input: `if (dogif && cat || mouseif) { console.log(2) }`,
          output: 'if (!dogif || !cat && !mouseif) { console.log(2) }',
        },
        {
          input: `\n`,
          output: '',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 9),
      },
    },
    {
      lines: [
        {
          input: `console.log(dog)\n`,
          output: `console.log(dog)`,
        },
        {
          input: `if (dogif && cat || mouseif) { console.log(2) }`,
          output: 'if (!dogif || !cat && !mouseif) { console.log(2) }',
        },
        {
          input: `\n`,
          output: '',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 14),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasd') if (dogif && \n`,
          output: `if (dog) console.log('asdasd') if (!dogif || `,
        },
        {
          input: `\n`,
          output: '',
        },
        {
          input: `cat || mouse) { console.log(2) }`,
          output: '!cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasd') if (dogif && \n`,
          output: `if (dog) console.log('asdasd') if (!dogif || `,
        },
        {
          input: `\n`,
          output: '',
        },
        {
          input: `cat || mouse) { console.log(2) }`,
          output: '!cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 38),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasd')\n`,
          output: `if (!dog) console.log('asdasd')`,
        },
        {
          input: `if (dogif && \n`,
          output: 'if (!dogif || ',
        },
        {
          input: `cat || mouse) { console.log(2) }`,
          output: '!cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(1, 7),
      },
    },
    {
      lines: [
        {
          input: `dogif if (dog) console.log('asdasd')\n`,
          output: `dogif if (!dog) console.log('asdasd')`,
        },
        {
          input: `if (dogif && \n`,
          output: 'if (!dogif || ',
        },
        {
          input: `cat || mouse) { console.log(2) }`,
          output: '!cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(1, 7),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasd')\n`,
          output: `if (!dog) console.log('asdasd')`,
        },
        {
          input: `if (dogif && \n`,
          output: 'if (!dogif || ',
        },
        {
          input: `cat || mouse) { console.log(2) } dogif`,
          output: '!cat && !mouse) { console.log(2) } dogif',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(2, 36),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasd')\n`,
          output: `if (!dog) console.log('asdasd')`,
        },
        {
          input: `if (dogif && \n`,
          output: 'if (!dogif || ',
        },
        {
          input: `cat || mouse) { console.log(2) } dogif`,
          output: '!cat && !mouse) { console.log(2) } dogif',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(2, 38),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasd')\n`,
          output: `if (!dog) console.log('asdasd')`,
        },
        {
          input: `while (dogif) console.log('hello') \n`,
          output: `while (!dogif) console.log('hello') `,
        },
        {
          input: `if cat or mouse: { console.log(2) }`,
          output: 'if cat or mouse: { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasd')\n`,
          output: `if (!dog) console.log('asdasd')`,
        },
        {
          input: `while (dogif) console.log('hello') \n`,
          output: `while (!dogif) console.log('hello') `,
        },
        {
          input: `if cat or mouse: { console.log(2) }`,
          output: 'if !cat and !mouse: { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(2, 24),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasd')\n`,
          output: `if (!dog) console.log('asdasd')`,
        },
        {
          input: `if dogif: console.log('hello') \n`,
          output: `if !dogif: console.log('hello') `,
        },
        {
          input: `if cat or mouse: { console.log(2) }`,
          output: 'if cat or mouse: { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(1, 24),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasd')\n`,
          output: `if (dog) console.log('asdasd')`,
        },
        {
          input: `if dogif: console.log('hello') \n`,
          output: `if !dogif: console.log('hello') `,
        },
        {
          input: `if cat or mouse: { console.log(2) }`,
          output: 'if !cat and !mouse: { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 5),
        end: new vscode.Position(2, 24),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasd')\n`,
          output: `if (!dog) console.log('asdasd')`,
        },
        {
          input: `if dogif: console.log('hello') \n`,
          output: `if !dogif: console.log('hello') `,
        },
        {
          input: `if cat or mouse: { console.log(2) }`,
          output: 'if cat or mouse: { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: `if () console.log('asdasd')\n`,
          output: `if () console.log('asdasd')`,
        },
        {
          input: `if () console.log('hello') \n`,
          output: `if () console.log('hello') `,
        },
        {
          input: `if cat or mouse: { console.log(2) }`,
          output: 'if !cat and !mouse: { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(2, 2),
      },
    },
  ]);
});
