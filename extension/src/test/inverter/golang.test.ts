import { Inverter } from 'shared/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('GoLang Invertion Suite', () => {
  [
    { input: `if 7%2 == 0 { fmt.Println("hi") }`, output: `if 7%2 != 0 { fmt.Println("hi") }` },
    {
      input: `if 7%2 == 0 { fmt.Println("hi") } else if num > 10 { fmt.Println("dog") }`,
      output: `if 7%2 != 0 { fmt.Println("hi") } else if num <= 10 { fmt.Println("dog") }`,
    },
    { input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`, output: `if num := 9; num >= 0 { fmt.Println(num, "is negative") }` },
    {
      input: `if num := 9; num < 0 && cat { fmt.Println(num, "is negative") }`,
      output: `if num := 9; num >= 0 || !cat { fmt.Println(num, "is negative") }`,
    },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
