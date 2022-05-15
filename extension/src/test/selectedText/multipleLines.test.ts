const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../shared/types/tests/tests';
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite('Selected Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multiple Lines', [
    {
      lines: [
        {
          input: `if (dog && \n`,
          output: 'if (!dog || ',
        },
        {
          input: `cat || mouse) { console.log(2) }`,
          output: '!cat && !mouse) { console.log(2) }',
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
          input: `if (\n`,
          output: 'if (',
        },
        {
          input: `dog && cat || mouse) { console.log(2) }`,
          output: '!dog || !cat && !mouse) { console.log(2) }',
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
          input: `if \n`,
          output: 'if ',
        },
        {
          input: `(dog && cat || mouse) { console.log(2) }`,
          output: '(!dog || !cat && !mouse) { console.log(2) }',
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
          input: `if\n`,
          output: 'if',
        },
        {
          input: ` (dog && cat || mouse) { console.log(2) }`,
          output: ' (!dog || !cat && !mouse) { console.log(2) }',
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
          input: `if (\n`,
          output: 'if (',
        },
        {
          input: `dog && cat || mouse) { console.log(2) }`,
          output: '!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 48),
        end: new vscode.Position(1, 48),
      },
    },
    {
      lines: [
        {
          input: `if (dog && \n`,
          output: 'if (!dog || ',
        },
        {
          input: `cat || mouse) { console.log(2) }`,
          output: '!cat && !mouse) { console.log(2) }',
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
          input: `if (\n`,
          output: 'if (',
        },
        {
          input: `dog && cat || mouse) { console.log(2) }`,
          output: '!dog || !cat && !mouse) { console.log(2) }',
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
          input: `if \n`,
          output: 'if ',
        },
        {
          input: `(dog && cat || mouse) { console.log(2) }`,
          output: '(!dog || !cat && !mouse) { console.log(2) }',
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
          input: `if\n`,
          output: 'if',
        },
        {
          input: ` (dog && cat || mouse) { console.log(2) }`,
          output: ' (!dog || !cat && !mouse) { console.log(2) }',
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
          input: `if\n`,
          output: 'if',
        },
        {
          input: ` (dog && cat || mouse) { console.log(2) }`,
          output: ' (!dog || !cat && !mouse) { console.log(2) }',
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
          input: `if\n`,
          output: 'if',
        },
        {
          input: ` (dog && cat || mouse) { console.log(2) }`,
          output: ' (!dog || !cat && !mouse) { console.log(2) }',
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
          input: `if\n`,
          output: 'if',
        },
        {
          input: ` (dog && cat || mouse) { console.log(2) }`,
          output: ' (!dog || !cat && !mouse) { console.log(2) }',
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
          input: `if\n`,
          output: 'if',
        },
        {
          input: ` (dog && cat || mouse) { console.log(2) }`,
          output: ' (!dog || !cat && !mouse) { console.log(2) }',
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
          input: `if\n`,
          output: 'if',
        },
        {
          input: ` (dog && cat || mouse) { console.log(2) }`,
          output: ' (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 28),
        end: new vscode.Position(1, 28),
      },
    },
    {
      lines: [
        {
          input: `if\n`,
          output: 'if',
        },
        {
          input: ` (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }`,
          output: ' (!dog || !cat && !mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 28),
        end: new vscode.Position(1, 28),
      },
    },
    {
      lines: [
        {
          input: `if\n`,
          output: 'if',
        },
        {
          input: ` (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }`,
          output: ' (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 60),
        end: new vscode.Position(1, 60),
      },
    },
    {
      lines: [
        {
          input: `if\n`,
          output: 'if',
        },
        {
          input: ` (dog && cat || mouse) { console.log(2) } if\n`,
          output: ' (dog && cat || mouse) { console.log(2) } if',
        },
        {
          input: `(dog && cat || mouse) { console.log(2) }`,
          output: '(!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 44),
        end: new vscode.Position(1, 44),
      },
    },
    {
      lines: [
        {
          input: `if (dog && cat || mouse) { console.log(2) }\n`,
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
        {
          input: ` `,
          output: ' ',
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
          input: `if (dog && cat || mouse)\n`,
          output: 'if (dog && cat || mouse)',
        },
        {
          input: `{ console.log(2) }`,
          output: '{ console.log(2) }',
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
          input: `if (dog && cat || mouse)\n`,
          output: 'if (dog && cat || mouse)',
        },
        {
          input: `{ console.log(2) }`,
          output: '{ console.log(2) }',
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
          input: `if \n`,
          output: 'if ',
        },
        {
          input: `(dog \n`,
          output: '(!dog ',
        },
        {
          input: `&& cat \n`,
          output: '|| !cat ',
        },
        {
          input: `&& cat \n`,
          output: '|| !cat ',
        },
        {
          input: `|| mouse \n`,
          output: '&& !mouse ',
        },
        {
          input: `) { console.log(2) }`,
          output: ') { console.log(2) }',
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
          input: `if \n`,
          output: 'if ',
        },
        {
          input: `(dog \n`,
          output: '(!dog ',
        },
        {
          input: `&& cat \n`,
          output: '|| !cat ',
        },
        {
          input: `&& cat \n`,
          output: '|| !cat ',
        },
        {
          input: `|| mouse \n`,
          output: '&& !mouse ',
        },
        {
          input: `) { console.log(2) }`,
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(2, 4),
        end: new vscode.Position(2, 4),
      },
    },
    {
      lines: [
        {
          input: `if \n`,
          output: 'if ',
        },
        {
          input: `(dog \n`,
          output: '(!dog ',
        },
        {
          input: `&& cat \n`,
          output: '|| !cat ',
        },
        {
          input: `&& cat \n`,
          output: '|| !cat ',
        },
        {
          input: `|| mouse \n`,
          output: '&& !mouse ',
        },
        {
          input: `) { console.log(2) }`,
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(5, 0),
        end: new vscode.Position(5, 0),
      },
    },
    {
      lines: [
        {
          input: `if\n`,
          output: 'if',
        },
        {
          input: `(dog\n`,
          output: '(!dog',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `&& cat\n`,
          output: '|| !cat',
        },
        {
          input: `||\n`,
          output: '&&',
        },
        {
          input: `mouse\n`,
          output: '!mouse',
        },
        {
          input: `) { console.log(2) }`,
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(5, 0),
        end: new vscode.Position(5, 0),
      },
    },
    {
      lines: [
        {
          input: `if\n`,
          output: 'if',
        },
        {
          input: `(!dog\n`,
          output: '(dog',
        },
        {
          input: `&& !cat\n`,
          output: '|| cat',
        },
        {
          input: `&& !cat\n`,
          output: '|| cat',
        },
        {
          input: `||\n`,
          output: '&&',
        },
        {
          input: `!mouse\n`,
          output: 'mouse',
        },
        {
          input: `) { console.log(2) }`,
          output: ') { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(5, 0),
        end: new vscode.Position(5, 0),
      },
    },
    {
      lines: [
        {
          input: `if\n`,
          output: 'if',
        },
        {
          input: `(!dog\n`,
          output: '(dog',
        },
        {
          input: `&& !cat\n`,
          output: '|| cat',
        },
        {
          input: `&& !cat\n`,
          output: '|| cat',
        },
        {
          input: `||\n`,
          output: '&&',
        },
        {
          input: `!mouse\n`,
          output: 'mouse',
        },
        {
          input: `) { console.log(2) }`,
          output: ') { console.log(2) }',
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
          input: `if\n`,
          output: 'if',
        },
        {
          input: `(\n`,
          output: '(',
        },
        {
          input: `(!dog\n`,
          output: '(dog',
        },
        {
          input: `&& !cat\n`,
          output: '|| cat',
        },
        {
          input: `&& !cat\n`,
          output: '|| cat',
        },
        {
          input: `||\n`,
          output: '&&',
        },
        {
          input: `mouse\n`,
          output: '!mouse',
        },
        {
          input: `)\n`,
          output: ')',
        },
        {
          input: `) { console.log(2) }`,
          output: ') { console.log(2) }',
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
          input: `if\n`,
          output: 'if',
        },
        {
          input: `(\n`,
          output: '(',
        },
        {
          input: `(\n`,
          output: '(',
        },
        {
          input: `!dog\n`,
          output: 'dog',
        },
        {
          input: `&& !cat\n`,
          output: '|| cat',
        },
        {
          input: `&& !cat\n`,
          output: '|| cat',
        },
        {
          input: `||\n`,
          output: '&&',
        },
        {
          input: `mouse\n`,
          output: '!mouse',
        },
        {
          input: `)\n`,
          output: ')',
        },
        {
          input: `)\n`,
          output: ')',
        },
        {
          input: `{ console.log(2) }`,
          output: '{ console.log(2) }',
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
          input: `if (myFunc(\n`,
          output: 'if (!myFunc(',
        },
        {
          input: `dog < cat\n`,
          output: 'dog < cat',
        },
        {
          input: `)) { console.log(2) }`,
          output: ')) { console.log(2) }',
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
          input: `if (myFunc(\n`,
          output: 'if (!myFunc(',
        },
        {
          input: `dog < cat\n`,
          output: 'dog < cat',
        },
        {
          input: `)) { console.log(2) }`,
          output: ')) { console.log(2) }',
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
          input: `if (dog && \r\n`,
          output: 'if (!dog || ',
        },
        {
          input: `cat || mouse) { console.log(2) }`,
          output: '!cat && !mouse) { console.log(2) }',
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
          input: `if (dog && \r`,
          output: 'if (!dog || ',
        },
        {
          input: `\n`,
          output: '',
        },
        {
          input: `cat || mouse) { console.log(2) }`,
          output: '!cat && !mouse) { console.log(2) }',
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
          input: `if (dog) console.log('asdasd') if (dog) console.log('asdasd') if (dog && \n`,
          output: `if (dog) console.log('asdasd') if (dog) console.log('asdasd') if (!dog || `,
        },
        {
          input: `\n`,
          output: '',
        },
        {
          input: `cat || mouse) { console.log(2) }`,
          output: '!cat && !mouse) { console.log(2) }',
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
          input: `if (dog) console.log('asdasd') if (dog) console.log('asdasd') if (dogif && \n`,
          output: `if (dog) console.log('asdasd') if (dog) console.log('asdasd') if (!dogif || `,
        },
        {
          input: `\n`,
          output: '',
        },
        {
          input: `cat || mouse) { console.log(2) }`,
          output: '!cat && !mouse) { console.log(2) }',
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
          input: `if (dog) console.log('asdasd') if (dog) console.log('asdasd') while (dogif && \n`,
          output: `if (dog) console.log('asdasd') if (dog) console.log('asdasd') while (!dogif || `,
        },
        {
          input: `\n`,
          output: '',
        },
        {
          input: `cat || mouse) { console.log(2) }`,
          output: '!cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(1, 0),
        end: new vscode.Position(1, 0),
      },
    },
  ]);
});
