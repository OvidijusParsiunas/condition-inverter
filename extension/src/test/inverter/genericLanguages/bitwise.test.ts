import { IfInverter } from '../../../../../shared/out/inverter/src/ifInverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Assignments Inversion Suite', () => {
  [
    {
      input: 'if (dog << cat) { console.log(2) }',
      output: 'if (!(dog << cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog << cat)) { console.log(2) }',
      output: 'if (dog << cat) { console.log(2) }',
    },
    {
      input: 'if (dog >> cat) { console.log(2) }',
      output: 'if (!(dog >> cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog >> cat)) { console.log(2) }',
      output: 'if (dog >> cat) { console.log(2) }',
    },
    {
      input: 'if (dog >>> cat) { console.log(2) }',
      output: 'if (!(dog >>> cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog >>> cat)) { console.log(2) }',
      output: 'if (dog >>> cat) { console.log(2) }',
    },
    {
      input: 'if (dog ^ cat) { console.log(2) }',
      output: 'if (!(dog ^ cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog ^ cat)) { console.log(2) }',
      output: 'if (dog ^ cat) { console.log(2) }',
    },
    {
      input: 'if (dog & cat) { console.log(2) }',
      output: 'if (!(dog & cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog & cat)) { console.log(2) }',
      output: 'if (dog & cat) { console.log(2) }',
    },
    // WORK - make sure this works
    // {
    //   input: 'if (dog | cat) { console.log(2) }',
    //   output: 'if (!(dog | cat)) { console.log(2) }',
    // },
    // {
    //   input: 'if (!(dog | cat)) { console.log(2) }',
    //   output: 'if (dog | cat) { console.log(2) }',
    // },
    {
      input: 'if (~dog) { console.log(2) }',
      output: 'if (!(~dog)) { console.log(2) }',
    },
    {
      input: 'if (!(~dog)) { console.log(2) }',
      output: 'if (~dog) { console.log(2) }',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = IfInverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
