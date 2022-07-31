const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted SASS Invertion Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type != ocean { color: blue; } @else if $type != matador { color: red; }`,
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
          input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type != ocean { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 36),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type != ocean { color: blue; } @else if $type == matador { color: red; }`,
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
          input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type != ocean { color: blue; } @else if $type == matador { color: red; }`,
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
          input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type != ocean { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `@if dog { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if !dog { color: blue; } @else if $type == matador { color: red; }`,
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
          input: `@if dog { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if dog { color: blue; } @else if $type == matador { color: red; }`,
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
          input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
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
          input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 35),
        end: new vscode.Position(0, 36),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 36),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 35),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @else if $type != matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 36),
        end: new vscode.Position(0, 77),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @else if $type != matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 37),
        end: new vscode.Position(0, 61),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @else if $type != matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 61),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @else if dog { color: red; }`,
          output: `@if $type == ocean { color: blue; } @else if !dog { color: red; }`,
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
          input: `@if $type == ocean { color: blue; } @else if dog { color: red; }`,
          output: `@if $type == ocean { color: blue; } @else if dog { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 50),
        end: new vscode.Position(0, 63),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @else if dog { color: red; }`,
          output: `@if $type == ocean { color: blue; } @else if dog { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 50),
        end: new vscode.Position(0, 64),
      },
    },
  ]);
});
