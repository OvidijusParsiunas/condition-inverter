const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Ember Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if !this.thingIsTrue}}`,
        },
        {
          input: `Content for the block form\n`,
          output: `Content for the block form`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(2, 7),
      },
    },
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if !this.thingIsTrue}}`,
        },
        {
          input: `Content for the block form\n`,
          output: `Content for the block form`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(2, 5),
      },
    },
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if !this.thingIsTrue}}`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(2, 3),
      },
    },
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 22),
        end: new vscode.Position(2, 3),
      },
    },
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue }}\n`,
          output: `{{#if this.thingIsTrue }}`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 22),
        end: new vscode.Position(2, 3),
      },
    },
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue }}\n`,
          output: `{{#if this.thingIsTrue }}`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(2, 3),
      },
    },
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(2, 3),
      },
    },
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 24),
        end: new vscode.Position(2, 3),
      },
    },
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 24),
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
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 10),
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
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 10),
        end: new vscode.Position(2, 3),
      },
    },
    {
      lines: [
        {
          input: `{{#if this.thingIsTrue}}\n`,
          output: `{{#if this.thingIsTrue}}`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `{{/if}}`,
          output: `{{/if}}`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 10),
        end: new vscode.Position(2, 7),
      },
    },
    {
      lines: [
        {
          input: `<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>\n`,
          output: `<div class={{if !this.thingIsTrue "value-if-true" "value-if-false"}}>`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `</div>`,
          output: `</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(2, 6),
      },
    },
    {
      lines: [
        {
          input: `<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>\n`,
          output: `<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `</div>`,
          output: `</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 66),
        end: new vscode.Position(2, 6),
      },
    },
    {
      lines: [
        {
          input: `<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>\n`,
          output: `<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `</div>`,
          output: `</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 66),
        end: new vscode.Position(2, 6),
      },
    },
    {
      lines: [
        {
          input: `<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>\n`,
          output: `<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `</div>`,
          output: `</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 67),
        end: new vscode.Position(2, 6),
      },
    },
    {
      lines: [
        {
          input: `<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>\n`,
          output: `<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `</div>`,
          output: `</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 68),
        end: new vscode.Position(2, 6),
      },
    },
    {
      lines: [
        {
          input: `<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>\n`,
          output: `<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `</div>`,
          output: `</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 66),
        end: new vscode.Position(0, 68),
      },
    },
    {
      lines: [
        {
          input: `<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>\n`,
          output: `<div class={{if this.thingIsTrue "value-if-true" "value-if-false"}}>`,
        },
        {
          input: `Block form\n`,
          output: `Block form`,
        },
        {
          input: `</div>`,
          output: `</div>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 67),
        end: new vscode.Position(0, 68),
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
        start: new vscode.Position(0, 8),
        end: new vscode.Position(2, 2),
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
        start: new vscode.Position(0, 18),
        end: new vscode.Position(2, 2),
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
        start: new vscode.Position(0, 19),
        end: new vscode.Position(2, 1),
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
        start: new vscode.Position(0, 20),
        end: new vscode.Position(2, 0),
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
        end: new vscode.Position(1, 3),
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
          input: `dog\n`,
          output: `dog`,
        },
        {
          input: `}} @initial="T" />`,
          output: `}} @initial="T" />`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 3),
        end: new vscode.Position(2, 0),
      },
    },
  ]);
});
