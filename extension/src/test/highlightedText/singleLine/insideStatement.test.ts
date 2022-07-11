const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Inside Statement Suite', () => {
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
        start: new vscode.Position(0, 4),
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
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 20),
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
        start: new vscode.Position(0, 4),
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
        start: new vscode.Position(0, 4),
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
        start: new vscode.Position(0, 4),
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
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 7),
      },
    },
    {
      lines: [
        {
          input: 'if (!dog && cat || mouse) { console.log(2) }',
          output: 'if (dog || !cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog || !cat && mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && !cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && !cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && !cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 13),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog || !cat || mouse) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog) { console.log(2) }',
          output: 'if (!dog) { console.log(2) }',
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
          input: 'if ( dog) { console.log(2) }',
          output: 'if ( !dog) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if ( (dog)) { console.log(2) }',
          output: 'if ( (!dog)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'while ( dog) { console.log(2) }',
          output: 'while ( !dog) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (!dog) { console.log(2) }',
          output: 'if (dog) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (!dog) { console.log(2) }',
          output: 'if (dog) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `if (dog && cat)`,
          output: 'if (dog && !cat)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog <= cat) { console.log(2) }',
          output: 'if (!dog <= cat) { console.log(2) }',
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
          input: 'if (not dog <= cat) { console.log(2) }',
          output: 'if (dog <= cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && not cat) { console.log(2) }',
          output: 'if (dog && cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: `if (typeof dog == 'dog') { console.log(2) }`,
          output: `if (!typeof dog == 'dog') { console.log(2) }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: `if (dog && typeof dog == 'dog') { console.log(2) }`,
          output: `if (dog && !typeof dog == 'dog') { console.log(2) }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: `if (dog && typeof dog == 'dog') { console.log(2) }`,
          output: `if (dog && typeof dog != 'dog') { console.log(2) }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 24),
      },
    },
    {
      lines: [
        {
          input: `if (dog && typeof dog == 'dog') { console.log(2) }`,
          output: `if (dog && typeof dog != 'dog') { console.log(2) }`,
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
          input: 'if (dog == cat) { console.log(2) }',
          output: 'if (dog == !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog < cat) { console.log(2) }',
          output: 'if (dog < !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 13),
      },
    },
    {
      lines: [
        {
          input: 'if (dog <  cat) { console.log(2) }',
          output: 'if (dog <  !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog <  cat) { console.log(2) }',
          output: 'if (dog >=  cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog << cat) { console.log(2) }',
          output: 'if (!(dog << cat)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog << cat) { console.log(2) }',
          output: 'if (!(dog << cat)) { console.log(2) }',
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
          input: 'while (dog) { console.log(2) }',
          output: 'while (!dog) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'while  (dog) { console.log(2) }',
          output: 'while  (!dog) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (dog &&cat) { console.log(2) }',
          output: 'if (dog &&!cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 13),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && typeof (cat)) { console.log(2) }',
          output: 'if (dog && !typeof (cat)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat + mouse) { console.log(2) }',
          output: 'if (dog && !(cat + mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat + mouse) { console.log(2) }',
          output: 'if (dog && !(cat + mouse)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'if (dog.cat) { console.log(2) }',
          output: 'if (!dog.cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (dog.cat) { console.log(2) }',
          output: 'if (!dog.cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if (dog.cat) { console.log(2) }',
          output: 'if (!dog.cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (dog.cat) { console.log(2) }',
          output: 'if (!dog.cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (dog.cat) { console.log(2) }',
          output: 'if (!dog.cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (dog.cat()) { console.log(2) }',
          output: 'if (!dog.cat()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 13),
      },
    },
    {
      lines: [
        {
          input: 'if (dog.cat()) { console.log(2) }',
          output: 'if (!dog.cat()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (dog ?? cat)',
          output: 'if (!(dog ?? cat))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (dog ??= cat)',
          output: 'if (!(dog ??= cat))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (dog |= cat)',
          output: 'if (!(dog |= cat))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (dog &= cat)',
          output: 'if (!(dog &= cat))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i >= 2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 29),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < !2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 29),
      },
    },
    {
      lines: [
        {
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < !2; i += 1) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 29),
      },
    },
    {
      lines: [
        {
          input: 'while True: print(dog)',
          output: 'while False: print(dog)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 10),
      },
    },
    {
      lines: [
        {
          input: 'if num := 9; num < 0 { fmt.Println(num, "is negative") }',
          output: 'if num := 9; num >= 0 { fmt.Println(num, "is negative") }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 56),
      },
    },
    {
      lines: [
        {
          input: 'if num := 9; num < 0 { fmt.Println(num, "is negative") }',
          output: 'if num := 9; num >= 0 { fmt.Println(num, "is negative") }',
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
          input: 'if num := 9; num < 0 { fmt.Println(num, "is negative") }',
          output: 'if num := 9; num >= 0 { fmt.Println(num, "is negative") }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: 'for i < 5',
          output: 'for i >= 5',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (dog().fish()) { console.log(2) }',
          output: 'if (!dog().fish()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (dog() .fish()) { console.log(2) }',
          output: 'if (!dog() .fish()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input: 'if (dog()[keyName]fish()) { console.log(2) }',
          output: 'if (!dog()[keyName]fish()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: `if (dog()['keyName']fish()) { console.log(2) }`,
          output: `if (!dog()['keyName']fish()) { console.log(2) }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: `if (dog() ['keyName']fish()) { console.log(2) }`,
          output: `if (!dog() ['keyName']fish()) { console.log(2) }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 22),
        end: new vscode.Position(0, 24),
      },
    },
    {
      lines: [
        {
          input: 'if (dog().fish()) { console.log(2) }',
          output: 'if (!dog().fish()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'if (dog() .fish()) { console.log(2) }',
          output: 'if (!dog() .fish()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: 'if (dog() .fish()) { console.log(2) }',
          output: 'if (!dog() .fish()) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 54),
      },
    },
    {
      lines: [
        {
          input: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
          output: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 57),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 14),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 16),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 18),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 22),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 24),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 25),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 26),
        end: new vscode.Position(0, 34),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 33),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 32),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 31),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 30),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 29),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 28),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 27),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 25),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 24),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 18),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 13),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: `if (function myFunc<number>(param: number|string): void { console.log(2) }) { console.log(2) }`,
          output: `if (!(function myFunc<number>(param: number|string): void { console.log(2) })) { console.log(2) }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 74),
      },
    },
    {
      lines: [
        {
          input: 'for dog in cat: print(dog)',
          output: 'for dog in cat: print(dog)',
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
          input: 'if (True): print',
          output: 'if (False): print',
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: '(  i < 10  )   ?\n',
          output: '(  i < !10  )   ?',
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
          input: '((i < 10)  )   ?\n',
          output: '((i < !10)  )   ?',
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
          input: '((i < 10)  )   ?\n',
          output: '((i < !10)  )   ?',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (((i < 10)) && cat)',
          output: 'if (((i < !10)) && cat)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 13),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (((i < arbFunc())) && cat)',
          output: 'if (((i < !arbFunc())) && cat)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 19),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: 'if (((i < arbFunc())) && cat)',
          output: 'if (((i < !arbFunc())) && cat)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: 'if (dogif && cat) { console.log(2) }',
          output: 'if (!dogif || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) }',
          output: 'if (dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) }',
          output: 'if (dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) }',
          output: 'if (dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) }',
          output: 'if (dog && !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) }',
          output: 'if (dog && !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) }',
          output: 'if (!dog || !cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) }',
          output: 'if (!dog || cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) }',
          output: 'if (!dog || cat) { console.log(2) }',
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
          input: 'if (dog && cat) { console.log(2) }',
          output: 'if (!dog || cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) }',
          output: 'if (!dog && cat) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && cat) { console.log(2) }',
          output: 'if (!dog && cat) { console.log(2) }',
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
          input: 'if ((dog) && cat) { console.log(2) }',
          output: 'if (!(dog) && cat) { console.log(2) }',
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
          input: 'if (cat && (dog)) { console.log(2) }',
          output: 'if (cat && !(dog)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'if (dog && (cat)) { console.log(2) }',
          output: 'if (dog && !(cat)) { console.log(2) }',
        },
      ],
      selection: {
        start: new vscode.Position(0, 15),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: `if ('dog')`,
          output: `if (!'dog')`,
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
          input: `if ('dog')`,
          output: `if (!'dog')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `if ('dog')`,
          output: `if (!'dog')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `if ('dog')`,
          output: `if (!'dog')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `if ('dog')`,
          output: `if (!'dog')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `if ('dog')`,
          output: `if (!'dog')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `if (!'dog')`,
          output: `if ('dog')`,
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
          input: `if (!'dog')`,
          output: `if ('dog')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: `if (!'dog')`,
          output: `if ('dog')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `if (!'dog')`,
          output: `if ('dog')`,
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
          input: `if (!'dog')`,
          output: `if ('dog')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `if (!'dog')`,
          output: `if ('dog')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `if (!'dog')`,
          output: `if ('dog')`,
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
          input: `if ('dog' && 'cat')`,
          output: `if (!'dog' && 'cat')`,
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
          input: `if ('dog' && 'cat')`,
          output: `if (!'dog' && 'cat')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `if ('dog' && 'cat')`,
          output: `if (!'dog' && 'cat')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `if ('dog' && 'cat')`,
          output: `if (!'dog' && 'cat')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `if ('dog' && 'cat')`,
          output: `if (!'dog' && 'cat')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `if ('dog' && 'cat')`,
          output: `if (!'dog' && 'cat')`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `if ("dog" && "cat")`,
          output: `if (!"dog" && "cat")`,
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
          input: `if ("dog" && "cat")`,
          output: `if (!"dog" && "cat")`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `if ("dog" && "cat")`,
          output: `if (!"dog" && "cat")`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `if ("dog" && "cat")`,
          output: `if (!"dog" && "cat")`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: `if ("dog" && "cat")`,
          output: `if (!"dog" && "cat")`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: `if ("dog" && "cat")`,
          output: `if (!"dog" && "cat")`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (`dog` && `cat`)',
          output: 'if (!`dog` && `cat`)',
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
          input: 'if (`dog` && `cat`)',
          output: 'if (!`dog` && `cat`)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (`dog` && `cat`)',
          output: 'if (!`dog` && `cat`)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (`dog` && `cat`)',
          output: 'if (!`dog` && `cat`)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'if (`dog` && `cat`)',
          output: 'if (!`dog` && `cat`)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (`dog` && `cat`)',
          output: 'if (!`dog` && `cat`)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 8),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (`dog` + `cat`)',
          output: 'if (!(`dog` + `cat`))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (`dog` + `cat`)',
          output: 'if (!(`dog` + `cat`))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (`dog` + `cat`)',
          output: 'if (!(`dog` + `cat`))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input: 'if (`dog` + `cat`)',
          output: 'if (!(`dog` + `cat`))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: 'if (`dog` + `cat`)',
          output: 'if (!(`dog` + `cat`))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 17),
      },
    },
    {
      lines: [
        {
          input: 'if (`dog` + `cat` + `fish`)',
          output: 'if (!(`dog` + `cat` + `fish`))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 26),
      },
    },
    {
      lines: [
        {
          input: 'if (`dog` + `cat` + `fish`)',
          output: 'if (!(`dog` + `cat` + `fish`))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 19),
      },
    },
    {
      lines: [
        {
          input: 'if (10)',
          output: 'if (!10)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 6),
      },
    },
    {
      lines: [
        {
          input: 'if (10)',
          output: 'if (!10)',
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
          input: 'if (10)',
          output: 'if (!10)',
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
          input: 'if (10 && 01)',
          output: 'if (!10 || !01)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input: 'if (!10 || !01)',
          output: 'if (10 && 01)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if ((!10 || !01))',
          output: 'if ((10 && 01))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 4),
        end: new vscode.Position(0, 16),
      },
    },
    {
      lines: [
        {
          input: 'if ((!10 || !01))',
          output: 'if ((10 && 01))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 15),
      },
    },
    {
      lines: [
        {
          input: 'if ((!10 || !01))',
          output: 'if ((10 && 01))',
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 14),
      },
    },
    {
      lines: [
        {
          input: 'if (10&&01)',
          output: 'if (!10||!01)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 9),
      },
    },
    {
      lines: [
        {
          input: 'if (10&&01)',
          output: 'if (10||01)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 6),
        end: new vscode.Position(0, 8),
      },
    },
    {
      lines: [
        {
          input: 'else if (dog)',
          output: 'else if (!dog)',
        },
      ],
      selection: {
        start: new vscode.Position(0, 9),
        end: new vscode.Position(0, 12),
      },
    },
    {
      lines: [
        {
          input:
            // eslint-disable-next-line max-len
            'if (dog && asdiuhaisudhiuashdiuahsdiuhasduihasiudhiausdhihas && aiushdiuahsdiuhasdiuhasiudhasuidh || ausidhuiahsduihauisdhiuashdiuhasdhuasduihuashdiuas && asdhuayshdyuagsudygasuydgasydug) {}',
          output:
            // eslint-disable-next-line max-len
            'if (dog && asdiuhaisudhiuashdiuahsdiuhasduihasiudhiausdhihas || !aiushdiuahsdiuhasdiuhasiudhasuidh && ausidhuiahsduihauisdhiuashdiuhasdhuasduihuashdiuas && asdhuayshdyuagsudygasuydgasydug) {}',
        },
      ],
      selection: {
        start: new vscode.Position(0, 62),
        end: new vscode.Position(0, 99),
      },
    },
  ]);
});
