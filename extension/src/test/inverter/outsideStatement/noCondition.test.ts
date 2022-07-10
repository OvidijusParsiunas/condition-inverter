import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Outside Statement No Condition Suite', () => {
  [
    { input: 'mouse & cat', output: 'mouse & cat' },
    { input: 'mouse &&= cat', output: 'mouse &&= cat' },
    { input: 'mouse ||= cat', output: 'mouse ||= cat' },
    { input: 'mouse | cat', output: 'mouse | cat' },
    { input: 'mouse ?? cat', output: 'mouse ?? cat' },
    { input: 'mouse ??= cat', output: 'mouse ??= cat' },
    { input: 'mouse?.cat', output: 'mouse?.cat' },
    { input: 'mouse << cat', output: 'mouse << cat' },
    { input: 'mouse <<= cat', output: 'mouse <<= cat' },
    { input: 'mouse >> cat', output: 'mouse >> cat' },
    { input: 'mouse >>= cat', output: 'mouse >>= cat' },
    { input: 'mouse >>> cat', output: 'mouse >>> cat' },
    { input: 'mouse >>>= cat', output: 'mouse >>>= cat' },
    { input: 'function(dog) is animal', output: 'function(dog) is animal' },
    { input: 'mouse = cat', output: 'mouse = cat' },
    { input: 'mouse &', output: 'mouse &' },
    { input: '&', output: '&' },
    { input: ' & ', output: ' & ' },
    { input: '=', output: '=' },
    { input: ' = ', output: ' = ' },
    { input: 'const cats = 1', output: 'const cats = 1' },
    { input: 'const cats = (', output: 'const cats = (' },
    { input: `& cat`, output: '& cat' },
    { input: `cat &`, output: 'cat &' },
    { input: `cat) &`, output: 'cat) &' },
    { input: `<< cat`, output: '<< cat' },
    { input: `? cat : dog`, output: `? cat : dog` },
    { input: ` ? cat : dog`, output: ` ? cat : dog` },
    { input: `? cat`, output: `? cat` },
    { input: `? cat :`, output: `? cat :` },
    { input: `:`, output: `:` },
    { input: `: dog`, output: `: dog` },
    { input: `) ?`, output: `) ?` },
    { input: `)) ?`, output: `)) ?` },
    {
      input: `function isFish() { console.log('dog') } `,
      output: `function isFish() { console.log('dog') } `,
    },
    {
      input: 'function ',
      output: 'function ',
    },
    {
      input: 'function isFish',
      output: 'function isFish',
    },
    {
      input: 'function isFish(',
      output: 'function isFish(',
    },
    {
      input: 'function isFish(param: {',
      output: 'function isFish(param: {',
    },
    {
      input: 'function isFish(param: { dog',
      output: 'function isFish(param: { dog',
    },
    {
      input: 'function isFish(param: { dog:',
      output: 'function isFish(param: { dog:',
    },
    {
      input: 'function isFish(param: { dog: cat',
      output: 'function isFish(param: { dog: cat',
    },
    {
      input: 'function isFish(param: { dog: cat }',
      output: 'function isFish(param: { dog: cat }',
    },
    {
      input: 'function isFish(param: { dog: cat })',
      output: 'function isFish(param: { dog: cat })',
    },
    {
      input: 'function isFish() { dog &&',
      output: 'function isFish() { !dog ||',
    },
    {
      input: 'function isFish() { dog && cat }',
      output: 'function isFish() { !dog || !cat }',
    },
    {
      input: 'function isFish(param: { dog: cat })',
      output: 'function isFish(param: { dog: cat })',
    },
    {
      input: 'function isFish(param: { dog: cat }):',
      output: 'function isFish(param: { dog: cat }):',
    },
    {
      input: 'function isFish(param: { dog: cat }): {',
      output: 'function isFish(param: { dog: cat }): {',
    },
    {
      input: 'function isFish(param: { dog: cat }): { dog',
      output: 'function isFish(param: { dog: cat }): { dog',
    },
    {
      input: 'function isFish(param: { dog: cat }): { dog :',
      output: 'function isFish(param: { dog: cat }): { dog :',
    },
    {
      input: 'function isFish(param: { dog: cat }): { dog : cat',
      output: 'function isFish(param: { dog: cat }): { dog : cat',
    },
    {
      input: 'function isFish(param: { dog: cat }): { dog : cat }',
      output: 'function isFish(param: { dog: cat }): { dog : cat }',
    },
    {
      input: 'function isFish(param: { dog: cat }): { dog : cat } {',
      output: 'function isFish(param: { dog: cat }): { dog : cat } {',
    },
    {
      input: 'function isFish(param: { dog: cat }): { dog : cat } { fish',
      output: 'function isFish(param: { dog: cat }): { dog : cat } { fish',
    },
    {
      input: 'function isFish(param: { dog: cat }): { dog : cat } { fish(',
      output: 'function isFish(param: { dog: cat }): { dog : cat } { fish(',
    },
    {
      input: 'function isFish(param: { dog: cat }): { dog : cat } { fish()',
      output: 'function isFish(param: { dog: cat }): { dog : cat } { fish()',
    },
    {
      input: 'function isFish(param: { dog: cat }): { dog : cat } { fish();',
      output: 'function isFish(param: { dog: cat }): { dog : cat } { fish();',
    },
    {
      input: 'function isFish(param: { dog: cat }): { dog : cat } { fish(); }',
      output: 'function isFish(param: { dog: cat }): { dog : cat } { fish(); }',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
