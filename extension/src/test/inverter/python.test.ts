import { IfInverter } from '../../../../shared/out/inverter/src/ifInverter';
import * as assert from 'assert';

// WORK: test with all python operators
// when the user highlights arbitrary conditions using the extension:
// we can expand the selection to check if it is wihtin an if statement/while loop etc
// the user may highlight a condition that is not inside any of these, then the strategy is to see if the highlighted text has conditions

// when the user inserts arbitrary text into website - we need to execute the following strategy
// if no if statements/while within text, proceed to look for conditions
suite('Python Invertion Suite', () => {
  [
    { input: 'if dog < cat: print', output: 'if dog >= cat: print' },
    { input: 'if dog and cat: print', output: 'if !dog or !cat: print' },
    { input: 'if dog or cat: print', output: 'if !dog and !cat: print' },
    { input: 'if dog < "and": print', output: 'if dog >= "and": print' },
    { input: 'elif dog < cat: print', output: 'elif dog >= cat: print' },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = IfInverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
