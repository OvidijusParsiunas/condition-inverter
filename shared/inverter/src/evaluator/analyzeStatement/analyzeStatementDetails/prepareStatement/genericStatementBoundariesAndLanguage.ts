import { AnalyzeRedundantBrackets } from '../redundancies/analyzeRedundantBrackets';
import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { StartEndIndexes } from '../../../../shared/types/StartEndIndexes';
import { LANGUAGE } from '../../../../shared/consts/languages';
import { Tokens } from '../../../../shared/types/tokens';

export class GenericStatementBoundariesAndLanguage {
  // If the no symbols approach causes issues for golang when if statement initialization is used e.g. if num := 9; num > 0 add the following code
  // private static getGoStatementIndexes(startSymbolIndex: number, tokensFromIfStart: Tokens): StartEndIndexes {
  //   return {
  //     start: startSymbolIndex + tokensFromIfStart.indexOf(';') + 1,
  //     end: startSymbolIndex + tokensFromIfStart.indexOf('{') - 1,
  //   };
  // }

  private static getStatementWithNoSymbolsIndexes(startSymbolIndex: number, tokensFromStartSymbol: Tokens): StartEndIndexes {
    return {
      start: startSymbolIndex,
      end: startSymbolIndex + tokensFromStartSymbol.indexOf('{') - 1,
    };
  }

  // prettier-ignore
  private static getStatementWithColonEndIndexesAndSetLanguage(
      startSymbolIndex: number, colonIndex: number, evaluationState: EvaluationState): StartEndIndexes {
    evaluationState.language = LANGUAGE.python;
    return {
      start: startSymbolIndex,
      end: startSymbolIndex + colonIndex - 1,
    };
  }

  // prettier-ignore
  private static getNoBracketsStatementIndexesAndSetLanguage(
      tokens: Tokens, startSymbolIndex: number, evaluationState: EvaluationState): StartEndIndexes {
    const tokensFromStartSymbol = tokens.slice(startSymbolIndex);
    const colonIndex = tokensFromStartSymbol.indexOf(':');
    if (colonIndex > -1 && tokensFromStartSymbol[colonIndex + 1] !== '=') {
      return GenericStatementBoundariesAndLanguage.getStatementWithColonEndIndexesAndSetLanguage(startSymbolIndex, colonIndex, evaluationState);
    }
    // If the no symbols approach causes issues for golang when if statement initialization is used e.g. if num := 9; num > 0 add the following code
    // if (colonIndex > -1) {
    //   return AnalyzeStatementUtil.getGoStatementIndexes(startSymbolIndex, tokensFromStartSymbol);
    // }
    return GenericStatementBoundariesAndLanguage.getStatementWithNoSymbolsIndexes(startSymbolIndex, tokensFromStartSymbol);
  }

  // prettier-ignore
  private static getBrackatableStatementIndexesAndSetLanguage(
      tokens: Tokens, analysisStartIndex: number, startSymbolIndex: number, evaluationState: EvaluationState): StartEndIndexes {
    const endIndex = TraversalUtil.getIndexOfClosingBracket(tokens, analysisStartIndex) - 1;
    const siblingIndexAfterCloseBracket = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, endIndex + 2);
    if (tokens[siblingIndexAfterCloseBracket] === ':') {
      evaluationState.language = LANGUAGE.python;
    }
    return {
      start: TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, startSymbolIndex + 1),
      end: endIndex,
    };
  }

  // prettier-ignore
  private static getInnerIndexesOfStatementAndSetLanguage(
      tokens: Tokens, analysisStartIndex: number, evaluationState: EvaluationState): StartEndIndexes {
    const startSymbolIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, analysisStartIndex + 1);
    if (tokens[startSymbolIndex] === '(') {
      // prettier-ignore
      return GenericStatementBoundariesAndLanguage.getBrackatableStatementIndexesAndSetLanguage(
        tokens, analysisStartIndex, startSymbolIndex, evaluationState);
    }
    return GenericStatementBoundariesAndLanguage.getNoBracketsStatementIndexesAndSetLanguage(tokens, startSymbolIndex, evaluationState);
  }

  public static set(tokens: Tokens, index: number, evaluationState: EvaluationState): void {
    const { start, end } = GenericStatementBoundariesAndLanguage.getInnerIndexesOfStatementAndSetLanguage(tokens, index, evaluationState);
    const noRedundantBracketsIndexes = AnalyzeRedundantBrackets.getIndexesOfNestedStartAndEndBrackets(tokens, start, end);
    evaluationState.lastRedundantOpenBracketIndex = noRedundantBracketsIndexes.lastRedundantOpenBracketIndex;
    evaluationState.startOfCurrentStatementIndex = noRedundantBracketsIndexes.start;
    evaluationState.currentStatementEndIndex = noRedundantBracketsIndexes.end + 1;
  }
}
