const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Outside Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: 'function isFish(pet: Fish | Bird): pet is Fish {\n',
          output: 'function isFish(pet: Fish | Bird): pet is Fish {',
        },
        {
          input: 'return (pet as Fish).swim !== undefined;\n',
          output: 'return (pet as Fish).swim === undefined;',
        },
        {
          input: '}',
          output: '}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet: Fish | Bird): pet is Fish {\n',
          output: 'function isFish(pet: Fish | Bird): pet is Fish {',
        },
        {
          input: 'return (pet as Fish).swim === undefined;\n',
          output: 'return !(pet as Fish).swim === undefined;',
        },
        {
          input: '}',
          output: '}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(1, 12),
      },
    },
  ]);
});
