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
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
