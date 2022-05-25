import { Inverter } from '../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('JavaScript Invertion Suite', () => {
  [
    {
      input: `if (dog['cat']) { console.log(2) }`,
      output: `if (!dog['cat']) { console.log(2) }`,
    },
    {
      input: `if (!dog['cat']) { console.log(2) }`,
      output: `if (dog['cat']) { console.log(2) }`,
    },
    {
      input: `if (!dog["cat"]) { console.log(2) }`,
      output: `if (dog["cat"]) { console.log(2) }`,
    },
    {
      input: `if (dog?.cat) { console.log(2) }`,
      output: 'if (!dog?.cat) { console.log(2) }',
    },
    {
      input: `if (!dog?.cat) { console.log(2) }`,
      output: 'if (dog?.cat) { console.log(2) }',
    },
    {
      input: `if (dog?.cat?.fish()) { console.log(2) }`,
      output: 'if (!dog?.cat?.fish()) { console.log(2) }',
    },
    {
      input: `if (!dog?.cat?.fish()) { console.log(2) }`,
      output: 'if (dog?.cat?.fish()) { console.log(2) }',
    },
    {
      input: `if ((dog?.cat?.fish())) { console.log(2) }`,
      output: 'if ((!dog?.cat?.fish())) { console.log(2) }',
    },
    {
      input: `if ((!dog?.cat?.fish())) { console.log(2) }`,
      output: 'if ((dog?.cat?.fish())) { console.log(2) }',
    },
    {
      input: `if (!(dog?.cat?.fish())) { console.log(2) }`,
      output: 'if (dog?.cat?.fish()) { console.log(2) }',
    },
    {
      input: `if ((!dog?.['cat']?.fish())) { console.log(2) }`,
      output: `if ((dog?.['cat']?.fish())) { console.log(2) }`,
    },
    {
      input: `if ((!dog?.['cat']?.fish?.())) { console.log(2) }`,
      output: `if ((dog?.['cat']?.fish?.())) { console.log(2) }`,
    },
    {
      input: `if (dog in cat) { console.log(2) }`,
      output: `if (!(dog in cat)) { console.log(2) }`,
    },
    {
      input: `if (!(dog in cat)) { console.log(2) }`,
      output: `if (dog in cat) { console.log(2) }`,
    },
    {
      input: `if (dog in cat === false) { console.log(2) }`,
      output: `if (dog in cat !== false) { console.log(2) }`,
    },
    {
      input: `if (dog in cat !== false) { console.log(2) }`,
      output: `if (dog in cat === false) { console.log(2) }`,
    },
    {
      input: `if (typeof dog) { console.log(2) }`,
      output: `if (!typeof dog) { console.log(2) }`,
    },
    {
      input: `if (!typeof dog) { console.log(2) }`,
      output: `if (typeof dog) { console.log(2) }`,
    },
    {
      input: `if (delete dog.cat) { console.log(2) }`,
      output: `if (!delete dog.cat) { console.log(2) }`,
    },
    {
      input: `if (!delete dog.cat) { console.log(2) }`,
      output: `if (delete dog.cat) { console.log(2) }`,
    },
    {
      input: `if (void dog) { console.log(2) }`,
      output: `if (!void dog) { console.log(2) }`,
    },
    {
      input: `if (!void dog) { console.log(2) }`,
      output: `if (void dog) { console.log(2) }`,
    },
    {
      input: `if (dog instanceof cat) { console.log(2) }`,
      output: `if (!(dog instanceof cat)) { console.log(2) }`,
    },
    {
      input: `if (!(dog instanceof cat)) { console.log(2) }`,
      output: `if (dog instanceof cat) { console.log(2) }`,
    },
    {
      input: `if (typeof dog) { console.log(2) }`,
      output: `if (!typeof dog) { console.log(2) }`,
    },
    {
      input: `if (!typeof dog) { console.log(2) }`,
      output: `if (typeof dog) { console.log(2) }`,
    },
    {
      input: `if (typeof dog === 'string') { console.log(2) }`,
      output: `if (typeof dog !== 'string') { console.log(2) }`,
    },
    {
      input: `if (typeof dog !== 'string') { console.log(2) }`,
      output: `if (typeof dog === 'string') { console.log(2) }`,
    },
    {
      input: `if (dog.fish['cat']()) { console.log(2) }`,
      output: `if (!dog.fish['cat']()) { console.log(2) }`,
    },
    {
      input: `if (!dog.fish['cat']()) { console.log(2) }`,
      output: `if (dog.fish['cat']()) { console.log(2) }`,
    },
    {
      input: `if ((dog.fish['cat']() && 2)) { console.log(2) }`,
      output: `if ((!dog.fish['cat']() || !2)) { console.log(2) }`,
    },
    {
      input: `if ((!dog.fish['cat']() || !2)) { console.log(2) }`,
      output: `if ((dog.fish['cat']() && 2)) { console.log(2) }`,
    },
    {
      input: `if (dog.match(/yes.*day/)) { console.log(2) }`,
      output: 'if (!dog.match(/yes.*day/)) { console.log(2) }',
    },
    {
      input: `if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }`,
      output: 'if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }',
    },
    {
      input: `if (/[^.]+/.exec(url)[0].substr(7) + 2) { console.log(2) }`,
      output: 'if (!(/[^.]+/.exec(url)[0].substr(7) + 2)) { console.log(2) }',
    },
    {
      input: `if (/[^.]+/.exec(url)[0].substr(7) === 2) { console.log(2) }`,
      output: 'if (/[^.]+/.exec(url)[0].substr(7) !== 2) { console.log(2) }',
    },
    {
      input: `if (!(/[^.]+/.exec(url)[0].substr(7))) { console.log(2) }`,
      output: 'if (/[^.]+/.exec(url)[0].substr(7)) { console.log(2) }',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
