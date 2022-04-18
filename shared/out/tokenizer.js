"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./shared/consts/errors");
class Tokenizer {
    static tokenize(inputString) {
        // tokenizes string into words/numbers and symbols
        const tokens = inputString.match(/(\w+)|(\s)|[^\w\s]/g);
        if (!tokens)
            throw new Error(errors_1.FAILED_TO_TOKEN_STRING_ERROR_MESSAGE);
        return tokens;
    }
}
exports.default = Tokenizer;
//# sourceMappingURL=tokenizer.js.map