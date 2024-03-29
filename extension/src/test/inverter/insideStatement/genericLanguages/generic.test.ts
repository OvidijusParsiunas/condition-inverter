import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// when the user highlights arbitrary conditions using the extension:
// we can expand the selection to check if it is wihtin an if statement/while loop etc
// the user may highlight a condition that is not inside any of these, then the strategy is to see if the highlighted text has conditions

// when the user inserts arbitrary text into website - we need to execute the following strategy
// if no if statements/while within text, proceed to look for conditions
// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Generic Inversion Suite', () => {
  [
    { input: '', output: '' },
    { input: ' ', output: ' ' },
    { input: 'if (mouse && cat) { console.log(2) }', output: 'if (!mouse || !cat) { console.log(2) }' },
    { input: 'if (mouse &&cat) { console.log(2) }', output: 'if (!mouse ||!cat) { console.log(2) }' },
    { input: 'if(mouse && cat) { console.log(2) }', output: 'if(!mouse || !cat) { console.log(2) }' },
    { input: 'if(mouse &&cat) { console.log(2) }', output: 'if(!mouse ||!cat) { console.log(2) }' },
    { input: 'if (dog && cat) { console.log(2) }', output: 'if (!dog || !cat) { console.log(2) }' },
    { input: 'if (dog && cat || mouse) { console.log(2) }', output: 'if (!dog || !cat && !mouse) { console.log(2) }' },
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
      input: 'if (dog | cat) { console.log(2) }',
      output: 'if (!(dog | cat)) { console.log(2) }',
    },
    {
      input: 'if (!(dog | cat)) { console.log(2) }',
      output: 'if (dog | cat) { console.log(2) }',
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
      input: `if ({ dog: cat }) { console.log(2) }`,
      output: 'if (!{ dog: cat }) { console.log(2) }',
    },
    {
      input: `if (!{ dog: cat }) { console.log(2) }`,
      output: 'if ({ dog: cat }) { console.log(2) }',
    },
    {
      input: `if ({ dog: 'cat' }) { console.log(2) }`,
      output: `if (!{ dog: 'cat' }) { console.log(2) }`,
    },
    {
      input: `if (!{ dog: 'cat' }) { console.log(2) }`,
      output: `if ({ dog: 'cat' }) { console.log(2) }`,
    },
    {
      input: `if ({ dog: 'cat' } && { cat: 'dog' }) { console.log(2) }`,
      output: `if (!{ dog: 'cat' } || !{ cat: 'dog' }) { console.log(2) }`,
    },
    {
      input: `if (!{ dog: 'cat' } || !{ cat: 'dog' }) { console.log(2) }`,
      output: `if ({ dog: 'cat' } && { cat: 'dog' }) { console.log(2) }`,
    },
    {
      input: `if ({ dog }) { console.log(2) }`,
      output: 'if (!{ dog }) { console.log(2) }',
    },
    {
      input: `if (dog.cat) { console.log(2) }`,
      output: 'if (!dog.cat) { console.log(2) }',
    },
    {
      input: `if (!dog.cat) { console.log(2) }`,
      output: 'if (dog.cat) { console.log(2) }',
    },
    {
      input: `if (dog.cat + 2) { console.log(2) }`,
      output: 'if (!(dog.cat + 2)) { console.log(2) }',
    },
    {
      input: `if (!(dog.cat + 2)) { console.log(2) }`,
      output: 'if (dog.cat + 2) { console.log(2) }',
    },
    {
      input: `if (dog.cat()) { console.log(2) }`,
      output: 'if (!dog.cat()) { console.log(2) }',
    },
    {
      input: `if (!dog.cat()) { console.log(2) }`,
      output: 'if (dog.cat()) { console.log(2) }',
    },
    {
      input: `if (dog.cat() + 2) { console.log(2) }`,
      output: 'if (!(dog.cat() + 2)) { console.log(2) }',
    },
    {
      input: `if (!(dog.cat() + 2)) { console.log(2) }`,
      output: 'if (dog.cat() + 2) { console.log(2) }',
    },
    {
      input: `if (dog === [1,2,3,4]) { console.log(2) }`,
      output: 'if (dog !== [1,2,3,4]) { console.log(2) }',
    },
    {
      input: `if ([1,2,3,4] !== dog) { console.log(2) }`,
      output: 'if ([1,2,3,4] === dog) { console.log(2) }',
    },
    {
      input: `if (cat(...[1,2,3,4])) { console.log(2) }`,
      output: 'if (!cat(...[1,2,3,4])) { console.log(2) }',
    },
    {
      input: `if (!cat(...[1,2,3,4])) { console.log(2) }`,
      output: 'if (cat(...[1,2,3,4])) { console.log(2) }',
    },
    {
      input: `if (+true) { console.log(2) }`,
      output: 'if (!(+true)) { console.log(2) }',
    },
    {
      input: `if ({ name } = cat) { console.log(2) }`,
      output: 'if (!({ name } = cat)) { console.log(2) }',
    },
    {
      input: `if (!({ name } = cat)) { console.log(2) }`,
      output: 'if ({ name } = cat) { console.log(2) }',
    },
    {
      input: `if ({ name } = cat && cat) { console.log(2) }`,
      output: 'if (!({ name } = cat) || !cat) { console.log(2) }',
    },
    {
      input: `if ({ name } = cat === true) { console.log(2) }`,
      output: 'if ({ name } = cat !== true) { console.log(2) }',
    },
    {
      input: `if (dog ? cat : fish) { console.log(2) }`,
      output: 'if (!dog ? cat : fish) { console.log(2) }',
    },
    {
      input: `if ((dog ? cat : fish) && cat) { console.log(2) }`,
      output: 'if (!(dog ? cat : fish) || !cat) { console.log(2) }',
    },
    {
      input: `if (((dog ? cat : fish)) && cat) { console.log(2) }`,
      output: 'if (!((dog ? cat : fish)) || !cat) { console.log(2) }',
    },
    {
      input: `if (dog && cat ? cat : fish) { console.log(2) }`,
      output: 'if (!dog || !cat ? cat : fish) { console.log(2) }',
    },
    {
      input: `if (hello && dog && cat ? cat : fish) { console.log(2) }`,
      output: 'if (!hello || !dog || !cat ? cat : fish) { console.log(2) }',
    },
    {
      input: `if (dog ? cat() : fish()) { console.log(2) }`,
      output: 'if (!dog ? cat() : fish()) { console.log(2) }',
    },
    {
      input: `if (dog ? cat(cat === fish) : fish()) { console.log(2) }`,
      output: 'if (!dog ? cat(cat === fish) : fish()) { console.log(2) }',
    },
    {
      input: `if (cat && (dog ? cat : fish)) { console.log(2) }`,
      output: 'if (!cat || !(dog ? cat : fish)) { console.log(2) }',
    },
    {
      input: `if (dog ? cat ? fish : fish : cat ? fish : fish) { console.log(2) }`,
      output: 'if (!dog ? cat ? fish : fish : cat ? fish : fish) { console.log(2) }',
    },
    {
      input: `if (dog ? cat ? fish : dog() ? cat() : cat() : cat ? fish : fish) { console.log(2) }`,
      output: 'if (!dog ? cat ? fish : dog() ? cat() : cat() : cat ? fish : fish) { console.log(2) }',
    },
    {
      input: `if (dog ? cat ? fish : (dog() ? cat() : cat()) : cat ? dog(true) ? cat(false) : cat(false) : fish) { console.log(2) }`,
      output: 'if (!dog ? cat ? fish : (dog() ? cat() : cat()) : cat ? dog(true) ? cat(false) : cat(false) : fish) { console.log(2) }',
    },
    {
      input: `if ((dog ? cat : fish)) { console.log(2) }`,
      output: 'if ((!dog ? cat : fish)) { console.log(2) }',
    },
    {
      input: `if ((!dog ? cat : fish)) { console.log(2) }`,
      output: 'if ((dog ? cat : fish)) { console.log(2) }',
    },
    {
      input: `if (mouse \n? mouse : cat)`,
      output: 'if (!mouse \n? mouse : cat)',
    },
    {
      input: `if (mouse ? mouse && cat : mouse && cat)`,
      output: 'if (!mouse ? mouse && cat : mouse && cat)',
    },
    {
      input: `if ((mouse ? mouse && cat : (mouse && cat)) && cat)`,
      output: 'if (!(mouse ? mouse && cat : (mouse && cat)) || !cat)',
    },
    {
      input: `if ((mouse ? mouse && cat : (mouse && cat)) && cat)`,
      output: 'if (!(mouse ? mouse && cat : (mouse && cat)) || !cat)',
    },
    {
      input: `if (((mouse ? mouse && cat : (mouse && cat))) && cat)`,
      output: 'if (!((mouse ? mouse && cat : (mouse && cat))) || !cat)',
    },
    {
      input: `if ((mouse ? mouse && cat : ((mouse && cat))) && cat)`,
      output: 'if (!(mouse ? mouse && cat : ((mouse && cat))) || !cat)',
    },
    {
      input: `if (dog && (mouse ? mouse && cat : (mouse && cat)) && cat)`,
      output: 'if (!dog || !(mouse ? mouse && cat : (mouse && cat)) || !cat)',
    },
    {
      input: `if (dog && (mouse ? mouse && cat : ((mouse && cat))) && cat)`,
      output: 'if (!dog || !(mouse ? mouse && cat : ((mouse && cat))) || !cat)',
    },
    {
      input: `if (dog && ((mouse ? mouse && cat : (mouse && cat))) && cat)`,
      output: 'if (!dog || !((mouse ? mouse && cat : (mouse && cat))) || !cat)',
    },
    {
      input: `if (dog &&   (  (  mouse ? mouse && cat : (  mouse && cat)  )  )   && cat)`,
      output: 'if (!dog ||   !(  (  mouse ? mouse && cat : (  mouse && cat)  )  )   || !cat)',
    },
    {
      input: `if (mouse && cat ? mouse || cat : cat) { console.log(2) }`,
      output: 'if (!mouse || !cat ? mouse || cat : cat) { console.log(2) }',
    },
    {
      input: `if (mouse && cat ? mouse || cat : () => { if (cat || dog) { console.log('hello'); } }) { console.log(2) }`,
      output: `if (!mouse || !cat ? mouse || cat : () => { if (cat || dog) { console.log('hello'); } }) { console.log(2) }`,
    },
    {
      input: `if (mouse && cat ? mouse || cat : (): void => { if (cat || dog) { console.log('hello'); } }) { console.log(2) }`,
      output: `if (!mouse || !cat ? mouse || cat : (): void => { if (cat || dog) { console.log('hello'); } }) { console.log(2) }`,
    },
    {
      input: `if ((dog) ? cat : fish) { console.log(2) }`,
      output: 'if (!(dog) ? cat : fish) { console.log(2) }',
    },
    {
      input: `if (1 > 2) { console.log(2) }`,
      output: 'if (1 <= 2) { console.log(2) }',
    },
    {
      input: `if (true > false) { console.log(2) }`,
      output: 'if (true <= false) { console.log(2) }',
    },
    {
      input: `if (1 <= 2) { console.log(2) }`,
      output: 'if (1 > 2) { console.log(2) }',
    },
    {
      input: `if (true <= false) { console.log(2) }`,
      output: 'if (true > false) { console.log(2) }',
    },
    {
      input: `if (true > false && true) { console.log(2) }`,
      output: 'if (true <= false || false) { console.log(2) }',
    },
    { input: 'for (let i = 0; i < dog; i += 1) { console.log(2) }', output: 'for (let i = 0; i >= dog; i += 1) { console.log(2) }' },
    { input: 'for (let i = 0;i < dog;i += 1) { console.log(2) }', output: 'for (let i = 0;i >= dog;i += 1) { console.log(2) }' },
    {
      input: 'for  ( let  i  =  0 ;  i  <  dog ;  i  +=  1 )  { console.log(2) }',
      output: 'for  ( let  i  =  0 ;  i  >=  dog ;  i  +=  1 )  { console.log(2) }',
    },
    {
      input: `if ((!true || (!(100 / 5) == 20) || ((328 / 4) == 82))) || false)`,
      output: `if ((true && (!(100 / 5) != 20) && ((328 / 4) != 82))) && true)`,
    },
    { input: 'for (let i = 0; ((dog)); i += 1) { console.log(2) }', output: 'for (let i = 0; ((!dog)); i += 1) { console.log(2) }' },
    { input: 'for (; i < dog; i += 1) { console.log(2) }', output: 'for (; i >= dog; i += 1) { console.log(2) }' },
    { input: 'for (dog in cat) { console.log(2) }', output: 'for (dog in cat) { console.log(2) }' },
    { input: 'for (const dog in cat) { console.log(2) }', output: 'for (const dog in cat) { console.log(2) }' },
    { input: 'for (dog of cat) { console.log(2) }', output: 'for (dog of cat) { console.log(2) }' },
    { input: `for (let i = 0; (); i += 1) console.log('hi')`, output: `for (let i = 0; (); i += 1) console.log('hi')` },
    { input: 'isNaN(width) || isNaN(height)) { console.log(2) }', output: '!isNaN(width) && !isNaN(height)) { console.log(2) }' },
    { input: 'throw (dog && cat)', output: 'throw (!dog || !cat)' },
    { input: `if (dog) { } dog ? cat : dog`, output: `if (!dog) { } !dog ? cat : dog` },
    { input: `if (		dog && 		cat)`, output: `if (		!dog || 		!cat)` },
    { input: `if (\t\tdog &&\t\tcat)`, output: `if (\t\t!dog ||\t\t!cat)` },
    { input: `if (\r\rdog &&\r\rcat)`, output: `if (\r\r!dog ||\r\r!cat)` },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
