const Tokenizer = require('./tokenizer');
const Evaluator = require('./evaluator');
const Inverter = require('./inverter');

function runInvert(functionString) {
    const tokens = Tokenizer.tokenize(functionString);
    const evaluator = new Evaluator();
    const conditionIndexes = evaluator.evaluate(tokens);
    Inverter.invertIfStatements(tokens, conditionIndexes);
    return tokens.join('');
}

module.exports = {
    runInvert,
}