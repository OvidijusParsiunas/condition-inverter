import { TraversalUtil } from '../../../shared/functionality/traversalUtil';
import { StartEndIndexes } from '../../../shared/types/StartEndIndexes';
import { Tokens } from '../../../shared/types/tokens';

type Result = { usePreviousTraversalResult?: true } & StartEndIndexes;

export class AnalyzeRedundantBrackets {
  private static isNestedUnaryOperator(tokens: Tokens, startTokenIndex: number, layers: number): boolean {
    return layers > 0 && (tokens[startTokenIndex] === '+' || tokens[startTokenIndex] === '-');
  }

  private static createNewResult(startIndex: number, endIndex: number): Result {
    return { start: startIndex, end: endIndex };
  }

  private static constructResult(tokens: Tokens, startTokenIndex: number, endTokenIndex: number, layers: number): Result {
    const result = AnalyzeRedundantBrackets.createNewResult(startTokenIndex, endTokenIndex);
    // statements can start with unary operators, in such instances we usually add a bracket by default, however if there
    // is one already - use it
    if (AnalyzeRedundantBrackets.isNestedUnaryOperator(tokens, startTokenIndex, layers)) {
      result.usePreviousTraversalResult = true;
    }
    return result;
  }

  private static isValidBracket(tokens: Tokens, startIndex: number, startTokenIndex: number, endTokenIndex: number): boolean {
    return (
      startTokenIndex < endTokenIndex &&
      tokens[startTokenIndex] === '(' &&
      tokens[endTokenIndex] === ')' &&
      TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, startIndex - 1) === endTokenIndex
    );
  }

  public static getIndexesOfNestedStartAndEndBrackets(tokens: Tokens, startIndex: number, endIndex: number, layers = 0): Result {
    const startTokenIndex = TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, startIndex);
    const endTokenIndex = TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, endIndex, false);
    if (!AnalyzeRedundantBrackets.isValidBracket(tokens, startIndex, startTokenIndex, endTokenIndex)) {
      return AnalyzeRedundantBrackets.constructResult(tokens, startTokenIndex, endTokenIndex, layers);
    }
    const result = AnalyzeRedundantBrackets.getIndexesOfNestedStartAndEndBrackets(tokens, startTokenIndex + 1, endTokenIndex - 1, layers + 1);
    return result.usePreviousTraversalResult ? AnalyzeRedundantBrackets.createNewResult(startTokenIndex, endTokenIndex) : result;
  }
}
