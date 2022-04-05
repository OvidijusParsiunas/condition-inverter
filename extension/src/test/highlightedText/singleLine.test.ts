const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../types/tests/tests';
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite.only('Highlighted Text Suite - Single Line -', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.removeTextDocument());

  TestUtil.runInversionTests(textEditorObj, `Single line testing`, [
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) }`,
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
          input: `if (dog && cat || mouse) { console.log(2) }`,
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
          input: `if (dog && cat || mouse) { console.log(2) }`,
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
          input: `if (dog && cat || mouse) { console.log(2) }`,
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
          input: `if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }`,
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
          input: `if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }`,
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
          input: `if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }`,
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
          input: `if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }`,
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
        start: new vscode.Position(2, 18),
        end: new vscode.Position(2, 22),
      },
    },
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }`,
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
          input: `if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }`,
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
          input: `if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }`,
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
          input: `if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }`,
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
          input: `if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }`,
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
          input: `if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }`,
          output: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 80),
        end: new vscode.Position(0, 86),
      },
    },
  ]);
});
