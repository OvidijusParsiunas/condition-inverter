import { Inverter } from '../../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite.only('Arithmetics Inversion Suite', () => {
  [
    { input: 'if (dog - cat || mouse) { console.log(2) }', output: 'if (!(dog - cat) && !mouse) { console.log(2) }' },
    { input: 'if (dog - cat  || mouse) { console.log(2) }', output: 'if (!(dog - cat)  && !mouse) { console.log(2) }' },
    { input: 'if (!dog - cat) { console.log(2) }', output: 'if (!(!dog - cat)) { console.log(2) }' },
    { input: 'if (!dog - cat && !dog - cat) { console.log(2) }', output: 'if (!(!dog - cat) || !(!dog - cat)) { console.log(2) }' },
    { input: 'if (!  dog - cat && !  dog - cat) { console.log(2) }', output: 'if (!(!  dog - cat) || !(!  dog - cat)) { console.log(2) }' },
    { input: 'if (dog - !cat && dog - !cat) { console.log(2) }', output: 'if (!(dog - !cat) || !(dog - !cat)) { console.log(2) }' },
    { input: 'if (dog -   !cat && dog -  !cat) { console.log(2) }', output: 'if (!(dog -   !cat) || !(dog -  !cat)) { console.log(2) }' },
    { input: 'if (dog -   !cat && dog -  !  cat  ) { console.log(2) }', output: 'if (!(dog -   !cat) || !(dog -  !  cat)  ) { console.log(2) }' },
    { input: 'if ((!(!dog - cat)) && (!(!dog - cat))) { console.log(2) }', output: 'if (!(!(!dog - cat)) || !(!(!dog - cat))) { console.log(2) }' },
    {
      input: 'if (  (!  (!  dog - cat)) && (  !(  !dog - cat))) { console.log(2) }',
      output: 'if (  !(!  (!  dog - cat)) || !(  !(  !dog - cat))) { console.log(2) }',
    },
    { input: 'if (dog - cat ||   mouse) { console.log(2) }', output: 'if (!(dog - cat) &&   !mouse) { console.log(2) }' },
    { input: 'if   (dog - cat ||   mouse) { console.log(2) }', output: 'if   (!(dog - cat) &&   !mouse) { console.log(2) }' },
    { input: 'if (dog - cat || mouse  ) { console.log(2) }', output: 'if (!(dog - cat) && !mouse  ) { console.log(2) }' },
    { input: 'if   (  dog   -  cat  ||   mouse  ) { console.log(2) }', output: 'if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }' },
    {
      input: 'if   (   mouse  ||   dog   -  cat  ) { console.log(2) }',
      output: 'if   (   !mouse  &&   !(dog   -  cat)  ) { console.log(2) }',
    },
    { input: 'if (!(mouse - cat)) { console.log(2) }', output: 'if (mouse - cat) { console.log(2) }' },
    { input: 'if (  !  (  mouse - cat)  ) { console.log(2) }', output: 'if (      mouse - cat  ) { console.log(2) }' },
    {
      input: 'if (  !  (  mouse - cat)  &&   !  (  mouse - cat)  ) { console.log(2) }',
      output: 'if (      mouse - cat  ||       mouse - cat  ) { console.log(2) }',
    },
    { input: 'if (mouse || dog - cat) { console.log(2) }', output: 'if (!mouse && !(dog - cat)) { console.log(2) }' },
    {
      input: 'if (dog - cat || mouse && cat - dog) { console.log(2) }',
      output: 'if (!(dog - cat) && !mouse || !(cat - dog)) { console.log(2) }',
    },
    { input: 'if (mouse || (dog - cat)) { console.log(2) }', output: 'if (!mouse && !(dog - cat)) { console.log(2) }' },
    {
      input: 'if (!! + - + -!!(!(dog || cat))) { console.log(2) }',
      output: 'if (!(!! + - + -!!(!(dog || cat)))) { console.log(2) }',
    },
    {
      input: 'if (!! + - + -!!(!(dog ||  + - + - cat))) { console.log(2) }',
      output: 'if (!(!! + - + -!!(!(dog ||  + - + - cat)))) { console.log(2) }',
    },
    {
      input: 'if (+ - + -!!(!(dog ||  + - + - cat))) { console.log(2) }',
      output: 'if (!(+ - + -!!(!(dog ||  + - + - cat)))) { console.log(2) }',
    },
    {
      input: 'if (+ - + - !!(!(dog ||  + - + - cat))) { console.log(2) }',
      output: 'if (!(+ - + - !!(!(dog ||  + - + - cat)))) { console.log(2) }',
    },
    {
      input: 'if (!(+ - + - !!(!(dog ||  + - + - cat)))) { console.log(2) }',
      output: 'if (+ - + - !!(!(dog ||  + - + - cat))) { console.log(2) }',
    },
    {
      input: 'if (-dog) { console.log(2) }',
      output: 'if (!(-dog)) { console.log(2) }',
    },
    {
      input: 'if (- + dog) { console.log(2) }',
      output: 'if (!(- + dog)) { console.log(2) }',
    },
    {
      input: 'if ((- + dog)) { console.log(2) }',
      output: 'if (!(- + dog)) { console.log(2) }',
    },
    {
      input: 'if ((- + dog) && (- + dog)) { console.log(2) }',
      output: 'if (!(- + dog) || !(- + dog)) { console.log(2) }',
    },
    {
      input: 'if (( - + - + dog) && (- + - + dog)) { console.log(2) }',
      output: 'if (!( - + - + dog) || !(- + - + dog)) { console.log(2) }',
    },
    {
      input: 'if (!!(- + - + dog) && !!( - + - + dog)) { console.log(2) }',
      output: 'if (!(!!(- + - + dog)) || !(!!( - + - + dog))) { console.log(2) }',
    },
    {
      input: 'if (!!(- + - + dog + cat) && !!(- + - + dog - cat)) { console.log(2) }',
      output: 'if (!(!!(- + - + dog + cat)) || !(!!(- + - + dog - cat))) { console.log(2) }',
    },
    {
      input: 'if (!!-!!dog) { console.log(2) }',
      output: 'if (!(!!-!!dog)) { console.log(2) }',
    },
    {
      input: 'if (!!+!!dog) { console.log(2) }',
      output: 'if (!(!!+!!dog)) { console.log(2) }',
    },
    {
      input: 'if (!!dog + 2) { console.log(2) }',
      output: 'if (!(!!dog + 2)) { console.log(2) }',
    },
    {
      input: 'if (!!dog && !!dog + 2) { console.log(2) }',
      output: 'if (!(!!dog) || !(!!dog + 2)) { console.log(2) }',
    },
    {
      input: 'if (!!dog && !!dog +  2) { console.log(2) }',
      output: 'if (!(!!dog) || !(!!dog +  2)) { console.log(2) }',
    },
    {
      input: 'if ((!!dog && !!dog + 2) && (!!dog && !!dog + 2)) { console.log(2) }',
      output: 'if (!(!!dog && !!dog + 2) || !(!!dog && !!dog + 2)) { console.log(2) }',
    },
    {
      input: 'if (- + - + dog + cat && - + - + dog - cat) { console.log(2) }',
      output: 'if (!(- + - + dog + cat) || !(- + - + dog - cat)) { console.log(2) }',
    },
    {
      input: 'if (- + - + dog + !!cat) { console.log(2) }',
      output: 'if (!(- + - + dog + !!cat)) { console.log(2) }',
    },
    {
      input: 'if (- + -   + dog + !!cat && - + - + !!dog - cat) { console.log(2) }',
      output: 'if (!(- + -   + dog + !!cat) || !(- + - + !!dog - cat)) { console.log(2) }',
    },
    {
      input: 'if (!(- + -   + dog + !!cat) || !(- + - + !!dog - cat)) { console.log(2) }',
      output: 'if (- + -   + dog + !!cat && - + - + !!dog - cat) { console.log(2) }',
    },
    {
      input: 'if (!(- + dog)) { console.log(2) }',
      output: 'if (- + dog) { console.log(2) }',
    },
    {
      input: 'if (+dog) { console.log(2) }',
      output: 'if (!(+dog)) { console.log(2) }',
    },
    {
      input: 'if (+!!dog) { console.log(2) }',
      output: 'if (!(+!!dog)) { console.log(2) }',
    },
    {
      input: 'if (-+!!dog) { console.log(2) }',
      output: 'if (!(-+!!dog)) { console.log(2) }',
    },
    {
      input: 'if (!(-+!!dog)) { console.log(2) }',
      output: 'if (-+!!dog) { console.log(2) }',
    },
    {
      input: 'if (-  +  !!dog) { console.log(2) }',
      output: 'if (!(-  +  !!dog)) { console.log(2) }',
    },
    {
      input: 'if (!(-  +  !!dog)) { console.log(2) }',
      output: 'if (-  +  !!dog) { console.log(2) }',
    },
    {
      input: 'if (!(-  +  !!dog - !!cat + - + - (dog && !!cat))) { console.log(2) }',
      output: 'if (-  +  !!dog - !!cat + - + - (dog && !!cat)) { console.log(2) }',
    },
    {
      input: 'if (false + dog && true + cat) { console.log(1) }',
      output: 'if (!(false + dog) || !(true + cat)) { console.log(1) }',
    },
    {
      input: 'if (!(false + dog) || !(true + cat)) { console.log(1) }',
      output: 'if (false + dog && true + cat) { console.log(1) }',
    },
    {
      input: 'if (!(false   && true  ) &&   true) { console.log(1) }',
      output: 'if (false   && true   ||   false) { console.log(1) }',
    },
    {
      input: 'if (  true   ||   false   &&   true  ) { console.log(1) }',
      output: 'if (  false   &&   true   ||   false  ) { console.log(1) }',
    },
    {
      input: 'if ((1) + 12) { console.log(1) }',
      output: 'if (!((1) + 12)) { console.log(1) }',
    },
    {
      input: 'if ((1) + (12)) { console.log(1) }',
      output: 'if (!((1) + (12))) { console.log(1) }',
    },
    {
      input: 'if (( ( 1 ) ) + ( ( 12 ) )) { console.log(1) }',
      output: 'if (!(( ( 1 ) ) + ( ( 12 ) ))) { console.log(1) }',
    },
    {
      input: 'if ((1 - 1) + (12 + 0)) { console.log(1) }',
      output: 'if (!((1 - 1) + (12 + 0))) { console.log(1) }',
    },
    {
      input: 'if (!((1 - 1) + (12 + 0))) { console.log(1) }',
      output: 'if ((1 - 1) + (12 + 0)) { console.log(1) }',
    },
    {
      input: 'if ((1 && 4) + (12 || 4)) { console.log(1) }',
      output: 'if (!((1 && 4) + (12 || 4))) { console.log(1) }',
    },
    {
      input: 'if ((1) + ((2 + 5)) + 12) { console.log(1) }',
      output: 'if (!((1) + ((2 + 5)) + 12)) { console.log(1) }',
    },
    {
      input: 'if (!((1) + ((2 + 5)) + 12)) { console.log(1) }',
      output: 'if ((1) + ((2 + 5)) + 12) { console.log(1) }',
    },
    {
      input: 'if ((1) + 12) { console.log(1) } if ((1) + 12) { console.log(1) }',
      output: 'if (!((1) + 12)) { console.log(1) } if (!((1) + 12)) { console.log(1) }',
    },
    {
      input: 'if ((1) + 12) { console.log(1) }     if ((1) + 12) { console.log(1) }',
      output: 'if (!((1) + 12)) { console.log(1) }     if (!((1) + 12)) { console.log(1) }',
    },
    {
      input: 'if (dog++) { console.log(2) }',
      output: 'if (!(dog++)) { console.log(2) }',
    },
    {
      input: 'if (dog++ + 2) { console.log(2) }',
      output: 'if (!(dog++ + 2)) { console.log(2) }',
    },
    {
      input: 'if (++dog) { console.log(2) }',
      output: 'if (!(++dog)) { console.log(2) }',
    },
    {
      input: 'if (++dog + 2) { console.log(2) }',
      output: 'if (!(++dog + 2)) { console.log(2) }',
    },
    {
      input: 'if (dog++ - 2) { console.log(2) }',
      output: 'if (!(dog++ - 2)) { console.log(2) }',
    },
    {
      input: 'if (++dog - 2) { console.log(2) }',
      output: 'if (!(++dog - 2)) { console.log(2) }',
    },
    {
      input: 'if (dog--) { console.log(2) }',
      output: 'if (!(dog--)) { console.log(2) }',
    },
    {
      input: 'if (dog-- + 2) { console.log(2) }',
      output: 'if (!(dog-- + 2)) { console.log(2) }',
    },
    {
      input: 'if (dog-- - 2) { console.log(2) }',
      output: 'if (!(dog-- - 2)) { console.log(2) }',
    },
    {
      input: 'if (--dog) { console.log(2) }',
      output: 'if (!(--dog)) { console.log(2) }',
    },
    {
      input: 'if (--dog + 2) { console.log(2) }',
      output: 'if (!(--dog + 2)) { console.log(2) }',
    },
    {
      input: 'if (--dog - 2) { console.log(2) }',
      output: 'if (!(--dog - 2)) { console.log(2) }',
    },
    {
      input: 'if (!(dog++)) { console.log(2) }',
      output: 'if (dog++) { console.log(2) }',
    },
    {
      input: 'if (!(dog--)) { console.log(2) }',
      output: 'if (dog--) { console.log(2) }',
    },
    {
      input: 'if (!(++dog)) { console.log(2) }',
      output: 'if (++dog) { console.log(2) }',
    },
    {
      input: 'if (!(--dog)) { console.log(2) }',
      output: 'if (--dog) { console.log(2) }',
    },
    {
      input: 'if (dog / cat) { console.log(2) }',
      output: 'if (!(dog / cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog / cat)) { console.log(2) }',
      output: 'if (dog / cat) { console.log(2) }',
    },
    {
      input: 'if (dog % cat) { console.log(2) }',
      output: 'if (!(dog % cat)) { console.log(2) }',
    },
    {
      input: 'if (dog % cat % fish) { console.log(2) }',
      output: 'if (!(dog % cat % fish)) { console.log(2) }',
    },
    {
      input: 'if (!(dog % cat % fish)) { console.log(2) }',
      output: 'if (dog % cat % fish) { console.log(2) }',
    },
    {
      input: '  if   (  dog   -  cat  ||   mouse  ) { console.log(2) }  ',
      output: '  if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }  ',
    },
    {
      input: '  if   (  dog   -  cat  ||   mouse  ) { console.log(2) }  if   (  dog   -  cat  ||   mouse  ) { console.log(2) }  ',
      output: '  if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }  if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }  ',
    },
    {
      input: '  if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }  if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }  ',
      output: '  if   (  dog   -  cat  ||   mouse  ) { console.log(2) }  if   (  dog   -  cat  ||   mouse  ) { console.log(2) }  ',
    },
    { input: 'if (dog + cat * fish) { console.log(2) }', output: 'if (!(dog + cat * fish)) { console.log(2) }' },
    { input: 'if (!(dog + cat * fish)) { console.log(2) }', output: 'if (dog + cat * fish) { console.log(2) }' },
    { input: 'if (dog === cat + 2) { console.log(2) }', output: 'if (dog !== cat + 2) { console.log(2) }' },
    { input: 'if (dog !== cat + 2) { console.log(2) }', output: 'if (dog === cat + 2) { console.log(2) }' },
    { input: 'if (dog ** cat) { console.log(2) }', output: 'if (!(dog ** cat)) { console.log(2) }' },
    { input: 'if (!(dog ** cat)) { console.log(2) }', output: 'if (dog ** cat) { console.log(2) }' },
    { input: 'if (dog ** cat + cat) { console.log(2) }', output: 'if (!(dog ** cat + cat)) { console.log(2) }' },
    { input: 'if (!(dog ** cat + cat)) { console.log(2) }', output: 'if (dog ** cat + cat) { console.log(2) }' },
    { input: 'if (dog ** cat && cat) { console.log(2) }', output: 'if (!(dog ** cat) || !cat) { console.log(2) }' },
    { input: 'if (!(dog ** cat) || !cat) { console.log(2) }', output: 'if (dog ** cat && cat) { console.log(2) }' },
    {
      input: `if (dog + cat === true) { console.log(2) }`,
      output: `if (dog + cat !== true) { console.log(2) }`,
    },
    {
      input: `if (dog + cat === true) { console.log(2) }`,
      output: `if (dog + cat !== true) { console.log(2) }`,
    },
    {
      input: `if ((dog + cat === true)) { console.log(2) }`,
      output: `if ((dog + cat !== true)) { console.log(2) }`,
    },
    {
      input: `if (dog + cat === true && dog + cat === true) { console.log(2) }`,
      output: `if (dog + cat !== true || dog + cat !== true) { console.log(2) }`,
    },
    {
      input: `if (dog + cat === dog + cat && dog + cat === dog + cat) { console.log(2) }`,
      output: `if (dog + cat !== dog + cat || dog + cat !== dog + cat) { console.log(2) }`,
    },
    {
      input: `if (dog + cat && cat) { console.log(2) }`,
      output: `if (!(dog + cat) || !cat) { console.log(2) }`,
    },
    {
      input: `if (dog + cat + cat && cat) { console.log(2) }`,
      output: `if (!(dog + cat + cat) || !cat) { console.log(2) }`,
    },
    {
      input: `if (dog + cat - cat && cat) { console.log(2) }`,
      output: `if (!(dog + cat - cat) || !cat) { console.log(2) }`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
