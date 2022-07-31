const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Ruby Invertion Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `elsif dog`,
          output: `elsif !dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `elsif dog`,
          output: `elsif dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: `elsif dog`,
          output: `elsif dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: `elsif dog`,
          output: `elsif !dog`,
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
          input: `if cat elsif dog`,
          output: `if !cat elsif !dog`,
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
          input: `if cat elsif dog`,
          output: `if !cat elsif dog`,
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
          input: `if cat elsif dog`,
          output: `if !cat elsif dog`,
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
          input: `if cat elsif dog`,
          output: `if !cat elsif dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input: `if cat elsif dog`,
          output: `if cat elsif dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input: `if cat elsif dog`,
          output: `if cat elsif !dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: `if cat elsif dog`,
          output: `if cat elsif !dog`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: `print "2 -- Value is set" unless $var`,
          output: `print "2 -- Value is set" unless !$var`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: `print "2 -- Value is set" unless $var`,
          output: `print "2 -- Value is set" unless !$var`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: `print "2 -- Value is set" unless $var`,
          output: `print "2 -- Value is set" unless !$var`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: `print "2 -- Value is set" unless $var`,
          output: `print "2 -- Value is set" unless !$var`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: `print "2 -- Value is set" unless $var`,
          output: `print "2 -- Value is set" unless !$var`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 24),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: `print "2 -- Value is set" unless $var`,
          output: `print "2 -- Value is set" unless !$var`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 25),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: `print "2 -- Value is set" unless $var`,
          output: `print "2 -- Value is set" unless !$var`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 26),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: `print "2 -- Value is set" unless $var`,
          output: `print "2 -- Value is set" unless $var`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 26),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `print "2 -- Value is set" unless $var`,
          output: `print "2 -- Value is set" unless !$var`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 33),
        end: new vscode.Position(0, 37),
      },
    },
  ]);
});
