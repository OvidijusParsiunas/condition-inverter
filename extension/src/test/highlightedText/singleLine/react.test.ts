const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted React Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}',
          output: 'className = { !active ? "active" : ""}',
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
          input: 'className = { active ? "active" : ""}',
          output: 'className = { active ? "active" : ""}',
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
          input: 'className = { active ? "active" : ""}',
          output: 'className = { active ? "active" : ""}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}',
          output: 'className = { active ? "active" : ""}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}',
          output: 'className = { active ? "active" : ""}',
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
          input: 'className = { active ? "active" : ""}',
          output: 'className = { active ? "active" : ""}',
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
          input: 'className = { active ? "active" : ""}',
          output: 'className = { active ? "active" : ""}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}',
          output: 'className = { !active ? "active" : ""}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}',
          output: 'className = { !active ? "active" : ""}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}',
          output: 'className = { active ? "active" : ""}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}',
          output: 'className = { active ? "active" : ""}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}',
          output: 'className = { active ? "active" : ""}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}',
          output: 'className = { active ? "active" : ""}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}',
          output: 'className = { !active ? "active" : ""}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}',
          output: 'className = { !active ? "active" : ""}',
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
          input: 'className = { active ? "active" : ""}',
          output: 'className = { active ? "active" : ""}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}',
          output: 'className = { active ? "active" : ""}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 36),
      },
    },
    {
      lines: [
        {
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
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
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
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
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 36),
      },
    },
    {
      lines: [
        {
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 36),
      },
    },
    {
      lines: [
        {
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 36),
      },
    },
    {
      lines: [
        {
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}>',
          output: 'className = { !active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 36),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}>',
          output: 'className = { !active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}>',
          output: 'className = { !active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}>',
          output: 'className = { !active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}>',
          output: 'className = { active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}>',
          output: 'className = { active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}>',
          output: 'className = { active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 35),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}>',
          output: 'className = { active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 36),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: 'className = { active ? "active" : ""}>',
          output: 'className = { active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 37),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${!active ? "active" : ""}`}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: '{`banner ${active ? "active" : ""}`}',
          output: '{`banner ${active ? "active" : ""}`}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 78),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 72),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 71),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 70),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 69),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 71),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 71),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 71),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 71),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 71),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 70),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 69),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 69),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName == undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 26),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 25),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
          output: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 24),
      },
    },
  ]);
});
