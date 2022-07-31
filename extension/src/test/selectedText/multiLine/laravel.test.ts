const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected Laravel Invertion Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `@if (\n`,
          output: `@if (`,
        },
        {
          input: `$dog\n`,
          output: `$dog`,
        },
        {
          input: `) <p>I have one record!</p>`,
          output: `) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 0),
      },
    },
    {
      lines: [
        {
          input: `@if (\n`,
          output: `@if (`,
        },
        {
          input: `$dog\n`,
          output: `$dog`,
        },
        {
          input: `) <p>I have one record!</p>`,
          output: `) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 1),
      },
    },
    {
      lines: [
        {
          input: `@if (\n`,
          output: `@if (`,
        },
        {
          input: `$dog\n`,
          output: `$dog`,
        },
        {
          input: `) <p>I have one record!</p>`,
          output: `) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: `@if (\n`,
          output: `@if (`,
        },
        {
          input: `$dog\n`,
          output: `$dog`,
        },
        {
          input: `) <p>I have one record!</p>`,
          output: `) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: `@if (\n`,
          output: `@if (`,
        },
        {
          input: `$dog\n`,
          output: `$dog`,
        },
        {
          input: `) <p>I have one record!</p>`,
          output: `) <p>I have one record!</p>`,
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
          input: `@if (\n`,
          output: `@if (`,
        },
        {
          input: `$dog\n`,
          output: `!$dog`,
        },
        {
          input: `) <p>I have one record!</p>`,
          output: `) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: `@if (\n`,
          output: `@if (`,
        },
        {
          input: `$dog\n`,
          output: `!$dog`,
        },
        {
          input: `) <p>I have one record!</p>`,
          output: `) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 2),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: `@if (\n`,
          output: `@if (`,
        },
        {
          input: `$dog\n`,
          output: `$dog`,
        },
        {
          input: `) <p>I have one record!</p>`,
          output: `) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: `@if (\n`,
          output: `@if (`,
        },
        {
          input: `$dog\n`,
          output: `$dog`,
        },
        {
          input: `) <p>I have one record!</p>`,
          output: `) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 1),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: `@if (\n`,
          output: `@if (`,
        },
        {
          input: `$dog\n`,
          output: `$dog`,
        },
        {
          input: `) <p>I have one record!</p>`,
          output: `) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 2),
        end: new vscode.Position(2, 2),
      },
    },
    {
      lines: [
        {
          input: `@if (\n`,
          output: `@if (`,
        },
        {
          input: `$dog\n`,
          output: `$dog`,
        },
        {
          input: `) <p>I have one record!</p>`,
          output: `) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 3),
        end: new vscode.Position(2, 3),
      },
    },
    {
      lines: [
        {
          input: `@if (\n`,
          output: `@if (`,
        },
        {
          input: `$dog\n`,
          output: `$dog`,
        },
        {
          input: `) <p>I have one record!</p>`,
          output: `) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 4),
        end: new vscode.Position(2, 4),
      },
    },
    {
      lines: [
        {
          input: `@if (\n`,
          output: `@if (`,
        },
        {
          input: `$dog\n`,
          output: `$dog`,
        },
        {
          input: `) <p>I have one record!</p>`,
          output: `) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 5),
        end: new vscode.Position(2, 5),
      },
    },
  ]);
});
