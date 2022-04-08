const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../types/tests/tests';
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite('Highlighted Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.removeTextDocument());

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
  ]);
});
