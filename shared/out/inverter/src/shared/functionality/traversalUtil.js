"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraversalUtil = void 0;
const errors_1 = require("../consts/errors");
class TraversalUtil {
    static getSiblingNonSpaceCharacterIndex(tokens, index, traverseForwards = true) {
        if (tokens[index] !== ' ' && tokens[index] !== `\n` && tokens[index] !== `\r`) {
            return index;
        }
        const newIndex = traverseForwards ? index + 1 : index - 1;
        return TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, newIndex, traverseForwards);
    }
    static getEndQuoteIndex(tokens, index, quoteString) {
        if (tokens[index] === quoteString) {
            return index;
        }
        return TraversalUtil.getEndQuoteIndex(tokens, index + 1, quoteString);
    }
    static getIndexOfLastBracketOfIfStatement(tokens, index, openBrackets = 0) {
        if (index > tokens.length - 1) {
            throw new Error(errors_1.INDEX_OUT_OF_BOUNDS_DURING_TRAVERSAL);
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
//# sourceMappingURL=traversalUtil.js.map