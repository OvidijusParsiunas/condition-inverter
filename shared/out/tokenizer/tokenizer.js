"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = void 0;
const errors_1 = require("../shared/consts/errors");
class Tokenizer {
    static tokenize(inputString) {
        // tokenizes string into words/numbers and symbols
        // \w+ gets words
        // \s gets spaces
        // ^\w\s gets symbols
        const tokens = inputString.match(/(\w+)|(\s)|[^\w\s]/g);
        if (!tokens)
            throw new Error(errors_1.FAILED_TO_TOKEN_STRING_ERROR_MESSAGE);
        return tokens;
    }
}
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=tokenizer.js.map