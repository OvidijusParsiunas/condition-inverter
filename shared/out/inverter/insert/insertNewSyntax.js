"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertNewSyntax = void 0;
class InsertNewSyntax {
    static insert(tokens, tokenIndex, newSyntax) {
        tokens.splice(tokenIndex, 0, newSyntax);
        return 1;
    }
}
exports.InsertNewSyntax = InsertNewSyntax;
//# sourceMappingURL=insertNewSyntax.js.map