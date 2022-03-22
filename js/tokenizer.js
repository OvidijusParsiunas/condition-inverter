module.exports = class Tokenizer {
    static tokenize(functionString) {
        return functionString.match(/(\w+)|(\s)|[^\w\s]/g);
    }
}
