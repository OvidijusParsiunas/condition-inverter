import { Inverter } from '../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('TypeScript Invertion Suite', () => {
  [
    { input: `if ((dog as string)) console.log('hi')`, output: `if (!(dog as string)) console.log('hi')` },
    { input: `if ((dog as string) && (dog as string)) console.log('hi')`, output: `if (!(dog as string) || !(dog as string)) console.log('hi')` },
    { input: `if ((dog as string) && cat) console.log('hi')`, output: `if (!(dog as string) || !cat) console.log('hi')` },
    { input: `if (!(dog as string)) console.log('hi')`, output: `if (dog as string) console.log('hi')` },
    { input: `if (!(dog as string) && cat) console.log('hi')`, output: `if (dog as string || !cat) console.log('hi')` },
    { input: `if (!(dog as string && cat)) console.log('hi')`, output: `if (dog as string && cat) console.log('hi')` },
    { input: `if ((dog as string)) { console.log('hi') }`, output: `if (!(dog as string)) { console.log('hi') }` },
    { input: `if (!(dog as string)) { console.log('hi') }`, output: `if (dog as string) { console.log('hi') }` },
    { input: `if (dog as string) console.log('hi')`, output: `if (!(dog as string)) console.log('hi')` },
    { input: `if (dog as { dog: cat }) console.log('hi')`, output: `if (!(dog as { dog: cat })) console.log('hi')` },
    {
      input: `if (dog as { dog: cat } && dog as string) console.log('hi')`,
      output: `if (!(dog as { dog: cat }) || !(dog as string)) console.log('hi')`,
    },
    { input: `if (dog as string + 2) console.log('hi')`, output: `if (!(dog as string + 2)) console.log('hi')` },
    { input: `if (!(dog as string + 2)) console.log('hi')`, output: `if (dog as string + 2) console.log('hi')` },
    { input: `if (dog as string + 2 && cat) console.log('hi')`, output: `if (!(dog as string + 2) || !cat) console.log('hi')` },
    { input: `if (!(dog as string + 2) || !cat) console.log('hi')`, output: `if (dog as string + 2 && cat) console.log('hi')` },
    {
      input: 'if (function myFunc<number>(param: number|string): void { console.log(2) }) { console.log(2) }',
      output: 'if (!(function myFunc<number>(param: number|string): void { console.log(2) })) { console.log(2) }',
    },
    {
      input: 'if (myFunc<number>(param)) { console.log(2) }',
      output: 'if (!myFunc<number>(param)) { console.log(2) }',
    },
    {
      input: 'if (myFunc<number>(param) && dog) { console.log(2) }',
      output: 'if (!myFunc<number>(param) || !dog) { console.log(2) }',
    },
    {
      input: 'if (!myFunc<number>(param) || !dog) { console.log(2) }',
      output: 'if (myFunc<number>(param) && dog) { console.log(2) }',
    },
    {
      input: 'if ((myFunc<number>(param))) { console.log(2) }',
      output: 'if ((!myFunc<number>(param))) { console.log(2) }',
    },
    {
      input: 'if ((myFunc<number>(param)) && cat) { console.log(2) }',
      output: 'if (!(myFunc<number>(param)) || !cat) { console.log(2) }',
    },
    {
      input: 'if (cat < dog && myFunc<number>(param)) { console.log(2) }',
      output: 'if (cat >= dog || !myFunc<number>(param)) { console.log(2) }',
    },
    {
      input: 'if (cat >= dog || !myFunc<number>(param)) { console.log(2) }',
      output: 'if (cat < dog && myFunc<number>(param)) { console.log(2) }',
    },
    {
      input: 'if (cat ? myFunc<{ dog: cat }>() : cat) { console.log(2) }',
      output: 'if (!cat ? myFunc<{ dog: cat }>() : cat) { console.log(2) }',
    },
    {
      input: 'if (cat ? myFunc<{ dog: cat }>() && cat : cat) { console.log(2) }',
      output: 'if (!cat ? myFunc<{ dog: cat }>() && cat : cat) { console.log(2) }',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
