const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('DOM No Condition Invertion Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `<div class="cat">`,
          output: `<div class="cat">`,
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
          input: `<div class="cat">`,
          output: `<div class="cat">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 1),
      },
    },
    {
      lines: [
        {
          input: `<div class="cat">`,
          output: `<div class="cat">`,
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
          input: `<div class="cat">`,
          output: `<div class="cat">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: `<div class="cat">`,
          output: `<div class="cat">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog">cat`,
          output: `<div class="dog">cat`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog">cat`,
          output: `<div class="dog">cat`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog">cat</div>`,
          output: `<div class="dog">cat</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 26),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog">cat</div>`,
          output: `<div class="dog">cat</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 26),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog">cat</div>`,
          output: `<div class="dog">cat</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 26),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog">cat</div>`,
          output: `<div class="dog">cat</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 22),
        end: new vscode.Position(0, 26),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog">cat</div>`,
          output: `<div class="dog">cat</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 26),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog">cat</div><div style="background-color: red; font-size: 20px"></div>`,
          output: `<div class="dog">cat</div><div style="background-color: red; font-size: 20px"></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 84),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog">cat</div><div style="background-color: red; font-size: 20px"></div>`,
          output: `<div class="dog">cat</div><div style="background-color: red; font-size: 20px"></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 26),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog">cat</div><div style="background-color: red; font-size: 20px"></div>`,
          output: `<div class="dog">cat</div><div style="background-color: red; font-size: 20px"></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 26),
        end: new vscode.Position(0, 84),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog"><div>cat</div></div>`,
          output: `<div class="dog"><div>cat</div></div>`,
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
          input: `<div class="dog"><div>cat</div></div>`,
          output: `<div class="dog"><div>cat</div></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog"><div>cat</div></div>`,
          output: `<div class="dog"><div>cat</div></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog"><div>cat</div></div>`,
          output: `<div class="dog"><div>cat</div></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 27),
      },
    },
    {
      lines: [
        {
          input: `<div class="dog"><div>cat</div></div>`,
          output: `<div class="dog"><div>cat</div></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 26),
      },
    },
  ]);
});
