import { IfInverter } from 'shared/inverter/src/ifInverter';
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
    // eslint-disable-next-line max-len
    {
      input: `if (dog as { dog: cat } && dog as string) console.log('hi')`,
      output: `if (!(dog as { dog: cat }) || !(dog as string)) console.log('hi')`,
    },
    { input: `if (dog as string + 2) console.log('hi')`, output: `if (!(dog as string + 2)) console.log('hi')` },
    { input: `if (!(dog as string + 2)) console.log('hi')`, output: `if (dog as string + 2) console.log('hi')` },
    { input: `if (dog as string + 2 && cat) console.log('hi')`, output: `if (!(dog as string + 2) || !cat) console.log('hi')` },
    { input: `if (!(dog as string + 2) || !cat) console.log('hi')`, output: `if (dog as string + 2 && cat) console.log('hi')` },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = IfInverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
