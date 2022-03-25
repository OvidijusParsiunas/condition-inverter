import Tokenizer from './tokenizer';
import Evaluator from './evaluator';
import Inverter from './inverter';

export default class InvertConditions {
  public static runInvert(functionString: string) {
    const tokens = Tokenizer.tokenize(functionString) as any[];
    const evaluator = new Evaluator();
    const conditionIndexes = evaluator.evaluate(tokens);
    Inverter.invertIfStatements(tokens, conditionIndexes);
    return tokens.join('');
  }
}
