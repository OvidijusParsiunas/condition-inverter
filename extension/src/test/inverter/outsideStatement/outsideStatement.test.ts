import { Inverter } from '../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// INVERTION RESULT:
// when a condition is inverted outside of a statement and it starts with a bracket - the condition will be inverted inside of the brackets,
// however if the brackets are inside of a statement, they will be inverted instead of the condition, e.g:
// (mouse ? mouse && cat : mouse && cat) && cat -> (!mouse ? mouse && cat : mouse && cat) || !cat
// vs
// if ((mouse ? mouse && cat : mouse && cat) && cat) -> if (!(mouse ? mouse && cat : mouse && cat) || !cat)
// the reason why this is allowed is because brackets are something to be very careful about as nested ones cannot simply be inverted,
// hence any further nested brackets for outside condition inversion are no longer inverted and above is the only case ever allowed

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Outside Statement Inversion Suite', () => {
  [
    { input: 'mouse && cat', output: '!mouse || !cat' },
    { input: 'const result = (dog && cat) && mouse + cat', output: 'const result = (!dog || !cat) || !(mouse + cat)' },
    { input: '!mouse || !cat', output: 'mouse && cat' },
    { input: '(mouse && cat) || fish + 2', output: '(!mouse || !cat) && !(fish + 2)' },
    { input: '(mouse && cat) || (fish + 2)', output: '(!mouse || !cat) && !(fish + 2)' },
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
    {
      input: `const result = mouse && cat; if (mouse) { console } const result = mouse && cat; if (mouse) { console }`,
      output: `const result = !mouse || !cat; if (!mouse) { console } const result = !mouse || !cat; if (!mouse) { console }`,
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
    {
      input: `mouse ? mouse : cat`,
      output: '!mouse ? mouse : cat',
    },
    { input: 'mouse && cat ? mouse : cat', output: '!mouse || !cat ? mouse : cat' },
    { input: 'mouse && cat ? mouse || cat : cat', output: '!mouse || !cat ? mouse || cat : cat' },
    {
      input: `mouse \n? mouse : cat`,
      output: '!mouse \n? mouse : cat',
    },
    {
      input: `(mouse ? mouse : cat)`,
      output: '(!mouse ? mouse : cat)',
    },
    {
      input: `(mouse && cat ? mouse : cat)`,
      output: '(!mouse || !cat ? mouse : cat)',
    },
    {
      input: `(mouse ? mouse && cat : mouse && cat) && cat`,
      output: '(!mouse ? mouse && cat : mouse && cat) || !cat',
    },
    {
      input: `const hello = (dog && mouse ? mouse : cat) && cat`,
      output: 'const hello = (!dog || !mouse ? mouse : cat) || !cat',
    },
    {
      input: `const hello = (dog + mouse ? mouse : cat) && cat`,
      output: 'const hello = (!(dog + mouse ? mouse : cat)) || !cat',
    },
    {
      input: `const hello = (dog + mouse && cat ? mouse : cat) && cat`,
      output: 'const hello = (!(dog + mouse) || !cat ? mouse : cat) || !cat',
    },
    {
      input: `dog ? cat ? fish : (dog() ? cat() : cat()) : cat ? dog(true) ? cat(false) : cat(false) : fish`,
      output: '!dog ? cat ? fish : (dog() ? cat() : cat()) : cat ? dog(true) ? cat(false) : cat(false) : fish',
    },
    {
      input: `mouse?mouse:cat`,
      output: '!mouse?mouse:cat',
    },
    {
      input: `mouse ? mouse :cat && dog const dog = dog && cat`,
      output: '!mouse ? mouse :cat && dog const dog = !dog || !cat',
    },
    {
      input: `mouse\n?\nmouse\n:cat && dog\nconst dog = dog && cat`,
      output: '!mouse\n?\nmouse\n:cat && dog\nconst dog = !dog || !cat',
    },
    {
      input: `mouse\n?\nmouse\n:cat && dog;const dog = dog && cat`,
      output: '!mouse\n?\nmouse\n:cat && dog;const dog = !dog || !cat',
    },
    {
      input: `mouse\r?\nmouse\r:cat && dog\rconst dog = dog && cat`,
      output: '!mouse\r?\nmouse\r:cat && dog\rconst dog = !dog || !cat',
    },
    {
      input: `mouse?mouse:cat;const dog = dog && cat`,
      output: '!mouse?mouse:cat;const dog = !dog || !cat',
    },
    {
      input: `mouse > cat`,
      output: 'mouse <= cat',
    },
    {
      input: `mouse >= cat`,
      output: 'mouse < cat',
    },
    {
      input: `mouse < cat`,
      output: 'mouse >= cat',
    },
    {
      input: `mouse < cat`,
      output: 'mouse >= cat',
    },
    {
      input: `(mouse < cat)`,
      output: '(mouse >= cat)',
    },
    {
      input: `const dog = mouse < cat`,
      output: 'const dog = mouse >= cat',
    },
    {
      input: `const dog = (mouse < cat)`,
      output: 'const dog = (mouse >= cat)',
    },
    {
      input: `const dog = mouse < cat && dog`,
      output: 'const dog = mouse >= cat || !dog',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
