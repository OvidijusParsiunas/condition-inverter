import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Vue Invertion Suite', () => {
  [
    {
      input: `<h1 v-if="awesome">Vue is awesome!</h1>`,
      output: `<h1 v-if="!awesome">Vue is awesome!</h1>`,
    },
    {
      input: `<h1 v-if="awesome">`,
      output: `<h1 v-if="!awesome">`,
    },
    {
      input: `h1 v-if="awesome">`,
      output: `h1 v-if="!awesome">`,
    },
    {
      input: `h1 v-if="awesome"`,
      output: `h1 v-if="!awesome"`,
    },
    {
      input: `v-if="awesome">`,
      output: `v-if="!awesome">`,
    },
    {
      input: `v-if="awesome"`,
      output: `v-if="!awesome"`,
    },
    {
      input: `v-if="awesome`,
      output: `v-if="!awesome`,
    },
    {
      input: `v-if="`,
      output: `v-if="`,
    },
    {
      input: `v-if=`,
      output: `v-if=`,
    },
    {
      input: `<div v-else-if="type === 'B'">`,
      output: `<div v-else-if="type !== 'B'">`,
    },
    {
      input: `<h1 v-show="ok">Hello!</h1>`,
      output: `<h1 v-show="!ok">Hello!</h1>`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
