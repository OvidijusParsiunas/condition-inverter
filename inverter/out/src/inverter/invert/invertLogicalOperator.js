"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvertLogicalOperator = void 0;
class InvertLogicalOperator {
    static invert(tokens, tokenIndex) {
        const newToken = tokens[tokenIndex] === '|' ? '&' : '|';
        tokens[tokenIndex] = newToken;
        tokens[tokenIndex + 1] = newToken;
    }
}
exports.InvertLogicalOperator = InvertLogicalOperator;
//# sourceMappingURL=invertLogicalOperator.js.map