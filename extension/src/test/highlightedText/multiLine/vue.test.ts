const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Vue Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(2, 56),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[isActive ? activeClass : '', errorClass]">`,
        },
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 56),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[isActive ? activeClass : '', errorClass]">`,
        },
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 13),
        end: new vscode.Position(1, 54),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[isActive ? activeClass : '', errorClass]">`,
        },
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 14),
        end: new vscode.Position(1, 53),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[isActive ? activeClass : '', errorClass]">`,
        },
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[!isActive ? activeClass : '', errorClass]">`,
        },
        {
          input: `<div :class="[isActive ? activeClass : '', errorClass]">\n`,
          output: `<div :class="[isActive ? activeClass : '', errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 14),
        end: new vscode.Position(1, 22),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: !cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(3, 16),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: !cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(3, 1),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: !cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(3, 0),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 6),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 7),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: !cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 11),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: !cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 12),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: !cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
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
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: !cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(2, 22),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: !cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 8),
        end: new vscode.Position(1, 11),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: !cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 8),
        end: new vscode.Position(1, 12),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 20),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(3, 0),
        end: new vscode.Position(3, 1),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(3, 0),
        end: new vscode.Position(3, 2),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(3, 2),
        end: new vscode.Position(3, 16),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(3, 3),
        end: new vscode.Position(3, 15),
      },
    },
    {
      lines: [
        {
          input: `<div :class="[{\n`,
          output: `<div :class="[{`,
        },
        {
          input: `active: cat,\n`,
          output: `active: cat,`,
        },
        {
          input: `anotherProperty: dog\n`,
          output: `anotherProperty: dog`,
        },
        {
          input: `}, errorClass]">`,
          output: `}, errorClass]">`,
        },
      ],
      selection: {
        start: new vscode.Position(3, 3),
        end: new vscode.Position(3, 14),
      },
    },
  ]);
});
