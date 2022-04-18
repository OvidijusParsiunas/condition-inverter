"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvertGreaterOrLessThanSign = void 0;
const insertNewSyntax_1 = require("./insertNewSyntax");
class InvertGreaterOrLessThanSign {
    static isGreaterOrLessThanHasFollowUpEquals(invertableSyntaxEntry) {
        return invertableSyntaxEntry.greaterOrLessThanHasFollowUpEquals;
    }
    static removeEqualsSign(tokens, tokenIndex) {
        tokens.splice(tokenIndex + 1, 1);
    }
    static invert(tokens, tokenIndex, tokenIndexDelta, syntaxToBeInverted) {
        tokens[tokenIndex] = tokens[tokenIndex] === '>' ? '<' : '>';
        if (InvertGreaterOrLessThanSign.isGreaterOrLessThanHasFollowUpEquals(syntaxToBeInverted)) {
            InvertGreaterOrLessThanSign.removeEqualsSign(tokens, tokenIndex);
            tokenIndexDelta -= 1;
        }
        else {
            tokenIndexDelta += insertNewSyntax_1.InsertNewSyntax.insert(tokens, tokenIndex + 1, '=');
        }
        return tokenIndexDelta;
    }
}
exports.InvertGreaterOrLessThanSign = InvertGreaterOrLessThanSign;
//# sourceMappingURL=invertGreaterOrLessThanSign.js.map