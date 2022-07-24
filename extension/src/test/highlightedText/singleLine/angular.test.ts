const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Angular Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 29),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
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
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
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
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
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
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
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
          input: ` <div [class.active]="condition">{children}</div>`,
          output: ` <div [class.active]="!condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: ` <div [class.active]="condition">{children}</div>`,
          output: ` <div [class.active]="condition">{children}</div>`,
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
          input: `><div [class.active]="condition">{children}</div>`,
          output: `><div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition" >{children}</div>`,
          output: `<div [class.active]="condition" >{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition" >{children}</div>`,
          output: `<div [class.active]="condition" >{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition" >{children}</div>`,
          output: `<div [class.active]="condition" >{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 33),
        end: new vscode.Position(0, 41),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 41),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 33),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 41),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 41),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 41),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 41),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
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
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
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
          input: `<div [class.active]="condition">{children}</div>`,
          output: `<div [class.active]="condition">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 47),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">children</div>`,
          output: `<div [class.active]="condition">children</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 41),
        end: new vscode.Position(0, 46),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
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
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
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
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition" >{children}</div >`,
          output: `<div [class.active]="!condition" >{children}</div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition" >{children}</div >`,
          output: `<div [class.active]="!condition" >{children}</div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition" >{children}</div >`,
          output: `<div [class.active]="!condition" >{children}</div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition" >{children}</div >`,
          output: `<div [class.active]="condition" >{children}</div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition" >{children}</div >`,
          output: `<div [class.active]="condition" >{children}</div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition" >{children}</div >`,
          output: `<div [class.active]="condition" >{children}</div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition" >{children}</div >`,
          output: `<div [class.active]="condition" >{children}</div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 50),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition" >{children}</div >`,
          output: `<div [class.active]="condition" >{children}</div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 50),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition" >{children}</div >`,
          output: `<div [class.active]="condition" >{children}</div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 33),
        end: new vscode.Position(0, 50),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 48),
        end: new vscode.Position(0, 50),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div>`,
          output: `<div [class.active]="condition">{children}</ div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 50),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 50),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 50),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 50),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 48),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 48),
        end: new vscode.Position(0, 50),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]="condition">{children}</ div >`,
          output: `<div [class.active]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 49),
        end: new vscode.Position(0, 50),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]= "condition">{children}</ div >`,
          output: `<div [class.active]= "!condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]= "condition">{children}</ div >`,
          output: `<div [class.active]= "!condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]= "condition">{children}</ div >`,
          output: `<div [class.active]= "!condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 51),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active]= "condition">{children}</ div >`,
          output: `<div [class.active]= "!condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 51),
      },
    },
    {
      lines: [
        {
          input: `<div [class.active ]="condition">{children}</ div >`,
          output: `<div [class.active ]="condition">{children}</ div >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: `<div [ngClass]="{'my_class': step === 'step1', 'my_class2' : step === 'step2' }">`,
          output: `<div [ngClass]="{'my_class': step !== 'step1', 'my_class2' : step !== 'step2' }">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 81),
      },
    },
    {
      lines: [
        {
          input: `<div [ngClass]="{'my_class': step === 'step1', 'my_class2' : step === 'step2' }">`,
          output: `<div [ngClass]="{'my_class': step !== 'step1', 'my_class2' : step === 'step2' }">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 29),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: `<div [ngClass]="{'my_class': step === 'step1', 'my_class2' : step === 'step2' }">`,
          output: `<div [ngClass]="{'my_class': step !== 'step1', 'my_class2' : step === 'step2' }">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 28),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: `<div [ngClass]="{'my_class': step === 'step1', 'my_class2' : step === 'step2' }">`,
          output: `<div [ngClass]="{'my_class': step !== 'step1', 'my_class2' : step === 'step2' }">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 27),
        end: new vscode.Position(0, 46),
      },
    },
    {
      lines: [
        {
          input: `<div [ngClass]="{'my_class': step === 'step1', 'my_class2' : step === 'step2' }">`,
          output: `<div [ngClass]="{'my_class': step !== 'step1', 'my_class2' : step === 'step2' }">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 59),
      },
    },
    {
      lines: [
        {
          input: `<div [ngClass]="{'my_class': step === 'step1', 'my_class2' : step === 'step2' }">`,
          output: `<div [ngClass]="{'my_class': step !== 'step1', 'my_class2' : step === 'step2' }">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: `<div [ngClass]="{'my_class': step === 'step1', 'my_class2' : step === 'step2' }">`,
          output: `<div [ngClass]="{'my_class': step !== 'step1', 'my_class2' : step !== 'step2' }">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 29),
        end: new vscode.Position(0, 67),
      },
    },
    {
      lines: [
        {
          input: `<div [ngClass]="{'my_class': step === 'step1'}">`,
          output: `<div [ngClass]="{'my_class': step === 'step1'}">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 46),
      },
    },
    {
      lines: [
        {
          input: `<div style="dog === cat" [ngClass]="{'my_class': step === 'step1'}">`,
          output: `<div style="dog === cat" [ngClass]="{'my_class': step !== 'step1'}">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 49),
        end: new vscode.Position(0, 68),
      },
    },
    {
      lines: [
        {
          input: `<div [ngClass]="{'my_class': step === 'step1'}">`,
          output: `<div [ngClass]="{'my_class': step === 'step1'}">`,
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
          input: `<div [ngClass]="{'my_class': step === 'step1'}" style="{background-color: 'red'}>`,
          output: `<div [ngClass]="{'my_class': step === 'step1'}" style="{background-color: 'red'}>`,
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
          input: `<div [ngClass]="step == 'step1' ? 'my_class1' : 'my_class2'">{children}</div>`,
          output: `<div [ngClass]="step != 'step1' ? 'my_class1' : 'my_class2'">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 77),
      },
    },
    {
      lines: [
        {
          input: `<div [ngClass]="step == 'step1' ? 'my_class1' : 'my_class2'">{children}</div>`,
          output: `<div [ngClass]="step != 'step1' ? 'my_class1' : 'my_class2'">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: `<div [ngClass]="step == 'step1' ? 'my_class1' : 'my_class2'">{children}</div>`,
          output: `<div [ngClass]="step != 'step1' ? 'my_class1' : 'my_class2'">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: `<div [ngClass]="step == 'step1' ? 'my_class1' : 'my_class2'">{children}</div>`,
          output: `<div [ngClass]="step != 'step1' ? 'my_class1' : 'my_class2'">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div [ngClass]="step == 'step1' ? 'my_class1' : 'my_class2'">{children}</div>`,
          output: `<div [ngClass]="step == 'step1' ? 'my_class1' : 'my_class2'">{children}</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 33),
        end: new vscode.Position(0, 59),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue">Content to render when condition is true.</div>',
          output: '<div ng-show="myValue">Content to render when condition is true.</div>',
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
          input: '<div ng-show="myValue">Content to render when condition is true.</div>',
          output: '<div ng-show="myValue">Content to render when condition is true.</div>',
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
          input: '<div ng-show="myValue">Content to render when condition is true.</div>',
          output: '<div ng-show="myValue">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue">Content to render when condition is true.</div>',
          output: '<div ng-show="!myValue">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue" ng-hide="expression">Content to render when condition is true.</div>',
          output: '<div ng-show="!myValue" ng-hide="!expression">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue" ng-hide="expression">Content to render when condition is true.</div>',
          output: '<div ng-show="!myValue" ng-hide="expression">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue" ng-hide="expression">Content to render when condition is true.</div>',
          output: '<div ng-show="myValue" ng-hide="!expression">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: '<div *ngIf="condition">Content to render when condition is true.</div>',
          output: '<div *ngIf="!condition">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: '<div *ngIf="condition">Content to render when condition is true.</div>',
          output: '<div *ngIf="condition">Content to render when condition is true.</div>',
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
          input: '<div *ngIf="condition">Content to render when condition is true.</div>',
          output: '<div *ngIf="!condition">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: '<div *ngIf="condition">Content to render when condition is true.</div>',
          output: '<div *ngIf="!condition">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: '<div *ngIf="condition">Content to render when condition is true.</div>',
          output: '<div *ngIf="!condition">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue" *ngIf="condition" ng-show="myValue">',
          output: '<div ng-show="myValue" *ngIf="!condition" ng-show="myValue">',
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 40),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue" *ngIf="condition" ng-show="myValue">',
          output: '<div ng-show="myValue" *ngIf="!condition" ng-show="myValue">',
        },
      ],
      selection: {
        start: new vscode.Position(0, 30),
        end: new vscode.Position(0, 39),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue" *ngIf="condition" ng-show="myValue">',
          output: '<div ng-show="!myValue" *ngIf="condition" ng-show="myValue">',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue" *ngIf="condition" ng-show="myValue">',
          output: '<div ng-show="myValue" *ngIf="condition" ng-show="!myValue">',
        },
      ],
      selection: {
        start: new vscode.Position(0, 40),
        end: new vscode.Position(0, 57),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="condition">Content to render when condition is true.</div>',
          output: '<div [ngIf]="!condition">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="condition">Content to render when condition is true.</div>',
          output: '<div [ngIf]="!condition">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="condition">Content to render when condition is true.</div>',
          output: '<div [ngIf]="!condition">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="condition">Content to render when condition is true.</div>',
          output: '<div [ngIf]="!condition">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="condition">Content to render when condition is true.</div>',
          output: '<div [ngIf]="condition">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: '<div [ngIf]="condition">Content to render when condition is true.</div>',
          output: '<div [ngIf]="condition">Content to render when condition is true.</div>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue" [ngIf]="condition" ng-show="myValue">',
          output: '<div ng-show="myValue" [ngIf]="!condition" ng-show="myValue">',
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 41),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue" [ngIf]="condition" ng-show="myValue">',
          output: '<div ng-show="myValue" [ngIf]="!condition" ng-show="myValue">',
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 40),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue" [ngIf]="condition" ng-show="myValue">',
          output: '<div ng-show="!myValue" [ngIf]="condition" ng-show="myValue">',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: '<div ng-show="myValue" [ngIf]="condition" ng-show="myValue">',
          output: '<div ng-show="myValue" [ngIf]="condition" ng-show="!myValue">',
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 59),
      },
    },
  ]);
});
