import { Tokenizer } from '../../tokenizer/tokenizer';
import { Evaluator } from './evaluator/evaluator';
import { Inverter } from './inverter/inverter';

export class IfInverter {
  public static invert(inputString: string): string {
    const tokens = Tokenizer.tokenize(inputString);
    const syntaxToBeInverted = Evaluator.evaluate(tokens);
    Inverter.invertStatements(tokens, syntaxToBeInverted);
    return tokens.join('');
  }
}
