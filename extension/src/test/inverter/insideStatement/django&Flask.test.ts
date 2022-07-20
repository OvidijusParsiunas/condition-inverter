import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Django/Flask Invertion Suite', () => {
  [
    {
      input: `{% if dog %}`,
      output: `{% if !dog %}`,
    },
    {
      input: `{% if dog % cat && fish % parrot %}`,
      output: `{% if !(dog % cat) || !(fish % parrot) %}`,
    },
    {
      input: `% if dog %}`,
      output: `% if !dog %}`,
    },
    {
      input: `{% if (dog) %}`,
      output: `{% if (!dog) %}`,
    },
    {
      input: `% if (dog) %}`,
      output: `% if (!dog) %}`,
    },
    {
      input: `{% if (dog) %`,
      output: `{% if (!dog) %`,
    },
    {
      input: `% if (dog) %`,
      output: `% if (!dog) %`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
