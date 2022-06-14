import { Inverter } from '../../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite.only('Unary Inversion Suite', () => {
  [
    {
      input: `if (typeof dog) { console.log(2) }`,
      output: `if (!typeof dog) { console.log(2) }`,
    },
    {
      input: `if (!typeof dog) { console.log(2) }`,
      output: `if (typeof dog) { console.log(2) }`,
    },
    {
      input: `if (((((typeof dog))))) { console.log(2) }`,
      output: `if (((((!typeof dog))))) { console.log(2) }`,
    },
    {
      input: `if ((typeof dog)) { console.log(2) }`,
      output: `if ((!typeof dog)) { console.log(2) }`,
    },
    {
      input: `if (typeof dog + 2) { console.log(2) }`,
      output: `if (!(typeof dog + 2)) { console.log(2) }`,
    },
    {
      input: `if (!typeof dog) { console.log(2) }`,
      output: `if (typeof dog) { console.log(2) }`,
    },
    {
      input: `if (typeof dog && cat) { console.log(2) }`,
      output: `if (!typeof dog || !cat) { console.log(2) }`,
    },
    {
      input: `if (!typeof dog || !cat) { console.log(2) }`,
      output: `if (typeof dog && cat) { console.log(2) }`,
    },
    {
      input: `if (typeof dog === 'string') { console.log(2) }`,
      output: `if (typeof dog !== 'string') { console.log(2) }`,
    },
    {
      input: `if (delete dog) { console.log(2) }`,
      output: `if (!delete dog) { console.log(2) }`,
    },
    {
      input: `if (delete dog.cat) { console.log(2) }`,
      output: `if (!delete dog.cat) { console.log(2) }`,
    },
    {
      input: `if (void dog) { console.log(2) }`,
      output: `if (!void dog) { console.log(2) }`,
    },
    {
      input: `if (void (2 == '2')) { console.log(2) }`,
      output: `if (!void (2 == '2')) { console.log(2) }`,
    },
    {
      input: `if (void (2 == '2') + 2) { console.log(2) }`,
      output: `if (!(void (2 == '2') + 2)) { console.log(2) }`,
    },
    {
      input: `if (!(void (2 == '2') + 2)) { console.log(2) }`,
      output: `if (void (2 == '2') + 2) { console.log(2) }`,
    },
    {
      input: `if (void (2 == '2') && cat) { console.log(2) }`,
      output: `if (!void (2 == '2') || !cat) { console.log(2) }`,
    },
    {
      input: `if (+true) { console.log(2) }`,
      output: `if (!(+true)) { console.log(2) }`,
    },
    {
      input: `if (+false) { console.log(2) }`,
      output: `if (!(+false)) { console.log(2) }`,
    },
    {
      input: `if (+'cat') { console.log(2) }`,
      output: `if (!(+'cat')) { console.log(2) }`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
