import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Ruby Invertion Suite', () => {
  [
    {
      input: `elsif dog`,
      output: `elsif !dog`,
    },
    {
      input: `elsif dog.cat`,
      output: `elsif !dog.cat`,
    },
    {
      input: `print "2 -- Value is set" unless $var`,
      output: `print "2 -- Value is set" unless !$var`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
