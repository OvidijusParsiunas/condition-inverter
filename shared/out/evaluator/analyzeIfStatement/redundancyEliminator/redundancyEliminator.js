"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedundancyEliminator = void 0;
const traversalUtil_1 = require("../../../shared/functionality/traversalUtil");
class RedundancyEliminator {
    static isNestedUnaryOperator(tokens, startTokenIndex, layers) {
        return layers > 0 && (tokens[startTokenIndex] === '+' || tokens[startTokenIndex] === '-');
    }
    static createNewResult(startIndex, endIndex) {
        return { start: startIndex, end: endIndex };
    }
    static constructResult(tokens, startTokenIndex, endTokenIndex, layers) {
        const result = RedundancyEliminator.createNewResult(startTokenIndex, endTokenIndex);
        // statements can start with unary operators, in such instances we usually add a bracket by default, however if there
        // is one already - use it
        if (RedundancyEliminator.isNestedUnaryOperator(tokens, startTokenIndex, layers)) {
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
        const startTokenIndex = traversalUtil_1.TraversalUtil.getNonSpaceCharacterIndex(tokens, startIndex);
        const endTokenIndex = traversalUtil_1.TraversalUtil.getNonSpaceCharacterIndex(tokens, endIndex, false);
        if (!RedundancyEliminator.isValidBracket(tokens, startIndex, startTokenIndex, endTokenIndex)) {
            return RedundancyEliminator.constructResult(tokens, startTokenIndex, endTokenIndex, layers);
        }
        const result = RedundancyEliminator.getIndexesOfNestedStartAndEndBrackets(tokens, startTokenIndex + 1, endTokenIndex - 1, layers + 1);
        return result.usePreviousTraversalResult ? RedundancyEliminator.createNewResult(startTokenIndex, endTokenIndex) : result;
    }
}
exports.RedundancyEliminator = RedundancyEliminator;
//# sourceMappingURL=redundancyEliminator.js.map