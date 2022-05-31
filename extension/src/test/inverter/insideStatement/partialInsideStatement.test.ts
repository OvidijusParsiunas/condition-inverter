import { Inverter } from '../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Partial Inside Statement Inversion Suite', () => {
  [
    { input: `if (`, output: `if (` },
    { input: `if (dog`, output: `if (!dog` },
    { input: `if (true`, output: `if (false` },
    { input: `if dog`, output: `if !dog` },
    { input: `if(dog`, output: `if(!dog` },
    { input: `for dog`, output: `for !dog` },
    { input: `if (dog &&`, output: `if (!dog ||` },
    { input: `if (dog && cat`, output: `if (!dog || !cat` },
    { input: `if (dog && (cat`, output: `if (!dog || !(cat` },
    { input: `if (cat and`, output: 'if (!cat or' },
    { input: `if (cat and !(cat)`, output: `if (!cat or cat` },
    { input: `if (cat && () => {}`, output: `if (!cat || !(() => {})` },
    { input: `if (cat && (): void => { }`, output: `if (!cat || !((): void => { })` },
    { input: `if (cat && dog ?`, output: `if (!cat || !dog ?` },
    { input: `if cat && dog`, output: `if !cat || !dog` },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
