const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../types/tests/tests';
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite('Highlighted Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.removeTextDocument());

  TestUtil.runInversionTests(textEditorObj, 'Outside If Statement', [
    {
      lines: [
        {
          input: `    if (dog\n`,
          output: '    if (dog',
        },
        {
          input: `&& cat\n`,
          output: '&& cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '|| mouse) { console.log(2) }',
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
          output: 'if (dog',
        },
        {
          input: `&& cat\n`,
          output: '&& cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '|| mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 9),
        end: new vscode.Position(2, 27),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (dog',
        },
        {
          input: `&& cat\n`,
          output: '&& cat',
        },
        {
          input: `|| mouse) { console.log(2) }`,
          output: '|| mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 11),
        end: new vscode.Position(2, 27),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (dog',
        },
        {
          input: `&& cat\n`,
          output: '&& cat',
        },
        {
          input: `|| mouse)\n`,
          output: '|| mouse)',
        },
        {
          input: `{ console.log(2) }`,
          output: '{ console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(3, 1),
        end: new vscode.Position(3, 10),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (dog',
        },
        {
          input: `&& cat\n`,
          output: '&& cat',
        },
        {
          input: `|| mouse)\n`,
          output: '|| mouse)',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: `{ console.log(2) }`,
          output: '{ console.log(2) }',
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
          input: `if (dog\n`,
          output: 'if (dog',
        },
        {
          input: `&& cat\n`,
          output: '&& cat',
        },
        {
          input: `|| mouse)\n`,
          output: '|| mouse)',
        },
        {
          input: `{ console.log(2) }\n`,
          output: '{ console.log(2) }',
        },
        {
          input: `    `,
          output: '    ',
        },
      ],
      selection: {
        start: new vscode.Position(4, 1),
        end: new vscode.Position(4, 2),
      },
    },
    {
      lines: [
        {
          input: `if (dog\n`,
          output: 'if (dog',
        },
        {
          input: `&& cat\n`,
          output: '&& cat',
        },
        {
          input: `|| mouse)\n`,
          output: '|| mouse)',
        },
        {
          input: `{ console.log(2) }\n`,
          output: '{ console.log(2) }',
        },
        {
          input: `    `,
          output: '    ',
        },
      ],
      selection: {
        start: new vscode.Position(3, 5),
        end: new vscode.Position(4, 2),
      },
    },
    {
      lines: [
        {
          input: `    \n`,
          output: '    ',
        },
        {
          input: `  if (dog\n`,
          output: '  if (dog',
        },
        {
          input: `&& cat\n`,
          output: '&& cat',
        },
        {
          input: `|| mouse)\n`,
          output: '|| mouse)',
        },
        {
          input: `{ console.log(2) }\n`,
          output: '{ console.log(2) }',
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
          input: `    \n`,
          output: '    ',
        },
        {
          input: `  if (dog\n`,
          output: '  if (dog',
        },
        {
          input: `&& cat\n`,
          output: '&& cat',
        },
        {
          input: `|| mouse)\n`,
          output: '|| mouse)',
        },
        {
          input: `{ console.log(2) }\n`,
          output: '{ console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
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
        start: new vscode.Position(0, 25),
        end: new vscode.Position(0, 42),
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
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 25),
        end: new vscode.Position(1, 42),
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
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 25),
        end: new vscode.Position(2, 42),
      },
    },
  ]);
});
