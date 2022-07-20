import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('Backbone.js/ASP.Net Invertion Suite', () => {
  [
    {
      input: `<% if price %>`,
      output: `<% if !price %>`,
    },
    {
      input: `<% if dog % cat && fish % parrot %>`,
      output: `<% if !(dog % cat) || !(fish % parrot) %>`,
    },
    {
      input: `% if price %>`,
      output: `% if !price %>`,
    },
    {
      input: `% if price`,
      output: `% if !price`,
    },
    {
      input: `<% if (price) %>`,
      output: `<% if (!price) %>`,
    },
    {
      input: `% if (price) %>`,
      output: `% if (!price) %>`,
    },
    {
      input: `<% if (price) %`,
      output: `<% if (!price) %`,
    },
    {
      input: `% if (price) %`,
      output: `% if (!price) %`,
    },
    {
      input: `if (price) %`,
      output: `if (!price) %`,
    },
    {
      input: `% if (price)`,
      output: `% if (!price)`,
    },
    {
      input: `<input type="radio" <%= dog ? 'checked' : '' %> class="">`,
      output: `<input type="radio" <%= !dog ? 'checked' : '' %> class="">`,
    },
    {
      input: `<input type="radio" <%if(dog){print('checked');}%> >`,
      output: `<input type="radio" <%if(!dog){print('checked');}%> >`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
