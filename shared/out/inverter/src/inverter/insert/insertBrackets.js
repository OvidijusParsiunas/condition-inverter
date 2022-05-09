"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertBrackets = void 0;
const insertNewSyntax_1 = require("./insertNewSyntax");
class InsertBrackets {
    static isInsertNewBrackets(invertableSyntaxEntry) {
        return invertableSyntaxEntry?.insertNewBrackets;
    }
    static insert(tokens, startIndex, endIndex, tokenIndexDelta) {
        tokenIndexDelta += insertNewSyntax_1.InsertNewSyntax.insert(tokens, startIndex, '(');
        tokenIndexDelta += insertNewSyntax_1.InsertNewSyntax.insert(tokens, endIndex + tokenIndexDelta + 1, ')');
        return tokenIndexDelta;
    }
}
exports.InsertBrackets = InsertBrackets;
//# sourceMappingURL=insertBrackets.js.map