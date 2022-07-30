const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Backbone.js/ASP.Net Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `<% if price %>`,
          output: `<% if !price %>`,
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
          input: `<% if price %>`,
          output: `<% if !price %>`,
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
          input: `<% if price %>`,
          output: `<% if !price %>`,
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
          input: `<% if price %>`,
          output: `<% if price %>`,
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
          input: `<% if price %>`,
          output: `<% if price %>`,
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
          input: `<% if price %>`,
          output: `<% if price %>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
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
        start: new vscode.Position(0, 0),
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
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 1),
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
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 14),
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
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 14),
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
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 14),
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
        start: new vscode.Position(0, 5),
        end: new vscode.Position(0, 14),
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
        end: new vscode.Position(0, 14),
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
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 14),
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
        end: new vscode.Position(0, 14),
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
        end: new vscode.Position(0, 14),
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
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 13),
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
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 12),
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
        start: new vscode.Position(0, 3),
        end: new vscode.Position(0, 11),
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
        end: new vscode.Position(0, 11),
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
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 57),
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
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 47),
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
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 47),
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
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 46),
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
        start: new vscode.Position(0, 22),
        end: new vscode.Position(0, 45),
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
        start: new vscode.Position(0, 23),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: `<input <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> class="">`,
          output: `<input <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> class="">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 35),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: `<input <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> class="">`,
          output: `<input <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> class="">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 35),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: `<input <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> class="">`,
          output: `<input <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> class="">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 35),
        end: new vscode.Position(0, 36),
      },
    },
    {
      lines: [
        {
          input: `<input <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> class="">`,
          output: `<input <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> class="">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 36),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: `<input <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> class="">`,
          output: `<input <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> class="">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 36),
        end: new vscode.Position(0, 37),
      },
    },
    {
      lines: [
        {
          input: `<input <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> class="">`,
          output: `<input <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %> class="">`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 37),
        end: new vscode.Position(0, 38),
      },
    },
    {
      lines: [
        {
          input: `<input type="radio" <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<input type="radio" <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
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
          input: `<input type="radio" <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<input type="radio" <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
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
          input: `<input type="radio" <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<input type="radio" <%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 46),
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
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 57),
      },
    },
    {
      lines: [
        {
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 27),
        end: new vscode.Position(0, 28),
      },
    },
    {
      lines: [
        {
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 26),
        end: new vscode.Position(0, 29),
      },
    },
    {
      lines: [
        {
          input: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
          output: `<%= dog ? 'checked' : '' %> <%= dog ? 'checked' : '' %>`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 25),
        end: new vscode.Position(0, 30),
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
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 52),
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
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 51),
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
        start: new vscode.Position(0, 20),
        end: new vscode.Position(0, 50),
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
        start: new vscode.Position(0, 21),
        end: new vscode.Position(0, 49),
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
        start: new vscode.Position(0, 22),
        end: new vscode.Position(0, 48),
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
        start: new vscode.Position(0, 24),
        end: new vscode.Position(0, 48),
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
        start: new vscode.Position(0, 24),
        end: new vscode.Position(0, 47),
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
        start: new vscode.Position(0, 24),
        end: new vscode.Position(0, 29),
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
        start: new vscode.Position(0, 20),
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
        start: new vscode.Position(0, 48),
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
        start: new vscode.Position(0, 48),
        end: new vscode.Position(0, 52),
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
        end: new vscode.Position(0, 52),
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
        end: new vscode.Position(0, 52),
      },
    },
  ]);
});
