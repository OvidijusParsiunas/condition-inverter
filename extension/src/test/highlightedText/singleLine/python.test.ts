const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite('Highlighted Python Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: 'if dog: print',
          output: 'if !dog: print',
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
          input: 'if !dog: print',
          output: 'if dog: print',
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
          input: 'if dog: print',
          output: 'if !dog: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if dog < cat: print',
          output: 'if dog >= cat: print',
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
          input: 'if dog < cat: print',
          output: 'if !dog < cat: print',
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
          input: 'if dog < cat: print',
          output: 'if !dog < cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if dog < cat: print',
          output: 'if !dog < cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if dog < cat: print',
          output: 'if dog >= cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if dog < cat: print',
          output: 'if dog >= cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 19),
      },
    },
  ]);
});
