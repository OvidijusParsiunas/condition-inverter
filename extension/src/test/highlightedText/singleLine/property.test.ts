const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Property Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `dog: cat ? fish : parrot,`,
          output: `dog: !cat ? fish : parrot,`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 24),
      },
    },
    {
      lines: [
        {
          input: `dog: cat ? fish : parrot,`,
          output: `dog: cat ? fish : parrot,`,
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
          input: `['dog']: cat ? fish : parrot,`,
          output: `['dog']: cat ? fish : parrot,`,
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
          input: `['dog']: cat ? fish : parrot,`,
          output: `['dog']: cat ? fish : parrot,`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `['dog']: cat ? fish : parrot,`,
          output: `['dog']: cat ? fish : parrot,`,
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
          input: `['dog']: cat === dog,`,
          output: `['dog']: cat === dog,`,
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
          input: `['dog']: cat === dog`,
          output: `['dog']: cat === dog`,
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
          input: `'dog': cat === dog,`,
          output: `'dog': cat === dog,`,
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
          input: `dog: cat === dog,`,
          output: `dog: cat === dog,`,
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
          input: `dog: cat === dog,`,
          output: `dog: cat === dog,`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 5),
      },
    },
  ]);
});
