const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected React Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: '<div className = { active ? "active" : ""}>',
          output: '<div className = { active ? "active" : ""}>',
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
          input: '<div className = { active ? "active" : ""}>',
          output: '<div className = { active ? "active" : ""}>',
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
          input: '<div className = { active ? "active" : ""}>',
          output: '<div className = { active ? "active" : ""}>',
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
          input: '<div className = { active ? "active" : ""}>',
          output: '<div className = { active ? "active" : ""}>',
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
          input: '<div className = { active ? "active" : ""}>',
          output: '<div className = { active ? "active" : ""}>',
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
          input: '<div className = { active ? "active" : ""}>',
          output: '<div className = { active ? "active" : ""}>',
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
          input: '<div className = { active ? "active" : ""}>',
          output: '<div className = { !active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: '<div className = { active ? "active" : ""}>',
          output: '<div className = { active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 41),
        end: new vscode.Position(0, 41),
      },
    },
    {
      lines: [
        {
          input: '<div className = { active ? "active" : ""}>',
          output: '<div className = { active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: '<div className = { active ? "active" : ""}>',
          output: '<div className = { active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: '<div className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} >',
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: 'div className = { active ? "active" : ""}',
          output: 'div className = { active ? "active" : ""}',
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
          input: 'div className = { active ? "active" : ""}',
          output: 'div className = { !active ? "active" : ""}',
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
          input: '<div className = { active ? "active" : ""}',
          output: '<div className = { active ? "active" : ""}',
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
          input: 'div className = { active ? "active" : ""}>',
          output: 'div className = { active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(0, 41),
        end: new vscode.Position(0, 41),
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
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 0),
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
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 1),
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
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 2),
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
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
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
        start: new vscode.Position(0, 9),
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
        start: new vscode.Position(0, 10),
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
        start: new vscode.Position(0, 11),
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
        start: new vscode.Position(0, 17),
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
        start: new vscode.Position(0, 33),
        end: new vscode.Position(0, 33),
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
        start: new vscode.Position(0, 34),
        end: new vscode.Position(0, 34),
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
        start: new vscode.Position(0, 35),
        end: new vscode.Position(0, 35),
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
        start: new vscode.Position(0, 36),
        end: new vscode.Position(0, 36),
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
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 11),
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
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 12),
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
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 13),
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
        end: new vscode.Position(0, 14),
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
        start: new vscode.Position(0, 24),
        end: new vscode.Position(0, 24),
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
        start: new vscode.Position(0, 25),
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
        start: new vscode.Position(0, 69),
        end: new vscode.Position(0, 69),
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
        start: new vscode.Position(0, 70),
        end: new vscode.Position(0, 70),
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
        start: new vscode.Position(0, 71),
        end: new vscode.Position(0, 71),
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
        start: new vscode.Position(0, 72),
        end: new vscode.Position(0, 72),
      },
    },
    {
      lines: [
        {
          input: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}>`,
          output: `<div style={{ visibility: firstName != undefined? 'visible': 'hidden'}}>`,
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
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
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
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
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
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { !active ? "active" : ""} className = { active ? "active" : ""} >',
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { !active ? "active" : ""} className = { active ? "active" : ""} >',
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
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
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
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
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
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
        },
      ],
      selection: {
        start: new vscode.Position(0, 37),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
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
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
        },
      ],
      selection: {
        start: new vscode.Position(0, 41),
        end: new vscode.Position(0, 41),
      },
    },
    {
      lines: [
        {
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
        },
      ],
      selection: {
        start: new vscode.Position(0, 52),
        end: new vscode.Position(0, 52),
      },
    },
    {
      lines: [
        {
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
        },
      ],
      selection: {
        start: new vscode.Position(0, 53),
        end: new vscode.Position(0, 53),
      },
    },
    {
      lines: [
        {
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
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
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
        },
      ],
      selection: {
        start: new vscode.Position(0, 55),
        end: new vscode.Position(0, 55),
      },
    },
    {
      lines: [
        {
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
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
          input: '<div className = { active ? "active" : ""} className = { active ? "active" : ""} >',
          output: '<div className = { active ? "active" : ""} className = { !active ? "active" : ""} >',
        },
      ],
      selection: {
        start: new vscode.Position(0, 57),
        end: new vscode.Position(0, 57),
      },
    },
  ]);
});
