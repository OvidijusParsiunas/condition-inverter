const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted SASS Invertion Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `@if dog { color: blue; }\n`,
          output: `@if !dog { color: blue; }`,
        },
        {
          input: `@else if cat { color: red; }`,
          output: `@else if !cat { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 28),
      },
    },
    {
      lines: [
        {
          input: `@if dog { color: blue; }\n`,
          output: `@if !dog { color: blue; }`,
        },
        {
          input: `@else if cat { color: red; }`,
          output: `@else if cat { color: red; }`,
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
          input: `@if dog { color: blue; }\n`,
          output: `@if dog { color: blue; }`,
        },
        {
          input: `@else if cat { color: red; }`,
          output: `@else if !cat { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 28),
      },
    },
    {
      lines: [
        {
          input: `@if dog { color: blue; }\n`,
          output: `@if dog { color: blue; }`,
        },
        {
          input: `@else if cat { color: red; }`,
          output: `@else if cat { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(1, 9),
      },
    },
    {
      lines: [
        {
          input: `@if dog { color: blue; }\n`,
          output: `@if dog { color: blue; }`,
        },
        {
          input: `@else if cat { color: red; }`,
          output: `@else if cat { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(1, 9),
      },
    },
    {
      lines: [
        {
          input: `@if dog {\n`,
          output: `@if dog {`,
        },
        {
          input: `color: blue;\n`,
          output: `color: blue;`,
        },
        {
          input: `}\n`,
          output: `}`,
        },
        {
          input: `@else if cat { color: red; }`,
          output: `@else if cat { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 12),
      },
    },
  ]);
});
