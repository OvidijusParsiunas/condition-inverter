const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../shared/functionality/testUtil';
import { TextEditorObj } from '../shared/types/tests';
import * as vscode from 'vscode';

suite('Exceptions Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  // not testing for console.log outputs as cannot listen to them in extension
  // tests here are only validing if an error has not been thrown
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
        end: new vscode.Position(1, 0),
      },
    },
  ]);

  // exception testing example
  // [{ input: 'if (mouse && cat { console.log(2) }', output: 'if (!mouse || !cat { console.log(2) }' }].forEach((testProps) => {
  //   test('Exception thrown by the inverter library when input is invalid', (done) => {
  //     try {
  //       Inverter.invert(testProps.input);
  //     } catch (message) {
  //       done();
  //     }
  //   });
  // });
});
