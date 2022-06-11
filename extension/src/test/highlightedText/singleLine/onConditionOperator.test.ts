const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite.only('Highlighted Ends On Condition Operator Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && !cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog || !cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 43),
      },
    },

    {
      lines: [
        {
          input: 'if (dog << cat) { console.log(2) }',
          output: 'if (!(dog << cat)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog >> cat) { console.log(2) }',
          output: 'if (!(dog >> cat)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog << cat) { console.log(2) }',
          output: 'if (!(dog << cat)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (dog >> cat) { console.log(2) }',
          output: 'if (!(dog >> cat)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 9),
      },
    },
  ]);
});
