import { Inverter } from '../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Partial Outside Statement Inversion Suite', () => {
  [
    {
      input: `and`,
      output: 'or',
    },
    {
      input: `or`,
      output: 'and',
    },
    {
      input: ` and `,
      output: ' or ',
    },
    {
      input: ` or `,
      output: ' and ',
    },
    {
      input: `&&`,
      output: '||',
    },
    {
      input: ` && `,
      output: ' || ',
    },
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
      input: `? mouse ? mouse : cat))`,
      output: '? !mouse ? mouse : cat))',
    },
    {
      input: `cat : mouse ? mouse : cat))`,
      output: 'cat : !mouse ? mouse : cat))',
    },
    {
      input: `(dog) ? cat : `,
      output: '!(dog) ? cat : ',
    },
    {
      input: `cat + dog ?`,
      output: '!(cat + dog) ?',
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
    {
      input: `== dog`,
      output: '!= dog',
    },
    {
      input: `dog ==`,
      output: 'dog !=',
    },
    {
      input: `==`,
      output: '!=',
    },
    {
      input: `===`,
      output: '!==',
    },
    {
      input: `!=`,
      output: '==',
    },
    {
      input: `!==`,
      output: '===',
    },
    {
      input: `<`,
      output: '>=',
    },
    {
      input: `>`,
      output: '<=',
    },
    {
      input: `>=`,
      output: '<',
    },
    {
      input: `<=`,
      output: '>',
    },
    { input: 'i >= 0; i -= 1)', output: 'i < 0; i -= 1)' },
    { input: 'i >= 0; i -= 1', output: 'i < 0; i -= 1' },
    { input: 'i && 0 + cat; i -= 1', output: '!i || !(0 + cat); i -= 1' },
    { input: '&& myFunc(', output: '|| !myFunc(' },
    { input: '&& myFunc() {', output: '|| !myFunc() {' },
    { input: '&& myFunc?', output: '|| !myFunc?' },
    { input: '&& myFunc ?', output: '|| !myFunc ?' },
    { input: 'dog + cat ? ', output: '!(dog + cat) ? ' },
    { input: '(dog + cat) ? ', output: '!(dog + cat) ? ' },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
