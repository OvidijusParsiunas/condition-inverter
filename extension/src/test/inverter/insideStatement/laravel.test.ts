import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Laravel Invertion Suite', () => {
  [
    {
      input: `@if ($dog) <p>I have one record!</p>`,
      output: `@if (!$dog) <p>I have one record!</p>`,
    },
    {
      input: `@elseif ($cat) <p>I have multiple records!</p>`,
      output: `@elseif (!$cat) <p>I have multiple records!</p>`,
    },
    {
      input: `@if ($dog) <p>dogs</p> @elseif ($cat) <p>cats</p>`,
      output: `@if (!$dog) <p>dogs</p> @elseif (!$cat) <p>cats</p>`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
