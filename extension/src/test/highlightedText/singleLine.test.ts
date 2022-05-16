const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../shared/types/tests/tests';
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite('Highlighted Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 30),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 51),
        end: new vscode.Position(0, 60),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 51),
        end: new vscode.Position(0, 80),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 55),
        end: new vscode.Position(0, 60),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 40),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }  if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 46),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }  if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }  if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }  if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 46),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 46),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 46),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 46),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 46),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 46),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 24),
        end: new vscode.Position(0, 86),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 24),
        end: new vscode.Position(0, 86),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 25),
        end: new vscode.Position(0, 86),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 110),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (dog && cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 48),
        end: new vscode.Position(0, 58),
      },
    },
    {
      lines: [
        {
          input: 'if (dog) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat && ifdog) { console.log(2) }',
          output: 'if (!dog) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat || !ifdog) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 83),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 42),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 46),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 47),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 48),
        end: new vscode.Position(0, 90),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 80),
        end: new vscode.Position(0, 86),
      },
    },
    {
      lines: [
        {
          input: '    if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: '    if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
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
          input: `dogif if (dogif && cat || mouseif) { console.log(2) }`,
          output: `dogif if (!dogif || !cat && !mouseif) { console.log(2) }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: `if (dogif && cat) {} ifhello`,
          output: `if (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: `if (dogif && cat) {} ifhello`,
          output: `if (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: `if (dogif && cat) {} ifhello`,
          output: `if (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: `if (dogif && cat) {} ifhello`,
          output: `if (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 24),
      },
    },
    {
      lines: [
        {
          input: `if (dogif && cat) {} ifhello`,
          output: `if (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: `if (dogif && cat) {} ifhello`,
          output: `if (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 24),
      },
    },
    {
      lines: [
        {
          input: `while (dogif && cat) {} ifhello`,
          output: `while (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: `while (dogif && cat) {} ifhello`,
          output: `while (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: `while (dogif && cat) {} ifhello`,
          output: `while (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 26),
      },
    },
    {
      lines: [
        {
          input: `while (dogif && cat) {} ifhello`,
          output: `while (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 26),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasd') while (dogif && cat) {} ifhello`,
          output: `if (dog) console.log('asdasd') while (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasd') while (dogif && cat) {} ifhello`,
          output: `if (!dog) console.log('asdasd') while (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 40),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('a') elif (fish) print('hello') while (dogif && cat) {} ifhello`,
          output: `if (dog) console.log('a') elif (!fish) print('hello') while (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 28),
        end: new vscode.Position(0, 62),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasda') elif fish: print'hello' if dogif && cat: {}`,
          output: `if (!dog) console.log('asdasda') elif !fish: print'hello' if dogif && cat: {}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 36),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasda') elif fish: print'hello' if dogif && cat: {}`,
          output: `if (!dog) console.log('asdasda') elif !fish: print'hello' if dogif && cat: {}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 40),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasda') elif fish: print'hello' if dogif && cat: {}`,
          output: `if (!dog) console.log('asdasda') elif !fish: print'hello' if dogif && cat: {}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: `if (dog) console.log('asdasd') elif (fish): print('hello') while (dogif && cat) {} ifhello`,
          output: `if (!dog) console.log('asdasd') elif (!fish): print('hello') while (!dogif || !cat) {} ifhello`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 69),
      },
    },
  ]);
});
