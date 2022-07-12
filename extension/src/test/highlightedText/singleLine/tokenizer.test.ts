const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Tokenizer Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `if (DOG_CAT) { console.log('dog') }`,
          output: `if (!DOG_CAT) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `if (DOG_CAT) { console.log('dog') }`,
          output: `if (!DOG_CAT) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: `if (DOG_CAT) { console.log('dog') }`,
          output: `if (!DOG_CAT) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `if (DOG_CAT) { console.log('dog') }`,
          output: `if (!DOG_CAT) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `if (DOG_CAT) { console.log('dog') }`,
          output: `if (!DOG_CAT) { console.log('dog') }`,
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
          input: `if (DOG_CAT) { console.log('dog') }`,
          output: `if (!DOG_CAT) { console.log('dog') }`,
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
          input: `if (_DOG_CAT_||_FISH_) { console.log('dog') }`,
          output: `if (!_DOG_CAT_&&!_FISH_) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: `if (_DOG_CAT_||_FISH_) { console.log('dog') }`,
          output: `if (!_DOG_CAT_||_FISH_) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 13),
      },
    },
    {
      lines: [
        {
          input: `if (_DOG_CAT_||_FISH_) { console.log('dog') }`,
          output: `if (_DOG_CAT_&&_FISH_) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: `if (_DOG_CAT_||_FISH_) { console.log('dog') }`,
          output: `if (_DOG_CAT_||!_FISH_) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: `if (DOG$CAT) { console.log('dog') }`,
          output: `if (!DOG$CAT) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `if (DOG$CAT) { console.log('dog') }`,
          output: `if (!DOG$CAT) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: `if (DOG$CAT) { console.log('dog') }`,
          output: `if (!DOG$CAT) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `if (DOG$CAT) { console.log('dog') }`,
          output: `if (!DOG$CAT) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `if (DOG$CAT) { console.log('dog') }`,
          output: `if (!DOG$CAT) { console.log('dog') }`,
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
          input: `if (DOG$CAT) { console.log('dog') }`,
          output: `if (!DOG$CAT) { console.log('dog') }`,
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
          input: `if ($DOG$CAT$||$FISH$) { console.log('dog') }`,
          output: `if (!$DOG$CAT$&&!$FISH$) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: `if ($DOG$CAT$||$FISH$) { console.log('dog') }`,
          output: `if (!$DOG$CAT$||$FISH$) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 13),
      },
    },
    {
      lines: [
        {
          input: `if ($DOG$CAT$||$FISH$) { console.log('dog') }`,
          output: `if ($DOG$CAT$&&$FISH$) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: `if ($DOG$CAT$||$FISH$) { console.log('dog') }`,
          output: `if ($DOG$CAT$||!$FISH$) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 21),
      },
    },
  ]);
});
