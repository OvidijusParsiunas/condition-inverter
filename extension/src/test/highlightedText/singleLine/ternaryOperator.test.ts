const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite('Highlighted Ternary Operator Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `dog ? cat : dog`,
          output: `!dog ? cat : dog`,
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
          input: `dog ? cat : dog`,
          output: `!dog ? cat : dog`,
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
          input: `(dog) ? cat : dog`,
          output: `!(dog) ? cat : dog`,
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
          input: `(dog) ? cat : dog`,
          output: `!(dog) ? cat : dog`,
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
          input: `(dog) ? cat : dog`,
          output: `!(dog) ? cat : dog`,
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
          input: `dog && cat ? cat : dog`,
          output: `!dog || !cat ? cat : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: `dog && cat ? cat : dog`,
          output: `dog && !cat ? cat : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: `dog && cat ? cat : dog`,
          output: `!dog && cat ? cat : dog`,
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
          input: `dog && cat ? cat : dog`,
          output: `!dog || cat ? cat : dog`,
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
          input: `(dog && cat) ? cat : dog`,
          output: `(dog && !cat) ? cat : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `(dog && cat) ? cat : dog`,
          output: `(dog && !cat) ? cat : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input: `dog && cat) ? cat : dog`,
          output: `dog && !cat) ? cat : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: `dog && cat ? cat : dog`,
          output: `dog && !cat ? cat : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: `dog && cat ? cat : dog`,
          output: `!dog || !cat ? cat : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: `dog ? cat : dog`,
          output: `dog ? cat : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: `dog ? cat : dog`,
          output: `dog ? cat : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `dog ? cat : dog`,
          output: `dog ? cat : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: `dog?cat:dog`,
          output: `!dog?cat:dog`,
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
          input: `dog  ?  cat  :  dog`,
          output: `!dog  ?  cat  :  dog`,
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
          input: `dog ? fish ? dog : cat : dog`,
          output: `dog ? !fish ? dog : cat : dog`,
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
          input: `dog ? dog : cat ? fish : dog`,
          output: `dog ? dog : !cat ? fish : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: `dog ? dog : (cat) ? fish : dog`,
          output: `dog ? dog : !(cat) ? fish : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: `dog ? cat + dog ? fish : dog : dog`,
          output: `dog ? !(cat + dog) ? fish : dog : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `dog ? cat + dog ? fish : dog : dog`,
          output: `dog ? !(cat + dog) ? fish : dog : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: `dog ? cat + dog ? fish : dog : dog`,
          output: `dog ? !(cat + dog) ? fish : dog : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: `dog ? cat + dog ? fish : dog : dog ? fish : dog`,
          output: `dog ? !(cat + dog) ? fish : dog : dog ? fish : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `dog ? cat + dog ? fish : dog : dog ? fish : dog`,
          output: `dog ? !(cat + dog) ? fish : dog : dog ? fish : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: `dog ? cat + dog ? fish : dog : dog ? fish : dog`,
          output: `dog ? !(cat + dog) ? fish : dog : dog ? fish : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: `dog ? dog : cat + dog ? fish : dog`,
          output: `dog ? dog : !(cat + dog) ? fish : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: `dog ? dog : cat + dog ? fish : dog`,
          output: `dog ? dog : !(cat + dog) ? fish : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: `dog ? dog : (cat) ? fish : dog`,
          output: `dog ? dog : !(cat) ? fish : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: `dog ? dog : cat ? fish : dog`,
          output: `dog ? dog : !cat ? fish : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 28),
      },
    },
    {
      lines: [
        {
          input: `dog ? dog : cat ? fish : dog`,
          output: `dog ? dog : !cat ? fish : dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 28),
      },
    },
  ]);
});
