import Evaluator from './evaluator/evaluator';
import Tokenizer from './tokenizer/tokenizer';
import Inverter from './inverter';

export default class InvertConditions {
  public static runInvert(inputString: string) {
    const tokens = Tokenizer.tokenize(inputString);
    const syntaxToBeInverted = Evaluator.evaluate(tokens);
    Inverter.invertIfStatements(tokens, syntaxToBeInverted);
    return tokens.join('');
  }
}
