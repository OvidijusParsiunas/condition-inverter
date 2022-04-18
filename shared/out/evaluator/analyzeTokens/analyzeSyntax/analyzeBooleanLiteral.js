"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeBooleanLiteral = void 0;
class AnalyzeBooleanLiteral {
    static boolean(evaluationState) {
        evaluationState.invertBooleanLiteral = true;
    }
    static doesTokenEndNumber(token) {
        return token === ' ' || token === ')' || token === '&' || token === '|';
    }
    static findNumberEndIndex(tokens, index) {
        if (index > tokens.length - 1) {
            console.log('attempt to retrieve when number declaration stops is out of bounds');
            return -1;
        }
        if (AnalyzeBooleanLiteral.doesTokenEndNumber(tokens[index])) {
            return index;
        }
        return AnalyzeBooleanLiteral.findNumberEndIndex(tokens, index + 1);
    }
    static number(tokens, index, evaluationState) {
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