import { Inverter } from '../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Partial Outside Statement Inversion Suite', () => {
  [
    {
      input: ` && cat`,
      output: ' || !cat',
    },
    {
      input: `and cat`,
      output: 'or !cat',
    },
    {
      input: `or cat`,
      output: 'and !cat',
    },
    {
      input: `cat and`,
      output: '!cat or',
    },
    {
      input: `cat or`,
      output: '!cat and',
    },
    {
      input: `cat and (`,
      output: '!cat or !(',
    },
    {
      input: `cat or !(`,
      output: '!cat and (',
    },
    {
      input: `cat and ( `,
      output: '!cat or !( ',
    },
    {
      input: `cat or !( `,
      output: '!cat and ( ',
    },
    {
      input: `cat and (dog && mouse`,
      output: '!cat or !(dog && mouse',
    },
    {
      input: `cat or !(dog && mouse`,
      output: '!cat and (dog && mouse',
    },
    {
      input: `& cat || mouse)`,
      output: '& !cat && !mouse)',
    },
    {
      input: ` & cat || mouse)`,
      output: ' & !cat && !mouse)',
    },
    {
      input: `& cat) || mouse)`,
      output: '& !cat) && !mouse)',
    },
    {
      input: `dog && cat &`,
      output: '!dog || !cat &',
    },
    {
      input: `dog && cat & `,
      output: '!dog || !cat & ',
    },
    {
      input: `dog && cat) &`,
      output: '!dog || !cat) &',
    },
    {
      input: `dog && cat) & `,
      output: '!dog || !cat) & ',
    },
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
    {
      input: `dog &&`,
      output: '!dog ||',
    },
    {
      input: `(dog && cat`,
      output: '(!dog || !cat',
    },
    {
      input: `((dog && cat`,
      output: '((!dog || !cat',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
