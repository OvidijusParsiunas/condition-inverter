import { TokenInverter } from './inverter/tokenInverter';
import { Tokenizer } from '../../tokenizer/tokenizer';
import { Evaluator } from './evaluator/evaluator';

export class Inverter {
  public static invert(inputString: string): string {
    const tokens = Tokenizer.tokenize(inputString);
    const syntaxToBeInverted = Evaluator.evaluate(tokens);
    TokenInverter.invert(tokens, syntaxToBeInverted);
    return tokens.join('');
  }
}
