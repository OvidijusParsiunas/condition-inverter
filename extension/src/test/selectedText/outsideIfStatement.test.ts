const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite('Selected Text Suite - Outside If Statement -', () => {
  vscode.window.showInformationMessage('Start all tests.');

  const textEditorObj: { textEditor: vscode.TextEditor | null } = { textEditor: null };

  mocha.before(() => TestUtil.crateTextDocument(textEditorObj));

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
