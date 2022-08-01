import { Inverter } from '../shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Generic Language Nested Function Inversion Suite', () => {
  [
    {
      input: 'if (function() { console.log(2) }) { console.log(2) }',
      output: 'if (!(function() { console.log(2) })) { console.log(2) }',
    },
    {
      input: 'if (!(function() { console.log(2) })) { console.log(2) }',
      output: 'if (function() { console.log(2) }) { console.log(2) }',
    },
    {
      input: 'if (dog && function() { console.log() }) { console.log(2) }',
      output: 'if (!dog || !(function() { console.log() })) { console.log(2) }',
    },
    {
      input: 'if (dog&&function() { console.log() }) { console.log(2) }',
      output: 'if (!dog||!(function() { console.log() })) { console.log(2) }',
    },
    {
      input: 'if (function() { console.log() } && dog) { console.log }',
      output: 'if (!(function() { console.log() }) || !dog) { console.log }',
    },
    {
      input: 'if (function() { console.log() }&& dog) { console.log }',
      output: 'if (!(function() { console.log() })|| !dog) { console.log }',
    },
    {
      input: 'if (function  (  )   {   console.log() }   &&    dog) { console.log }',
      output: 'if (!(function  (  )   {   console.log() })   ||    !dog) { console.log }',
    },
    {
      input: 'if (!(function  (  )   {   console.log() })   ||    !dog) { console.log }',
      output: 'if (function  (  )   {   console.log() }   &&    dog) { console.log }',
    },
    {
      input: `if (function({ dog: 'labrador'}) { console.log(2) }) { console.log(2) }`,
      output: `if (!(function({ dog: 'labrador'}) { console.log(2) })) { console.log(2) }`,
    },
    {
      input: `if (!(function({ dog: 'labrador'}) { console.log(2) })) { console.log(2) }`,
      output: `if (function({ dog: 'labrador'}) { console.log(2) }) { console.log(2) }`,
    },
    {
      input: 'if (function(param) { console.log(2) }) { console.log(2) }',
      output: 'if (!(function(param) { console.log(2) })) { console.log(2) }',
    },
    {
      input: 'if (function(param1, param2) { console.log(2) }) { console.log(2) }',
      output: 'if (!(function(param1, param2) { console.log(2) })) { console.log(2) }',
    },
    {
      input: 'if (function(param1: number, param2: string) { console.log(2) }) { console.log(2) }',
      output: 'if (!(function(param1: number, param2: string) { console.log(2) })) { console.log(2) }',
    },
    {
      input: 'if (function(param1: () => void, param2: (param1) => string) { console.log(2) }) { console.log(2) }',
      output: 'if (!(function(param1: () => void, param2: (param1) => string) { console.log(2) })) { console.log(2) }',
    },
    {
      input: 'if (function(param: { myObject: number }) { console.log(2) }) { console.log(2) }',
      output: 'if (!(function(param: { myObject: number }) { console.log(2) })) { console.log(2) }',
    },
    {
      input: 'if (function(param: number|string) { console.log(2) }) { console.log(2) }',
      output: 'if (!(function(param: number|string) { console.log(2) })) { console.log(2) }',
    },
    {
      input: 'if (function(param: number|string): void { console.log(2) }) { console.log(2) }',
      output: 'if (!(function(param: number|string): void { console.log(2) })) { console.log(2) }',
    },
    {
      input: 'if (function myFunc(param: number|string): void { console.log(2) }) { console.log(2) }',
      output: 'if (!(function myFunc(param: number|string): void { console.log(2) })) { console.log(2) }',
    },
    {
      input: 'if (function() { if (hello) { console.log(2) } }) { console.log(2) }',
      output: 'if (!(function() { if (hello) { console.log(2) } })) { console.log(2) }',
    },
    {
      input: 'if (() => { console.log(2) }) { console.log(2) }',
      output: 'if (!(() => { console.log(2) })) { console.log(2) }',
    },
    {
      input: `if (({dog: 'cat'}) => { console.log(2) }) { console.log(2) }`,
      output: `if (!(({dog: 'cat'}) => { console.log(2) })) { console.log(2) }`,
    },
    {
      input: `if ((param1: number, param2: string) => { console.log(2) }) { console.log(2) }`,
      output: `if (!((param1: number, param2: string) => { console.log(2) })) { console.log(2) }`,
    },
    {
      input: `if ((param1: (param: { 'dog': true, 'cat': number, 'fish': 'fish'}) => number, param2: string) => { console.log(2) }) {}`,
      output: `if (!((param1: (param: { 'dog': true, 'cat': number, 'fish': 'fish'}) => number, param2: string) => { console.log(2) })) {}`,
    },
    {
      input: `if ((): void => { console.log(2) }) { console.log(2) }`,
      output: `if (!((): void => { console.log(2) })) { console.log(2) }`,
    },
    {
      input: 'if (() => { console.log(2) } + 2) { console.log(2) }',
      output: 'if (!(() => { console.log(2) } + 2)) { console.log(2) }',
    },
    {
      input: 'if (2 + () => { console.log(2) }) { console.log(2) }',
      output: 'if (!(2 + () => { console.log(2) })) { console.log(2) }',
    },
    {
      input: 'if (dog && () => { console.log(2) }) { console.log(2) }',
      output: 'if (!dog || !(() => { console.log(2) })) { console.log(2) }',
    },
    {
      input: 'if (() => { let fish = dog && cat }) { console.log(2) }',
      output: 'if (!(() => { let fish = dog && cat })) { console.log(2) }',
    },
    {
      input: 'if ((() => { let fish = dog && cat })) { console.log(2) }',
      output: 'if (!(() => { let fish = dog && cat })) { console.log(2) }',
    },
    {
      input: 'if (dog && () => { console.log(2) }) { console.log(2) }',
      output: 'if (!dog || !(() => { console.log(2) })) { console.log(2) }',
    },
    {
      input: 'if (() => { console.log(2) } && dog) { console.log(2) }',
      output: 'if (!(() => { console.log(2) }) || !dog) { console.log(2) }',
    },
    {
      input: 'if (!(() => { console.log(2) })) { console.log(2) }',
      output: 'if (() => { console.log(2) }) { console.log(2) }',
    },
    {
      input: 'if (() => ( console.log(2) )) { console.log(2) }',
      output: 'if (!(() => ( console.log(2) ))) { console.log(2) }',
    },
    {
      input: 'if (!(() => ( console.log(2) ))) { console.log(2) }',
      output: 'if (() => ( console.log(2) )) { console.log(2) }',
    },
    {
      input: 'if (() => ( console.log(2) )()) { console.log(2) }',
      output: 'if (!(() => ( console.log(2) )())) { console.log(2) }',
    },
    {
      input: 'if (!(() => ( console.log(2) )())) { console.log(2) }',
      output: 'if (() => ( console.log(2) )()) { console.log(2) }',
    },
    {
      input: 'if (() => ( console.log(2) )(this)) { console.log(2) }',
      output: 'if (!(() => ( console.log(2) )(this))) { console.log(2) }',
    },
    {
      input: 'if (!(() => ( console.log(2) )(this))) { console.log(2) }',
      output: 'if (() => ( console.log(2) )(this)) { console.log(2) }',
    },
    {
      input: 'if (() => console.log(2) + 2) { console.log(2) }',
      output: 'if (!(() => console.log(2) + 2)) { console.log(2) }',
    },
    {
      input: 'if (2 + () => console.log(2) + 2) { console.log(2) }',
      output: 'if (!(2 + () => console.log(2) + 2)) { console.log(2) }',
    },
    {
      input: 'if (dog && () => console.log(2) + 2) { console.log(2) }',
      output: 'if (!dog || !(() => console.log(2) + 2)) { console.log(2) }',
    },
    {
      input: `if ((function () { if ('hello') {} }) => console.log(2)) { console.log(2) }`,
      output: `if (!((function () { if ('hello') {} }) => console.log(2))) { console.log(2) }`,
    },
    {
      input: `if (async() => { console.log(2) }) { console.log(2) }`,
      output: `if (!(async() => { console.log(2) })) { console.log(2) }`,
    },
    {
      input: `if (!(async() => { console.log(2) })) { console.log(2) }`,
      output: `if (async() => { console.log(2) }) { console.log(2) }`,
    },
    {
      input: `if (async function() => { console.log(2) }) { console.log(2) }`,
      output: `if (!(async function() => { console.log(2) })) { console.log(2) }`,
    },
    {
      input: `if (async(): void => { console.log(2) }) { console.log(2) }`,
      output: `if (!(async(): void => { console.log(2) })) { console.log(2) }`,
    },
    {
      input: `if (!(async(): void => { console.log(2) })) { console.log(2) }`,
      output: `if (async(): void => { console.log(2) }) { console.log(2) }`,
    },
    {
      input: `if (name: void => { console.log(2) }) { console.log(2) }`,
      output: `if (!(name: void => { console.log(2) })) { console.log(2) }`,
    },
    {
      input: `if (!(name: void => { console.log(2) })) { console.log(2) }`,
      output: `if (name: void => { console.log(2) }) { console.log(2) }`,
    },
    {
      input: `if (name => { console.log(2) }) { console.log(2) }`,
      output: `if (!(name => { console.log(2) })) { console.log(2) }`,
    },
    {
      input: `if (!(name => { console.log(2) })) { console.log(2) }`,
      output: `if (name => { console.log(2) }) { console.log(2) }`,
    },
    {
      input: `if (async () => new Promise((resolve) => resolve(true))) console.log('called');`,
      output: `if (!(async () => new Promise((resolve) => resolve(true)))) console.log('called');`,
    },
    {
      input: `if (async () => new Promise((resolve) => resolve(true)) && cat) console.log('called');`,
      output: `if (!(async () => new Promise((resolve) => resolve(true))) || !cat) console.log('called');`,
    },
    {
      input: `if (async () => new Promise((resolve) => resolve(true)) === cat) console.log('called');`,
      output: `if (async () => new Promise((resolve) => resolve(true)) !== cat) console.log('called');`,
    },
    {
      input: `if (function*() { yield 'a'; yield* func1(); }) { console.log(2) }`,
      output: `if (!(function*() { yield 'a'; yield* func1(); })) { console.log(2) }`,
    },
    {
      input: 'if ((function() { console.log(2) })()) { console.log(2) }',
      output: 'if (!(function() { console.log(2) })()) { console.log(2) }',
    },
    {
      input: 'if (((function() { console.log(2) })())) { console.log(2) }',
      output: 'if ((!(function() { console.log(2) })())) { console.log(2) }',
    },
    {
      input: `if (new dog.cat()) { console.log(2) }`,
      output: 'if (!new dog.cat()) { console.log(2) }',
    },
    {
      input: `if (!new dog.cat()) { console.log(2) }`,
      output: 'if (new dog.cat()) { console.log(2) }',
    },
    {
      input: `if (new dog.cat(true)) { console.log(2) }`,
      output: 'if (!new dog.cat(true)) { console.log(2) }',
    },
    {
      input: `if (!new dog.cat(true)) { console.log(2) }`,
      output: 'if (new dog.cat(true)) { console.log(2) }',
    },
    {
      input: `if (new dog()) { console.log(2) }`,
      output: 'if (!new dog()) { console.log(2) }',
    },
    {
      input: `if (!new dog()) { console.log(2) }`,
      output: 'if (new dog()) { console.log(2) }',
    },
    {
      input: `if (!dog || !((): void => { if (dog) { console.log('hello') }})`,
      output: `if (dog && (): void => { if (dog) { console.log('hello') }}`,
    },
    {
      input: `if (dog && (): void => { if (dog) { console.log('hello') }})`,
      output: `if (!dog || !((): void => { if (dog) { console.log('hello') }}))`,
    },
    {
      input: `if ((): void => { if (dog) { console.log('hello') }} && dog)`,
      output: `if (!((): void => { if (dog) { console.log('hello') }}) || !dog)`,
    },
    {
      input: 'function isFish() { dog &&',
      output: 'function isFish() { !dog ||',
    },
    {
      input: 'function isFish() { return dog &&',
      output: 'function isFish() { return !dog ||',
    },
    {
      input: 'function isFish() return dog &&',
      output: 'function isFish() return !dog ||',
    },
    {
      input: 'isFish = () => dog &&',
      output: 'isFish = () => !dog ||',
    },
    {
      input: 'isFish = () => dog && cat',
      output: 'isFish = () => !dog || !cat',
    },
    {
      input: 'isFish = (): void => dog && cat',
      output: 'isFish = (): void => !dog || !cat',
    },
    {
      input: 'isFish = (param: { cat: dog }) => dog && cat',
      output: 'isFish = (param: { cat: dog }) => !dog || !cat',
    },
    {
      input: 'isFish = (param: { cat: dog }): void => dog && cat',
      output: 'isFish = (param: { cat: dog }): void => !dog || !cat',
    },
    {
      input: 'isFish = () => { dog &&',
      output: 'isFish = () => { !dog ||',
    },
    {
      input: 'isFish = () => { dog && cat }',
      output: 'isFish = () => { !dog || !cat }',
    },
    {
      input: 'isFish = (): void => { dog && cat }',
      output: 'isFish = (): void => { !dog || !cat }',
    },
    {
      input: 'function isFish(pet: Fish | Bird): pet is Fish {\nreturn (pet as Fish).swim !==',
      output: 'function isFish(pet: Fish | Bird): pet is Fish {\nreturn (pet as Fish).swim ===',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
