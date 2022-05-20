import { IfInverter } from '../../../../../shared/out/inverter/src/ifInverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
// WORK - function params with no brackets
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
      input: 'if (function myFunc<number>(param: number|string): void { console.log(2) }) { console.log(2) }',
      output: 'if (!(function myFunc<number>(param: number|string): void { console.log(2) })) { console.log(2) }',
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
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = IfInverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
