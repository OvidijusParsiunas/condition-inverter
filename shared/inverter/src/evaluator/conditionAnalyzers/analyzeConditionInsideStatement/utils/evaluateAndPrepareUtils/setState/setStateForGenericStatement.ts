import { TraversalUtil } from '../../../../../../shared/functionality/traversalUtil';
import { AnalyzeRedundantBrackets } from '../redundancies/analyzeRedundantBrackets';
import { EvaluationState } from '../../../../../../shared/types/evaluationState';
import { StartEndIndexes } from '../../../../../../shared/types/StartEndIndexes';
import { LANGUAGE } from '../../../../../../shared/consts/languages';
import { SetEvaluationState } from './shared/setEvaluationState';
import { Tokens } from '../../../../../../shared/types/tokens';

export class SetStateForGenericStatement {
  // If the no symbols approach causes issues for golang when if statement initialization is used e.g. if num := 9; num > 0 add the following code
  // private static getGoStatementIndexes(startSymbolIndex: number, tokensFromIfStart: Tokens): StartEndIndexes {
  //   return {
  //     start: startSymbolIndex + tokensFromIfStart.indexOf(';') + 1,
  //     end: startSymbolIndex + tokensFromIfStart.indexOf('{'),
  //   };
  // }

  private static getStatementWithNoSymbolsIndexes(startSymbolIndex: number, tokensFromStartSymbol: Tokens): StartEndIndexes {
    const openCurlyBraceIndex = tokensFromStartSymbol.indexOf('{');
    return {
      start: startSymbolIndex - 1,
      // if there is no open curly brace, then the user has likely partially highlighted the if statement - if dog
      // we can set end to -1 in order to identify that there is no end, which SetEvaluationState.set will react
      // to appropriately and set evaluationState accordingly
      end: openCurlyBraceIndex === -1 ? -1 : startSymbolIndex + openCurlyBraceIndex,
    };
  }

  // prettier-ignore
  private static getStatementWithColonEndIndexesAndSetLanguage(
      startSymbolIndex: number, colonIndex: number, evaluationState: EvaluationState): StartEndIndexes {
    evaluationState.language = LANGUAGE.python;
    return {
      start: startSymbolIndex - 1,
      end: startSymbolIndex + colonIndex,
    };
  }

  // prettier-ignore
  private static getNoBracketsStatementIndexesAndSetLanguage(
      tokens: Tokens, startSymbolIndex: number, evaluationState: EvaluationState): StartEndIndexes {
    const tokensFromStartSymbol = tokens.slice(startSymbolIndex);
    const colonIndex = tokensFromStartSymbol.indexOf(':');
    if (colonIndex > -1 && tokensFromStartSymbol[colonIndex + 1] !== '=') {
      return SetStateForGenericStatement.getStatementWithColonEndIndexesAndSetLanguage(startSymbolIndex, colonIndex, evaluationState);
    }
    // If the no symbols approach causes issues for golang when if statement initialization is used e.g. if num := 9; num > 0 add the following code
    // if (colonIndex > -1) {
    //   return AnalyzeStatementUtil.getGoStatementIndexes(startSymbolIndex, tokensFromStartSymbol);
    // }
    return SetStateForGenericStatement.getStatementWithNoSymbolsIndexes(startSymbolIndex, tokensFromStartSymbol);
  }

  // prettier-ignore
  private static getBrackatableStatementIndexesAndSetLanguage(
      tokens: Tokens, analysisStartIndex: number, startSymbolIndex: number, evaluationState: EvaluationState): StartEndIndexes {
    const endIndex = TraversalUtil.getIndexOfClosingBracket(tokens, analysisStartIndex);
    const siblingIndexAfterCloseBracket = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, endIndex + 1);
    if (tokens[siblingIndexAfterCloseBracket] === ':') {
      evaluationState.language = LANGUAGE.python;
    }
    return {
      start: TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, startSymbolIndex + 1) - 1,
      end: endIndex,
    };
  }

  private static getIndexesOfStatementAndSetLanguage(tokens: Tokens, analysisStartIndex: number, evaluationState: EvaluationState): StartEndIndexes {
    const startSymbolIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, analysisStartIndex + 1);
    if (tokens[startSymbolIndex] === '(') {
      return SetStateForGenericStatement.getBrackatableStatementIndexesAndSetLanguage(tokens, analysisStartIndex, startSymbolIndex, evaluationState);
    }
    return SetStateForGenericStatement.getNoBracketsStatementIndexesAndSetLanguage(tokens, startSymbolIndex, evaluationState);
  }

  public static set(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const { start, end } = SetStateForGenericStatement.getIndexesOfStatementAndSetLanguage(tokens, index, evaluationState);
    const statementBoundaryIndexes = AnalyzeRedundantBrackets.getIndexesOfNestedStartAndEndBrackets(tokens, start, end);
    return SetEvaluationState.set(statementBoundaryIndexes, evaluationState, tokens);
  }
}
