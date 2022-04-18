import { Tokenizer } from './tokenizer/tokenizer';
import { Evaluator } from './evaluator/evaluator';
import { Inverter } from './inverter/inverter';

export class InvertConditions {
  public static runInvert(inputString: string): string {
    const tokens = Tokenizer.tokenize(inputString);
    const syntaxToBeInverted = Evaluator.evaluate(tokens);
    Inverter.invertIfStatements(tokens, syntaxToBeInverted);
    return tokens.join('');
  }
}
