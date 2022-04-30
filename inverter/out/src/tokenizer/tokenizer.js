"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = void 0;
class Tokenizer {
    static tokenize(inputString) {
        if (inputString === '')
            return [];
        // tokenizes string into words/numbers and symbols
        // \w+ gets words
        // \s gets spaces
        // ^\w\s gets symbols
        return inputString.match(/(\w+)|(\s)|[^\w\s]/g);
    }
}
exports.Tokenizer = Tokenizer;
//# sourceMappingURL=tokenizer.js.map