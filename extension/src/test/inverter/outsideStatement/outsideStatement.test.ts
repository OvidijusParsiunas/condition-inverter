import { Inverter } from '../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// INVERTION RESULT:
// when a condition is inverted outside of a statement and it starts with a bracket - the condition will be inverted inside of the brackets,
// however if the brackets are inside of a statement, they will be inverted instead of the condition, e.g:
// (mouse ? mouse && cat : mouse && cat) && cat -> (!mouse ? mouse && cat : mouse && cat) || !cat
// vs
// if ((mouse ? mouse && cat : mouse && cat) && cat) -> if (!(mouse ? mouse && cat : mouse && cat) || !cat)
// the reason why this is allowed is because brackets are something to be very careful about as nested ones cannot simply be inverted,
// hence any further nested brackets for outside condition inversion are no longer inverted and above is the only case allowed

suite('Outside Statement Inversion Suite', () => {
  [
    { input: 'mouse && cat', output: '!mouse || !cat' },
    {
      input: ` cat || !cat`,
      output: ' !cat && cat',
    },
    {
      input: `  cat   ||   !cat  `,
      output: '  !cat   &&   cat  ',
    },
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
    { input: 'name(mouse && cat)', output: '!name(mouse && cat)' },
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
    {
      input: `(mouse) ? mouse : cat`,
      output: '!(mouse) ? mouse : cat',
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
      output: 'const hello = (!(dog + mouse) ? mouse : cat) || !cat',
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
      input: `cat + dog ? fish : dog`,
      output: '!(cat + dog) ? fish : dog',
    },
    {
      input: `(cat + dog) ? fish : dog`,
      output: '!(cat + dog) ? fish : dog',
    },
    {
      input: `!(cat + dog) ? fish : dog`,
      output: 'cat + dog ? fish : dog',
    },
    {
      input: `(cat + dog ? fish : dog) && cat`,
      output: '(!(cat + dog) ? fish : dog) || !cat',
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
    {
      input: `dog and cat`,
      output: '!dog or !cat',
    },
    {
      input: `!dog or !cat`,
      output: 'dog and cat',
    },
    {
      input: `dog == cat`,
      output: 'dog != cat',
    },
    {
      input: `dog != cat`,
      output: 'dog == cat',
    },
    {
      input: `dog === cat`,
      output: 'dog !== cat',
    },
    {
      input: `dog !== cat`,
      output: 'dog === cat',
    },
    {
      input: `(dog == cat)`,
      output: '(dog != cat)',
    },
    {
      input: `const animal = (dog == cat)`,
      output: 'const animal = (dog != cat)',
    },
    {
      input: `dog + cat || !cat`,
      output: '!(dog + cat) && cat',
    },
    {
      input: `!(dog + cat) && cat`,
      output: 'dog + cat || !cat',
    },
    {
      input: ` dog + cat || !cat`,
      output: ' !(dog + cat) && cat',
    },
    {
      input: ` !(dog + cat) && cat`,
      output: ' dog + cat || !cat',
    },
    {
      input: `!!(dog + cat) && cat`,
      output: '!(!!(dog + cat)) || !cat',
    },
    {
      input: `!(!!(dog + cat)) || !cat`,
      output: '!!(dog + cat) && cat',
    },
    {
      input: `!((!!(dog + cat))) || !cat`,
      output: '(!!(dog + cat)) && cat',
    },
    {
      input: `!(  (  !  !  (dog + cat))) || !cat`,
      output: '  (  !  !  (dog + cat)) && cat',
    },
    {
      input: `!((dog + cat)) || !cat`,
      output: '(dog + cat) && cat',
    },
    {
      input: ` !!(dog + cat) && cat`,
      output: ' !(!!(dog + cat)) || !cat',
    },
    {
      input: ` !(!!(dog + cat)) || !cat`,
      output: ' !!(dog + cat) && cat',
    },
    {
      input: ` !((!!(dog + cat))) || !cat`,
      output: ' (!!(dog + cat)) && cat',
    },
    {
      input: ` !(  (  !  !  (dog + cat))) || !cat`,
      output: '   (  !  !  (dog + cat)) && cat',
    },
    {
      input: ` !((dog + cat)) || !cat`,
      output: ' (dog + cat) && cat',
    },
    {
      input: `true && false`,
      output: 'false || true',
    },
    {
      input: 'dog && () => { console.log(2) }',
      output: '!dog || !(() => { console.log(2) })',
    },
    {
      input: `dog && (): void => { if (dog) { console.log('hello') }}`,
      output: `!dog || !((): void => { if (dog) { console.log('hello') }})`,
    },
    {
      input: `(): void => { if (dog) { console.log('hello') }} && dog`,
      output: `(): void => { if (!dog) { console.log('hello') }} || !dog`,
    },
    {
      input: 'function isFish() { const hello = dog &&',
      output: 'function isFish() { const hello = !dog ||',
    },
    {
      input: 'function isFish() { const hello = dog && cat ',
      output: 'function isFish() { const hello = !dog || !cat ',
    },
    { input: `&&  cat + mouse `, output: `||  !(cat + mouse) ` },
    { input: `&&  cat + mouse) `, output: `||  !(cat + mouse)) ` },
    { input: `&&  cat + mouse; `, output: `||  !(cat + mouse); ` },
    { input: `&&  (cat + mouse)) `, output: `||  !(cat + mouse)) ` },
    { input: 'dog: cat ? fish : parrot,', output: 'dog: !cat ? fish : parrot,' },
    {
      input: 'const dog = cat ? fish : parrot\nconst dog = cat ? fish : parrot',
      output: 'const dog = !cat ? fish : parrot\nconst dog = !cat ? fish : parrot',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
