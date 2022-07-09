const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite('Highlighted Full Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: 'if\n',
          output: 'if',
        },
        {
          input: '(\n',
          output: '(',
        },
        {
          input: 'dog\n',
          output: '!dog',
        },
        {
          input: '&&\n',
          output: '||',
        },
        {
          input: 'cat\n',
          output: '!cat',
        },
        {
          input: ')\n',
          output: ')',
        },
        {
          input: '{\n',
          output: '{',
        },
        {
          input: 'console\n',
          output: 'console',
        },
        {
          input: '.\n',
          output: '.',
        },
        {
          input: 'log\n',
          output: 'log',
        },
        {
          input: '(\n',
          output: '(',
        },
        {
          input: '2\n',
          output: '2',
        },
        {
          input: ')\n',
          output: ')',
        },
        {
          input: '}',
          output: '}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(13, 1),
      },
    },
    {
      lines: [
        {
          input: 'if\n',
          output: 'if',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '(\n',
          output: '(',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: 'dog\n',
          output: '!dog',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '&&\n',
          output: '||',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: 'cat\n',
          output: '!cat',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: ')\n',
          output: ')',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '{\n',
          output: '{',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: 'console\n',
          output: 'console',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '.\n',
          output: '.',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: 'log\n',
          output: 'log',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '(\n',
          output: '(',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '2\n',
          output: '2',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: ')\n',
          output: ')',
        },
        {
          input: '\n',
          output: '',
        },
        {
          input: '}',
          output: '}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(26, 1),
      },
    },
    {
      lines: [
        {
          input: 'for\n',
          output: 'for',
        },
        {
          input: '(\n',
          output: '(',
        },
        {
          input: 'let i = 0\n',
          output: 'let i = 0',
        },
        {
          input: ';\n',
          output: ';',
        },
        {
          input: 'i < 2\n',
          output: 'i >= 2',
        },
        {
          input: ';\n',
          output: ';',
        },
        {
          input: 'i += 1\n',
          output: 'i += 1',
        },
        {
          input: ')\n',
          output: ')',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(7, 1),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'for (let i = 0; i < 10; i += 1) {}\n',
          output: 'for (let i = 0; i < 10; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 5),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'for (let i = 0; i < 10; i += 1) {}\n',
          output: 'for (let i = 0; i < 10; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(1, 15),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'for (let i = 0; i < 10; i += 1) {}\n',
          output: 'for (let i = 0; i >= 10; i += 1) {}',
        },
        {
          input: 'const dog = cat && fish;\n',
          output: 'const dog = !cat || !fish;',
        },
        {
          input: 'dog ? cat : dog',
          output: '!dog ? cat : dog',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(3, 15),
      },
    },
    {
      lines: [
        {
          input: 'dog ? cat : dog\n',
          output: '!dog ? cat : dog',
        },
        {
          input: 'const dog = cat && fish;\n',
          output: 'const dog = !cat || !fish;',
        },
        {
          input: 'for (let i = 0; i < 10; i += 1) {}\n',
          output: 'for (let i = 0; i >= 10; i += 1) {}',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(3, 43),
      },
    },
    {
      lines: [
        {
          input: 'dog ? cat : dog\n',
          output: '!dog ? cat : dog',
        },
        {
          input: 'for (let i = 0; i < 10; i += 1) {}\n',
          output: 'for (let i = 0; i >= 10; i += 1) {}',
        },
        {
          input: 'const dog = cat && fish;\n',
          output: 'const dog = !cat || !fish;',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(3, 43),
      },
    },
    {
      lines: [
        {
          input: 'dog ? cat : dog\n',
          output: '!dog ? cat : dog',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'for (let i = 0; i < 10; i += 1) {}\n',
          output: 'for (let i = 0; i >= 10; i += 1) {}',
        },
        {
          input: 'const dog = cat && fish;\n',
          output: 'const dog = !cat || !fish;',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(3, 24),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && fish;\n',
          output: 'const dog = !cat || !fish;',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'dog ? cat : dog\n',
          output: '!dog ? cat : dog',
        },
        {
          input: 'for (let i = 0; i < 10; i += 1) {}\n',
          output: 'for (let i = 0; i >= 10; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(3, 34),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 10; i += 1) {}\n',
          output: 'for (let i = 0; i >= 10; i += 1) {}',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'const dog = cat && fish;\n',
          output: 'const dog = !cat || !fish;',
        },
        {
          input: 'dog ? cat : dog\n',
          output: '!dog ? cat : dog',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(3, 15),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 10; i += 1) {}\n',
          output: 'for (let i = 0; i >= 10; i += 1) {}',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(1, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: 'for (let i = 0; i < 10; i += 1) {}\n',
          output: 'for (let i = 0; i >= 10; i += 1) {}',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 35),
        end: new vscode.Position(1, 19),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: 'for (let i = 0; i < 10; i += 1) {}\n',
          output: 'for (let i = 0; i >= 10; i += 1) {}',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 35),
        end: new vscode.Position(1, 22),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && fish;\n',
          output: 'const dog = cat && !fish;',
        },
        {
          input: 'dog ? cat : dog\n',
          output: '!dog ? cat : dog',
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(1, 3),
      },
    },
    {
      lines: [
        {
          input: 'dog ? cat : dog\n',
          output: 'dog ? cat : dog',
        },
        {
          input: 'const dog = cat && fish;\n',
          output: 'const dog = !cat && fish;',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(1, 15),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (!dog || !cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(1, 17),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }\n',
          output: 'if (dog && !cat && !mouse) { console.log(2) }',
        },
        {
          input: 'for (let i = 0; i < 10; i += 1) {}\n',
          output: 'for (let i = 0; i >= 10; i += 1) {}',
        },
        {
          input: 'const fish = dog & cat\n',
          output: 'const fish = dog & cat',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(1, 19),
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
        end: new vscode.Position(3, 2),
      },
    },
  ]);
});
