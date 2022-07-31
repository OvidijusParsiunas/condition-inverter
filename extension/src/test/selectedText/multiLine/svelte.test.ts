const mocha = require('../../../../node_modules/mocha/lib/mocha.js');
import { TestUtil } from '../../shared/functionality/testUtil';
import { TextEditorObj } from '../../shared/types/tests';
import * as vscode from 'vscode';

suite('Selected Svelte Statement Suite', () => {
  const textEditorObj: TextEditorObj = { textEditor: null };

  mocha.before(() => TestUtil.createTextDocument(textEditorObj));

  mocha.beforeEach(() => TestUtil.removeTextFromEditor(textEditorObj));

  mocha.after(() => TestUtil.executCloseEditorCommand());

  TestUtil.runInversionTests(textEditorObj, 'Multi Line', [
    {
      lines: [
        {
          input: `{# if this.thingIsTrue}\n`,
          output: `{# if this.thingIsTrue}`,
        },
        {
          input: `Content for the block form\n`,
          output: `Content for the block form`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
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
          input: `{# if this.thingIsTrue}\n`,
          output: `{# if this.thingIsTrue}`,
        },
        {
          input: `Block content\n`,
          output: `Block content`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
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
          input: `{# if this.thingIsTrue}\n`,
          output: `{# if this.thingIsTrue}`,
        },
        {
          input: `Block content\n`,
          output: `Block content`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 13),
        end: new vscode.Position(1, 13),
      },
    },
    {
      lines: [
        {
          input: `{# if this.thingIsTrue}\n`,
          output: `{# if this.thingIsTrue}`,
        },
        {
          input: `Block content\n`,
          output: `Block content`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
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
          input: `{#if 'READY' === status}<h1>Hello World!\n`,
          output: `{#if 'READY' === status}<h1>Hello World!`,
        },
        {
          input: `{:else if dog}<h1>Loading...</h1>\n`,
          output: `{:else if dog}<h1>Loading...</h1>`,
        },
        {
          input: `{:else}<h1>Initiating</h1>\n`,
          output: `{:else}<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
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
          input: `{#if 'READY' === status}<h1>Hello World!\n`,
          output: `{#if 'READY' === status}<h1>Hello World!`,
        },
        {
          input: `{:else if dog}<h1>Loading...</h1>\n`,
          output: `{:else if dog}<h1>Loading...</h1>`,
        },
        {
          input: `{:else}<h1>Initiating</h1>\n`,
          output: `{:else}<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
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
          input: `{#if 'READY' === status}<h1>Hello World!\n`,
          output: `{#if 'READY' === status}<h1>Hello World!`,
        },
        {
          input: `{:else if dog}<h1>Loading...</h1>\n`,
          output: `{:else if dog}<h1>Loading...</h1>`,
        },
        {
          input: `{:else}<h1>Initiating</h1>\n`,
          output: `{:else}<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 33),
        end: new vscode.Position(1, 33),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}<h1>Hello World!\n`,
          output: `{#if 'READY' === status}<h1>Hello World!`,
        },
        {
          input: `{:else if dog}<h1>Loading...</h1>\n`,
          output: `{:else if dog}<h1>Loading...</h1>`,
        },
        {
          input: `{:else}<h1>Initiating</h1>\n`,
          output: `{:else}<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
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
          input: `{#if 'READY' === status}<h1>Hello World!\n`,
          output: `{#if 'READY' === status}<h1>Hello World!`,
        },
        {
          input: `{:else if dog}<h1>Loading...</h1>\n`,
          output: `{:else if dog}<h1>Loading...</h1>`,
        },
        {
          input: `{:else}<h1>Initiating</h1>\n`,
          output: `{:else}<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 26),
        end: new vscode.Position(2, 26),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}<h1>Hello World!\n`,
          output: `{#if 'READY' === status}<h1>Hello World!`,
        },
        {
          input: `{:else if dog}<h1>Loading...</h1>\n`,
          output: `{:else if dog}<h1>Loading...</h1>`,
        },
        {
          input: `{:else}<h1>Initiating</h1>\n`,
          output: `{:else}<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(3, 0),
        end: new vscode.Position(3, 0),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}\n`,
          output: `{#if 'READY' === status}`,
        },
        {
          input: `<h1>Hello World!\n`,
          output: `<h1>Hello World!`,
        },
        {
          input: `{:else if dog}\n`,
          output: `{:else if dog}`,
        },
        {
          input: `<h1>Loading...</h1>\n`,
          output: `<h1>Loading...</h1>`,
        },
        {
          input: `{:else}\n`,
          output: `{:else}`,
        },
        {
          input: `<h1>Initiating</h1>\n`,
          output: `<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
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
          input: `{#if 'READY' === status}\n`,
          output: `{#if 'READY' === status}`,
        },
        {
          input: `<h1>Hello World!\n`,
          output: `<h1>Hello World!`,
        },
        {
          input: `{:else if dog}\n`,
          output: `{:else if dog}`,
        },
        {
          input: `<h1>Loading...</h1>\n`,
          output: `<h1>Loading...</h1>`,
        },
        {
          input: `{:else}\n`,
          output: `{:else}`,
        },
        {
          input: `<h1>Initiating</h1>\n`,
          output: `<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
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
          input: `{#if 'READY' === status}\n`,
          output: `{#if 'READY' === status}`,
        },
        {
          input: `<h1>Hello World!\n`,
          output: `<h1>Hello World!`,
        },
        {
          input: `{:else if dog}\n`,
          output: `{:else if dog}`,
        },
        {
          input: `<h1>Loading...</h1>\n`,
          output: `<h1>Loading...</h1>`,
        },
        {
          input: `{:else}\n`,
          output: `{:else}`,
        },
        {
          input: `<h1>Initiating</h1>\n`,
          output: `<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(1, 16),
        end: new vscode.Position(1, 16),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}\n`,
          output: `{#if 'READY' === status}`,
        },
        {
          input: `<h1>Hello World!\n`,
          output: `<h1>Hello World!`,
        },
        {
          input: `{:else if dog}\n`,
          output: `{:else if dog}`,
        },
        {
          input: `<h1>Loading...</h1>\n`,
          output: `<h1>Loading...</h1>`,
        },
        {
          input: `{:else}\n`,
          output: `{:else}`,
        },
        {
          input: `<h1>Initiating</h1>\n`,
          output: `<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
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
          input: `{#if 'READY' === status}\n`,
          output: `{#if 'READY' === status}`,
        },
        {
          input: `<h1>Hello World!\n`,
          output: `<h1>Hello World!`,
        },
        {
          input: `{:else if dog}\n`,
          output: `{:else if dog}`,
        },
        {
          input: `<h1>Loading...</h1>\n`,
          output: `<h1>Loading...</h1>`,
        },
        {
          input: `{:else}\n`,
          output: `{:else}`,
        },
        {
          input: `<h1>Initiating</h1>\n`,
          output: `<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(2, 14),
        end: new vscode.Position(2, 14),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}\n`,
          output: `{#if 'READY' === status}`,
        },
        {
          input: `<h1>Hello World!\n`,
          output: `<h1>Hello World!`,
        },
        {
          input: `{:else if dog}\n`,
          output: `{:else if dog}`,
        },
        {
          input: `<h1>Loading...</h1>\n`,
          output: `<h1>Loading...</h1>`,
        },
        {
          input: `{:else}\n`,
          output: `{:else}`,
        },
        {
          input: `<h1>Initiating</h1>\n`,
          output: `<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(3, 0),
        end: new vscode.Position(3, 0),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}\n`,
          output: `{#if 'READY' === status}`,
        },
        {
          input: `<h1>Hello World!\n`,
          output: `<h1>Hello World!`,
        },
        {
          input: `{:else if dog}\n`,
          output: `{:else if dog}`,
        },
        {
          input: `<h1>Loading...</h1>\n`,
          output: `<h1>Loading...</h1>`,
        },
        {
          input: `{:else}\n`,
          output: `{:else}`,
        },
        {
          input: `<h1>Initiating</h1>\n`,
          output: `<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(3, 19),
        end: new vscode.Position(3, 19),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}\n`,
          output: `{#if 'READY' === status}`,
        },
        {
          input: `<h1>Hello World!\n`,
          output: `<h1>Hello World!`,
        },
        {
          input: `{:else if dog}\n`,
          output: `{:else if dog}`,
        },
        {
          input: `<h1>Loading...</h1>\n`,
          output: `<h1>Loading...</h1>`,
        },
        {
          input: `{:else}\n`,
          output: `{:else}`,
        },
        {
          input: `<h1>Initiating</h1>\n`,
          output: `<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(4, 0),
        end: new vscode.Position(4, 0),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}\n`,
          output: `{#if 'READY' === status}`,
        },
        {
          input: `<h1>Hello World!\n`,
          output: `<h1>Hello World!`,
        },
        {
          input: `{:else if dog}\n`,
          output: `{:else if dog}`,
        },
        {
          input: `<h1>Loading...</h1>\n`,
          output: `<h1>Loading...</h1>`,
        },
        {
          input: `{:else}\n`,
          output: `{:else}`,
        },
        {
          input: `<h1>Initiating</h1>\n`,
          output: `<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(4, 7),
        end: new vscode.Position(4, 7),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}\n`,
          output: `{#if 'READY' === status}`,
        },
        {
          input: `<h1>Hello World!\n`,
          output: `<h1>Hello World!`,
        },
        {
          input: `{:else if dog}\n`,
          output: `{:else if dog}`,
        },
        {
          input: `<h1>Loading...</h1>\n`,
          output: `<h1>Loading...</h1>`,
        },
        {
          input: `{:else}\n`,
          output: `{:else}`,
        },
        {
          input: `<h1>Initiating</h1>\n`,
          output: `<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
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
          input: `{#if 'READY' === status}\n`,
          output: `{#if 'READY' === status}`,
        },
        {
          input: `<h1>Hello World!\n`,
          output: `<h1>Hello World!`,
        },
        {
          input: `{:else if dog}\n`,
          output: `{:else if dog}`,
        },
        {
          input: `<h1>Loading...</h1>\n`,
          output: `<h1>Loading...</h1>`,
        },
        {
          input: `{:else}\n`,
          output: `{:else}`,
        },
        {
          input: `<h1>Initiating</h1>\n`,
          output: `<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(5, 19),
        end: new vscode.Position(5, 19),
      },
    },
    {
      lines: [
        {
          input: `{#if 'READY' === status}\n`,
          output: `{#if 'READY' === status}`,
        },
        {
          input: `<h1>Hello World!\n`,
          output: `<h1>Hello World!`,
        },
        {
          input: `{:else if dog}\n`,
          output: `{:else if dog}`,
        },
        {
          input: `<h1>Loading...</h1>\n`,
          output: `<h1>Loading...</h1>`,
        },
        {
          input: `{:else}\n`,
          output: `{:else}`,
        },
        {
          input: `<h1>Initiating</h1>\n`,
          output: `<h1>Initiating</h1>`,
        },
        {
          input: `{/if}`,
          output: `{/if}`,
        },
      ],
      selection: {
        start: new vscode.Position(6, 0),
        end: new vscode.Position(6, 0),
      },
    },
  ]);
});
