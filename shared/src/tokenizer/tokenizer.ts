import { FAILED_TO_TOKEN_STRING_ERROR_MESSAGE } from '../shared/consts/errors';
import { Tokens } from '../shared/types/tokens';

export class Tokenizer {
  static tokenize(inputString: string): Tokens {
    // tokenizes string into words/numbers and symbols
    const tokens = inputString.match(/(\w+)|(\s)|[^\w\s]/g);
    if (!tokens) throw new Error(FAILED_TO_TOKEN_STRING_ERROR_MESSAGE);
    return tokens;
  }
}
