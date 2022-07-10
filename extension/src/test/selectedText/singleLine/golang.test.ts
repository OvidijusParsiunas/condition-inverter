const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected Golang Statement Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; !num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; !num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; !num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; !num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num >= 0 { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num >= 0 { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < !dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 19),
      },
    },
  ]);
});
