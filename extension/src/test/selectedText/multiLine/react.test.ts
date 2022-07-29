const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected React Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: '<className = {\n',
          output: '<className = {',
        },
        {
          input: 'active ? "active" : ""}>',
          output: 'active ? "active" : ""}>',
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
          input: '<className = {\n',
          output: '<className = {',
        },
        {
          input: 'active ? "active" : ""}>',
          output: 'active ? "active" : ""}>',
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
          input: '<className = {\n',
          output: '<className = {',
        },
        {
          input: 'active ? "active" : ""}>',
          output: '!active ? "active" : ""}>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: '<className = {active ? "active" : ""\n',
          output: '<className = {active ? "active" : ""',
        },
        {
          input: '}>',
          output: '}>',
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
          input: '<className = {active ? "active" : ""\n',
          output: '<className = {active ? "active" : ""',
        },
        {
          input: '}>',
          output: '}>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: '<className = {active ? "active" : ""\n',
          output: '<className = {active ? "active" : ""',
        },
        {
          input: '}>',
          output: '}>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: '<className = {active ? "active" : ""\n',
          output: '<className = {active ? "active" : ""',
        },
        {
          input: '}>',
          output: '}>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 2),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: '<className = {active ? "active" : ""}\n',
          output: '<className = {active ? "active" : ""}',
        },
        {
          input: '>',
          output: '>',
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
          input: '<className = {active ? "active" : ""}\n',
          output: '<className = {active ? "active" : ""}',
        },
        {
          input: '>',
          output: '>',
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
          input: '<className = {active ? "active" : ""}\n',
          output: '<className = {active ? "active" : ""}',
        },
        {
          input: '>',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: '<className = {active ? "active" : ""}\n',
          output: '<className = {active ? "active" : ""}',
        },
        {
          input: '>',
          output: '>',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: `<div style={{\n`,
          output: `<div style={{`,
        },
        {
          input: `visibility: firstName != undefined? 'visible': 'hidden'\n`,
          output: `visibility: firstName != undefined? 'visible': 'hidden'`,
        },
        {
          input: `}}></div>`,
          output: `}}></div>`,
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
          input: `<div style={{\n`,
          output: `<div style={{`,
        },
        {
          input: `visibility: firstName != undefined? 'visible': 'hidden'\n`,
          output: `visibility: firstName != undefined? 'visible': 'hidden'`,
        },
        {
          input: `}}></div>`,
          output: `}}></div>`,
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
          input: `<div style={{\n`,
          output: `<div style={{`,
        },
        {
          input: `visibility: firstName != undefined? 'visible': 'hidden'\n`,
          output: `visibility: firstName != undefined? 'visible': 'hidden'`,
        },
        {
          input: `}}></div>`,
          output: `}}></div>`,
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
          input: `<div style={{\n`,
          output: `<div style={{`,
        },
        {
          input: `visibility: firstName != undefined? 'visible': 'hidden'\n`,
          output: `visibility: firstName != undefined? 'visible': 'hidden'`,
        },
        {
          input: `}}></div>`,
          output: `}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: `<div style={{\n`,
          output: `<div style={{`,
        },
        {
          input: `visibility: firstName != undefined? 'visible': 'hidden'\n`,
          output: `visibility: firstName != undefined? 'visible': 'hidden'`,
        },
        {
          input: `}}></div>`,
          output: `}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 55),
        end: new vscode.Position(1, 55),
      },
    },
    {
      lines: [
        {
          input: `<div style={{\n`,
          output: `<div style={{`,
        },
        {
          input: `visibility: firstName != undefined? 'visible': 'hidden'\n`,
          output: `visibility: firstName != undefined? 'visible': 'hidden'`,
        },
        {
          input: `}}></div>`,
          output: `}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: `<div style={{\n`,
          output: `<div style={{`,
        },
        {
          input: `visibility: firstName != undefined? 'visible': 'hidden'\n`,
          output: `visibility: firstName != undefined? 'visible': 'hidden'`,
        },
        {
          input: `}}></div>`,
          output: `}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 1),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: `<div style={{\n`,
          output: `<div style={{`,
        },
        {
          input: `visibility: firstName != undefined? 'visible': 'hidden'\n`,
          output: `visibility: firstName != undefined? 'visible': 'hidden'`,
        },
        {
          input: `}}></div>`,
          output: `}}></div>`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 2),
        end: new vscode.Position(2, 2),
      },
    },
  ]);
});
