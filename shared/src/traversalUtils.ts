import { Tokens } from './shared/types/tokens';

export default class TraversalUtils {
  public static findNonSpaceCharacterIndexStartingFromIndex(tokens: Tokens, index: number, forwards = true): number {
    if (index === 0) {
      return 0;
    }
    if (tokens[index] !== ' ' && tokens[index] !== `\n`) {
      return index;
    }
    const newIndex = forwards ? index + 1 : index - 1;
    return TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, newIndex, forwards);
  }

  public static findEndingStringQuoteIndex(tokens: { [x: string]: any }, index: number, typeOfQuoteString: any): any {
    if (tokens[index] === typeOfQuoteString) {
      return index;
    }
    return TraversalUtils.findEndingStringQuoteIndex(tokens, index + 1, typeOfQuoteString);
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
