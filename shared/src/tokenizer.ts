export default class Tokenizer {
  static tokenize(functionString: string) {
    return functionString.match(/(\w+)|(\s)|[^\w\s]/g);
  }
}
