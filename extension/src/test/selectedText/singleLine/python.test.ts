const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite.only('Selected Python Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: 'if dog: print',
          output: 'if !dog: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: 'if dog: print',
          output: 'if !dog: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if fishif and catif: print("2")',
          output: 'if !fishif and catif: print("2")',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: 'if fishif and catif: print("2")',
          output: 'if !fishif and catif: print("2")',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if fishif and catif: print("2")',
          output: 'if !fishif and catif: print("2")',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if fishif and catif: print("2")',
          output: 'if fishif or catif: print("2")',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'if fishif and catif: print("2")',
          output: 'if fishif or catif: print("2")',
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
          input: 'if fishif and catif: print("2")',
          output: 'if fishif or catif: print("2")',
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
          input: 'if fishif and catif: print("2")',
          output: 'if fishif or catif: print("2")',
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
          input: 'if fishif and catif: print("2")',
          output: 'if fishif and !catif: print("2")',
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
          input: 'if fishif and catif: print("2")',
          output: 'if fishif and !catif: print("2")',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: 'if fishif and catif: print("2")',
          output: 'if fishif and !catif: print("2")',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: 'if fishif and catif: print("2")',
          output: 'if fishif and !catif: print("2")',
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: 'if fishif or catif: print("2")',
          output: 'if !fishif or catif: print("2")',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if fishif or catif: print("2")',
          output: 'if fishif and catif: print("2")',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'if fishif or catif: print("2")',
          output: 'if fishif and catif: print("2")',
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
          input: 'if fishif or catif: print("2")',
          output: 'if fishif and catif: print("2")',
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
          input: 'if fishif or catif: print("2")',
          output: 'if fishif or !catif: print("2")',
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
          input: 'if fishif or catif: print("2")',
          output: 'if fishif or !catif: print("2")',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: 'if dog is cat: print',
          output: 'if dog is not cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: 'if dog is cat: print',
          output: 'if dog is not cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if dog is cat: print',
          output: 'if dog is not cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if dog is cat: print',
          output: 'if dog is not cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if dog is cat: print',
          output: 'if dog is not cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if dog is cat: print',
          output: 'if dog is not cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'if dog is cat: print',
          output: 'if dog is not cat: print',
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
          input: 'if dog is not cat: print',
          output: 'if dog is cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: 'if dog is not cat: print',
          output: 'if dog is cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if dog is not cat: print',
          output: 'if dog is cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if dog is not cat: print',
          output: 'if dog is cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if dog is not cat: print',
          output: 'if dog is cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if dog is not cat: print',
          output: 'if dog is cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'if dog is not cat: print',
          output: 'if dog is cat: print',
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
          input: 'if dog is not cat: print',
          output: 'if dog is cat: print',
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
          input: 'if dog is not cat: print',
          output: 'if dog is cat: print',
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
          input: 'if dog is not cat: print',
          output: 'if dog is cat: print',
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
          input: 'if dog is cat and cat: print',
          output: 'if dog is not cat and cat: print',
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
          input: 'if dog is cat and cat: print',
          output: 'if dog is cat or cat: print',
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
          input: 'if dog is cat and cat: print',
          output: 'if dog is cat or cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: 'if dog is cat and cat: print',
          output: 'if dog is cat and !cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: 'if isinstance(dog): print',
          output: 'if !isinstance(dog): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if isinstance(dog): print',
          output: 'if !isinstance(dog): print',
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
          input: 'if isinstance(dog): print',
          output: 'if !isinstance(dog): print',
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
          input: 'if isinstance(dog): print',
          output: 'if !isinstance(dog): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: 'if isinstance(dog): print',
          output: 'if !isinstance(dog): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: 'if isinstance(dog): print',
          output: 'if !isinstance(dog): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: 'if True: print',
          output: 'if False: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: 'if True: print',
          output: 'if False: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 4),
      },
    },
    {
      lines: [
        {
          input: 'if True: print',
          output: 'if False: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: 'if True: print',
          output: 'if False: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if True: print',
          output: 'if False: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if (True): print',
          output: 'if (False): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (True): print',
          output: 'if (False): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if False: print',
          output: 'if True: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: 'if False: print',
          output: 'if True: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 4),
      },
    },
    {
      lines: [
        {
          input: 'if False: print',
          output: 'if True: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: 'if False: print',
          output: 'if True: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if False: print',
          output: 'if True: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if False: print',
          output: 'if True: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if not(True): print',
          output: 'if (True): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: 'if not(True): print',
          output: 'if (True): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: 'if not(True): print',
          output: 'if (True): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if not(True): print',
          output: 'if (True): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if not(True): print',
          output: 'if (True): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if not(True): print',
          output: 'if (True): print',
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
          input: 'if not(True): print',
          output: 'if (True): print',
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
          input: `while True: print(dog)`,
          output: 'while False: print(dog)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: `while True and False: print(dog)`,
          output: 'while True or False: print(dog)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 12),
      },
    },
  ]);
});
