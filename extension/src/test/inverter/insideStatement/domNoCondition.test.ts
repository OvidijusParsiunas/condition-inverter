import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('DOM No Condition Invertion Suite', () => {
  [
    {
      input: '<div>',
      output: '<div>',
    },
    {
      input: '</div>',
      output: '</div>',
    },
    {
      input: '</div',
      output: '</div',
    },
    {
      input: '</',
      output: '</',
    },
    {
      input: '<div></div>',
      output: '<div></div>',
    },
    {
      input: 'div></div>',
      output: 'div></div>',
    },
    {
      input: '></div',
      output: '></div',
    },
    {
      input: '<div></div',
      output: '<div></div',
    },
    {
      input: '<div></',
      output: '<div></',
    },
    {
      input: '<div><div/>',
      output: '<div><div/>',
    },
    {
      input: 'div><div/>',
      output: 'div><div/>',
    },
    {
      input: '><div/>',
      output: '><div/>',
    },
    {
      input: '<div><div/',
      output: '<div><div/',
    },
    {
      input: '><div/',
      output: '><div/',
    },
    {
      input: '><div>',
      output: '><div>',
    },
    {
      input: '<div><',
      output: '<div><',
    },
    {
      input: '><div><',
      output: '><div><',
    },
    {
      input: '<div><div></div></div>',
      output: '<div><div></div></div>',
    },
    {
      input: '<div><div></div>',
      output: '<div><div></div>',
    },
    {
      input: '<div><div></',
      output: '<div><div></',
    },
    {
      input: '<div><div><',
      output: '<div><div><',
    },
    {
      input: '<div><div>',
      output: '<div><div>',
    },
    {
      input: '</div></div>',
      output: '</div></div>',
    },
    {
      input: '<div/><div/>',
      output: '<div/><div/>',
    },
    {
      input: '<Header />',
      output: '<Header />',
    },
    {
      input: '<div class="asdasd">',
      output: '<div class="asdasd">',
    },
    {
      input: 'class="myValue">Content to render when condition is true.</div>',
      output: 'class="myValue">Content to render when condition is true.</div>',
    },
    {
      input: 'class = "myValue">Content to render when condition is true.</div>',
      output: 'class = "myValue">Content to render when condition is true.</div>',
    },
    {
      input: `'">`,
      output: `'">`,
    },
    {
      input: `dog">`,
      output: `dog">`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
