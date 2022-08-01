import { Inverter } from 'shared/inverter/src/inverter';
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
    {
      input: 'if (`${dog}`) { console.log(`dog`) }',
      output: 'if (!`${dog}`) { console.log(`dog`) }',
    },
    {
      input: 'if (`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
      output: 'if (!`aa  ${  dog + cat  }  aa`) { console.log(`dog`) }',
    },
    {
      input: 'if (cat && `aa  ${  dog + cat  }  aa` && fish) { console.log(`dog`) }',
      output: 'if (!cat || !`aa  ${  dog + cat  }  aa` || !fish) { console.log(`dog`) }',
    },
    {
      input: 'if (`${dog}` && cat) { console.log(`dog`) }',
      output: 'if (!`${dog}` || !cat) { console.log(`dog`) }',
    },
    {
      input: 'if (cat && `${dog}` && fish) { console.log(`dog`) }',
      output: 'if (!cat || !`${dog}` || !fish) { console.log(`dog`) }',
    },
    {
      input: 'if (cat && `${dog}`) { console.log(`dog`) }',
      output: 'if (!cat || !`${dog}`) { console.log(`dog`) }',
    },
    {
      input: 'const hello = `${dog}` && cat',
      output: 'const hello = !`${dog}` || !cat',
    },
    {
      input: 'const hello = cat && `${dog}` && fish',
      output: 'const hello = !cat || !`${dog}` || !fish',
    },
    {
      input: 'const hello = cat && `${dog}`',
      output: 'const hello = !cat || !`${dog}`',
    },
    {
      input: 'const hello = cat && `${dog',
      output: 'const hello = !cat || !`${dog',
    },
    {
      input: 'dog}` || cat',
      output: 'dog}` && !cat',
    },
    {
      input: 'const hello = `aa  ${  dog + cat  }  aa` && dog',
      output: 'const hello = !`aa  ${  dog + cat  }  aa` || !dog',
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
