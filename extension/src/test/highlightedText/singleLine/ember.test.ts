const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Ember Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `{{#if dog}}`,
          output: `{{#if !dog}}`,
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
          input: `{{#if dog}}`,
          output: `{{#if !dog}}`,
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
          input: `{{#if dog}}`,
          output: `{{#if !dog}}`,
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
          input: `{{#if dog}}`,
          output: `{{#if !dog}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `{{#if dog}}`,
          output: `{{#if !dog}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `{{#if dog}}`,
          output: `{{#if !dog}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `{{#if dog}}`,
          output: `{{#if !dog}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: `{{#if dog}}`,
          output: `{{#if !dog}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: `{{#if dog}}`,
          output: `{{#if dog}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 2),
      },
    },
    {
      lines: [
        {
          input: `{{#if dog}}`,
          output: `{{#if dog}}`,
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
          input: `{{#if dog}}`,
          output: `{{#if dog}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: `{{#if dog}}`,
          output: `{{#if dog}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: `{{#if dog}}`,
          output: `{{#if dog}}`,
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
          input: `{{#if dog}}`,
          output: `{{#if !dog}}`,
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
          input: `{{#if dog}}{{#if dog}}{{#if dog}}`,
          output: `{{#if dog}}{{#if !dog}}{{#if dog}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: `{{#if dog}}{{#if dog}}{{#if dog}}`,
          output: `{{#if dog}}{{#if !dog}}{{#if dog}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: `{{#if dog}}{{#if dog}}{{#if dog}}`,
          output: `{{#if dog}}{{#if !dog}}{{#if dog}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: `{{#if dog}} {{#if dog}} {{#if dog}}`,
          output: `{{#if dog}} {{#if !dog}} {{#if dog}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: `<Avatar @isActive={{dog}} @initial="T" />`,
          output: `<Avatar @isActive={{!dog}} @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 41),
      },
    },
    {
      lines: [
        {
          input: `<Avatar @isActive={{dog}} @initial="T" />`,
          output: `<Avatar @isActive={{!dog}} @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 25),
      },
    },
    {
      lines: [
        {
          input: `<Avatar @isActive={{dog}} @initial="T" />`,
          output: `<Avatar @isActive={{!dog}} @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 24),
      },
    },
    {
      lines: [
        {
          input: `<Avatar @isActive={{dog}} @initial="T" />`,
          output: `<Avatar @isActive={{!dog}} @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: `<Avatar @isActive={{dog}} @initial="T" />`,
          output: `<Avatar @isActive={{dog}} @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: `<Avatar @isActive={{dog}} @initial="T" />`,
          output: `<Avatar @isActive={{dog}} @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: `<Avatar @isActive={{dog}} @initial="T" />`,
          output: `<Avatar @isActive={{dog}} @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `<Avatar @isActive={{dog}} @initial="T" />`,
          output: `<Avatar @isActive={{!dog}} @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 25),
      },
    },
    {
      lines: [
        {
          input: `<Avatar @isActive={{dog}} @initial="T" />`,
          output: `<Avatar @isActive={{!dog}} @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 24),
      },
    },
    {
      lines: [
        {
          input: `<Avatar @isActive={{dog}} @initial="T" />`,
          output: `<Avatar @isActive={{!dog}} @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: `<Avatar @isActive = { { dog } } @initial="T" />`,
          output: `<Avatar @isActive = { { !dog } } @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 24),
        end: new vscode.Position(0, 27),
      },
    },
    {
      lines: [
        {
          input: `<div> {{if isFast "zoooom" "putt-putt-putt"}} </div>`,
          output: `<div> {{if !isFast "zoooom" "putt-putt-putt"}} </div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `<div> {{if isFast "zoooom" "putt-putt-putt"}} </div>`,
          output: `<div> {{if isFast "zoooom" "putt-putt-putt"}} </div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: `<div> {{if isFast "zoooom" "putt-putt-putt"}} </div>`,
          output: `<div> {{if !isFast "zoooom" "putt-putt-putt"}} </div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `<div> {{if isFast "zoooom" "putt-putt-putt"}} </div>`,
          output: `<div> {{if !isFast "zoooom" "putt-putt-putt"}} </div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 17),
      },
    },
  ]);
});
