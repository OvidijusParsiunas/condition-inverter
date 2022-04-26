const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../shared/types/tests/tests';
import { IfInverter } from 'inverter/src/ifInverter';
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite('Exceptions Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.removeTextDocument());

  // not testing console.log outputs as cannot listen to them for extension testing
  // this is only validing that an error has not been thrown
  TestUtil.runInversionTests(textEditorObj, 'No error in the editor', [
    {
      lines: [
        {
          input: 'if (dog && cat || mouse { console.log(2) }',
          output: 'if (dog && cat || mouse { console.log(2) }',
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
          input: 'if (123123123123123',
          output: 'if (123123123123123',
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
          input: 'if (123123123123123  ',
          output: 'if (123123123123123  ',
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
          input: 'if (  ',
          output: 'if (  ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 2),
      },
    },
  ]);
});

suite('Generic Inversion tests', () => {
  [{ input: 'if (mouse && cat { console.log(2) }', output: 'if (!mouse || !cat { console.log(2) }' }].forEach((testProps) => {
    test('Error in the library', (done) => {
      try {
        IfInverter.invert(testProps.input);
      } catch (message) {
        done();
      }
    });
  });
});
