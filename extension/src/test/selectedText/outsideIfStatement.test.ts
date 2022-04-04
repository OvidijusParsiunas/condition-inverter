const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../types/tests/tests';
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite('Selected Text Suite - Outside If Statement -', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.removeTextDocument());

  TestUtil.runInversionTests(textEditorObj, `Outside of if statement testing`, [
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) }\n`,
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: `if (mouse && cat) { console.log(2) }\n`,
          output: 'if (mouse && cat) { console.log(2) }',
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
          input: `if (dog && cat || mouse) { console.log(2) }\n`,
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: `if (mouse && cat) { console.log(2) }\n`,
          output: 'if (mouse && cat) { console.log(2) }',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
      ],
      selection: {
        start: new vscode.Position(6, 1),
        end: new vscode.Position(6, 1),
      },
    },
    {
      lines: [
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: `if (dog && cat || mouse) { console.log(2) }\n`,
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: `if (mouse && cat) { console.log(2) }\n`,
          output: 'if (mouse && cat) { console.log(2) }',
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
          input: ` \n`,
          output: ' ',
        },
        {
          input: `if (dog && cat || mouse) { console.log(2) }\n`,
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: `if (mouse && cat) { console.log(2) }\n`,
          output: 'if (mouse && cat) { console.log(2) }',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
        {
          input: ` \n`,
          output: ' ',
        },
      ],
      selection: {
        start: new vscode.Position(6, 1),
        end: new vscode.Position(6, 1),
      },
    },
  ]);
});
