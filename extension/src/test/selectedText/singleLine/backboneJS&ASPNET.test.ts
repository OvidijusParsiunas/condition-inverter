const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected Backbone.js/ASP.Net Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `<% if price %>`,
          output: `<% if price %>`,
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
          input: `<% if price %>`,
          output: `<% if price %>`,
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
          input: `<% if price %>`,
          output: `<% if price %>`,
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
          input: `<% if price %>`,
          output: `<% if price %>`,
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
          input: `<% if price %>`,
          output: `<% if price %>`,
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
          input: `<% if price %>`,
          output: `<% if !price %>`,
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
          input: `<% if price %>`,
          output: `<% if !price %>`,
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
          input: `<% if price %>`,
          output: `<% if price %>`,
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
          input: `<% if price %>`,
          output: `<% if price %>`,
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
          input: `<% if price %>`,
          output: `<% if price %>`,
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
          input: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
          output: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
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
          input: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
          output: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
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
          input: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
          output: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
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
          input: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
          output: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
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
          input: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
          output: `<input type="radio" <%= !dog ? 'checked' : '' %> class="">`,
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
          input: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
          output: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
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
          input: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
          output: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
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
          input: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
          output: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
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
          input: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
          output: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
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
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
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
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 28),
        end: new vscode.Position(0, 28),
      },
    },
    {
      lines: [
        {
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
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
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
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
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
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
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
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
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 53),
        end: new vscode.Position(0, 53),
      },
    },
    {
      lines: [
        {
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 54),
        end: new vscode.Position(0, 54),
      },
    },
    {
      lines: [
        {
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 55),
        end: new vscode.Position(0, 55),
      },
    },
    {
      lines: [
        {
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 56),
        end: new vscode.Position(0, 56),
      },
    },
    {
      lines: [
        {
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> <%= !dog ? 'checked' : '' %>`,
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
          input: `aa <%= dog ? 'checked' : '' %> aa`,
          output: `aa <%= dog ? 'checked' : '' %> aa`,
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
          input: `aa <%= dog ? 'checked' : '' %> aa`,
          output: `aa <%= dog ? 'checked' : '' %> aa`,
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
          input: `aa <%= dog ? 'checked' : '' %> aa`,
          output: `aa <%= dog ? 'checked' : '' %> aa`,
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
          input: `aa <%= dog ? 'checked' : '' %> aa`,
          output: `aa <%= dog ? 'checked' : '' %> aa`,
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
          input: `aa <%= dog ? 'checked' : '' %> aa`,
          output: `aa <%= dog ? 'checked' : '' %> aa`,
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
          input: `aa <%= dog ? 'checked' : '' %> aa`,
          output: `aa <%= dog ? 'checked' : '' %> aa`,
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
          input: `<input type="radio" <%if(dog){print('checked');}%> >`,
          output: `<input type="radio" <%if(dog){print('checked');}%> >`,
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
          input: `<input type="radio" <%if(dog){print('checked');}%> >`,
          output: `<input type="radio" <%if(dog){print('checked');}%> >`,
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
          input: `<input type="radio" <%if(dog){print('checked');}%> >`,
          output: `<input type="radio" <%if(dog){print('checked');}%> >`,
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
          input: `<input type="radio" <%if(dog){print('checked');}%> >`,
          output: `<input type="radio" <%if(dog){print('checked');}%> >`,
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
          input: `<input type="radio" <%if(dog){print('checked');}%> >`,
          output: `<input type="radio" <%if(dog){print('checked');}%> >`,
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
          input: `<input type="radio" <%if(dog){print('checked');}%> >`,
          output: `<input type="radio" <%if(!dog){print('checked');}%> >`,
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
          input: `<input type="radio" <%if(dog){print('checked');}%> >`,
          output: `<input type="radio" <%if(!dog){print('checked');}%> >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 28),
        end: new vscode.Position(0, 28),
      },
    },
    {
      lines: [
        {
          input: `<input type="radio" <%if(dog){print('checked');}%> >`,
          output: `<input type="radio" <%if(dog){print('checked');}%> >`,
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
          input: `<input type="radio" <%if(dog){print('checked');}%> >`,
          output: `<input type="radio" <%if(dog){print('checked');}%> >`,
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
          input: `<input type="radio" <%if(dog){print('checked');}%> >`,
          output: `<input type="radio" <%if(dog){print('checked');}%> >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 49),
        end: new vscode.Position(0, 49),
      },
    },
    {
      lines: [
        {
          input: `<input type="radio" <%if(dog){print('checked');}%> >`,
          output: `<input type="radio" <%if(dog){print('checked');}%> >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 50),
        end: new vscode.Position(0, 50),
      },
    },
    {
      lines: [
        {
          input: `<input type="radio" <%if(dog){print('checked');}%> >`,
          output: `<input type="radio" <%if(dog){print('checked');}%> >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 51),
        end: new vscode.Position(0, 51),
      },
    },
    {
      lines: [
        {
          input: `<input type="radio" <%if(dog){print('checked');}%> >`,
          output: `<input type="radio" <%if(dog){print('checked');}%> >`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 52),
        end: new vscode.Position(0, 52),
      },
    },
  ]);
});
