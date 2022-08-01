import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class ForwardSlashExpansion {
  public static getForSelectionEnd(tokens: Tokens, index: number): number {
    const isEndTagSymbol = AnalyzeHTMLTag.isTagStartSymbol(tokens, index);
    return isEndTagSymbol ? -1 : 0;
  }
}
