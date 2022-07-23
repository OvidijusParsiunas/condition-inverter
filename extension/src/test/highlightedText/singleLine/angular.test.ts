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
  ]);
});
