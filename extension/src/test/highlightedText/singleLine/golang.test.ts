const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite.only('Highlighted Golang Statement Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9;  num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9;  num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 13),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 13),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; !num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; !num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num >= dog { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num >= dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num >= dog { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num >= dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 22),
      },
    },
  ]);
});
