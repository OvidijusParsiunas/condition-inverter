const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../../shared/types/tests';
import { TestUtil } from '../../util/testUtil';
import * as vscode from 'vscode';

suite('Selected No Condition Text Suite', () => {
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
          output: 'dog',
        },
        {
          input: `) {\n`,
          output: ') {',
        },
        {
          input: `console.log('called') }\n`,
          output: `console.log('called') }`,
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
          input: `if (\n`,
          output: 'if (',
        },
        {
          input: `dog\n`,
          output: 'dog',
        },
        {
          input: `) {\n`,
          output: ') {',
        },
        {
          input: `console.log(fish)\n`,
          output: 'console.log(fish)',
        },
        {
          input: `}\n`,
          output: '}',
        },
      ],
      selection: {
        start: new vscode.Position(2, 0),
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: `if dog:\n`,
          output: 'if dog:',
        },
        {
          input: `print\n`,
          output: 'print',
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
          input: `if dog:\n`,
          output: 'if dog:',
        },
        {
          input: `print\n`,
          output: 'print',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'if \n',
          output: 'if ',
        },
        {
          input: '(dog)',
          output: '(dog)',
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
          input: 'if \n',
          output: 'if ',
        },
        {
          input: '(dog)',
          output: '(dog)',
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
          input: 'if \n',
          output: 'if ',
        },
        {
          input: ' (dog)',
          output: ' (dog)',
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
          input: 'if \n',
          output: 'if ',
        },
        {
          input: ' (dog)',
          output: ' (dog)',
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
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0;\n',
          output: 'for (let i = 0;',
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
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0;\n',
          output: 'for (let i = 0;',
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
        start: new vscode.Position(1, 1),
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0;\n',
          output: 'for (let i = 0;',
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
        end: new vscode.Position(1, 1),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0;\n',
          output: 'for (let i = 0;',
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
          input: 'i < 10  ;\n',
          output: 'i < 10  ;',
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
          input: 'i < 10  ;\n',
          output: 'i < 10  ;',
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
        start: new vscode.Position(1, 8),
        end: new vscode.Position(1, 8),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0;\n',
          output: 'for (let i = 0;',
        },
        {
          input: 'i < 10 \n',
          output: 'i < 10 ',
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
          input: 'i < 10 \n',
          output: 'i < 10 ',
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
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0;\n',
          output: 'for (let i = 0;',
        },
        {
          input: 'i < 10 \n',
          output: 'i < 10 ',
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
        end: new vscode.Position(2, 0),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0;\n',
          output: 'for (let i = 0;',
        },
        {
          input: 'i < 10 \n',
          output: 'i < 10 ',
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
        end: new vscode.Position(2, 1),
      },
    },
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) }\n`,
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: `\n`,
          output: '',
        },
        {
          input: `if (mouse && cat) { console.log(2) }\n`,
          output: 'if (mouse && cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
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
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
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
        start: new vscode.Position(6, 0),
        end: new vscode.Position(6, 0),
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
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 0),
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
        start: new vscode.Position(6, 0),
        end: new vscode.Position(6, 0),
      },
    },
    {
      lines: [
        {
          input: 'console.log(dog)  if (dog && cat || mouse) { console.log(2) }',
          output: 'console.log(dog)  if (dog && cat || mouse) { console.log(2) }',
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
        start: new vscode.Position(4, 1),
        end: new vscode.Position(4, 1),
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
