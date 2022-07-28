import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class GreaterOrLessThanOperatorExpansion {
  private static getLengthOfGreaterOrLessThanComparisonOperator(tokens: Tokens, index: number, delta: number, length: number): number {
    if (tokens[index] === tokens[index + delta]) {
      return GreaterOrLessThanOperatorExpansion.getLengthOfGreaterOrLessThanComparisonOperator(tokens, index + delta, delta, length + 1);
    }
    // this is for rightwards tranversal in end
    if (tokens[index + delta] === '=') return length + 1;
    return length;
  }

  public static getForHighlightedSelectionStart(tokens: Tokens, index: number): number {
    // startExpansion starts with 0 for <| as it does not mean that expansion will be needed, however <|= needs to be expanded over
    const startExpansion = tokens[index + 1] === '=' ? 1 : 0;
    return GreaterOrLessThanOperatorExpansion.getLengthOfGreaterOrLessThanComparisonOperator(tokens, index, -1, startExpansion);
  }

  private static isHTMLTagSymbol(tokens: Tokens, index: number): boolean {
    return AnalyzeHTMLTag.isTagStartSymbol(tokens, index) || AnalyzeHTMLTag.isTagEndSymbol(tokens, index);
  }

  public static getForSelectionStart(tokens: Tokens, index: number): number {
    if (GreaterOrLessThanOperatorExpansion.isHTMLTagSymbol(tokens, index)) return 0;
    return GreaterOrLessThanOperatorExpansion.getLengthOfGreaterOrLessThanComparisonOperator(tokens, index, -1, 1);
  }

  public static getForHighlightedSelectionEnd(tokens: Tokens, index: number): number {
    // |<
    if (tokens[index - 1] !== tokens[index]) return 0;
    // length starts with 1 as <|< means there is a need for at least 1 expantion
    return GreaterOrLessThanOperatorExpansion.getLengthOfGreaterOrLessThanComparisonOperator(tokens, index, 1, 1);
  }

  public static getForSelectionEnd(tokens: Tokens, index: number): number {
    if (GreaterOrLessThanOperatorExpansion.isHTMLTagSymbol(tokens, index)) return 0;
    return GreaterOrLessThanOperatorExpansion.getLengthOfGreaterOrLessThanComparisonOperator(tokens, index, 1, 1);
  }
}
