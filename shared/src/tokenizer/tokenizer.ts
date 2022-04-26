import { Tokens } from '../shared/types/tokens';

export class Tokenizer {
  static tokenize(inputString: string): Tokens {
    // tokenizes string into words/numbers and symbols
    // \w+ gets words
    // \s gets spaces
    // ^\w\s gets symbols
    return inputString.match(/(\w+)|(\s)|[^\w\s]/g) as RegExpMatchArray;
  }
}
