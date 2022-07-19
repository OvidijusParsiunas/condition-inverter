import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Vue Invertion Suite', () => {
  [
    {
      input: `<h1 v-if="awesome">Vue is awesome!</h1>`,
      output: `<h1 v-if="!awesome">Vue is awesome!</h1>`,
    },
    {
      input: `<h1 v-if = " awesome">Vue is awesome!</h1>`,
      output: `<h1 v-if = " !awesome">Vue is awesome!</h1>`,
    },
    {
      input: `<h1 v-if="awesome">`,
      output: `<h1 v-if="!awesome">`,
    },
    {
      input: `h1 v-if="awesome">`,
      output: `h1 v-if="!awesome">`,
    },
    {
      input: `h1 v-if="awesome"`,
      output: `h1 v-if="!awesome"`,
    },
    {
      input: `v-if="awesome">`,
      output: `v-if="!awesome">`,
    },
    {
      input: `v-if="awesome"`,
      output: `v-if="!awesome"`,
    },
    {
      input: `v-if="awesome`,
      output: `v-if="!awesome`,
    },
    {
      input: `v-if="`,
      output: `v-if="`,
    },
    {
      input: `v-if=`,
      output: `v-if=`,
    },
    {
      input: `<div v-else-if="type === 'B'">`,
      output: `<div v-else-if="type !== 'B'">`,
    },
    {
      input: `<h1 v-show="ok">Hello!</h1>`,
      output: `<h1 v-show="!ok">Hello!</h1>`,
    },
    {
      input: `<div :class="[isActive ? activeClass : '', errorClass]"></div>`,
      output: `<div :class="[!isActive ? activeClass : '', errorClass]"></div>`,
    },
    {
      input: `<div :class="[isActive ? activeClass : '', errorClass]" :class="[isActive ? activeClass : '', errorClass]"></div>`,
      output: `<div :class="[!isActive ? activeClass : '', errorClass]" :class="[!isActive ? activeClass : '', errorClass]"></div>`,
    },
    {
      input: `<div :class='[isActive ? activeClass : "", errorClass]'></div>`,
      output: `<div :class='[!isActive ? activeClass : "", errorClass]'></div>`,
    },
    {
      input: `<div : class = " [ isActive ? activeClass : '', errorClass]"></div>`,
      output: `<div : class = " [ !isActive ? activeClass : '', errorClass]"></div>`,
    },
    {
      input: `<div :class="[{ active: cat && dog }, errorClass]"></div>`,
      output: `<div :class="[{ active: !cat || !dog }, errorClass]"></div>`,
    },
    {
      input: `<div : class = " [ { active: cat && dog }, errorClass]"></div>`,
      output: `<div : class = " [ { active: !cat || !dog }, errorClass]"></div>`,
    },
    {
      input: `<div v-bind:style="[condition ? {styleA} : {styleB}]"></div>`,
      output: `<div v-bind:style="[!condition ? {styleA} : {styleB}]"></div>`,
    },
    {
      input: `<div v-bind : style = " [ condition ? {styleA} : {styleB}]"></div>`,
      output: `<div v-bind : style = " [ !condition ? {styleA} : {styleB}]"></div>`,
    },
    {
      input: `<div :style="[item.main_featured ? {'background': 'url(' + item + ') center no-repeat'} : {'background': '#FFF'}]"></div>`,
      output: `<div :style="[!item.main_featured ? {'background': 'url(' + item + ') center no-repeat'} : {'background': '#FFF'}]"></div>`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
