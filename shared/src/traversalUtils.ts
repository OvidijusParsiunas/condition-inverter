export default class TraversalUtils {
  public static findNonSpaceCharacterIndexStartingFromIndex(tokens: any[], index: number, forwards = true): any {
    if (index === 0) {
      return 0;
    }
    if (tokens[index] !== ' ' && tokens[index] !== `\n`) {
      return index;
    }
    const newIndex = forwards ? index + 1 : index - 1;
    return TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, newIndex, forwards);
  }

  public static getWhenNumberStops(tokens: string | any[], index: number): any {
    if (index > tokens.length - 1) {
      console.log('attempt to retrieve when number declaration stops is out of bounds');
      return -1;
    }
    const nextCharacter = tokens[index];
    if (nextCharacter === ' ' || nextCharacter === ')' || nextCharacter === '&' || nextCharacter === '|') {
      return index;
    }
    return TraversalUtils.getWhenNumberStops(tokens, index + 1);
  }

  public static findEndingStringQuoteIndex(tokens: { [x: string]: any }, index: number, typeOfQuoteString: any): any {
    if (tokens[index] === typeOfQuoteString) {
      return index;
    }
    return TraversalUtils.findEndingStringQuoteIndex(tokens, index + 1, typeOfQuoteString);
  }

  public static findLastExclamationMarkIndex(tokens: any[], index: number): any {
    const nextCharacterTokenIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
    if (tokens[nextCharacterTokenIndex] === '!') {
      return TraversalUtils.findLastExclamationMarkIndex(tokens, nextCharacterTokenIndex);
    }
    if (tokens[nextCharacterTokenIndex] === '+' || tokens[nextCharacterTokenIndex] === '-') {
      return TraversalUtils.findLastExclamationMarkIndex(tokens, nextCharacterTokenIndex);
    }
    return index;
  }

  public static getIndexOfLastBracketOfIfStatement(tokens: any[], index: number, openBrackets = 0): any {
    if (index > tokens.length - 1) {
      console.log('index out of bounds');
      return -1;
    }
    if (tokens[index + 1] === '(') {
      return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets + 1);
    }
    if (tokens[index + 1] === ')') {
      if (openBrackets === 1) {
        return index + 1;
      }
      return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets - 1);
    }
    return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets);
  }
}
