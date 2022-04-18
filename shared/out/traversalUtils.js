"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraversalUtils = void 0;
class TraversalUtils {
    static getNonSpaceCharacterIndex(tokens, index, traverseForwards = true) {
        if (index === 0) {
            return 0;
        }
        if (tokens[index] !== ' ' && tokens[index] !== `\n`) {
            return index;
        }
        const newIndex = traverseForwards ? index + 1 : index - 1;
        return TraversalUtils.getNonSpaceCharacterIndex(tokens, newIndex, traverseForwards);
    }
    static getEndQuoteIndex(tokens, index, quoteString) {
        if (tokens[index] === quoteString) {
            return index;
        }
        return TraversalUtils.getEndQuoteIndex(tokens, index + 1, quoteString);
    }
    static getIndexOfLastBracketOfIfStatement(tokens, index, openBrackets = 0) {
        if (index > tokens.length - 1) {
            // WORK - need this inside errors
            console.log('index out of bounds');
            return -1;
        }
        if (tokens[index + 1] === '(') {
            return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets + 1);
        }
        if (tokens[index + 1] === ')') {
            if (openBrackets === 1) {
                return index + 1;
            }
            return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets - 1);
        }
        return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets);
    }
}
exports.TraversalUtils = TraversalUtils;
//# sourceMappingURL=traversalUtils.js.map