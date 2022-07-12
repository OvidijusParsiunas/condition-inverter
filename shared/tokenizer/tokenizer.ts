import { Tokens } from '../inverter/src/shared/types/tokens';

export class Tokenizer {
  static tokenize(inputString: string): Tokens {
    if (inputString === '') return [];
    // tokenizes string into words/numbers and symbols
    // [a-zA-Z_$0-9]+ gets words
    // \s gets spaces
    // ^\w\s gets symbols
    return inputString.match(/([a-zA-Z_$0-9]+)|(\s)|[^\w\s]/g) as RegExpMatchArray;
  }
}
