const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite.only('Selected No Condition Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: 'dog &&= cat',
          output: 'dog &&= cat',
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
          input: 'dog &&= cat',
          output: 'dog &&= cat',
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
          input: 'dog &&= cat',
          output: 'dog &&= cat',
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
          input: 'dog &&= cat',
          output: 'dog &&= cat',
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
          input: 'dog &&= cat',
          output: 'dog &&= cat',
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
          input: 'dog &&= cat',
          output: 'dog &&= cat',
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
          input: 'dog &&= cat',
          output: 'dog &&= cat',
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
          input: 'dog&&=cat',
          output: 'dog&&=cat',
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
          input: 'dog&&=cat',
          output: 'dog&&=cat',
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
          input: 'dog & cat',
          output: 'dog & cat',
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
          input: 'dog & cat',
          output: 'dog & cat',
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
          input: 'dog&cat',
          output: 'dog&cat',
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
          input: 'dog&cat',
          output: 'dog&cat',
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
          input: 'dog | cat',
          output: 'dog | cat',
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
          input: 'dog | cat',
          output: 'dog | cat',
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
          input: 'dog|cat',
          output: 'dog|cat',
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
          input: 'dog|cat',
          output: 'dog|cat',
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
          input: 'dog >>>= cat',
          output: 'dog >>>= cat',
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
          input: 'dog >>>= cat',
          output: 'dog >>>= cat',
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
          input: 'dog >>>= cat',
          output: 'dog >>>= cat',
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
          input: 'dog >>>= cat',
          output: 'dog >>>= cat',
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
          input: 'dog >>>= cat',
          output: 'dog >>>= cat',
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
          input: 'dog >>>= cat',
          output: 'dog >>>= cat',
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
          input: 'dog >>>= cat',
          output: 'dog >>>= cat',
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
          input: 'if (dog ? cat : fish) { console.log(2) }',
          output: 'if (dog ? cat : fish) { console.log(2) }',
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
          input: 'if (dog ? cat : fish) { console.log(2) }',
          output: 'if (dog ? cat : fish) { console.log(2) }',
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
          input: 'if (dog ? cat : fish) { console.log(2) }',
          output: 'if (dog ? cat : fish) { console.log(2) }',
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
          input: 'if (dog ? cat : fish) { console.log(2) }',
          output: 'if (dog ? cat : fish) { console.log(2) }',
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
          input: 'if (dog ? cat : fish) { console.log(2) }',
          output: 'if (dog ? cat : fish) { console.log(2) }',
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
          input: 'if ()',
          output: 'if ()',
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
          input: 'if ()',
          output: 'if ()',
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
          input: 'if ()',
          output: 'if ()',
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
          input: 'if ()',
          output: 'if ()',
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
          input: 'if ()',
          output: 'if ()',
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
          input: 'if ()',
          output: 'if ()',
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
          input: 'if () {}',
          output: 'if () {}',
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
          input: 'if () {}',
          output: 'if () {}',
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
          input: 'if () {}',
          output: 'if () {}',
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
          input: 'if () {}',
          output: 'if () {}',
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
          input: 'if dog: print',
          output: 'if dog: print',
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
          input: 'if dog: print',
          output: 'if dog: print',
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
          input: 'if dog: print',
          output: 'if dog: print',
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
          output: 'if fishif and catif: print("2")',
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
          input: `for dog in cat: print(dog)`,
          output: 'for dog in cat: print(dog)',
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
          input: `for dog in cat: print(dog)`,
          output: 'for dog in cat: print(dog)',
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
          input: `for dog in cat: print(dog)`,
          output: 'for dog in cat: print(dog)',
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
          input: `for dog in cat: print(dog)`,
          output: 'for dog in cat: print(dog)',
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
          input: `for dog in cat: print(dog)`,
          output: 'for dog in cat: print(dog)',
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
          input: `for dog in cat: print(dog)`,
          output: 'for dog in cat: print(dog)',
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
          input: `for dog in cat: print(dog)`,
          output: 'for dog in cat: print(dog)',
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
          input: `for dog in cat: print(dog)`,
          output: 'for dog in cat: print(dog)',
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
          input: `for (dog in range(6)): print(dog)`,
          output: 'for (dog in range(6)): print(dog)',
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
          input: `for (dog in range(6)): print(dog)`,
          output: 'for (dog in range(6)): print(dog)',
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
          input: `for (dog in range(6)): print(dog)`,
          output: 'for (dog in range(6)): print(dog)',
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
          input: `for (dog in range(6)): print(dog)`,
          output: 'for (dog in range(6)): print(dog)',
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
          input: `for (dog in range(6)): print(dog)`,
          output: 'for (dog in range(6)): print(dog)',
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
          input: `for (dog in range(6)): print(dog)`,
          output: 'for (dog in range(6)): print(dog)',
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
          input: `for (dog in range(6)): print(dog)`,
          output: 'for (dog in range(6)): print(dog)',
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
          input: `for (dog in range(6)): print(dog)`,
          output: 'for (dog in range(6)): print(dog)',
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
          input: `for (dog in range(6)): print(dog)`,
          output: 'for (dog in range(6)): print(dog)',
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
          input: `for (dog in range(6)): print(dog)`,
          output: 'for (dog in range(6)): print(dog)',
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
          input: `for (dog in range(6)): print(dog)`,
          output: 'for (dog in range(6)): print(dog)',
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
          input: `for dog in [2, 6, 8]: print(dog)`,
          output: 'for dog in [2, 6, 8]: print(dog)',
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
          input: `for dog in [2, 6, 8]: print(dog)`,
          output: 'for dog in [2, 6, 8]: print(dog)',
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
          input: `for dog in [2, 6, 8]: print(dog)`,
          output: 'for dog in [2, 6, 8]: print(dog)',
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
          input: `for dog in [2, 6, 8]: print(dog)`,
          output: 'for dog in [2, 6, 8]: print(dog)',
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
          input: `for dog in [2, 6, 8]: print(dog)`,
          output: 'for dog in [2, 6, 8]: print(dog)',
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
          input: `for dog in [2, 6, 8]: print(dog)`,
          output: 'for dog in [2, 6, 8]: print(dog)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: `for dog in [2, 6, 8]: print(dog)`,
          output: 'for dog in [2, 6, 8]: print(dog)',
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
          input: `for dog in [2, 6, 8]: print(dog)`,
          output: 'for dog in [2, 6, 8]: print(dog)',
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
          input: 'if (dog)',
          output: 'if (dog)',
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
          input: 'if (dog)',
          output: 'if (dog)',
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
          input: 'if  (dog)',
          output: 'if  (dog)',
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
          input: 'if (dog)',
          output: 'if (dog)',
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
          input: 'if ((dog))',
          output: 'if ((dog))',
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
          input: 'if (dog) ',
          output: 'if (dog) ',
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
          input: 'if (dog) console.log("asdasd")',
          output: 'if (dog) console.log("asdasd")',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 22),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 25),
        end: new vscode.Position(0, 25),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 26),
        end: new vscode.Position(0, 26),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 27),
        end: new vscode.Position(0, 27),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 28),
        end: new vscode.Position(0, 28),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 29),
        end: new vscode.Position(0, 29),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 30),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 33),
        end: new vscode.Position(0, 33),
      },
    },

    {
      lines: [
        {
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9;  num < 0 { fmt.Println(num, "is negative") }`,
          output: `if num := 9;  num < 0 { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
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
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 25),
        end: new vscode.Position(0, 25),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 28),
        end: new vscode.Position(0, 28),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 29),
        end: new vscode.Position(0, 29),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 36),
        end: new vscode.Position(0, 36),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 37),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 40),
        end: new vscode.Position(0, 40),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 41),
        end: new vscode.Position(0, 41),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 54),
        end: new vscode.Position(0, 54),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 55),
        end: new vscode.Position(0, 55),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 56),
        end: new vscode.Position(0, 56),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 57),
        end: new vscode.Position(0, 57),
      },
    },
    {
      lines: [
        {
          input: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
          output: `if num := 9; num < dog { fmt.Println(num, "is negative") }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 58),
        end: new vscode.Position(0, 58),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < 2; i += 1) {}',
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
          input: 'for (let i = 0;  i < 2; i += 1) {}',
          output: 'for (let i = 0;  i < 2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2 ; i += 1) {}',
          output: 'for (let i = 0; i < 2 ; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 22),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2  ; i += 1) {}',
          output: 'for (let i = 0; i < 2  ; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 22),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; (i < 2); i += 1) {}',
          output: 'for (let i = 0; (i < 2); i += 1) {}',
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
          input: 'for (let i = 0;  (i < 2); i += 1) {}',
          output: 'for (let i = 0;  (i < 2); i += 1) {}',
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
          input: 'for (let i = 0;  (i < 2); i += 1) {}',
          output: 'for (let i = 0;  (i < 2); i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0;(i < 2) ; i += 1) {}',
          output: 'for (let i = 0;(i < 2) ; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0;(i < 2)  ; i += 1) {}',
          output: 'for (let i = 0;(i < 2)  ; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0;(i < 2)  ; i += 1) {}',
          output: 'for (let i = 0;(i < 2)  ; i += 1) {}',
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
          input: 'function isFish(pet) { return (pet as Fish).swim !== undefined; }',
          output: 'function isFish(pet) { return (pet as Fish).swim !== undefined; }',
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
          input: 'function isFish(pet) { return (pet as Fish).swim !== undefined; }',
          output: 'function isFish(pet) { return (pet as Fish).swim !== undefined; }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet) { return (pet as Fish).swim !== undefined; }',
          output: 'function isFish(pet) { return (pet as Fish).swim !== undefined; }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 22),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet) {  return (pet as Fish).swim !== undefined; }',
          output: 'function isFish(pet) {  return (pet as Fish).swim !== undefined; }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet) {return (pet as Fish).swim !== undefined; }',
          output: 'function isFish(pet) {return (pet as Fish).swim !== undefined; }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 62),
        end: new vscode.Position(0, 62),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet) {return (pet as Fish).swim !== undefined;  }',
          output: 'function isFish(pet) {return (pet as Fish).swim !== undefined;  }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 63),
        end: new vscode.Position(0, 63),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet) {return (pet as Fish).swim !== undefined; }',
          output: 'function isFish(pet) {return (pet as Fish).swim !== undefined; }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 63),
        end: new vscode.Position(0, 63),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet) {return (pet as Fish).swim !== undefined; }',
          output: 'function isFish(pet) {return (pet as Fish).swim !== undefined; }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 64),
        end: new vscode.Position(0, 64),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet) {return (pet as Fish).swim !== undefined; } ',
          output: 'function isFish(pet) {return (pet as Fish).swim !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 65),
        end: new vscode.Position(0, 65),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet) {return (pet as Fish).swim !== undefined; }  ',
          output: 'function isFish(pet) {return (pet as Fish).swim !== undefined; }  ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 66),
        end: new vscode.Position(0, 66),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
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
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 22),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
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
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 25),
        end: new vscode.Position(0, 25),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 26),
        end: new vscode.Position(0, 26),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 27),
        end: new vscode.Position(0, 27),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 28),
        end: new vscode.Position(0, 28),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 29),
        end: new vscode.Position(0, 29),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 30),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 31),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 32),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 33),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
          output: 'function isFish(pet): pet is Fish {return dog !== undefined; } ',
        },
      ],
      selection: {
        start: new vscode.Position(0, 34),
        end: new vscode.Position(0, 34),
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
          input: 'if dog is not cat: print',
          output: 'if dog is cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 17),
      },
    },
  ]);
});
