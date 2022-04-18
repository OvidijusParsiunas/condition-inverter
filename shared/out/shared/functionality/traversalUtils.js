"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraversalUtil = void 0;
class TraversalUtil {
    static getNonSpaceCharacterIndex(tokens, index, traverseForwards = true) {
        if (index === 0) {
            return 0;
        }
        if (tokens[index] !== ' ' && tokens[index] !== `\n`) {
            return index;
        }
        const newIndex = traverseForwards ? index + 1 : index - 1;
        return TraversalUtil.getNonSpaceCharacterIndex(tokens, newIndex, traverseForwards);
    }
    static getEndQuoteIndex(tokens, index, quoteString) {
        if (tokens[index] === quoteString) {
            return index;
        }
        return TraversalUtil.getEndQuoteIndex(tokens, index + 1, quoteString);
    }
    static getIndexOfLastBracketOfIfStatement(tokens, index, openBrackets = 0) {
        if (index > tokens.length - 1) {
            // WORK - need this inside errors
            console.log('index out of bounds');
            return -1;
        }
        if (tokens[index + 1] === '(') {
            return TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets + 1);
        }
        if (tokens[index + 1] === ')') {
            if (openBrackets === 1) {
                return index + 1;
            }
            return TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets - 1);
        }
        return TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets);
    }
}
exports.TraversalUtil = TraversalUtil;
//# sourceMappingURL=traversalUtils.js.map