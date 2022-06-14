import { Inverter } from '../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite.only('Partial Inside Statement Inversion Suite', () => {
  [
    { input: `if (`, output: `if (` },
    { input: `if  (  `, output: `if  (  ` },
    { input: `if ((())`, output: 'if (!(())' },
    { input: `if (dog`, output: `if (!dog` },
    { input: `if (true`, output: `if (false` },
    { input: `if ((true`, output: `if ((false` },
    { input: `if ((true)`, output: `if (!(true)` },
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
    { input: `if ((dog && cat`, output: 'if ((!dog || !cat' },
    { input: `if (((dog && cat`, output: 'if (((!dog || !cat' },
    {
      input: `if (dog && (): void => { if (dog) { console.log('hello') }}`,
      output: `if (!dog || !((): void => { if (dog) { console.log('hello') }})`,
    },
    {
      input: `if ((): void => { if (dog) { console.log('hello') }} && dog`,
      output: `if (!((): void => { if (dog) { console.log('hello') }}) || !dog`,
    },
    { input: `for (let i = 0; ((dog && cat`, output: 'for (let i = 0; ((!dog || !cat' },
    { input: `for (let i = 0; ((dog && cat)`, output: 'for (let i = 0; ((!dog || !cat)' },
    { input: `if (myFunc()`, output: 'if (!myFunc()' },
    { input: `if (myFunc(())`, output: 'if (!myFunc(())' },
    { input: `if (myFunc((())`, output: 'if (!myFunc((())' },
    { input: `if (myFunc(())`, output: 'if (!myFunc(())' },
    { input: `if (myFunc(true)`, output: 'if (!myFunc(true)' },
    { input: `if (myFunc(true`, output: 'if (!myFunc(true' },
    { input: `if (typeof (true`, output: 'if (!typeof (true' },
    { input: 'if (dog <<', output: 'if (!(dog <<)' },
    { input: 'if (dog >>', output: 'if (!(dog >>)' },
    { input: 'if (dog +', output: 'if (!(dog +)' },
    { input: 'if (dog -', output: 'if (!(dog -)' },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
