const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Highlighted Svelte Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Single Line', [
    {
      lines: [
        {
          input: `{# if dog }`,
          output: `{# if !dog }`,
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
          input: `{# if dog }`,
          output: `{# if !dog }`,
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
          input: `{# if dog }`,
          output: `{# if !dog }`,
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
          input: `{# if dog }`,
          output: `{# if !dog }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `{# if dog }`,
          output: `{# if !dog }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 11),
      },
    },
    {
      lines: [
        {
          input: `{# if dog }`,
          output: `{# if !dog }`,
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
          input: `{# if dog }`,
          output: `{# if !dog }`,
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
          input: `{# if dog }`,
          output: `{# if dog }`,
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
          input: `{# if dog }`,
          output: `{# if dog }`,
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
          input: `{# if dog }`,
          output: `{# if dog }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 5),
      },
    },
    {
      lines: [
        {
          input: `{# if dog }`,
          output: `{# if dog }`,
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
          input: `{# if dog }`,
          output: `{# if dog }`,
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
          input: `{# if dog }`,
          output: `{# if !dog }`,
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
          input: `{# if dog }{# if dog }{# if dog }`,
          output: `{# if dog }{# if !dog }{# if dog }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 17),
        end: new vscode.Position(0, 20),
      },
    },
    {
      lines: [
        {
          input: `{# if dog }{# if dog }{# if dog }`,
          output: `{# if dog }{# if !dog }{# if dog }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 21),
      },
    },
    {
      lines: [
        {
          input: `{# if dog }{# if dog }{# if dog }`,
          output: `{# if dog }{# if !dog }{# if dog }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 11),
        end: new vscode.Position(0, 22),
      },
    },
    {
      lines: [
        {
          input: `{# if dog } {# if dog } {# if dog }`,
          output: `{# if dog } {# if !dog } {# if dog }`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 12),
        end: new vscode.Position(0, 23),
      },
    },
    {
      lines: [
        {
          input: `{:else if shape == 'circle'}`,
          output: `{:else if shape != 'circle'}`,
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
          input: `{:else if shape == 'circle'}`,
          output: `{:else if shape != 'circle'}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 1),
        end: new vscode.Position(0, 27),
      },
    },
    {
      lines: [
        {
          input: `{:else if shape == 'circle'}`,
          output: `{:else if shape != 'circle'}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 2),
        end: new vscode.Position(0, 27),
      },
    },
    {
      lines: [
        {
          input: `{:else if shape == 'circle'}`,
          output: `{:else if shape != 'circle'}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 7),
        end: new vscode.Position(0, 28),
      },
    },
    {
      lines: [
        {
          input: `{:else if shape == 'circle'}`,
          output: `{:else if shape != 'circle'}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 10),
        end: new vscode.Position(0, 28),
      },
    },
    {
      lines: [
        {
          input: `{:else if dog}`,
          output: `{:else if !dog}`,
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
          input: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
          output: `{#if 'READY' !== status}<h1>Hello World!</h1>{:else if !dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 109),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
          output: `{#if 'READY' !== status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
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
          input: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
          output: `{#if 'READY' !== status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 0),
        end: new vscode.Position(0, 45),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
          output: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if !dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 59),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
          output: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if !dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 45),
        end: new vscode.Position(0, 78),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
          output: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 78),
        end: new vscode.Position(0, 85),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
          output: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 78),
        end: new vscode.Position(0, 104),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
          output: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 78),
        end: new vscode.Position(0, 109),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
          output: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(0, 104),
        end: new vscode.Position(0, 109),
      },
    },
  ]);
});
