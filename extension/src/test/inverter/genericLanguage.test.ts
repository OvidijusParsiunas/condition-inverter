import { IfInverter } from '../../../../shared/out/inverter/src/ifInverter';
import * as assert from 'assert';

// WORK - ternary operator inside an if statement
// WORK - funciton within an if statement
// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Generic Language Inversion Suite', () => {
  [
    { input: '', output: '' },
    { input: ' ', output: ' ' },
    { input: 'if (mouse && cat) { console.log(2) }', output: 'if (!mouse || !cat) { console.log(2) }' },
    { input: 'if (mouse &&cat) { console.log(2) }', output: 'if (!mouse ||!cat) { console.log(2) }' },
    { input: 'if(mouse && cat) { console.log(2) }', output: 'if(!mouse || !cat) { console.log(2) }' },
    { input: 'if(mouse &&cat) { console.log(2) }', output: 'if(!mouse ||!cat) { console.log(2) }' },
    { input: 'if (dog && cat) { console.log(2) }', output: 'if (!dog || !cat) { console.log(2) }' },
    { input: 'if (dog && cat || mouse) { console.log(2) }', output: 'if (!dog || !cat && !mouse) { console.log(2) }' },
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
    { input: 'if (mouse < cat) { console.log(2) }', output: 'if (mouse >= cat) { console.log(2) }' },
    {
      input: 'if (mouse > cat) { console.log(2) }',
      output: 'if (mouse <= cat) { console.log(2) }',
    },
    { input: 'if (mouse <= cat) { console.log(2) }', output: 'if (mouse > cat) { console.log(2) }' },
    {
      input: 'if (mouse <= cat || hello) { console.log(2) }',
      output: 'if (mouse > cat && !hello) { console.log(2) }',
    },
    { input: 'if (hello || mouse <= cat) { console.log(2) }', output: 'if (!hello && mouse > cat) { console.log(2) }' },
    { input: 'if (hello || (mouse <= cat)) { console.log(2) }', output: 'if (!hello && (mouse > cat)) { console.log(2) }' },
    {
      input: 'if (hello || ((mouse <= cat))) { console.log(2) }',
      output: 'if (!hello && ((mouse > cat))) { console.log(2) }',
    },
    {
      input: 'if (hello || (mouse <= cat && mouse - cat)) { console.log(2) }',
      output: 'if (!hello && !(mouse <= cat && mouse - cat)) { console.log(2) }',
    },
    {
      input: 'if (hello || (mouse <= cat && (mouse - cat))) { console.log(2) }',
      output: 'if (!hello && !(mouse <= cat && (mouse - cat))) { console.log(2) }',
    },
    {
      input: 'if ((hello) === (2) && start || number < 2 && hello && end) { console.log(2) }',
      output: 'if ((hello) !== (2) || !start && number >= 2 || !hello || !end) { console.log(2) }',
    },
    {
      input: 'if ((hello) !== (2) && start || number != 2 && hello && end) { console.log(2) }',
      output: 'if ((hello) === (2) || !start && number == 2 || !hello || !end) { console.log(2) }',
    },
    {
      input: 'if ((hello) !== (2) && !start || number != 2 && hello && end) { console.log(2) }',
      output: 'if ((hello) === (2) || start && number == 2 || !hello || !end) { console.log(2) }',
    },
    {
      input: 'if (hello || (mouse <= cat && ((mouse - cat)))) { console.log(2) }',
      output: 'if (!hello && !(mouse <= cat && ((mouse - cat)))) { console.log(2) }',
    },
    {
      input: 'if ((mouse <= cat && mouse - cat) || hello) { console.log(2) }',
      output: 'if (!(mouse <= cat && mouse - cat) && !hello) { console.log(2) }',
    },
    {
      input: 'if ((mouse <= cat && (mouse - cat)) || hello) { console.log(2) }',
      output: 'if (!(mouse <= cat && (mouse - cat)) && !hello) { console.log(2) }',
    },
    {
      input: 'if ((mouse <= cat && ((mouse - cat))) || hello) { console.log(2) }',
      output: 'if (!(mouse <= cat && ((mouse - cat))) && !hello) { console.log(2) }',
    },
    {
      input: 'if (  (mouse <= cat &&   (    (mouse   -   cat)    )  ) || hello  ) { console.log(2) }',
      output: 'if (  !(mouse <= cat &&   (    (mouse   -   cat)    )  ) && !hello  ) { console.log(2) }',
    },
    {
      input: 'if (((mouse <= cat) && ((mouse - cat))) || hello) { console.log(2) }',
      output: 'if (!((mouse <= cat) && ((mouse - cat))) && !hello) { console.log(2) }',
    },
    {
      input: 'if (((mouse - cat) && ((mouse - cat))) || hello) { console.log(2) }',
      output: 'if (!((mouse - cat) && ((mouse - cat))) && !hello) { console.log(2) }',
    },
    {
      input: 'if  (  (  (mouse - cat) && (  (mouse - cat) )    ) ||   hello  ) { console.log(2) }',
      output: 'if  (  !(  (mouse - cat) && (  (mouse - cat) )    ) &&   !hello  ) { console.log(2) }',
    },
    {
      input: 'if (((mouse - cat) && ((mouse - cat)) && ((mouse - cat) && ((mouse - cat)))) || hello) { console.log(2) }',
      output: 'if (!((mouse - cat) && ((mouse - cat)) && ((mouse - cat) && ((mouse - cat)))) && !hello) { console.log(2) }',
    },
    {
      input: 'if (  (mouse <= cat &&   (    (mouse   -   cat)    )  ) || hello  ) { console.log(2) }',
      output: 'if (  !(mouse <= cat &&   (    (mouse   -   cat)    )  ) && !hello  ) { console.log(2) }',
    },
    {
      input: 'if (((mouse <= cat) && ((mouse - cat))) || hello) { console.log(2) }',
      output: 'if (!((mouse <= cat) && ((mouse - cat))) && !hello) { console.log(2) }',
    },
    {
      input: 'if (((mouse - cat) && ((mouse - cat))) || hello) { console.log(2) }',
      output: 'if (!((mouse - cat) && ((mouse - cat))) && !hello) { console.log(2) }',
    },
    {
      input: 'if  (  (  (mouse - cat) && (  (mouse - cat) )    ) ||   hello  ) { console.log(2) }',
      output: 'if  (  !(  (mouse - cat) && (  (mouse - cat) )    ) &&   !hello  ) { console.log(2) }',
    },
    {
      input: 'if (((mouse - cat) && ((mouse - cat)) && ((mouse - cat) && ((mouse - cat)))) || hello) { console.log(2) }',
      output: 'if (!((mouse - cat) && ((mouse - cat)) && ((mouse - cat) && ((mouse - cat)))) && !hello) { console.log(2) }',
    },
    {
      input: 'if (((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat)))) { console.log(2) }',
      output: 'if (!((mouse - cat) && ((mouse - cat))) && !((mouse - cat) && ((mouse - cat)))) { console.log(2) }',
    },
    {
      input:
        // eslint-disable-next-line max-len
        'if ((((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat)))) && (((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat))))) { console.log(2) }',
      output:
        // eslint-disable-next-line max-len
        'if (!(((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat)))) || !(((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat))))) { console.log(2) }',
    },
    {
      input: 'if (!!dog) { console.log(2) }',
      output: 'if (!(!!dog)) { console.log(2) }',
    },
    {
      input: 'if (!(!!dog)) { console.log(2) }',
      output: 'if (!!dog) { console.log(2) }',
    },
    {
      input: 'if (! !dog) { console.log(2) }',
      output: 'if (!(! !dog)) { console.log(2) }',
    },
    {
      input: 'if (!(! !dog)) { console.log(2) }',
      output: 'if (! !dog) { console.log(2) }',
    },
    {
      input: 'if (! !(dog)) { console.log(2) }',
      output: 'if (!(! !(dog))) { console.log(2) }',
    },
    {
      input: 'if (!(! !(dog))) { console.log(2) }',
      output: 'if (! !(dog)) { console.log(2) }',
    },
    {
      input: 'if (! !!! (dog)) { console.log(2) }',
      output: 'if (!(! !!! (dog))) { console.log(2) }',
    },
    {
      input: 'if (! !!!  (  dog != 1)) { console.log(2) }',
      output: 'if (!(! !!!  (  dog != 1))) { console.log(2) }',
    },
    {
      input: 'if (!!!!dog) { console.log(2) }',
      output: 'if (!(!!!!dog)) { console.log(2) }',
    },
    {
      input: 'if (!(!!!!dog)) { console.log(2) }',
      output: 'if (!!!!dog) { console.log(2) }',
    },
    {
      input: 'if (!!!(!!dog)) { console.log(2) }',
      output: 'if (!(!!!(!!dog))) { console.log(2) }',
    },
    {
      input: 'if (!!!(!!dog) && !!!(!!dog)) { console.log(2) }',
      output: 'if (!(!!!(!!dog)) || !(!!!(!!dog))) { console.log(2) }',
    },
    {
      input: 'if (!(!!!(!!dog)) || !(!!!(!!dog))) { console.log(2) }',
      output: 'if (!!!(!!dog) && !!!(!!dog)) { console.log(2) }',
    },
    {
      input: 'if (!!!(!!dog + 1) && !!!(!!dog)) { console.log(2) }',
      output: 'if (!(!!!(!!dog + 1)) || !(!!!(!!dog))) { console.log(2) }',
    },
    {
      input: 'if (!(!!!(!!dog + 1)) || !(!!!(!!dog))) { console.log(2) }',
      output: 'if (!!!(!!dog + 1) && !!!(!!dog)) { console.log(2) }',
    },
    {
      input: 'if (!!!(!!dog && cat) && !!!(!!dog)) { console.log(2) }',
      output: 'if (!(!!!(!!dog && cat)) || !(!!!(!!dog))) { console.log(2) }',
    },
    {
      input: 'if (!(!!!(!!dog && cat)) || !(!!!(!!dog))) { console.log(2) }',
      output: 'if (!!!(!!dog && cat) && !!!(!!dog)) { console.log(2) }',
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
      input: 'if (!!!!(dog)) { console.log(2) }',
      output: 'if (!(!!!!(dog))) { console.log(2) }',
    },
    {
      input: 'if (!!!  !(dog)) { console.log(2) }',
      output: 'if (!(!!!  !(dog))) { console.log(2) }',
    },
    {
      input: 'if (!(!!!!(dog))) { console.log(2) }',
      output: 'if (!!!!(dog)) { console.log(2) }',
    },
    {
      input: 'if (!(!!!!  (  dog))) { console.log(2) }',
      output: 'if (!!!!  (  dog)) { console.log(2) }',
    },
    {
      input: 'if (!!!!(dog != cat)) { console.log(2) }',
      output: 'if (!(!!!!(dog != cat))) { console.log(2) }',
    },
    {
      input: 'if (!!!!(dog != cat && cat - dog)) { console.log(2) }',
      output: 'if (!(!!!!(dog != cat && cat - dog))) { console.log(2) }',
    },
    {
      input: 'if (! !!  !(dog != cat && cat   - dog) ) { console.log(2) }',
      output: 'if (!(! !!  !(dog != cat && cat   - dog)) ) { console.log(2) }',
    },
    {
      input: 'if (!(!!!!(dog != cat && cat - dog)) && !(!!!!(dog != cat && cat - dog))) { console.log(2) }',
      output: 'if (!!!!(dog != cat && cat - dog) || !!!!(dog != cat && cat - dog)) { console.log(2) }',
    },
    {
      input: 'if (!!!+!(dog != cat)) { console.log(2) }',
      output: 'if (!(!!!+!(dog != cat))) { console.log(2) }',
    },
    {
      input: 'if (!(!!!+!(dog != cat))) { console.log(2) }',
      output: 'if (!!!+!(dog != cat)) { console.log(2) }',
    },
    {
      input: 'if (!!!  +  !!(dog !=   cat)) { console.log(2) }',
      output: 'if (!(!!!  +  !!(dog !=   cat))) { console.log(2) }',
    },
    {
      input: 'if (!!(!!  +  !!(dog !=   cat))) { console.log(2) }',
      output: 'if (!(!!(!!  +  !!(dog !=   cat)))) { console.log(2) }',
    },
    {
      input: 'if (!!!+!!(dog != cat)) { console.log(2) }',
      output: 'if (!(!!!+!!(dog != cat))) { console.log(2) }',
    },
    {
      input: 'if (!(!!!+!!(dog != cat))) { console.log(2) }',
      output: 'if (!!!+!!(dog != cat)) { console.log(2) }',
    },
    {
      input: 'if (!!!!!+(dog != cat)) { console.log(2) }',
      output: 'if (!(!!!!!+(dog != cat))) { console.log(2) }',
    },
    {
      input: 'if (!(!!!!!+(dog != cat))) { console.log(2) }',
      output: 'if (!!!!!+(dog != cat)) { console.log(2) }',
    },
    {
      input: 'if (+!!!!!(dog != cat)) { console.log(2) }',
      output: 'if (!(+!!!!!(dog != cat))) { console.log(2) }',
    },
    {
      input: 'if (!(+!!!!!(dog != cat))) { console.log(2) }',
      output: 'if (+!!!!!(dog != cat)) { console.log(2) }',
    },
    {
      input: 'if ((+!!!!!(dog != cat))) { console.log(2) }',
      output: 'if (!(+!!!!!(dog != cat))) { console.log(2) }',
    },
    {
      input: 'if ((-!!!!!(dog != cat))) { console.log(2) }',
      output: 'if (!(-!!!!!(dog != cat))) { console.log(2) }',
    },
    {
      input: 'if (( - !!!!!(dog != cat))) { console.log(2) }',
      output: 'if (!( - !!!!!(dog != cat))) { console.log(2) }',
    },
    {
      input: 'if (!( - !!!!!(dog != cat))) { console.log(2) }',
      output: 'if ( - !!!!!(dog != cat)) { console.log(2) }',
    },
    {
      input: 'if (!!!!(!(dog || cat)) || !!!!(!(dog || cat))) { console.log(2) }',
      output: 'if (!(!!!!(!(dog || cat))) && !(!!!!(!(dog || cat)))) { console.log(2) }',
    },
    {
      input: 'if (!!!!  (! (dog || cat) ) || !!  !!(! (dog || cat))) { console.log(2) }',
      output: 'if (!(!!!!  (! (dog || cat) )) && !(!!  !!(! (dog || cat)))) { console.log(2) }',
    },
    {
      input: 'if (!(!!!!(!(dog || cat))) && !(!!!!(!(dog || cat)))) { console.log(2) }',
      output: 'if (!!!!(!(dog || cat)) || !!!!(!(dog || cat))) { console.log(2) }',
    },
    {
      input: 'if (  !(!!! !(!(dog || cat))) && !(!! ! !(!(dog ||  cat) ))) { console.log(2) }',
      output: 'if (  !!! !(!(dog || cat)) || !! ! !(!(dog ||  cat) )) { console.log(2) }',
    },
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
      input: 'if (false) { console.log(1) }',
      output: 'if (true) { console.log(1) }',
    },
    {
      input: 'if (0) { console.log(1) }',
      output: 'if (1) { console.log(1) }',
    },
    {
      input: 'if (0123123) { console.log(1) }',
      output: 'if (!0123123) { console.log(1) }',
    },
    {
      input: 'if (0123123 && 0123123) { console.log(1) }',
      output: 'if (!0123123 || !0123123) { console.log(1) }',
    },
    {
      input: 'if (0123123 + 123213123) { console.log(1) }',
      output: 'if (!(0123123 + 123213123)) { console.log(1) }',
    },
    {
      input: 'if (1) { console.log(1) }',
      output: 'if (0) { console.log(1) }',
    },
    {
      input: 'if (0.0) { console.log(1) }',
      output: 'if (!0.0) { console.log(1) }',
    },
    {
      input: 'if (1_1) { console.log(1) }',
      output: 'if (!1_1) { console.log(1) }',
    },
    {
      input: 'if (0.0 + 2) { console.log(1) }',
      output: 'if (!(0.0 + 2)) { console.log(1) }',
    },
    {
      input: 'if (true) { console.log(1) }',
      output: 'if (false) { console.log(1) }',
    },
    {
      input: 'if (  !!  false  ) { console.log(1) }',
      output: 'if (  !(!!  false)  ) { console.log(1) }',
    },
    {
      input: 'if (!(!!  false)) { console.log(1) }',
      output: 'if (!!  false) { console.log(1) }',
    },
    {
      input: 'if (false && true) { console.log(1) }',
      output: 'if (true || false) { console.log(1) }',
    },
    {
      input: 'if (!(false && true)) { console.log(1) }',
      output: 'if (false && true) { console.log(1) }',
    },
    {
      input: 'if (false   &&   true) { console.log(1) }',
      output: 'if (true   ||   false) { console.log(1) }',
    },
    {
      input: 'if (!(false && true)) { console.log(1) }',
      output: 'if (false && true) { console.log(1) }',
    },
    {
      input: 'if (!(  false   &&   true  )) { console.log(1) }',
      output: 'if (  false   &&   true  ) { console.log(1) }',
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
      input: 'if ((2 < 5) && (4 > 2)) { console.log(1) }',
      output: 'if ((2 >= 5) || (4 <= 2)) { console.log(1) }',
    },
    {
      input: 'if ((2 >= 5) || (4 <= 2)) { console.log(1) }',
      output: 'if ((2 < 5) && (4 > 2)) { console.log(1) }',
    },
    {
      input: `if ('mouse' && cat) { console.log(2) }`,
      output: `if (!'mouse' || !cat) { console.log(2) }`,
    },
    {
      input: `if ('false' && cat) { console.log(2) }`,
      output: `if (!'false' || !cat) { console.log(2) }`,
    },
    {
      input: `if ('false && cat' && cat) { console.log(2) }`,
      output: `if (!'false && cat' || !cat) { console.log(2) }`,
    },
    {
      input: 'if (`false && cat` && cat) { console.log(2) }',
      output: 'if (!`false && cat` || !cat) { console.log(2) }',
    },
    {
      input: 'if ("false && cat" && cat) { console.log(2) }',
      output: 'if (!"false && cat" || !cat) { console.log(2) }',
    },
    {
      input: 'if ("false && `cat`" && `"cat"`) { console.log(2) }',
      output: 'if (!"false && `cat`" || !`"cat"`) { console.log(2) }',
    },
    {
      input: 'if (!"false && `cat`" || !`"cat"`) { console.log(2) }',
      output: 'if ("false && `cat`" && `"cat"`) { console.log(2) }',
    },
    {
      input: 'if ("1" + 2 && cat) { console.log(2) }',
      output: 'if (!("1" + 2) || !cat) { console.log(2) }',
    },
    {
      input: 'if (!("1" + 2) || !("1" + 2)) { console.log(2) }',
      output: 'if ("1" + 2 && "1" + 2) { console.log(2) }',
    },
    {
      input: `if ('if (!("1" + 2) || !("1" + 2)) { console.log(2) }' && cat) { console.log(2) }`,
      output: `if (!'if (!("1" + 2) || !("1" + 2)) { console.log(2) }' || !cat) { console.log(2) }`,
    },
    {
      input: `if (!'if (!("1" + 2) || !("1" + 2)) { console.log(2) }' || !cat) { console.log(2) }`,
      output: `if ('if (!("1" + 2) || !("1" + 2)) { console.log(2) }' && cat) { console.log(2) }`,
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
    {
      input: 'if ((1) && (12)) { console.log(1) }     if ((1) && (12)) { console.log(1) }',
      output: 'if (!(1) || !(12)) { console.log(1) }     if (!(1) || !(12)) { console.log(1) }',
    },
    {
      input: 'if (dog==cat) { console.log(1) }',
      output: 'if (dog!=cat) { console.log(1) }',
    },
    {
      input: 'if (dog===cat) { console.log(1) }',
      output: 'if (dog!==cat) { console.log(1) }',
    },
    {
      input: 'if (dog!=cat) { console.log(1) }',
      output: 'if (dog==cat) { console.log(1) }',
    },
    {
      input: 'if (dog!==cat) { console.log(1) }',
      output: 'if (dog===cat) { console.log(1) }',
    },
    {
      input: 'if (dog>cat) { console.log(1) }',
      output: 'if (dog<=cat) { console.log(1) }',
    },
    {
      input: 'if (dog>=cat) { console.log(1) }',
      output: 'if (dog<cat) { console.log(1) }',
    },
    {
      input: 'if (dog<cat) { console.log(1) }',
      output: 'if (dog>=cat) { console.log(1) }',
    },
    {
      input: 'if (dog<=cat) { console.log(1) }',
      output: 'if (dog>cat) { console.log(1) }',
    },
    {
      input: 'if (dog==cat&&fish) { console.log(1) }',
      output: 'if (dog!=cat||!fish) { console.log(1) }',
    },
    {
      input: 'if (dog==cat&&!fish) { console.log(1) }',
      output: 'if (dog!=cat||fish) { console.log(1) }',
    },
    {
      input: 'if (dog==cat||fish) { console.log(1) }',
      output: 'if (dog!=cat&&!fish) { console.log(1) }',
    },
    {
      input: 'if (dog==cat||!fish) { console.log(1) }',
      output: 'if (dog!=cat&&fish) { console.log(1) }',
    },
    {
      input: 'if () { console.log(2) }',
      output: 'if () { console.log(2) }',
    },
    {
      input: 'if (  ) { console.log(2) }',
      output: 'if (  ) { console.log(2) }',
    },
    {
      input: 'if ( ( (dog  ) ) ) { console.log(2) }',
      output: 'if ( ( (!dog  ) ) ) { console.log(2) }',
    },
    {
      input: 'if ( ( (dog || cat) ) ) { console.log(2) }',
      output: 'if ( ( (!dog && !cat) ) ) { console.log(2) }',
    },
    {
      input: 'if ( ( (dog || cat && (fish)) ) ) { console.log(2) }',
      output: 'if ( ( (!dog && !cat || !(fish)) ) ) { console.log(2) }',
    },
    {
      input: 'if ( ( ((dog || cat) && (fish)) ) ) { console.log(2) }',
      output: 'if ( ( (!(dog || cat) || !(fish)) ) ) { console.log(2) }',
    },
    {
      input: 'if (dog << cat) { console.log(2) }',
      output: 'if (!(dog << cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog << cat)) { console.log(2) }',
      output: 'if (dog << cat) { console.log(2) }',
    },
    {
      input: 'if (dog >> cat) { console.log(2) }',
      output: 'if (!(dog >> cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog >> cat)) { console.log(2) }',
      output: 'if (dog >> cat) { console.log(2) }',
    },
    {
      input: 'if (dog >>> cat) { console.log(2) }',
      output: 'if (!(dog >>> cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog >>> cat)) { console.log(2) }',
      output: 'if (dog >>> cat) { console.log(2) }',
    },
    {
      input: 'if (dog & cat) { console.log(2) }',
      output: 'if (!(dog & cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog & cat)) { console.log(2) }',
      output: 'if (dog & cat) { console.log(2) }',
    },
    {
      input: 'if (dog | cat) { console.log(2) }',
      output: 'if (!(dog | cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog | cat)) { console.log(2) }',
      output: 'if (dog | cat) { console.log(2) }',
    },
    {
      input: 'if (dog ^ cat) { console.log(2) }',
      output: 'if (!(dog ^ cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog ^ cat)) { console.log(2) }',
      output: 'if (dog ^ cat) { console.log(2) }',
    },
    {
      input: 'if (~dog) { console.log(2) }',
      output: 'if (!(~dog)) { console.log(2) }',
    },
    {
      input: 'if (!(~dog)) { console.log(2) }',
      output: 'if (~dog) { console.log(2) }',
    },
    {
      input: 'if (testFunc()) { console.log(2) }',
      output: 'if (!testFunc()) { console.log(2) }',
    },
    {
      input: 'if ((testFunc())) { console.log(2) }',
      output: 'if ((!testFunc())) { console.log(2) }',
    },
    {
      input: 'if (testFunc(true)) { console.log(2) }',
      output: 'if (!testFunc(true)) { console.log(2) }',
    },
    {
      input: 'if ((testFunc(true))) { console.log(2) }',
      output: 'if ((!testFunc(true))) { console.log(2) }',
    },
    {
      input: 'if (testFunc(dog && cat)) { console.log(2) }',
      output: 'if (!testFunc(dog && cat)) { console.log(2) }',
    },
    {
      input: 'if (testFunc(dog < cat)) { console.log(2) }',
      output: 'if (!testFunc(dog < cat)) { console.log(2) }',
    },
    {
      input: 'if ((testFunc(dog < cat))) { console.log(2) }',
      output: 'if ((!testFunc(dog < cat))) { console.log(2) }',
    },
    {
      input: 'if (testFunc(dog === cat)) { console.log(2) }',
      output: 'if (!testFunc(dog === cat)) { console.log(2) }',
    },
    {
      input: 'if ((testFunc(dog === cat))) { console.log(2) }',
      output: 'if ((!testFunc(dog === cat))) { console.log(2) }',
    },
    {
      input: 'if (testFunc((dog < cat))) { console.log(2) }',
      output: 'if (!testFunc((dog < cat))) { console.log(2) }',
    },
    {
      input: 'if ((testFunc((dog < cat)))) { console.log(2) }',
      output: 'if ((!testFunc((dog < cat)))) { console.log(2) }',
    },
    {
      input: 'if (testFunc(testFunc2(dog < cat))) { console.log(2) }',
      output: 'if (!testFunc(testFunc2(dog < cat))) { console.log(2) }',
    },
    {
      input: 'if ((testFunc(testFunc2(dog < cat)))) { console.log(2) }',
      output: 'if ((!testFunc(testFunc2(dog < cat)))) { console.log(2) }',
    },
    {
      input: 'if (!(testFunc(testFunc2(dog < cat))) || !(testFunc(testFunc2(dog < cat)))) { console.log(2) }',
      output: 'if (testFunc(testFunc2(dog < cat)) && testFunc(testFunc2(dog < cat))) { console.log(2) }',
    },
    {
      input: 'if ((!(testFunc(testFunc2(dog < cat))) || !(testFunc(testFunc2(dog < cat))))) { console.log(2) }',
      output: 'if ((testFunc(testFunc2(dog < cat)) && testFunc(testFunc2(dog < cat)))) { console.log(2) }',
    },
    {
      input: 'if (testFunc.bind(dog < cat)) { console.log(2) }',
      output: 'if (!testFunc.bind(dog < cat)) { console.log(2) }',
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
      input: 'if (dog %= cat) { console.log(2) }',
      output: 'if (!(dog %= cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog %= cat)) { console.log(2) }',
      output: 'if (dog %= cat) { console.log(2) }',
    },
    {
      input: 'if (dog += cat) { console.log(2) }',
      output: 'if (!(dog += cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog += cat)) { console.log(2) }',
      output: 'if (dog += cat) { console.log(2) }',
    },
    {
      input: 'if (dog -= cat) { console.log(2) }',
      output: 'if (!(dog -= cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog -= cat)) { console.log(2) }',
      output: 'if (dog -= cat) { console.log(2) }',
    },
    {
      input: 'if (dog *= cat) { console.log(2) }',
      output: 'if (!(dog *= cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog *= cat)) { console.log(2) }',
      output: 'if (dog *= cat) { console.log(2) }',
    },
    {
      input: 'if (dog /= cat) { console.log(2) }',
      output: 'if (!(dog /= cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog /= cat)) { console.log(2) }',
      output: 'if (dog /= cat) { console.log(2) }',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = IfInverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
