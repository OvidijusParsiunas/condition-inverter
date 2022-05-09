"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeRedundantBrackets = void 0;
const traversalUtil_1 = require("../../../shared/functionality/traversalUtil");
class AnalyzeRedundantBrackets {
    static isNestedUnaryOperator(tokens, startTokenIndex, layers) {
        return layers > 0 && (tokens[startTokenIndex] === '+' || tokens[startTokenIndex] === '-');
    }
    static createNewResult(startIndex, endIndex) {
        return { start: startIndex, end: endIndex };
    }
    static constructResult(tokens, startTokenIndex, endTokenIndex, layers) {
        const result = AnalyzeRedundantBrackets.createNewResult(startTokenIndex, endTokenIndex);
        // statements can start with unary operators, in such instances we usually add a bracket by default, however if there
        // is one already - use it
        if (AnalyzeRedundantBrackets.isNestedUnaryOperator(tokens, startTokenIndex, layers)) {
            result.usePreviousTraversalResult = true;
        }
        return result;
    }
    static isValidBracket(tokens, startIndex, startTokenIndex, endTokenIndex) {
        return (startTokenIndex < endTokenIndex &&
            tokens[startTokenIndex] === '(' &&
            tokens[endTokenIndex] === ')' &&
            traversalUtil_1.TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, startIndex - 1) === endTokenIndex);
    }
    static getIndexesOfNestedStartAndEndBrackets(tokens, startIndex, endIndex, layers = 0) {
        const startTokenIndex = traversalUtil_1.TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, startIndex);
        const endTokenIndex = traversalUtil_1.TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, endIndex, false);
        if (!AnalyzeRedundantBrackets.isValidBracket(tokens, startIndex, startTokenIndex, endTokenIndex)) {
            return AnalyzeRedundantBrackets.constructResult(tokens, startTokenIndex, endTokenIndex, layers);
        }
        const result = AnalyzeRedundantBrackets.getIndexesOfNestedStartAndEndBrackets(tokens, startTokenIndex + 1, endTokenIndex - 1, layers + 1);
        return result.usePreviousTraversalResult ? AnalyzeRedundantBrackets.createNewResult(startTokenIndex, endTokenIndex) : result;
    }
}
exports.AnalyzeRedundantBrackets = AnalyzeRedundantBrackets;
//# sourceMappingURL=analyzeRedundantBrackets.js.map