import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Java Invertion Suite', () => {
  [
    {
      input: `for (int dog: cat) { System.out.println(dog); }`,
      output: `for (int dog: cat) { System.out.println(dog); }`,
    },
    {
      input: `for (;;) { System.out.println(dog); }`,
      output: `for (;;) { System.out.println(dog); }`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
