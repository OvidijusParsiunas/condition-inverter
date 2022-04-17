import { Tokens } from '../types/tokens';

export class TraversalUtil {
  public static getNonSpaceCharacterIndex(tokens: Tokens, index: number, traverseForwards = true): number {
    if (index === 0) {
      return 0;
    }
    if (tokens[index] !== ' ' && tokens[index] !== `\n`) {
      return index;
    }
    const newIndex = traverseForwards ? index + 1 : index - 1;
    return TraversalUtil.getNonSpaceCharacterIndex(tokens, newIndex, traverseForwards);
  }

  public static getEndQuoteIndex(tokens: Tokens, index: number, quoteString: `'` | '`' | '"'): number {
    if (tokens[index] === quoteString) {
      return index;
    }
    return TraversalUtil.getEndQuoteIndex(tokens, index + 1, quoteString);
  }

  public static getIndexOfLastBracketOfIfStatement(tokens: Tokens, index: number, openBrackets = 0): number {
    if (index > tokens.length - 1) {
      // WORK - need this inside errors
      console.log('index out of bounds');
      return -1;
    }
    if (tokens[index + 1] === '(') {
      return TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets + 1);
    }
    if (tokens[index + 1] === ')') {
      if (openBrackets === 1) {
        return index + 1;
      }
      return TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets - 1);
    }
    return TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets);
  }
}
