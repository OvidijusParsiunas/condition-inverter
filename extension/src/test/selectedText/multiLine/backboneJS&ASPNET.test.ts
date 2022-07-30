const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected Backbone.js/ASP.Net Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `<input type="radio" <%=\n`,
          output: `<input type="radio" <%=`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
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
          input: `<input type="radio" <%=\n`,
          output: `<input type="radio" <%=`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
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
          input: `<input type="radio" <%=\n`,
          output: `<input type="radio" <%=`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
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
          input: `<input type="radio" <%=\n`,
          output: `<input type="radio" <%=`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
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
          input: `<input type="radio" <%=\n`,
          output: `<input type="radio" <%=`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `!dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
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
          input: `<input type="radio" <%=\n`,
          output: `<input type="radio" <%=`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
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
          input: `<input type="radio" <%=\n`,
          output: `<input type="radio" <%=`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
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
          input: `<input type="radio" <%=\n`,
          output: `<input type="radio" <%=`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 2),
        end: new vscode.Position(2, 2),
      },
    },
    {
      lines: [
        {
          input: `<input type="radio" <%if\n`,
          output: `<input type="radio" <%if`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
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
          input: `<input type="radio" <%if\n`,
          output: `<input type="radio" <%if`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
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
          input: `<input type="radio" <%if\n`,
          output: `<input type="radio" <%if`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `!dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
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
          input: `<input type="radio" <%if\n`,
          output: `<input type="radio" <%if`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `!dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 3),
        end: new vscode.Position(1, 3),
      },
    },
    {
      lines: [
        {
          input: `<input type="radio" <%if\n`,
          output: `<input type="radio" <%if`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
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
          input: `<input type="radio" <%if\n`,
          output: `<input type="radio" <%if`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
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
          input: `<input type="radio" <%if\n`,
          output: `<input type="radio" <%if`,
        },
        {
          input: `dog ? 'checked' : ''\n`,
          output: `dog ? 'checked' : ''`,
        },
        {
          input: `%> class="">`,
          output: `%> class="">`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 2),
        end: new vscode.Position(2, 2),
      },
    },
  ]);
});
