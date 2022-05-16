const mocha = require('../../../node_modules/mocha/lib/mocha.js');
import { TextEditorObj } from '../../shared/types/tests/tests';
import { TestUtil } from '../util/testUtil';
import * as vscode from 'vscode';

suite('Selected Text Suite', () => {
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
        end: new vscode.Position(0, 0),
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
        end: new vscode.Position(0, 1),
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
        end: new vscode.Position(0, 2),
      },
    },
    {
      lines: [
        {
          input: 'if   (dog && cat || mouse) { console.log(2) }',
          output: 'if   (!dog || !cat && !mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 24),
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
        start: new vscode.Position(0, 30),
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
        start: new vscode.Position(0, 43),
        end: new vscode.Position(0, 43),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
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
          input: 'if  (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if  (!dog || !cat && !mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 44),
        end: new vscode.Position(0, 44),
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
        start: new vscode.Position(0, 47),
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
        start: new vscode.Position(0, 48),
        end: new vscode.Position(0, 48),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) } if  (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) } if  (!dog || !cat && !mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 47),
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
        start: new vscode.Position(0, 52),
        end: new vscode.Position(0, 52),
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
        start: new vscode.Position(0, 60),
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
        start: new vscode.Position(0, 80),
        end: new vscode.Position(0, 80),
      },
    },
    {
      lines: [
        {
          input: '  if (dog && cat || mouse) { console.log(2) }',
          output: '  if (!dog || !cat && !mouse) { console.log(2) }',
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
          input: '  while(dog) if (dog && cat || mouse) { console.log(2) }',
          output: '  while(!dog) if (dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog || !cat && !mouse) { console.log(2) } if (dog && cat || mouse) { console.log(2) }',
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
          input: 'if dog and cat: print("2") if dog and cat: print("2")',
          output: 'if !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'if dog and cat: print("2") if dog and cat: print("2")',
          output: 'if !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'if dog and cat: print("2") if dog and cat: print("2")',
          output: 'if !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'if dog and cat: print("2") if dog and cat: print("2")',
          output: 'if !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'if dog and cat: print("2") if dog and cat: print("2")',
          output: 'if !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'if dog and cat: print("2") if dog and cat: print("2")',
          output: 'if !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'if dog and cat: print("2") if dog and cat: print("2")',
          output: 'if !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'if dog and cat: print("2") if dog and cat: print("2")',
          output: 'if !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'if dog and cat: print("2") if dog and cat: print("2")',
          output: 'if !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'if dog and cat: print("2") if dog and cat: print("2")',
          output: 'if !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'if dog and cat: print("2") if dog and cat: print("2")',
          output: 'if !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'if dog and cat: print("2") if dog and cat: print("2")',
          output: 'if dog and cat: print("2") if !dog or !cat: print("2")',
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
          input: 'elif dog and cat: print("2") if dog and cat: print("2")',
          output: 'elif !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'elif dog and cat: print("2") if dog and cat: print("2")',
          output: 'elif !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'elif dog and cat: print("2") if dog and cat: print("2")',
          output: 'elif !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'elif dog and cat: print("2") if dog and cat: print("2")',
          output: 'elif !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'elif dog and cat: print("2") if dog and cat: print("2")',
          output: 'elif !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'while dog and cat: print("2") if dog and cat: print("2")',
          output: 'while !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'while dog and cat: print("2") if dog and cat: print("2")',
          output: 'while !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'while dog and cat: print("2") if dog and cat: print("2")',
          output: 'while !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'while dog and cat: print("2") if dog and cat: print("2")',
          output: 'while !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'while dog and cat: print("2") if dog and cat: print("2")',
          output: 'while !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'while dog and cat: print("2") if dog and cat: print("2")',
          output: 'while !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'while dog and cat: print("2") if dog and cat: print("2")',
          output: 'while !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'while dog and cat: print("2") if dog and cat: print("2")',
          output: 'while !dog or !cat: print("2") if dog and cat: print("2")',
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
          input: 'if dog and cat: print("2") while dog and cat: print("2")',
          output: 'if !dog or !cat: print("2") while dog and cat: print("2")',
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
          input: 'if dog and cat: print("2") while dog and cat: print("2")',
          output: 'if dog and cat: print("2") while !dog or !cat: print("2")',
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
          input: 'if dog: print("2") while dog: print("2") if dog: print("2")',
          output: 'if dog: print("2") while !dog: print("2") if dog: print("2")',
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
          input: 'if dog: print("2") while dog: print("2") if dog: print("2")',
          output: 'if dog: print("2") while !dog: print("2") if dog: print("2")',
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
          input: 'if fishif and catif: print"2" if ifcat and dogif: print"2"',
          output: 'if !fishif or !catif: print"2" if ifcat and dogif: print"2"',
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
          input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
          output: 'if !fishif or !catif: print("2") if ifcat and dogif: print("2")',
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
          input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
          output: 'if !fishif or !catif: print("2") if ifcat and dogif: print("2")',
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
          input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
          output: 'if !fishif or !catif: print("2") if ifcat and dogif: print("2")',
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
          input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
          output: 'if !fishif or !catif: print("2") if ifcat and dogif: print("2")',
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
          input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
          output: 'if !fishif or !catif: print("2") if ifcat and dogif: print("2")',
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
          input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
          output: 'if fishif and catif: print("2") if !ifcat or !dogif: print("2")',
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
          input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
          output: 'if fishif and catif: print("2") if !ifcat or !dogif: print("2")',
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
          input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
          output: 'if fishif and catif: print("2") if !ifcat or !dogif: print("2")',
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
          input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
          output: 'if fishif and catif: print("2") if !ifcat or !dogif: print("2")',
        },
      ],
      selection: {
        start: new vscode.Position(0, 35),
        end: new vscode.Position(0, 35),
      },
    },
    {
      lines: [
        {
          input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
          output: 'if fishif and catif: print("2") if !ifcat or !dogif: print("2")',
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
          input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
          output: 'if fishif and catif: print("2") if !ifcat or !dogif: print("2")',
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
          input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
          output: 'if fishif and catif: print("2") if !ifcat or !dogif: print("2")',
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
          input: 'if fishif and catif: print("2") if ifcat and dogif: print("2")',
          output: 'if fishif and catif: print("2") if !ifcat or !dogif: print("2")',
        },
      ],
      selection: {
        start: new vscode.Position(0, 48),
        end: new vscode.Position(0, 48),
      },
    },
  ]);
});
