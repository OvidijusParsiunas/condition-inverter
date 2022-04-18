"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvertBooleanLiteral = void 0;
const insertNewSyntax_1 = require("../insert/insertNewSyntax");
class InvertBooleanLiteral {
    static isInvertBooleanLiteral(invertableSyntaxEntry) {
        return !!invertableSyntaxEntry.invertBooleanLiteral;
    }
    static invert(tokens, tokenIndex, syntaxToBeInvertedEntry, tokenIndexDelta) {
        if (InvertBooleanLiteral.isInvertBooleanLiteral(syntaxToBeInvertedEntry)) {
            const currentBoolean = tokens[tokenIndex];
            tokens[tokenIndex] = InvertBooleanLiteral.booleanLiteralToInveted[currentBoolean];
        }
        else {
            tokenIndexDelta += insertNewSyntax_1.InsertNewSyntax.insert(tokens, tokenIndex, '!');
        }
        return tokenIndexDelta;
    }
}
exports.InvertBooleanLiteral = InvertBooleanLiteral;
InvertBooleanLiteral.booleanLiteralToInveted = {
    [0]: 1,
    [1]: 0,
    true: false,
    false: true,
};
//# sourceMappingURL=invertBooleanLiteral.js.map