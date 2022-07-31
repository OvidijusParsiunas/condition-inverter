const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Ruby Invertion Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `if cat\n`,
          output: `if !cat`,
        },
        {
          input: `words\n`,
          output: `words`,
        },
        {
          input: `elsif dog\n`,
          output: `elsif !dog`,
        },
        {
          input: `text`,
          output: `text`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(3, 4),
      },
    },
    {
      lines: [
        {
          input: `if cat\n`,
          output: `if !cat`,
        },
        {
          input: `words\n`,
          output: `words`,
        },
        {
          input: `elsif dog\n`,
          output: `elsif dog`,
        },
        {
          input: `text`,
          output: `text`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: `if cat\n`,
          output: `if !cat`,
        },
        {
          input: `words\n`,
          output: `words`,
        },
        {
          input: `elsif dog\n`,
          output: `elsif dog`,
        },
        {
          input: `text`,
          output: `text`,
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
          input: `if cat\n`,
          output: `if cat`,
        },
        {
          input: `words\n`,
          output: `words`,
        },
        {
          input: `elsif dog\n`,
          output: `elsif dog`,
        },
        {
          input: `text`,
          output: `text`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 5),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: `if cat\n`,
          output: `if cat`,
        },
        {
          input: `words\n`,
          output: `words`,
        },
        {
          input: `elsif dog\n`,
          output: `elsif dog`,
        },
        {
          input: `text`,
          output: `text`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 5),
        end: new vscode.Position(2, 5),
      },
    },
    {
      lines: [
        {
          input: `if cat\n`,
          output: `if cat`,
        },
        {
          input: `words\n`,
          output: `words`,
        },
        {
          input: `elsif dog\n`,
          output: `elsif !dog`,
        },
        {
          input: `text`,
          output: `text`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 5),
        end: new vscode.Position(2, 9),
      },
    },
    {
      lines: [
        {
          input: `if cat\n`,
          output: `if cat`,
        },
        {
          input: `words\n`,
          output: `words`,
        },
        {
          input: `elsif dog\n`,
          output: `elsif dog`,
        },
        {
          input: `text`,
          output: `text`,
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
          input: `if cat\n`,
          output: `if cat`,
        },
        {
          input: `words\n`,
          output: `words`,
        },
        {
          input: `elsif dog\n`,
          output: `elsif !dog`,
        },
        {
          input: `text`,
          output: `text`,
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
          input: `if cat\n`,
          output: `if cat`,
        },
        {
          input: `words\n`,
          output: `words`,
        },
        {
          input: `elsif dog\n`,
          output: `elsif !dog`,
        },
        {
          input: `text`,
          output: `text`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 6),
        end: new vscode.Position(2, 9),
      },
    },
    {
      lines: [
        {
          input: `if cat\n`,
          output: `if cat`,
        },
        {
          input: `words\n`,
          output: `words`,
        },
        {
          input: `elsif dog\n`,
          output: `elsif !dog`,
        },
        {
          input: `text`,
          output: `text`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 6),
        end: new vscode.Position(3, 0),
      },
    },
    {
      lines: [
        {
          input: `if cat\n`,
          output: `if cat`,
        },
        {
          input: `words\n`,
          output: `words`,
        },
        {
          input: `elsif dog\n`,
          output: `elsif !dog`,
        },
        {
          input: `text`,
          output: `text`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 6),
        end: new vscode.Position(3, 4),
      },
    },
  ]);
});
