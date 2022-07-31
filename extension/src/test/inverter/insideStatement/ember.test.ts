import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Ember Invertion Suite', () => {
  [
    {
      input: `{{#if dog}}`,
      output: `{{#if !dog}}`,
    },
    {
      input: `{ {#if dog} }`,
      output: `{ {#if !dog} }`,
    },
    {
      input: `{{#if dog < cat }}`,
      output: `{{#if dog >= cat }}`,
    },
    {
      input: `{{/if}}`,
      output: `{{/if}}`,
    },
    {
      input: `{{else if condition}}`,
      output: `{{else if !condition}}`,
    },
    {
      input: `<Avatar @isActive={{dog}} @initial="T" />`,
      output: `<Avatar @isActive={{!dog}} @initial="T" />`,
    },
    {
      input: `<Avatar @isActive = { { dog}} @initial="T" />`,
      output: `<Avatar @isActive = { { !dog}} @initial="T" />`,
    },
    {
      input: `<Avatar @isActive={{dog}}>`,
      output: `<Avatar @isActive={{!dog}}>`,
    },
    {
      input: `Avatar @isActive={{dog}}>`,
      output: `Avatar @isActive={{!dog}}>`,
    },
    {
      input: `Avatar @isActive={{dog}}`,
      output: `Avatar @isActive={{!dog}}`,
    },
    {
      input: `@isActive={{dog}}`,
      output: `@isActive={{!dog}}`,
    },
    {
      input: `@isActive={{dog}`,
      output: `@isActive={{!dog}`,
    },
    {
      input: `@isActive={{dog`,
      output: `@isActive={{!dog`,
    },
    {
      input: `@isActive={{`,
      output: `@isActive={{`,
    },
    {
      input: `@isActive={`,
      output: `@isActive={`,
    },
    {
      input: `@isActive=`,
      output: `@isActive=`,
    },
    {
      input: `@isActive`,
      output: `@isActive`,
    },
    {
      input: `isActive`,
      output: `isActive`,
    },
    {
      input: `<div> {{if isFast "zoooom" "putt-putt-putt"}} </div>`,
      output: `<div> {{if !isFast "zoooom" "putt-putt-putt"}} </div>`,
    },
    {
      input: `{{if isFast "zoooom" "putt-putt-putt"}}`,
      output: `{{if !isFast "zoooom" "putt-putt-putt"}}`,
    },
    {
      input: `{if isFast "zoooom" "putt-putt-putt"}`,
      output: `{if !isFast "zoooom" "putt-putt-putt"}`,
    },
    {
      input: `if isFast "zoooom" "putt-putt-putt"`,
      output: `if !isFast "zoooom" "putt-putt-putt"`,
    },
    {
      input: `<div class="is-car {{if isFast "zoooom" "putt-putt-putt"}}"></div>`,
      output: `<div class="is-car {{if !isFast "zoooom" "putt-putt-putt"}}"></div>`,
    },
    {
      input: `<div class = " is-car { { if isFast "zoooom" "putt-putt-putt" } } " ></div>`,
      output: `<div class = " is-car { { if !isFast "zoooom" "putt-putt-putt" } } " ></div>`,
    },
    {
      input: `class="is-car {{if isFast "zoooom" "putt-putt-putt"}}">`,
      output: `class="is-car {{if !isFast "zoooom" "putt-putt-putt"}}">`,
    },
    {
      input: `class="is-car {{if isFast "zoooom" "putt-putt-putt"}}"`,
      output: `class="is-car {{if !isFast "zoooom" "putt-putt-putt"}}"`,
    },
    {
      input: `class="is-car {{if isFast "zoooom" "putt-putt-putt"}}`,
      output: `class="is-car {{if !isFast "zoooom" "putt-putt-putt"}}`,
    },
    {
      input: `="is-car {{if isFast "zoooom" "putt-putt-putt"}}`,
      output: `="is-car {{if !isFast "zoooom" "putt-putt-putt"}}`,
    },
    {
      input: `"is-car {{if isFast "zoooom" "putt-putt-putt"}}`,
      output: `"is-car {{if !isFast "zoooom" "putt-putt-putt"}}`,
    },
    {
      input: `is-car {{if isFast "zoooom" "putt-putt-putt"}}`,
      output: `is-car {{if !isFast "zoooom" "putt-putt-putt"}}`,
    },
    {
      input: `if this.thingIsTrue "value-true" "value-false"}}>Block form</div`,
      output: `if !this.thingIsTrue "value-true" "value-false"}}>Block form</div`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
