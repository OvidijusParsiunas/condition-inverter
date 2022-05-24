import { Inverter } from '../../../../../shared/out/inverter/src/inverter';
import * as assert from 'assert';

// the reason why these tests are done in the extension directory instead of inverter is because they are used to achieve 100% test coverage
suite('GoLang Invertion Suite', () => {
  [
    { input: `if 7%2 == 0 { fmt.Println("hi") }`, output: `if 7%2 != 0 { fmt.Println("hi") }` },
    { input: `if 7%2 == 0{ fmt.Println("hi") }`, output: `if 7%2 != 0{ fmt.Println("hi") }` },
    {
      input: `if 7%2 == 0 { fmt.Println("hi") } else if num > 10 { fmt.Println("dog") }`,
      output: `if 7%2 != 0 { fmt.Println("hi") } else if num <= 10 { fmt.Println("dog") }`,
    },
    { input: `if num := 9; num < 0 { fmt.Println(num, "is negative") }`, output: `if num := 9; num >= 0 { fmt.Println(num, "is negative") }` },
    { input: `if num := 9; num < 0{ fmt.Println(num, "is negative") }`, output: `if num := 9; num >= 0{ fmt.Println(num, "is negative") }` },
    {
      input: `if num := 9; num < 0 && cat { fmt.Println(num, "is negative") }`,
      output: `if num := 9; num >= 0 || !cat { fmt.Println(num, "is negative") }`,
    },
    { input: `if ('hello') { fmt.Println("hi") }`, output: `if (!'hello') { fmt.Println("hi") }` },
    { input: `if ('hello'){ fmt.Println("hi") }`, output: `if (!'hello'){ fmt.Println("hi") }` },
    { input: `for i := 1; i < 5; i++ { fmt.Println("hi") }`, output: `for i := 1; i >= 5; i++ { fmt.Println("hi") }` },
    { input: `for i < 5 { fmt.Println("hi") }`, output: `for i >= 5 { fmt.Println("hi") }` },
    { input: `for { fmt.Println("hi") }`, output: `for { fmt.Println("hi") }` },
    { input: `for i, s := range strings { fmt.Println("hi") }`, output: `for i, s := range strings { fmt.Println("hi") }` },
    { input: `for input.Scan() { fmt.Println("hi") }`, output: `for !input.Scan() { fmt.Println("hi") }` },
    { input: `for input.Scan(){ fmt.Println("hi") }`, output: `for !input.Scan(){ fmt.Println("hi") }` },
  ].forEach((testProps) => {
    test(testProps.input, () => {
      const result = Inverter.invert(testProps.input);
      assert.strictEqual(result, testProps.output);
    });
  });
});
