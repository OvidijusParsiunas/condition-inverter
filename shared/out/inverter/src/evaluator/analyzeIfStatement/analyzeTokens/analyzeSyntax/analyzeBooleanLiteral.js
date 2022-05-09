"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeBooleanLiteral = void 0;
class AnalyzeBooleanLiteral {
    static updateStateForBoolean(evaluationState) {
        evaluationState.invertBooleanLiteral = true;
    }
    static doesTokenEndNumber(token) {
        return token === ' ' || token === ')' || token === '&' || token === '|';
    }
    static findNumberEndIndex(tokens, index) {
        if (AnalyzeBooleanLiteral.doesTokenEndNumber(tokens[index])) {
            return index;
        }
        return AnalyzeBooleanLiteral.findNumberEndIndex(tokens, index + 1);
    }
    // boolean numbers are considered to being 0 and 1
    static updateStateForBooleanNumber(tokens, index, evaluationState) {
        const nextToken = tokens[index + 1];
        if (AnalyzeBooleanLiteral.doesTokenEndNumber(nextToken)) {
            evaluationState.invertBooleanLiteral = true;
            return index;
        }
        return AnalyzeBooleanLiteral.findNumberEndIndex(tokens, index);
    }
}
exports.AnalyzeBooleanLiteral = AnalyzeBooleanLiteral;
//# sourceMappingURL=analyzeBooleanLiteral.js.map