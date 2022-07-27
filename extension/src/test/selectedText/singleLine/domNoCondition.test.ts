const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected DOM No Condition Invertion Suite', () => {
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
        end: new vscode.Position(0, 0),
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
        start: new vscode.Position(0, 1),
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
        start: new vscode.Position(0, 4),
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
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 5),
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
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 10),
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
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 11),
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
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 12),
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
        end: new vscode.Position(0, 15),
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
        end: new vscode.Position(0, 16),
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
        start: new vscode.Position(0, 17),
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
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: `<div class="cat">cat`,
          output: `<div class="cat">cat`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
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
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 17),
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
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 21),
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
        end: new vscode.Position(0, 22),
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
        start: new vscode.Position(0, 25),
        end: new vscode.Position(0, 25),
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
        start: new vscode.Position(0, 26),
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
        start: new vscode.Position(0, 25),
        end: new vscode.Position(0, 25),
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
        start: new vscode.Position(0, 27),
        end: new vscode.Position(0, 27),
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
        start: new vscode.Position(0, 36),
        end: new vscode.Position(0, 36),
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
        start: new vscode.Position(0, 38),
        end: new vscode.Position(0, 38),
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
        start: new vscode.Position(0, 54),
        end: new vscode.Position(0, 54),
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
        start: new vscode.Position(0, 55),
        end: new vscode.Position(0, 5),
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
        start: new vscode.Position(0, 56),
        end: new vscode.Position(0, 56),
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
        start: new vscode.Position(0, 59),
        end: new vscode.Position(0, 59),
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
        start: new vscode.Position(0, 60),
        end: new vscode.Position(0, 60),
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
        start: new vscode.Position(0, 70),
        end: new vscode.Position(0, 70),
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
        start: new vscode.Position(0, 71),
        end: new vscode.Position(0, 71),
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
        start: new vscode.Position(0, 72),
        end: new vscode.Position(0, 72),
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
        start: new vscode.Position(0, 74),
        end: new vscode.Position(0, 74),
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
        start: new vscode.Position(0, 76),
        end: new vscode.Position(0, 76),
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
        start: new vscode.Position(0, 77),
        end: new vscode.Position(0, 77),
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
        start: new vscode.Position(0, 78),
        end: new vscode.Position(0, 78),
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
        start: new vscode.Position(0, 79),
        end: new vscode.Position(0, 79),
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
        start: new vscode.Position(0, 80),
        end: new vscode.Position(0, 80),
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
        start: new vscode.Position(0, 83),
        end: new vscode.Position(0, 83),
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
        start: new vscode.Position(0, 84),
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
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 16),
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
        end: new vscode.Position(0, 17),
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
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 18),
      },
    },
  ]);
});
