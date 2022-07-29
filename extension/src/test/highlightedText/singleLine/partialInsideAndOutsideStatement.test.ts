const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Partial Inside and Outside Statement Suite', () => {
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
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 23),
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
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 22),
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
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 21),
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
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 20),
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
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 13),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog && cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 5),
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
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 43),
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
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 43),
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
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 43),
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
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 43),
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
        end: new vscode.Position(0, 43),
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
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 22),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || dog >> cat) { console.log(2) }',
          output: 'if (!dog || !cat && !(dog >> cat)) { console.log(2) }',
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
          input: 'if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && !cat) { console.log(2) } if (!dog && cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 42),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog || !cat) { console.log(2) } if (!dog || cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (!dog || !cat) { console.log(2) } if (dog && cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) } elif (dog && cat) { console.log(2) }',
          output: 'if (!dog || !cat) { console.log(2) } elif (dog && cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) } for (dog && cat) { console.log(2) }',
          output: 'if (!dog || !cat) { console.log(2) } for (dog && cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) } while (dog && cat) { console.log(2) }',
          output: 'if (!dog || !cat) { console.log(2) } while (dog && cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) } if (dog && cat) { console.log(2) }',
          output: 'if (dog && cat) { console.log(2) } if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 35),
        end: new vscode.Position(0, 70),
      },
    },
    {
      lines: [
        {
          input: 'if (dog not  in   cat): print',
          output: 'if (dog  in   cat): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: '&& dog && cat || mouse) { console.log(2) }',
          output: '|| !dog || !cat && !mouse) { console.log(2) }',
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
          input: 'fish && dog && cat || mouse) { console.log(2) }',
          output: '!fish || !dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: '&& dog && cat || mouse) { console.log(2) }',
          output: '|| !dog || !cat && !mouse) { console.log(2) }',
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
          input: 'fish && dog && cat || mouse) { console.log(2) }',
          output: 'fish || !dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 47),
      },
    },
    {
      lines: [
        {
          input: 'if (fish && dog && cat || mouse',
          output: 'if (!fish || !dog || !cat && !mouse',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: 'if (fish && dog &&',
          output: 'if (!fish || !dog ||',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: 'fish && dog && cat || mouse',
          output: '!fish || !dog || !cat && !mouse',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 27),
      },
    },
    {
      lines: [
        {
          input: '&& dog && cat ||',
          output: '|| !dog || !cat &&',
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
          input: 'if (dogif && cat) { console.log(2) }',
          output: 'if (!dogif && cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if (`asdasd${asdasdasd}`) { console.log(2) }',
          output: 'if (!`asdasd${asdasdasd}`) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (cat && `asdasd${asdasdasd}`) { console.log(2) }',
          output: 'if (!cat || !`asdasd${asdasdasd}`) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && `asdasd${asdasdasd}`',
          output: 'const dog = !cat || !`asdasd${asdasdasd}`',
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
          input: 'const dog = cat && `asdasd${asdasdasd}`',
          output: 'const dog = !cat || !`asdasd${asdasdasd}`',
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
          input: 'const dog = cat && `asdasd${asdasdasd}`',
          output: 'const dog = !cat || !`asdasd${asdasdasd}`',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 27),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && `asdasd${asdasdasd}`',
          output: 'const dog = !cat || !`asdasd${asdasdasd}`',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 28),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && `asdasd${asdasdasd}`',
          output: 'const dog = !cat || !`asdasd${asdasdasd}`',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && `asdasd${asdasdasd}`',
          output: 'const dog = !cat || !`asdasd${asdasdasd}`',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && `asdasd${asdasdasd}`',
          output: 'const dog = cat && !`asdasd${asdasdasd}`',
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 39),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && `asdasd${asdasdasd}`',
          output: 'const dog = cat && !`asdasd${asdasdasd}`',
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && `asdasd${asdasdasd}`',
          output: 'const dog = cat && !`asdasd${asdasdasd}`',
        },
      ],
      selection: {
        start: new vscode.Position(0, 26),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && `asdasd${asdasdasd}`',
          output: 'const dog = cat && !`asdasd${asdasdasd}`',
        },
      ],
      selection: {
        start: new vscode.Position(0, 27),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && `asdasd${asdasdasd && dog}`',
          output: 'const dog = cat && `asdasd${!asdasdasd || !dog}`',
        },
      ],
      selection: {
        start: new vscode.Position(0, 28),
        end: new vscode.Position(0, 44),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && `asdasd${asdasdasd && dog}`',
          output: 'const dog = cat && `asdasd${!asdasdasd && dog}`',
        },
      ],
      selection: {
        start: new vscode.Position(0, 28),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && `asdasd${asdasdasd && dog}`',
          output: 'const dog = cat && `asdasd${asdasdasd || dog}`',
        },
      ],
      selection: {
        start: new vscode.Position(0, 38),
        end: new vscode.Position(0, 40),
      },
    },
    {
      lines: [
        {
          input: 'const dog = cat && `asdasd${asdasdasd && dog}`',
          output: 'const dog = cat && `asdasd${asdasdasd && !dog}`',
        },
      ],
      selection: {
        start: new vscode.Position(0, 41),
        end: new vscode.Position(0, 44),
      },
    },
  ]);
});
