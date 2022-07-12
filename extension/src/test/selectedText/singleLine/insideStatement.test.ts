const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected Inside Statement Text Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: 'if (dog) { console.log(2) }',
          output: 'if (!dog) { console.log(2) }',
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
          input: 'if (dog) { console.log(2) }',
          output: 'if (!dog) { console.log(2) }',
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
          input: 'if (dog) { console.log(2) }',
          output: 'if (!dog) { console.log(2) }',
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
          input: 'if (dog) { console.log(2) }',
          output: 'if (!dog) { console.log(2) }',
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
          input: 'if (!dog) { console.log(2) }',
          output: 'if (dog) { console.log(2) }',
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
          input: 'if (!dog) { console.log(2) }',
          output: 'if (dog) { console.log(2) }',
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
          input: 'if (!dog) { console.log(2) }',
          output: 'if (dog) { console.log(2) }',
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
          input: 'if (!dog) { console.log(2) }',
          output: 'if (dog) { console.log(2) }',
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
          input: 'else if (dog) { console.log(2) }',
          output: 'else if (!dog) { console.log(2) }',
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
          input: 'else if (dog) { console.log(2) }',
          output: 'else if (!dog) { console.log(2) }',
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
          input: 'else if (dog) { console.log(2) }',
          output: 'else if (!dog) { console.log(2) }',
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
          input: 'else if (dog) { console.log(2) }',
          output: 'else if (!dog) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog && cat || mouse) { console.log(2) }',
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
          output: 'if (!dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (!dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog || cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog || cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog || cat || mouse) { console.log(2) }',
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
          output: 'if (dog && !cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat && mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat && mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat && mouse) { console.log(2) }',
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
          input: 'if (dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || !mouse) { console.log(2) }',
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
          input: 'if (!dog && cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && !cat || mouse) { console.log(2) }',
          output: 'if (dog && cat || mouse) { console.log(2) }',
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
          input: 'if (dog && cat) { console.log(2) }',
          output: 'if (dog && !cat) { console.log(2) }',
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
          input: 'let dog &&= cat',
          output: 'let dog &&= cat',
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
          input: 'if (cat & mouse) { console.log(2) }',
          output: 'if (!(cat & mouse)) { console.log(2) }',
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
          input: 'if (cat & mouse) { console.log(2) }',
          output: 'if (!(cat & mouse)) { console.log(2) }',
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
          input: 'if (cat | mouse) { console.log(2) }',
          output: 'if (!(cat | mouse)) { console.log(2) }',
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
          input: 'if (cat | mouse) { console.log(2) }',
          output: 'if (!(cat | mouse)) { console.log(2) }',
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
          input: 'if (!(cat | mouse)) { console.log(2) }',
          output: 'if (cat | mouse) { console.log(2) }',
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
          input: 'if (!(cat | mouse)) { console.log(2) }',
          output: 'if (cat | mouse) { console.log(2) }',
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
          input: 'if (!(cat & mouse)) { console.log(2) }',
          output: 'if (cat & mouse) { console.log(2) }',
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
          input: 'if (!(cat & mouse)) { console.log(2) }',
          output: 'if (cat & mouse) { console.log(2) }',
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
          input: 'if (cat + mouse) { console.log(2) }',
          output: 'if (!(cat + mouse)) { console.log(2) }',
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
          input: 'if (cat + mouse) { console.log(2) }',
          output: 'if (!(cat + mouse)) { console.log(2) }',
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
          input: 'if (!(cat + mouse)) { console.log(2) }',
          output: 'if (cat + mouse) { console.log(2) }',
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
          input: 'if (!(cat + mouse)) { console.log(2) }',
          output: 'if (cat + mouse) { console.log(2) }',
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
          input: 'if (cat &&= mouse) { console.log(2) }',
          output: 'if (!(cat &&= mouse)) { console.log(2) }',
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
          input: 'if (cat &&= mouse) { console.log(2) }',
          output: 'if (!(cat &&= mouse)) { console.log(2) }',
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
          input: 'if (cat  &&= mouse) { console.log(2) }',
          output: 'if (!(cat  &&= mouse)) { console.log(2) }',
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
          input: 'if (cat &&= mouse) { console.log(2) }',
          output: 'if (!(cat &&= mouse)) { console.log(2) }',
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
          input: 'if (cat &&= mouse) { console.log(2) }',
          output: 'if (!(cat &&= mouse)) { console.log(2) }',
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
          input: 'if (cat &&= mouse) { console.log(2) }',
          output: 'if (!(cat &&= mouse)) { console.log(2) }',
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
          input: 'if (cat &&= mouse) { console.log(2) }',
          output: 'if (!(cat &&= mouse)) { console.log(2) }',
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
          input: 'if (cat === mouse) { console.log(2) }',
          output: 'if (cat !== mouse) { console.log(2) }',
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
          input: 'if (cat === mouse) { console.log(2) }',
          output: 'if (cat !== mouse) { console.log(2) }',
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
          input: 'if (cat === mouse) { console.log(2) }',
          output: 'if (cat !== mouse) { console.log(2) }',
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
          input: 'if (cat === mouse) { console.log(2) }',
          output: 'if (cat !== mouse) { console.log(2) }',
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
          input: 'if (cat !== mouse) { console.log(2) }',
          output: 'if (cat === mouse) { console.log(2) }',
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
          input: 'if (cat !== mouse) { console.log(2) }',
          output: 'if (cat === mouse) { console.log(2) }',
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
          input: 'if (cat !== mouse) { console.log(2) }',
          output: 'if (cat === mouse) { console.log(2) }',
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
          input: 'if (cat !== mouse) { console.log(2) }',
          output: 'if (cat === mouse) { console.log(2) }',
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
          input: 'if (cat <= mouse) { console.log(2) }',
          output: 'if (!cat <= mouse) { console.log(2) }',
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
          input: 'if (cat <= mouse) { console.log(2) }',
          output: 'if (cat > mouse) { console.log(2) }',
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
          input: 'if (cat <= mouse) { console.log(2) }',
          output: 'if (cat > mouse) { console.log(2) }',
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
          input: 'if (cat <= mouse) { console.log(2) }',
          output: 'if (cat > mouse) { console.log(2) }',
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
          input: 'if (cat <= mouse) { console.log(2) }',
          output: 'if (cat <= !mouse) { console.log(2) }',
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
          input: 'if (cat >= mouse) { console.log(2) }',
          output: 'if (cat < mouse) { console.log(2) }',
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
          input: 'if (cat >= mouse) { console.log(2) }',
          output: 'if (cat < mouse) { console.log(2) }',
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
          input: 'if (cat >= mouse) { console.log(2) }',
          output: 'if (cat < mouse) { console.log(2) }',
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
          input: 'if (cat < mouse) { console.log(2) }',
          output: 'if (cat >= mouse) { console.log(2) }',
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
          input: 'if (cat < mouse) { console.log(2) }',
          output: 'if (cat >= mouse) { console.log(2) }',
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
          input: 'if (cat > mouse) { console.log(2) }',
          output: 'if (cat <= mouse) { console.log(2) }',
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
          input: 'if (cat > mouse) { console.log(2) }',
          output: 'if (cat <= mouse) { console.log(2) }',
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
          input: 'if (cat << mouse) { console.log(2) }',
          output: 'if (!(cat << mouse)) { console.log(2) }',
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
          input: 'if (cat << mouse) { console.log(2) }',
          output: 'if (!(cat << mouse)) { console.log(2) }',
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
          input: 'if (cat << mouse) { console.log(2) }',
          output: 'if (!(cat << mouse)) { console.log(2) }',
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
          input: 'if (cat >> mouse) { console.log(2) }',
          output: 'if (!(cat >> mouse)) { console.log(2) }',
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
          input: 'if (cat >> mouse) { console.log(2) }',
          output: 'if (!(cat >> mouse)) { console.log(2) }',
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
          input: 'if (cat >> mouse) { console.log(2) }',
          output: 'if (!(cat >> mouse)) { console.log(2) }',
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
          input: 'if (cat >>> mouse) { console.log(2) }',
          output: 'if (!(cat >>> mouse)) { console.log(2) }',
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
          input: 'if (cat >>> mouse) { console.log(2) }',
          output: 'if (!(cat >>> mouse)) { console.log(2) }',
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
          input: 'if (cat >>> mouse) { console.log(2) }',
          output: 'if (!(cat >>> mouse)) { console.log(2) }',
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
          input: 'if (cat >>> mouse) { console.log(2) }',
          output: 'if (!(cat >>> mouse)) { console.log(2) }',
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
          input: 'if (cat >>>= mouse) { console.log(2) }',
          output: 'if (!(cat >>>= mouse)) { console.log(2) }',
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
          input: 'if (cat >>>= mouse) { console.log(2) }',
          output: 'if (!(cat >>>= mouse)) { console.log(2) }',
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
          input: 'if (cat >>>= mouse) { console.log(2) }',
          output: 'if (!(cat >>>= mouse)) { console.log(2) }',
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
          input: 'if (cat >>>= mouse) { console.log(2) }',
          output: 'if (!(cat >>>= mouse)) { console.log(2) }',
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
          input: 'if (cat >>>= mouse) { console.log(2) }',
          output: 'if (!(cat >>>= mouse)) { console.log(2) }',
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
          input: 'if (!(cat >>>= mouse)) { console.log(2) }',
          output: 'if (cat >>>= mouse) { console.log(2) }',
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
          input: 'dog >>>= cat ? cat : fish',
          output: '!(dog >>>= cat) ? cat : fish',
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
          input: 'dog >>>= cat ? cat : fish',
          output: '!(dog >>>= cat) ? cat : fish',
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
          input: 'dog >>>= cat ? cat : fish',
          output: '!(dog >>>= cat) ? cat : fish',
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
          input: 'dog >>>= cat ? cat : fish',
          output: '!(dog >>>= cat) ? cat : fish',
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
          input: 'dog >>>= cat ? cat : fish',
          output: '!(dog >>>= cat) ? cat : fish',
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
          input: 'dog >>>= cat ? cat : fish',
          output: '!(dog >>>= cat) ? cat : fish',
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
          input: 'dog >>>= cat ? cat : fish',
          output: '!(dog >>>= cat) ? cat : fish',
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
          input: 'dog >>>= cat ? cat : fish',
          output: '!(dog >>>= cat) ? cat : fish',
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
          input: 'dog >>>= cat ? cat : fish',
          output: '!(dog >>>= cat) ? cat : fish',
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
          input: '!(dog >>>= cat) ? cat : fish',
          output: 'dog >>>= cat ? cat : fish',
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
          input: '!(dog >>>= cat) ? cat : fish',
          output: 'dog >>>= cat ? cat : fish',
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
          input: '!(dog >>>= cat) ? cat : fish',
          output: 'dog >>>= cat ? cat : fish',
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
          input: '!(dog >>>= cat) ? cat : fish',
          output: '!(dog >>>= cat) ? cat : fish',
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
          input: 'if (dog ? cat : fish) { console.log(2) }',
          output: 'if (!dog ? cat : fish) { console.log(2) }',
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
          input: 'dog ? cat : fish',
          output: '!dog ? cat : fish',
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
          input: 'dog ? cat : fish',
          output: '!dog ? cat : fish',
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
          input: 'dog  ? cat : fish',
          output: '!dog  ? cat : fish',
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
          input: 'dog ? cat : fish',
          output: 'dog ? cat : fish',
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
          input: '!dog ? cat : fish',
          output: 'dog ? cat : fish',
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
          input: '(dog) ? cat : fish',
          output: '!(dog) ? cat : fish',
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
          input: '!(dog) ? cat : fish',
          output: 'dog ? cat : fish',
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
          input: '!(dog) ? cat : fish',
          output: 'dog ? cat : fish',
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
          input: 'if (cat && (dog))',
          output: 'if (cat || (dog))',
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
          input: 'if (cat && (dog))',
          output: 'if (cat && !(dog))',
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
          input: 'if (cat && (dog))',
          output: 'if (cat && !(dog))',
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
          input: 'if (cat && (dog))',
          output: 'if (cat && !(dog))',
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
          input: 'if (cat && (dog))',
          output: 'if (cat && !(dog))',
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
          input: 'if ((dog))',
          output: 'if ((!dog))',
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
          input: 'if (((dog)))',
          output: 'if (((!dog)))',
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
          input: 'if (((dog)))',
          output: 'if (((!dog)))',
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
          input: 'if (((dog)))',
          output: 'if (((!dog)))',
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
          input: 'if (((dog)))',
          output: 'if (((!dog)))',
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
          input: 'if (((dog)))',
          output: 'if (((!dog)))',
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
          input: 'if (  dog  )',
          output: 'if (  !dog  )',
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
          input: 'if (  (dog)  )',
          output: 'if (  (!dog)  )',
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
          input: 'if (  ((dog))  )',
          output: 'if (  ((!dog))  )',
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
          input: 'if (  ((dog))  )',
          output: 'if (  ((!dog))  )',
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
          input: `if ('dog' && 'cat')`,
          output: `if (!'dog' && 'cat')`,
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
          input: `if ('dog' && 'cat')`,
          output: `if (!'dog' && 'cat')`,
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
          input: `if ('dog' && 'cat')`,
          output: `if (!'dog' && 'cat')`,
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
          input: `if ('dog' && 'cat')`,
          output: `if (!'dog' && 'cat')`,
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
          input: `if ('dog' && 'cat')`,
          output: `if ('dog' && !'cat')`,
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
          input: `if ('dog' && 'cat')`,
          output: `if ('dog' && !'cat')`,
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
          input: `if ('dog' && 'cat')`,
          output: `if ('dog' && !'cat')`,
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
          input: `if ('dog' && 'cat')`,
          output: `if ('dog' && !'cat')`,
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
          input: `if ("dog" && "cat")`,
          output: `if (!"dog" && "cat")`,
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
          input: `if ("dog" && "cat")`,
          output: `if (!"dog" && "cat")`,
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
          input: `if ("dog" && "cat")`,
          output: `if (!"dog" && "cat")`,
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
          input: `if ("dog" && "cat")`,
          output: `if (!"dog" && "cat")`,
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
          input: `if ("dog" && "cat")`,
          output: `if ("dog" && !"cat")`,
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
          input: `if ("dog" && "cat")`,
          output: `if ("dog" && !"cat")`,
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
          input: `if ("dog" && "cat")`,
          output: `if ("dog" && !"cat")`,
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
          input: `if ("dog" && "cat")`,
          output: `if ("dog" && !"cat")`,
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
          input: 'if (`dog` && `cat`)',
          output: 'if (!`dog` && `cat`)',
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
          input: 'if (`dog` && `cat`)',
          output: 'if (!`dog` && `cat`)',
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
          input: 'if (`dog` && `cat`)',
          output: 'if (!`dog` && `cat`)',
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
          input: 'if (`dog` && `cat`)',
          output: 'if (!`dog` && `cat`)',
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
          input: 'if (`dog` && `cat`)',
          output: 'if (`dog` && !`cat`)',
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
          input: 'if (`dog` && `cat`)',
          output: 'if (`dog` && !`cat`)',
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
          input: 'if (`dog` && `cat`)',
          output: 'if (`dog` && !`cat`)',
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
          input: 'if (`dog` && `cat`)',
          output: 'if (`dog` && !`cat`)',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; !i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; !i < 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i >= 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i >= 2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < !2; i += 1) {}',
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
          input: 'for (let i = 0; i < 2; i += 1) {}',
          output: 'for (let i = 0; i < !2; i += 1) {}',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
          output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
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
          input: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
          output: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
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
          input: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
          output: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
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
          input: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
          output: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
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
          input: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
          output: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
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
          input: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
          output: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
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
          input: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
          output: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
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
          input: 'if (`${dog}`)',
          output: 'if (!`${dog}`)',
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
          input: 'if (`${dog}`)',
          output: 'if (!`${dog}`)',
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
          input: 'if (`${dog}`)',
          output: 'if (!`${dog}`)',
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
          input: 'if (`${dog}`)',
          output: 'if (!`${dog}`)',
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
          input: 'if (`${dog}`)',
          output: 'if (!`${dog}`)',
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
          input: 'if (`${dog}`)',
          output: 'if (!`${dog}`)',
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
          input: 'if (`${dog}`)',
          output: 'if (!`${dog}`)',
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
          input: 'if (`${dog}`)',
          output: 'if (!`${dog}`)',
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
          input: 'if (`${dog}`)',
          output: 'if (!`${dog}`)',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
          output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
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
          input: `if (dog&&fish) { console.log('dog') }`,
          output: `if (!dog||fish) { console.log('dog') }`,
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
          input: `if (dog&&fish) { console.log('dog') }`,
          output: `if (dog||fish) { console.log('dog') }`,
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
          input: `if (dog&&fish) { console.log('dog') }`,
          output: `if (dog||!fish) { console.log('dog') }`,
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
          input: `if (dog||fish) { console.log('dog') }`,
          output: `if (!dog&&fish) { console.log('dog') }`,
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
          input: `if (dog||fish) { console.log('dog') }`,
          output: `if (dog&&fish) { console.log('dog') }`,
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
          input: `if (dog||fish) { console.log('dog') }`,
          output: `if (dog&&!fish) { console.log('dog') }`,
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
          input: `if (dog<fish) { console.log('dog') }`,
          output: `if (dog>=fish) { console.log('dog') }`,
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
          input: `if (dog<fish) { console.log('dog') }`,
          output: `if (dog>=fish) { console.log('dog') }`,
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
          input: `if (dog<<fish) { console.log('dog') }`,
          output: `if (!(dog<<fish)) { console.log('dog') }`,
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
          input: `if (dog<<fish) { console.log('dog') }`,
          output: `if (!(dog<<fish)) { console.log('dog') }`,
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
          input: `if (dog<<fish) { console.log('dog') }`,
          output: `if (!(dog<<fish)) { console.log('dog') }`,
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
          input: `if (dog===fish) { console.log('dog') }`,
          output: `if (dog!==fish) { console.log('dog') }`,
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
          input: `if (dog===fish) { console.log('dog') }`,
          output: `if (dog!==fish) { console.log('dog') }`,
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
          input: `if (dog===fish) { console.log('dog') }`,
          output: `if (dog!==fish) { console.log('dog') }`,
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
          input: `if (dog===fish) { console.log('dog') }`,
          output: `if (dog!==fish) { console.log('dog') }`,
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
          input: `if (dog!==fish) { console.log('dog') }`,
          output: `if (dog===fish) { console.log('dog') }`,
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
          input: `if (dog!==fish) { console.log('dog') }`,
          output: `if (dog===fish) { console.log('dog') }`,
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
          input: `if (dog!==fish) { console.log('dog') }`,
          output: `if (dog===fish) { console.log('dog') }`,
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
          input: `if (dog!==fish) { console.log('dog') }`,
          output: `if (dog===fish) { console.log('dog') }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 10),
      },
    },
  ]);
});
