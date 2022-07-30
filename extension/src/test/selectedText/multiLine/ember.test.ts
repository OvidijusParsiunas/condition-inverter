const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected Ember Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}\n`,
          output: `{{/if}}`,
        },
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
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
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}\n`,
          output: `{{/if}}`,
        },
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
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
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}\n`,
          output: `{{/if}}`,
        },
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 7),
        end: new vscode.Position(1, 7),
      },
    },
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}\n`,
          output: `{{/if}}`,
        },
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
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
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}\n`,
          output: `{{/if}}`,
        },
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 24),
        end: new vscode.Position(2, 24),
      },
    },
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}\n`,
          output: `{{/if}}`,
        },
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(3, 0),
        end: new vscode.Position(3, 0),
      },
    },
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}\n`,
          output: `{{/if}}`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
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
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}\n`,
          output: `{{/if}}`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
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
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}\n`,
          output: `{{/if}}`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 7),
        end: new vscode.Position(2, 7),
      },
    },
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `{{/if}}\n`,
          output: `{{/if}}`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(3, 0),
        end: new vscode.Position(3, 0),
      },
    },
    {
      lines: [
        {
          input: `<Avatar @isActive={{\n`,
          output: `<Avatar @isActive={{`,
        },
        {
          input: `dog\n`,
          output: `dog`,
        },
        {
          input: `}} @initial="T" />`,
          output: `}} @initial="T" />`,
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
          input: `<Avatar @isActive={{\n`,
          output: `<Avatar @isActive={{`,
        },
        {
          input: `dog\n`,
          output: `!dog`,
        },
        {
          input: `}} @initial="T" />`,
          output: `}} @initial="T" />`,
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
          input: `<Avatar @isActive={{\n`,
          output: `<Avatar @isActive={{`,
        },
        {
          input: `dog && cat\n`,
          output: `dog && !cat`,
        },
        {
          input: `}} @initial="T" />`,
          output: `}} @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 10),
        end: new vscode.Position(1, 10),
      },
    },
    {
      lines: [
        {
          input: `<Avatar @isActive={{\n`,
          output: `<Avatar @isActive={{`,
        },
        {
          input: `dog\n`,
          output: `dog`,
        },
        {
          input: `}} @initial="T" />`,
          output: `}} @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 0),
      },
    },
  ]);
});
