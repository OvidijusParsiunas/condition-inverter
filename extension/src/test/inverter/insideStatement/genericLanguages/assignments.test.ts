import { Inverter } from '../shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Assignments Inversion Suite', () => {
  [
    {
      input: 'if (dog %= cat) { console.log(2) }',
      output: 'if (!(dog %= cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog %= cat)) { console.log(2) }',
      output: 'if (dog %= cat) { console.log(2) }',
    },
    {
      input: 'if (dog += cat) { console.log(2) }',
      output: 'if (!(dog += cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog += cat)) { console.log(2) }',
      output: 'if (dog += cat) { console.log(2) }',
    },
    {
      input: 'if (dog -= cat) { console.log(2) }',
      output: 'if (!(dog -= cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog -= cat)) { console.log(2) }',
      output: 'if (dog -= cat) { console.log(2) }',
    },
    {
      input: 'if (dog *= cat) { console.log(2) }',
      output: 'if (!(dog *= cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog *= cat)) { console.log(2) }',
      output: 'if (dog *= cat) { console.log(2) }',
    },
    {
      input: 'if (dog /= cat) { console.log(2) }',
      output: 'if (!(dog /= cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog /= cat)) { console.log(2) }',
      output: 'if (dog /= cat) { console.log(2) }',
    },
    {
      input: 'if (dog /= cat + fish) { console.log(2) }',
      output: 'if (!(dog /= cat + fish)) { console.log(2) }',
    },
    {
      input: 'if (!(dog /= cat + fish)) { console.log(2) }',
      output: 'if (dog /= cat + fish) { console.log(2) }',
    },
    {
      input: 'if (dog <<= fish) { console.log(2) }',
      output: 'if (!(dog <<= fish)) { console.log(2) }',
    },
    {
      input: 'if (!(dog <<= fish)) { console.log(2) }',
      output: 'if (dog <<= fish) { console.log(2) }',
    },
    {
      input: 'if (dog >>= fish) { console.log(2) }',
      output: 'if (!(dog >>= fish)) { console.log(2) }',
    },
    {
      input: 'if (!(dog >>= fish)) { console.log(2) }',
      output: 'if (dog >>= fish) { console.log(2) }',
    },
    {
      input: 'if (dog >>>= fish) { console.log(2) }',
      output: 'if (!(dog >>>= fish)) { console.log(2) }',
    },
    {
      input: 'if (!(dog >>>= fish)) { console.log(2) }',
      output: 'if (dog >>>= fish) { console.log(2) }',
    },
    {
      input: 'if (dog &= cat) { console.log(2) }',
      output: 'if (!(dog &= cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog &= cat)) { console.log(2) }',
      output: 'if (dog &= cat) { console.log(2) }',
    },
    {
      input: 'if (dog &&= cat) { console.log(2) }',
      output: 'if (!(dog &&= cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog &&= cat)) { console.log(2) }',
      output: 'if (dog &&= cat) { console.log(2) }',
    },
    {
      input: 'if (dog |= cat) { console.log(2) }',
      output: 'if (!(dog |= cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog |= cat)) { console.log(2) }',
      output: 'if (dog |= cat) { console.log(2) }',
    },
    {
      input: 'if (dog ||= cat) { console.log(2) }',
      output: 'if (!(dog ||= cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog ||= cat)) { console.log(2) }',
      output: 'if (dog ||= cat) { console.log(2) }',
    },
    {
      input: 'if (dog ^= fish) { console.log(2) }',
      output: 'if (!(dog ^= fish)) { console.log(2) }',
    },
    {
      input: 'if (!(dog ^= fish)) { console.log(2) }',
      output: 'if (dog ^= fish) { console.log(2) }',
    },
    {
      input: 'if (dog **= fish) { console.log(2) }',
      output: 'if (!(dog **= fish)) { console.log(2) }',
    },
    {
      input: 'if (!(dog **= fish)) { console.log(2) }',
      output: 'if (dog **= fish) { console.log(2) }',
    },
    {
      input: 'if (dog ?? fish) { console.log(2) }',
      output: 'if (!(dog ?? fish)) { console.log(2) }',
    },
    {
      input: 'if (!(dog ?? fish)) { console.log(2) }',
      output: 'if (dog ?? fish) { console.log(2) }',
    },
    {
      input: 'if (dog ??= fish) { console.log(2) }',
      output: 'if (!(dog ??= fish)) { console.log(2) }',
    },
    {
      input: 'if (!(dog ??= fish)) { console.log(2) }',
      output: 'if (dog ??= fish) { console.log(2) }',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
