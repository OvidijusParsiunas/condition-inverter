import { TraversalUtil } from '../../../../../shared/functionality/traversalUtil';
import { StartEndIndexes } from '../../../../../shared/types/StartEndIndexes';
import { Tokens } from '../../../../../shared/types/tokens';

export type BracketsAnalysisResult = { usePreviousTraversalResult?: true; lastRedundantOpenBracketIndex?: number } & StartEndIndexes;

export class AnalyzeRedundantBrackets {
  private static isNestedUnaryOperator(tokens: Tokens, startTokenIndex: number, layers: number): boolean {
    return layers > 0 && (tokens[startTokenIndex] === '+' || tokens[startTokenIndex] === '-');
  }

  // prettier-ignore
  private static createNewResult(
      tokens: Tokens, startIndex: number, endIndex: number, lastBracketIndex: number, layers: number): BracketsAnalysisResult {
    const resultObject: BracketsAnalysisResult = { start: startIndex - 1, end: endIndex + 1 };
    if (layers > 0) {
      resultObject.lastRedundantOpenBracketIndex = TraversalUtil.findTokenIndex(tokens, lastBracketIndex, '(', false);
    }
    return resultObject;
  }

  private static constructResult(tokens: Tokens, startTokenIndex: number, endTokenIndex: number, layers: number): BracketsAnalysisResult {
    const result = AnalyzeRedundantBrackets.createNewResult(tokens, startTokenIndex, endTokenIndex, startTokenIndex, layers);
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
      TraversalUtil.getIndexOfClosingBracket(tokens, startIndex - 1) === endTokenIndex
    );
  }

  // prettier-ignore
  public static getIndexesOfNestedStartAndEndBrackets(
    tokens: Tokens, startIndex: number, endIndex: number, layers = 0): BracketsAnalysisResult {
    const innerStartIndex = startIndex + 1;
    const innerEndIndex = endIndex - 1;
    const startTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, innerStartIndex);
    const endTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, innerEndIndex, false);
    if (!AnalyzeRedundantBrackets.isValidBracket(tokens, innerStartIndex, startTokenIndex, endTokenIndex)) {
      return AnalyzeRedundantBrackets.constructResult(tokens, startTokenIndex, endTokenIndex, layers);
    }
    const result = AnalyzeRedundantBrackets.getIndexesOfNestedStartAndEndBrackets(tokens, startTokenIndex, endTokenIndex, layers + 1);
    return result.usePreviousTraversalResult
      ? AnalyzeRedundantBrackets.createNewResult(tokens, startTokenIndex, endTokenIndex, startTokenIndex, layers)
      : result;
  }
}
