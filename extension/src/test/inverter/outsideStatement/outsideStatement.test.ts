import { Inverter } from '../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Outside Statement Inversion Suite', () => {
  [
    { input: 'mouse && cat', output: '!mouse || !cat' },
    { input: '!mouse || !cat', output: 'mouse && cat' },
    { input: 'mouse && cat || fish + 2', output: '!mouse || !cat && !(fish + 2)' },
    { input: 'mouse + cat', output: 'mouse + cat' },
    { input: 'const result = mouse && cat', output: 'const result = !mouse || !cat' },
    {
      input: 'const result = mouse && cat; const result2 = mouse && cat',
      output: 'const result = !mouse || !cat; const result2 = !mouse || !cat',
    },
    {
      input: `const result = mouse && cat; if (mouse && cat) { console.log(dog) }`,
      output: `const result = !mouse || !cat; if (!mouse || !cat) { console.log(dog) }`,
    },
    {
      input: `const result = mouse && cat; if (mouse && cat) { console.log(dog) } const result = mouse && cat;`,
      output: `const result = !mouse || !cat; if (!mouse || !cat) { console.log(dog) } const result = !mouse || !cat;`,
    },
    { input: 'as;mouse && cat;', output: 'as;!mouse || !cat;' },
    { input: 'as,mouse && cat,', output: 'as,!mouse || !cat,' },
    { input: 'name(mouse && cat)', output: 'name(!mouse || !cat)' },
    { input: '((mouse && cat))', output: '((!mouse || !cat))' },
    { input: 'const result = ((mouse && cat))', output: 'const result = ((!mouse || !cat))' },
    {
      input: 'const result = ((mouse && () => { const dog = 2; })) const dog = 4',
      output: 'const result = ((!mouse || !(() => { const dog = 2; }))) const dog = 4',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
