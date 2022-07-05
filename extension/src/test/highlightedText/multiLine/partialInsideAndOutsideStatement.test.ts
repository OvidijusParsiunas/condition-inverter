const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite.only('Highlighted Partial Inside and Outside Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `if (\n`,
          output: 'if (',
        },
        {
          input: `dog\n`,
          output: '!dog',
        },
        {
          input: `) { console.log(2) }`,
          output: ') { console.log(2) }',
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
          input: `if (\n`,
          output: 'if (',
        },
        {
          input: `\n`,
          output: '',
        },
        {
          input: `dog\n`,
          output: '!dog',
        },
        {
          input: `) { console.log(2) }`,
          output: ') { console.log(2) }',
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
          input: 'if (dog &&\n',
          output: 'if (!dog ||',
        },
        {
          input: 'cat || mouse) { console.log(2) }',
          output: 'cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'if (dog\n',
          output: 'if (!dog',
        },
        {
          input: '&& cat || mouse) { console.log(2) }',
          output: '&& cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if (dog\n',
          output: 'if (dog',
        },
        {
          input: '&& cat || mouse) { console.log(2) }',
          output: '|| cat || mouse) { console.log(2) }',
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
          input: 'if (dog\n',
          output: 'if (dog',
        },
        {
          input: '&& cat || mouse) { console.log(2) }',
          output: '|| !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 15),
      },
    },
    {
      lines: [
        {
          input: 'if (dog\n',
          output: 'if (dog',
        },
        {
          input: '&&\n',
          output: '||',
        },
        {
          input: 'cat || mouse) { console.log(2) }',
          output: 'cat || mouse) { console.log(2) }',
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
          input: 'for (let i = 0;\n',
          output: 'for (let i = 0;',
        },
        {
          input: 'i < 10;\n',
          output: 'i >= 10;',
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
        end: new vscode.Position(1, 7),
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
          output: 'i >= 10;',
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
        end: new vscode.Position(3, 2),
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
          output: 'i >= 10;',
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
        end: new vscode.Position(1, 7),
      },
    },
    {
      lines: [
        {
          input: `!cat\n`,
          output: `cat`,
        },
        {
          input: `||\n`,
          output: `||`,
        },
        {
          input: `dog\n`,
          output: `dog`,
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
          input: `cat\n`,
          output: `cat`,
        },
        {
          input: `&&\n`,
          output: `&&`,
        },
        {
          input: `dog\n`,
          output: `!dog`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 2),
        end: new vscode.Position(2, 0),
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
          output: '|| !mouse) { console.log(2) }',
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
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: '|| mouse) { console.log(2) }',
          output: '|| !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 8),
        end: new vscode.Position(1, 12),
      },
    },
    {
      lines: [
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: '|| mouse) && dog) { console.log(2) }',
          output: '|| !mouse) && dog) { console.log(2) }',
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
          input: '(dog\n',
          output: '(dog',
        },
        {
          input: '|| mouse) { console.log(2) }',
          output: '|| !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 8),
        end: new vscode.Position(1, 12),
      },
    },
    {
      lines: [
        {
          input: '(dog\n',
          output: '(dog',
        },
        {
          input: '|| mouse) && dog) { console.log(2) }',
          output: '|| !mouse) && dog) { console.log(2) }',
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
          input: 'dog && (cat\n',
          output: 'dog && !(cat',
        },
        {
          input: ')) { console.log(2) }',
          output: ')) { console.log(2) }',
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
          input: '(dog && (cat\n',
          output: '(dog && !(cat',
        },
        {
          input: ')) { console.log(2) }',
          output: ')) { console.log(2) }',
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
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: '|| mouse) { console.log(2) }',
          output: '|| !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 8),
        end: new vscode.Position(1, 12),
      },
    },
    {
      lines: [
        {
          input: 'dog\n',
          output: 'dog',
        },
        {
          input: '|| mouse) && dog) { console.log(2) }',
          output: '|| !mouse) && dog) { console.log(2) }',
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
          input: '(dog\n',
          output: '(dog',
        },
        {
          input: '|| mouse) { console.log(2) }',
          output: '|| !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 8),
        end: new vscode.Position(1, 12),
      },
    },
    {
      lines: [
        {
          input: '(dog\n',
          output: '(dog',
        },
        {
          input: '|| mouse) && dog) { console.log(2) }',
          output: '|| !mouse) && dog) { console.log(2) }',
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
          input: 'dog && (cat\n',
          output: 'dog && !(cat',
        },
        {
          input: ')) { console.log(2) }',
          output: ')) { console.log(2) }',
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
          input: '(dog && (cat\n',
          output: '(dog && !(cat',
        },
        {
          input: ')) { console.log(2) }',
          output: ')) { console.log(2) }',
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
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog && (cat\n',
          output: 'dog && !(cat',
        },
        {
          input: ') && cat) { console.log(2) }',
          output: ') && cat) { console.log(2) }',
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
          input: 'if (\n',
          output: 'if (',
        },
        {
          input: 'dog && dog(cat\n',
          output: 'dog && !dog(cat',
        },
        {
          input: ')) { console.log(2) }',
          output: ')) { console.log(2) }',
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
          input: 'if (((\n',
          output: 'if (((',
        },
        {
          input: 'cat))) { console.log(2) }',
          output: '!cat))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if (((cat\n',
          output: 'if (((!cat',
        },
        {
          input: '))) { console.log(2) }',
          output: '))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 1),
      },
    },
  ]);
});
