import { Inverter } from '../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Partial Outside Statement Inversion Suite', () => {
  [
    {
      input: `mouse ?`,
      output: '!mouse ?',
    },
    {
      input: `mouse ? mouse`,
      output: '!mouse ? mouse',
    },
    {
      input: `mouse ? mouse :`,
      output: '!mouse ? mouse :',
    },
    {
      input: `mouse ? mouse : `,
      output: '!mouse ? mouse : ',
    },
    {
      input: `(mouse ? mouse : cat))`,
      output: '(!mouse ? mouse : cat))',
    },
    {
      input: `dog + cat)) && cat`,
      output: '!(dog + cat))) || !cat',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
