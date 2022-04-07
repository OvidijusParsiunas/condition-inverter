const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../types/tests/tests';
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite('Highlighted Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.removeTextDocument());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 30),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 51),
        end: new vscode.Position(0, 60),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 51),
        end: new vscode.Position(0, 80),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 55),
        end: new vscode.Position(0, 60),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 40),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }  if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 46),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }  if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }  if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 46),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 46),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 46),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 46),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 46),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 46),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 24),
        end: new vscode.Position(0, 86),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 24),
        end: new vscode.Position(0, 86),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 25),
        end: new vscode.Position(0, 86),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 24),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 110),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (dog && cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 48),
        end: new vscode.Position(0, 58),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 46),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 47),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 48),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 80),
        end: new vscode.Position(0, 86),
      },
    },
    {
      lines: [
        {
          input: '    if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: '    if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
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
          input: '    if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: '    if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 4),
      },
    },
  ]);
});
