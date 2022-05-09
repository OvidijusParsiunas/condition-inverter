"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvertNegatedSyntax = void 0;
const traversalUtil_1 = require("../../shared/functionality/traversalUtil");
const insertNewSyntax_1 = require("../insert/insertNewSyntax");
const insertBrackets_1 = require("../insert/insertBrackets");
class InvertNegatedSyntax {
    static removeBrackets(tokens, tokenIndex, tokenIndexDelta, syntaxToBeInvertedEntry) {
        const startIndex = traversalUtil_1.TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, tokenIndex);
        tokens.splice(startIndex, 1);
        tokenIndexDelta -= 1;
        tokens.splice(syntaxToBeInvertedEntry.removeNegatedBrackets.end + tokenIndexDelta, 1);
        tokenIndexDelta -= 1;
        return tokenIndexDelta;
    }
    static isRemoveNegationBrackets(invertableSyntaxEntry) {
        return !!invertableSyntaxEntry.removeNegatedBrackets;
    }
    static removeExclamationMark(tokens, tokenIndex, tokenIndexDelta) {
        tokens.splice(tokenIndex, 1);
        return tokenIndexDelta - 1;
    }
    static removeNegation(tokens, tokenIndex, tokenIndexDelta, syntaxToBeInvertedEntry) {
        tokenIndexDelta = InvertNegatedSyntax.removeExclamationMark(tokens, tokenIndex, tokenIndexDelta);
        // REF - 1889
        if (InvertNegatedSyntax.isRemoveNegationBrackets(syntaxToBeInvertedEntry)) {
            tokenIndexDelta = InvertNegatedSyntax.removeBrackets(tokens, tokenIndex, tokenIndexDelta, syntaxToBeInvertedEntry);
        }
        return tokenIndexDelta;
    }
    static replaceExclamationWithEquals(tokens, tokenIndex) {
        tokens[tokenIndex] = '=';
    }
    static invert(tokens, tokenIndex, tokenIndexDelta, syntaxToBeInverted, entryIndex) {
        if (tokens[tokenIndex + 1] === '=') {
            InvertNegatedSyntax.replaceExclamationWithEquals(tokens, tokenIndex);
        }
        else if (insertBrackets_1.InsertBrackets.isInsertNewBrackets(syntaxToBeInverted[entryIndex + 1])) {
            tokenIndexDelta += insertNewSyntax_1.InsertNewSyntax.insert(tokens, tokenIndex, '!');
        }
        else {
            tokenIndexDelta = InvertNegatedSyntax.removeNegation(tokens, tokenIndex, tokenIndexDelta, syntaxToBeInverted[entryIndex]);
        }
        return tokenIndexDelta;
    }
}
exports.InvertNegatedSyntax = InvertNegatedSyntax;
//# sourceMappingURL=invertNegatedSyntax.js.map