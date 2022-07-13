const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Property Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `prop1: cat,\n`,
          output: `prop1: cat,`,
        },
        {
          input: `dog: cat ? fish : parrot,\n`,
          output: `dog: !cat ? fish : parrot,`,
        },
        {
          input: `prop2: cat,`,
          output: `prop2: cat,`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(2, 10),
      },
    },
    {
      lines: [
        {
          input: `prop1: cat,\n`,
          output: `prop1: cat,`,
        },
        {
          input: `dog: cat ? fish : parrot,\n`,
          output: `dog: cat ? fish : parrot,`,
        },
        {
          input: `prop2: cat,`,
          output: `prop2: cat,`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 3),
      },
    },
    {
      lines: [
        {
          input: `prop1: cat,\n`,
          output: `prop1: cat,`,
        },
        {
          input: `dog: cat ? fish : parrot,\n`,
          output: `dog: cat ? fish : parrot,`,
        },
        {
          input: `prop2: cat,`,
          output: `prop2: cat,`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 10),
        end: new vscode.Position(2, 10),
      },
    },
    {
      lines: [
        {
          input: `['prop1']: cat,\n`,
          output: `['prop1']: cat,`,
        },
        {
          input: `['dog']: cat ? fish : parrot,\n`,
          output: `['dog']: !cat ? fish : parrot,`,
        },
        {
          input: `['prop2']: cat,`,
          output: `['prop2']: cat,`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(2, 15),
      },
    },
    {
      lines: [
        {
          input: `['prop1']: cat,\n`,
          output: `['prop1']: cat,`,
        },
        {
          input: `['dog']: cat ? fish : parrot,\n`,
          output: `['dog']: cat ? fish : parrot,`,
        },
        {
          input: `['prop2']: cat,`,
          output: `['prop2']: cat,`,
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
          input: `['prop1']: cat,\n`,
          output: `['prop1']: cat,`,
        },
        {
          input: `['dog']: cat ? fish : parrot,\n`,
          output: `['dog']: cat ? fish : parrot,`,
        },
        {
          input: `['prop2']: cat,`,
          output: `['prop2']: cat,`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(1, 7),
      },
    },
    {
      lines: [
        {
          input: `['prop1']: cat,\n`,
          output: `['prop1']: cat,`,
        },
        {
          input: `['dog']: cat ? fish : parrot,\n`,
          output: `['dog']: cat ? fish : parrot,`,
        },
        {
          input: `['prop2']: cat,`,
          output: `['prop2']: cat,`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(1, 7),
      },
    },
    {
      lines: [
        {
          input: `['prop1']: cat,\n`,
          output: `['prop1']: cat,`,
        },
        {
          input: `['dog']: cat ? fish : parrot,\n`,
          output: `['dog']: cat ? fish : parrot,`,
        },
        {
          input: `['prop2']: cat,`,
          output: `['prop2']: cat,`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 12),
        end: new vscode.Position(2, 15),
      },
    },
    {
      lines: [
        {
          input: `['prop1']: cat,\n`,
          output: `['prop1']: cat,`,
        },
        {
          input: `['dog']: cat ? fish : parrot,\n`,
          output: `['dog']: cat ? fish : parrot,`,
        },
        {
          input: `['prop2']: cat,`,
          output: `['prop2']: cat,`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 13),
        end: new vscode.Position(2, 15),
      },
    },
    {
      lines: [
        {
          input: `['prop1']: cat,\n`,
          output: `['prop1']: cat,`,
        },
        {
          input: `['dog']: cat ? fish : parrot,\n`,
          output: `['dog']: cat ? fish : parrot,`,
        },
        {
          input: `['prop2']: cat,`,
          output: `['prop2']: cat,`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 14),
        end: new vscode.Position(2, 15),
      },
    },
  ]);
});
