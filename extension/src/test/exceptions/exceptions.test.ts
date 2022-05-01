import { IfInverter } from '../../../../inverter/out/src/ifInverter';
const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../shared/types/tests/tests';
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite('Exceptions Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  // not testing for console.log outputs as cannot listen to them in extension
  // tets here are only validing if an error has not been thrown
  TestUtil.runInversionTests(textEditorObj, 'No exception thrown by vscode extension', [
    {
      lines: [
        {
          input: '',
          output: '',
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

  [{ input: 'if (mouse && cat { console.log(2) }', output: 'if (!mouse || !cat { console.log(2) }' }].forEach((testProps) => {
    test('Exception thrown by the inverter library when input is invalid', (done) => {
      try {
        IfInverter.invert(testProps.input);
      } catch (message) {
        done();
      }
    });
  });
});
