import { FAILED_TO_TOKEN_STRING_ERROR_MESSAGE } from './shared/consts/errors';

export default class Tokenizer {
  static tokenize(inputString: string): (string | number)[] {
    // tokenizes string into words/numbers and symbols
    const tokens = inputString.match(/(\w+)|(\s)|[^\w\s]/g);
    if (!tokens) {
      throw new Error(FAILED_TO_TOKEN_STRING_ERROR_MESSAGE);
    }
    return tokens;
  }
}
