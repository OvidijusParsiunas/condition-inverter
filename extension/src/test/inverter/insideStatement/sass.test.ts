import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
// the reason why css conditions are not inverted is because queries like @media screen and (max-width: 600px) cannot be inverted directly
suite('SASS Invertion Suite', () => {
  [
    {
      input: `@if $type {`,
      output: `@if !$type {`,
    },
    {
      input: `@else if $type {`,
      output: `@else if !$type {`,
    },
    {
      input: `@if $type`,
      output: `@if !$type`,
    },
    {
      input: `@else if $type`,
      output: `@else if !$type`,
    },
    {
      input: `@if $type == ocean { color: blue; } @else if $type == matador { color: red; }`,
      output: `@if $type != ocean { color: blue; } @else if $type != matador { color: red; }`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
