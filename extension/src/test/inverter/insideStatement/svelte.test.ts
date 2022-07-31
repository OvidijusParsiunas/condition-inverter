import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Svelte Invertion Suite', () => {
  [
    {
      input: `{#if dog}`,
      output: `{#if !dog}`,
    },
    {
      input: `{# if dog }`,
      output: `{# if !dog }`,
    },
    {
      input: `{ # if dog }`,
      output: `{ # if !dog }`,
    },
    {
      input: `# if dog }`,
      output: `# if !dog }`,
    },
    {
      input: `# if dog`,
      output: `# if !dog`,
    },
    {
      input: `{#if x > 10}`,
      output: `{#if x <= 10}`,
    },
    {
      input: `{:else if shape == 'circle'}`,
      output: `{:else if shape != 'circle'}`,
    },
    {
      input: `:else if shape == 'circle'}`,
      output: `:else if shape != 'circle'}`,
    },
    {
      input: `else if shape == 'circle'}`,
      output: `else if shape != 'circle'}`,
    },
    {
      input: `if shape == 'circle'}`,
      output: `if shape != 'circle'}`,
    },
    {
      input: `{#if 'READY' === status}<h1>Hello World!</h1>{:`,
      output: `{#if 'READY' !== status}<h1>Hello World!</h1>{:`,
    },
    {
      input: `{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
      output: `{:else if !dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
    },
    {
      input: `{#if 'READY' === status}<h1>Hello World!</h1>{:else if dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
      output: `{#if 'READY' !== status}<h1>Hello World!</h1>{:else if !dog}<h1>Loading...</h1>{:else}<h1>Initiating</h1>{/if}`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
