const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Vue Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 56),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 55),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 55),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 55),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 55),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 54),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 53),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]" :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]" :class="[isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 53),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]" :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]" :class="[isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 54),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]" :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]" :class="[isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 55),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]" :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[isActive ? activeClass : '', errorClass]" :class="[!isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 56),
        end: new vscode.Position(0, 107),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]" :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[isActive ? activeClass : '', errorClass]" :class="[!isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 64),
        end: new vscode.Position(0, 105),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]" :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[isActive ? activeClass : '', errorClass]" :class="[!isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 64),
        end: new vscode.Position(0, 73),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]" :class="[isActive ? activeClass : '', errorClass]">`,
          output: `<div :class="[isActive ? activeClass : '', errorClass]" :class="[!isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 65),
        end: new vscode.Position(0, 73),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: !cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: !cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: !cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: !cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: !cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: !cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 29),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 29),
        end: new vscode.Position(0, 41),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: !cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 27),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 24),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: !cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 27),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 29),
        end: new vscode.Position(0, 41),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat }, errorClass]">`,
          output: `<div :class="[{ active: cat }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 30),
        end: new vscode.Position(0, 41),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat, anotherProperty: dog }, errorClass]">`,
          output: `<div :class="[{ active: cat, anotherProperty: dog }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 28),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{ active: cat, anotherProperty: dog }, errorClass]">`,
          output: `<div :class="[{ active: cat, anotherProperty: dog }, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 29),
        end: new vscode.Position(0, 49),
      },
    },
  ]);
});
