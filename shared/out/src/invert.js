"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvertConditions = void 0;
const tokenizer_1 = require("./tokenizer/tokenizer");
const evaluator_1 = require("./evaluator/evaluator");
const inverter_1 = require("./inverter/inverter");
class InvertConditions {
    static runInvert(inputString) {
        const tokens = tokenizer_1.Tokenizer.tokenize(inputString);
        const syntaxToBeInverted = evaluator_1.Evaluator.evaluate(tokens);
        inverter_1.Inverter.invertIfStatements(tokens, syntaxToBeInverted);
        return tokens.join('');
    }
}
exports.InvertConditions = InvertConditions;
//# sourceMappingURL=invert.js.map