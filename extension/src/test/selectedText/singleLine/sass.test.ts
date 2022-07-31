const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected SASS Invertion Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
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
          input: `@if $type == ocean { color: blue; } @if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
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
          input: `@if $type == ocean { color: blue; } @if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 35),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 36),
        end: new vscode.Position(0, 36),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 37),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 39),
        end: new vscode.Position(0, 39),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if !dog { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 40),
        end: new vscode.Position(0, 40),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if !dog { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 46),
        end: new vscode.Position(0, 46),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 60),
        end: new vscode.Position(0, 60),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 61),
        end: new vscode.Position(0, 61),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 62),
        end: new vscode.Position(0, 62),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 66),
        end: new vscode.Position(0, 66),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 67),
        end: new vscode.Position(0, 67),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if $type == matador { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 69),
        end: new vscode.Position(0, 69),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if dog { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if !dog { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 70),
        end: new vscode.Position(0, 70),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if dog { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if !dog { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 73),
        end: new vscode.Position(0, 73),
      },
    },
    {
      lines: [
        {
          input: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if dog { color: red; }`,
          output: `@if $type == ocean { color: blue; } @if dog { color: blue; } @else if dog { color: red; }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 89),
        end: new vscode.Position(0, 89),
      },
    },
  ]);
});
