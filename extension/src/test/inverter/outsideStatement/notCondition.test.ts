import { Inverter } from '../../../../../shared/out/inverter/src/inverter';
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
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
