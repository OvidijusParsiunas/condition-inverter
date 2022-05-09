"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvertLogicalOperator = void 0;
class InvertLogicalOperator {
    static invertSymbol(tokens, tokenIndex) {
        const newToken = tokens[tokenIndex] === '|' ? '&' : '|';
        tokens[tokenIndex] = newToken;
        tokens[tokenIndex + 1] = newToken;
    }
    // mostly used for Python
    static invertKeyword(tokens, tokenIndex) {
        const newToken = tokens[tokenIndex] === 'and' ? 'or' : 'and';
        tokens[tokenIndex] = newToken;
    }
}
exports.InvertLogicalOperator = InvertLogicalOperator;
//# sourceMappingURL=invertLogicalOperator.js.map