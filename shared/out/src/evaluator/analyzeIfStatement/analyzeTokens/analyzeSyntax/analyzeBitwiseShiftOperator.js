"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeBitwiseShiftOperator = void 0;
const analyzeBrackatableSyntax_1 = require("./analyzeBrackatableSyntax");
class AnalyzeBitwiseShiftOperator {
    static isBitwise(tokens, index) {
        const currentToken = tokens[index];
        const nextToken = tokens[index + 1];
        return currentToken === nextToken;
    }
    static analyze(tokens, index, evaluationState) {
        analyzeBrackatableSyntax_1.AnalyzeBrackatableSyntax.analyze(evaluationState);
        const thirdToken = tokens[index + 1];
        const currentToken = tokens[index];
        return currentToken === '>' && thirdToken === '>' ? index + 2 : index + 1;
    }
}
exports.AnalyzeBitwiseShiftOperator = AnalyzeBitwiseShiftOperator;
//# sourceMappingURL=analyzeBitwiseShiftOperator.js.map