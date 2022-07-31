const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Laravel Invertion Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `@if ($dog) <p>I have one record!</p>`,
          output: `@if (!$dog) <p>I have one record!</p>`,
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
          input: `@if ($dog) <p>I have one record!</p>`,
          output: `@if (!$dog) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: `@if ($dog) <p>I have one record!</p>`,
          output: `@if (!$dog) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: `@if ($dog) <p>I have one record!</p>`,
          output: `@if (!$dog) <p>I have one record!</p>`,
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
          input: `@if ($dog) <p>I have one record!</p>`,
          output: `@if (!$dog) <p>I have one record!</p>`,
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
          input: `@if ($dog) <p>I have one record!</p>`,
          output: `@if (!$dog) <p>I have one record!</p>`,
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
          input: `@if ($dog) <p>I have one record!</p>`,
          output: `@if (!$dog) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `@if ($dog) <p>I have one record!</p>`,
          output: `@if (!$dog) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `@if ($dog) <p>I have one record!</p>`,
          output: `@if (!$dog) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: `@if ($dog) <p>I have one record!</p>`,
          output: `@if (!$dog) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: `@if ($dog) <p>I have one record!</p>`,
          output: `@if (!$dog) <p>I have one record!</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `@if ($dog) <p>I have one record!</p>`,
          output: `@if (!$dog) <p>I have one record!</p>`,
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
          input: `@if ($dog) <p>I have one record!</p>`,
          output: `@if ($dog) <p>I have one record!</p>`,
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
          input: `@if ($dog) <p>dogs</p> @elseif ($cat) <p>cats</p>`,
          output: `@if (!$dog) <p>dogs</p> @elseif (!$cat) <p>cats</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `@if ($dog) <p>dogs</p> @elseif ($cat) <p>cats</p>`,
          output: `@if (!$dog) <p>dogs</p> @elseif ($cat) <p>cats</p>`,
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
          input: `@if ($dog) <p>dogs</p> @elseif ($cat) <p>cats</p>`,
          output: `@if (!$dog) <p>dogs</p> @elseif ($cat) <p>cats</p>`,
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
          input: `@if ($dog) <p>dogs</p> @elseif ($cat) <p>cats</p>`,
          output: `@if (!$dog) <p>dogs</p> @elseif ($cat) <p>cats</p>`,
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
          input: `@if ($dog) <p>dogs</p> @elseif ($cat) <p>cats</p> @if ($dog) <p>dogs</p>`,
          output: `@if ($dog) <p>dogs</p> @elseif (!$cat) <p>cats</p> @if ($dog) <p>dogs</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 22),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: `@if ($dog) <p>dogs</p> @elseif ($cat) <p>cats</p> @if ($dog) <p>dogs</p>`,
          output: `@if ($dog) <p>dogs</p> @elseif (!$cat) <p>cats</p> @if ($dog) <p>dogs</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 50),
      },
    },
    {
      lines: [
        {
          input: `@if ($dog) <p>dogs</p> @elseif ($cat) <p>cats</p> @if ($dog) <p>dogs</p>`,
          output: `@if ($dog) <p>dogs</p> @elseif ($cat) <p>cats</p> @if ($dog) <p>dogs</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: `@if ($dog) <p>dogs</p> @elseif ($cat) <p>cats</p> @if ($dog) <p>dogs</p>`,
          output: `@if ($dog) <p>dogs</p> @elseif ($cat) <p>cats</p> @if ($dog) <p>dogs</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 24),
      },
    },
    {
      lines: [
        {
          input: `@if ($dog) <p>dogs</p> @elseif ($cat) <p>cats</p> @if ($dog) <p>dogs</p>`,
          output: `@if ($dog) <p>dogs</p> @elseif (!$cat) <p>cats</p> @if ($dog) <p>dogs</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 33),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: `@if ($dog) <p>dogs</p> @elseif ($cat) <p>cats</p> @if ($dog) <p>dogs</p>`,
          output: `@if ($dog) <p>dogs</p> @elseif (!$cat) <p>cats</p> @if ($dog) <p>dogs</p>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 34),
        end: new vscode.Position(0, 37),
      },
    },
  ]);
});
