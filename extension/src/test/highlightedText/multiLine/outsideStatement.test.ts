const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite.only('Highlighted Outside Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `const dog =\n`,
          output: `const dog =`,
        },
        {
          input: `cat\n`,
          output: `!cat`,
        },
        {
          input: `&&\n`,
          output: `||`,
        },
        {
          input: `dog\n`,
          output: `!dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(3, 3),
      },
    },
    {
      lines: [
        {
          input: `const dog =\n`,
          output: `const dog =`,
        },
        {
          input: `cat\n`,
          output: `!cat`,
        },
        {
          input: `&&\n`,
          output: `||`,
        },
        {
          input: `dog\n`,
          output: `!dog`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(3, 3),
      },
    },
    {
      lines: [
        {
          input: `const dog =\n`,
          output: `const dog =`,
        },
        {
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `&&\n`,
          output: `||`,
        },
        {
          input: `dog\n`,
          output: `!dog`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(3, 3),
      },
    },
    {
      lines: [
        {
          input: `const dog =\n`,
          output: `const dog =`,
        },
        {
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `&&\n`,
          output: `&&`,
        },
        {
          input: `dog\n`,
          output: `!dog`,
        },
      ],
      selection: {
        start: new vscode.Position(3, 0),
        end: new vscode.Position(3, 3),
      },
    },
    {
      lines: [
        {
          input: `const dog =\n`,
          output: `const dog =`,
        },
        {
          input: `cat\n`,
          output: `!cat`,
        },
        {
          input: `||\n`,
          output: `||`,
        },
        {
          input: `dog\n`,
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 3),
      },
    },
    {
      lines: [
        {
          input: `const dog =\n`,
          output: `const dog =`,
        },
        {
          input: `cat\n`,
          output: `!cat`,
        },
        {
          input: `&&\n`,
          output: `||`,
        },
        {
          input: `dog\n`,
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(2, 2),
      },
    },
    {
      lines: [
        {
          input: `cat\n`,
          output: `!cat`,
        },
        {
          input: `&&\n`,
          output: `&&`,
        },
        {
          input: `dog\n`,
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: `cat\n`,
          output: `!cat`,
        },
        {
          input: `&&\n`,
          output: `||`,
        },
        {
          input: `dog\n`,
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `&&\n`,
          output: `||`,
        },
        {
          input: `dog\n`,
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `&&\n`,
          output: `||`,
        },
        {
          input: `dog\n`,
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `&&\n`,
          output: `||`,
        },
        {
          input: `dog\n`,
          output: `!dog`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(2, 3),
      },
    },
    {
      lines: [
        {
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `&&\n`,
          output: `&&`,
        },
        {
          input: `dog\n`,
          output: `!dog`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 2),
        end: new vscode.Position(2, 3),
      },
    },
  ]);
});
