const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite.only('Highlighted Inside Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `dog\n`,
          output: `dog`,
        },
        {
          input: `?\n`,
          output: `?`,
        },
        {
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `:\n`,
          output: `:`,
        },
        {
          input: `dog`,
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(4, 3),
      },
    },
    {
      lines: [
        {
          input: `dog\n`,
          output: `dog`,
        },
        {
          input: `?\n`,
          output: `?`,
        },
        {
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `:\n`,
          output: `:`,
        },
        {
          input: `dog`,
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 3),
      },
    },
    {
      lines: [
        {
          input: `dog\n`,
          output: `dog`,
        },
        {
          input: `?\n`,
          output: `?`,
        },
        {
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `:\n`,
          output: `:`,
        },
        {
          input: `dog`,
          output: `dog`,
        },
      ],
      selection: {
        start: new vscode.Position(4, 0),
        end: new vscode.Position(4, 3),
      },
    },
    // WORK - do reverse of that in the end
    // WORK - start with an exclamation mark
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: 'dog ||\n',
          output: 'dog ||',
        },
        {
          input: 'cat || mouse) { console.log(2) }',
          output: 'cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: 'dog ||\n',
          output: 'dog ||',
        },
        {
          input: 'cat || mouse) { console.log(2) }',
          output: 'cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'if (dog\n',
          output: 'if (dog',
        },
        {
          input: '||\n',
          output: '||',
        },
        {
          input: 'cat || mouse) { console.log(2) }',
          output: 'cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 16),
        end: new vscode.Position(2, 30),
      },
    },
    {
      lines: [
        {
          input: 'if (dog || cat || mouse\n',
          output: 'if (dog || cat || mouse',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 4),
        end: new vscode.Position(1, 18),
      },
    },
    {
      lines: [
        {
          input: 'if (dog ||\n',
          output: 'if (dog ||',
        },
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: 'cat || mouse\n',
          output: 'cat || mouse',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'if (dog ||\n',
          output: 'if (dog ||',
        },
        {
          input: '  \n',
          output: '  ',
        },
        {
          input: 'cat || mouse\n',
          output: 'cat || mouse',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: 'if (dog\n',
          output: 'if (dog',
        },
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: '|| cat || mouse\n',
          output: '|| cat || mouse',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'if (dog || cat || mouse\n',
          output: 'if (dog || cat || mouse',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: 'if (dog || cat || mouse)\n',
          output: 'if (dog || cat || mouse)',
        },
        {
          input: ' { console.log(2) }',
          output: ' { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: 'if (dog || cat || mouse)\n',
          output: 'if (dog || cat || mouse)',
        },
        {
          input: '{ console.log(2) }\n',
          output: '{ console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 1),
      },
    },
    {
      lines: [
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: 'if (dog || cat || mouse)\n',
          output: 'if (dog || cat || mouse)',
        },
        {
          input: '{ console.log(2) }\n',
          output: '{ console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: 'if (dog || cat || mouse)\n',
          output: 'if (dog || cat || mouse)',
        },
        {
          input: '{ console.log(2) }\n',
          output: '{ console.log(2) }',
        },
        {
          input: ' ',
          output: ' ',
        },
      ],
      selection: {
        start: new vscode.Position(1, 6),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: 'if (dog || cat || mouse)\n',
          output: 'if (dog || cat || mouse)',
        },
        {
          input: '{ console.log(2) }\n',
          output: '{ console.log(2) }',
        },
        {
          input: ' ',
          output: ' ',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: 'if\n',
          output: 'if',
        },
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: '(dog || cat || mouse)\n',
          output: '(dog || cat || mouse)',
        },
        {
          input: '{ console.log(2) }\n',
          output: '{ console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'if\n',
          output: 'if',
        },
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: '(dog || cat || mouse)\n',
          output: '(dog || cat || mouse)',
        },
        {
          input: '{ console.log(2) }\n',
          output: '{ console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'if\n',
          output: 'if',
        },
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: '(dog || cat || mouse)\n',
          output: '(dog || cat || mouse)',
        },
        {
          input: '{ console.log(2) }\n',
          output: '{ console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (dog\n',
          output: 'if (dog',
        },
        {
          input: '|| mouse) { console.log(2) }',
          output: '|| mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 8),
        end: new vscode.Position(1, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: 'if\n',
          output: 'if',
        },
        {
          input: '(dog)\n',
          output: '(dog)',
        },
        {
          input: ' { console.log(2) }',
          output: ' { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 4),
        end: new vscode.Position(1, 5),
      },
    },
    {
      lines: [
        {
          input: 'if\n',
          output: 'if',
        },
        {
          input: '(dog\n',
          output: '(dog',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: 'if\n',
          output: 'if',
        },
        {
          input: '(dog && (cat)\n',
          output: '(dog && (cat)',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: '\n',
          output: '',
        },
        {
          input: '|| mouse) { console.log(2) }',
          output: '|| mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 9),
        end: new vscode.Position(1, 10),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'cat\n',
          output: 'cat',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 4),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'cat\n',
          output: 'cat',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 1),
        end: new vscode.Position(2, 2),
      },
    },
    {
      lines: [
        {
          input: 'if (cat\n',
          output: 'if (cat',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: 'if (((\n',
          output: 'if (((',
        },
        {
          input: 'cat))) { console.log(2) }',
          output: 'cat))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: 'if (((cat\n',
          output: 'if (((cat',
        },
        {
          input: '))) { console.log(2) }',
          output: '))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: '(  \n',
          output: '(  ',
        },
        {
          input: '(i < 10))   ?\n',
          output: '(i < 10))   ?',
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 2),
      },
    },
    {
      lines: [
        {
          input: '(  \n',
          output: '(  ',
        },
        {
          input: '  (i < 10))   ?\n',
          output: '  (i < 10))   ?',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: '((i < 10)\n',
          output: '((i < 10)',
        },
        {
          input: '  )   ?\n',
          output: '  )   ?',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: '((i < 10)  \n',
          output: '((i < 10)  ',
        },
        {
          input: '  )   ?\n',
          output: '  )   ?',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: '((i < 10))\n',
          output: '((i < 10))',
        },
        {
          input: '     ?\n',
          output: '     ?',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog && (cat\n',
          output: 'dog && (cat',
        },
        {
          input: ')) { console.log(2) }',
          output: ')) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 1),
        end: new vscode.Position(2, 2),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog && (cat\n',
          output: 'dog && (cat',
        },
        {
          input: ') ) { console.log(2) }',
          output: ') ) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 1),
        end: new vscode.Position(2, 2),
      },
    },
    {
      lines: [
        {
          input: `if dog and\n`,
          output: 'if dog and',
        },
        {
          input: `cat: print\n`,
          output: 'cat: print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: `if dog && cat`,
          output: 'if dog && cat',
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 3),
      },
    },
    {
      lines: [
        {
          input: `if dog && cat`,
          output: 'if dog && cat',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: `if dog && cat`,
          output: 'if dog && cat',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 10),
      },
    },

    {
      lines: [
        {
          input: 'dog &&\n',
          output: 'dog &&',
        },
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'if ( \n',
          output: 'if ( ',
        },
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'if ( \n',
          output: 'if ( ',
        },
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: ' dog\n',
          output: ' dog',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 3),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: ' \n',
          output: ' ',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 3),
        end: new vscode.Position(3, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 3),
        end: new vscode.Position(3, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog \n',
          output: 'dog ',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 3),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog \n',
          output: 'dog ',
        },
        {
          input: ') { console.log(2) }',
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 4),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: ' ) { console.log(2) }',
          output: ' ) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 3),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog \n',
          output: 'dog ',
        },
        {
          input: ' ) { console.log(2) }',
          output: ' ) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 3),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog \n',
          output: 'dog ',
        },
        {
          input: ' ) { console.log(2) }',
          output: ' ) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 4),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog \n',
          output: 'dog ',
        },
        {
          input: ' ) { console.log(2) }',
          output: ' ) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 4),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: `if (\n`,
          output: 'if (',
        },
        {
          input: `dog): print\n`,
          output: 'dog): print',
        },
      ],
      selection: {
        start: new vscode.Position(1, 3),
        end: new vscode.Position(1, 4),
      },
    },
    {
      lines: [
        {
          input: `if (\n`,
          output: 'if (',
        },
        {
          input: `dog): print\n`,
          output: 'dog): print',
        },
      ],
      selection: {
        start: new vscode.Position(1, 3),
        end: new vscode.Position(1, 5),
      },
    },
    {
      lines: [
        {
          input: `if (\n`,
          output: 'if (',
        },
        {
          input: `dog): print\n`,
          output: 'dog): print',
        },
      ],
      selection: {
        start: new vscode.Position(1, 4),
        end: new vscode.Position(1, 5),
      },
    },
    {
      lines: [
        {
          input: `if (\n`,
          output: 'if (',
        },
        {
          input: `dog): print\n`,
          output: 'dog): print',
        },
      ],
      selection: {
        start: new vscode.Position(1, 4),
        end: new vscode.Position(1, 6),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0;\n',
          output: 'for (let i = 0;',
        },
        {
          input: 'i < 10;\n',
          output: 'i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10;\n',
          output: 'i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10;\n',
          output: 'i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: ' i < 10;\n',
          output: ' i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: ' i < 10;\n',
          output: ' i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: '  i < 10;\n',
          output: '  i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10;\n',
          output: 'i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: '  i < 10;\n',
          output: '  i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: '  i < 10;\n',
          output: '  i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: '  i < 10;\n',
          output: '  i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10;\n',
          output: 'i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: '  i < 10;\n',
          output: '  i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: '  i < 10;\n',
          output: '  i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: '  i < 10;\n',
          output: '  i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0\n',
          output: 'for (let i = 0',
        },
        {
          input: ';i < 10;\n',
          output: ';i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0\n',
          output: 'for (let i = 0',
        },
        {
          input: ';i < 10;\n',
          output: ';i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0\n',
          output: 'for (let i = 0',
        },
        {
          input: '; i < 10;\n',
          output: '; i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0\n',
          output: 'for (let i = 0',
        },
        {
          input: '; i < 10;\n',
          output: '; i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0\n',
          output: 'for (let i = 0',
        },
        {
          input: '; i < 10;\n',
          output: '; i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0\n',
          output: 'for (let i = 0',
        },
        {
          input: ';  i < 10;\n',
          output: ';  i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 2),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0\n',
          output: 'for (let i = 0',
        },
        {
          input: ';  i < 10;\n',
          output: ';  i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 2),
        end: new vscode.Position(1, 3),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0\n',
          output: 'for (let i = 0',
        },
        {
          input: ';  i < 10;\n',
          output: ';  i < 10;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 3),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10 ;\n',
          output: 'i < 10 ;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 6),
        end: new vscode.Position(3, 2),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10 ;\n',
          output: 'i < 10 ;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 7),
        end: new vscode.Position(3, 2),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10 ;\n',
          output: 'i < 10 ;',
        },
        {
          input: 'i += 1)\n',
          output: 'i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 6),
        end: new vscode.Position(1, 7),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10  \n',
          output: 'i < 10  ',
        },
        {
          input: ';i += 1)\n',
          output: ';i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 6),
        end: new vscode.Position(1, 7),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10  \n',
          output: 'i < 10  ',
        },
        {
          input: ';i += 1)\n',
          output: ';i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 7),
        end: new vscode.Position(1, 8),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10  \n',
          output: 'i < 10  ',
        },
        {
          input: ';i += 1)\n',
          output: ';i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 6),
        end: new vscode.Position(1, 8),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10\n',
          output: 'i < 10',
        },
        {
          input: ';i += 1)\n',
          output: ';i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 6),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10\n',
          output: 'i < 10',
        },
        {
          input: ';i += 1)\n',
          output: ';i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(1, 6),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10\n',
          output: 'i < 10',
        },
        {
          input: ';i += 1)\n',
          output: ';i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10\n',
          output: 'i < 10',
        },
        {
          input: ' ;i += 1)\n',
          output: ' ;i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 2),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10\n',
          output: 'i < 10',
        },
        {
          input: ' ;i += 1)\n',
          output: ' ;i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(2, 1),
        end: new vscode.Position(2, 2),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; \n',
          output: 'for (let i = 0; ',
        },
        {
          input: 'i < 10\n',
          output: 'i < 10',
        },
        {
          input: ' ;i += 1)\n',
          output: ' ;i += 1)',
        },
        {
          input: '{}\n',
          output: '{}',
        },
      ],
      selection: {
        start: new vscode.Position(2, 1),
        end: new vscode.Position(3, 2),
      },
    },
  ]);
});
