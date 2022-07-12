const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected Tokenizer Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `if (_DOG_CAT_) { console.log('dog') }`,
          output: `if (!_DOG_CAT_) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 4),
      },
    },
    {
      lines: [
        {
          input: `if (_DOG_CAT_) { console.log('dog') }`,
          output: `if (!_DOG_CAT_) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: `if (_DOG_CAT_) { console.log('dog') }`,
          output: `if (!_DOG_CAT_) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `if (_DOG_CAT_) { console.log('dog') }`,
          output: `if (!_DOG_CAT_) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `if (_DOG_CAT_) { console.log('dog') }`,
          output: `if (!_DOG_CAT_) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input: `if (_DOG_CAT_) { console.log('dog') }`,
          output: `if (!_DOG_CAT_) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 13),
      },
    },
    {
      lines: [
        {
          input: `if (_DOG_CAT_||_FISH_) { console.log('dog') }`,
          output: `if (!_DOG_CAT_&&_FISH_) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
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
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: `if (_DOG_CAT_||_FISH_) { console.log('dog') }`,
          output: `if (_DOG_CAT_&&!_FISH_) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
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
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 16),
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
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 20),
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
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 21),
      },
    },
  ]);
});
