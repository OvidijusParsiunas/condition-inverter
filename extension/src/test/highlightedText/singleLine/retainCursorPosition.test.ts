const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

// cannot do this for multiline highlight as it is impossible to know the text length difference exclusively for the statement
// highlighted on the end selection line
suite('Retain Highlighted Statement Position Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `if (cat && dog) {`,
          output: `if (!cat && dog) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 5),
      },
      postSelection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: `if (cat && dog) {`,
          output: `if (!cat || !dog) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 14),
      },
      postSelection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: `if (cat && dog) {`,
          output: `if (!cat || !dog) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 14),
      },
      postSelection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: `if (cat && dog) {`,
          output: `if (!cat || !dog) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 17),
      },
      postSelection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: `if (cat && dog) {`,
          output: `if (!cat && dog) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 7),
      },
      postSelection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `if (cat && dog) {`,
          output: `if (!cat && dog) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 5),
      },
      postSelection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: `if (!cat && dog) {`,
          output: `if (cat && dog) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 5),
      },
      postSelection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 4),
      },
    },
    {
      lines: [
        {
          input: `if (cat && dog) {`,
          output: `if (cat && dog) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 16),
      },
      postSelection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: `if ((cat && dog)) {`,
          output: `if ((!cat || !dog)) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 16),
      },
      postSelection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `if ((cat && dog)) {`,
          output: `if ((!cat || !dog)) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 15),
      },
      postSelection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: `if (!(cat) && dog) {`,
          output: `if (cat || !dog) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 17),
      },
      postSelection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: `if (!(cat) && dog) {`,
          output: `if (cat && dog) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 10),
      },
      postSelection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: `if (!(cat) && dog) {`,
          output: `if (cat && dog) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 10),
      },
      postSelection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: `if (!(cat) && dog) {`,
          output: `if (cat && dog) {`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 10),
      },
      postSelection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: `const fish = cat && dog`,
          output: `const fish = !cat || !dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 23),
      },
      postSelection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 25),
      },
    },
    {
      lines: [
        {
          input: `const fish = cat && dog`,
          output: `const fish = !cat && dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 16),
      },
      postSelection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: `const fish = cat && dog`,
          output: `const fish = !cat && dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 16),
      },
      postSelection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: `const fish = true && dog`,
          output: `const fish = false || dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 21),
      },
      postSelection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: `const cat = dog;`,
          output: `const cat = dog;`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 16),
      },
      postSelection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: `const cat = dog;`,
          output: `const cat = dog;`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 15),
      },
      postSelection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: `const fish = 1;`,
          output: `const fish = 1;`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 14),
      },
      postSelection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: `const fish = true`,
          output: `const fish = true`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 17),
      },
      postSelection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 17),
      },
    },
  ]);
});
