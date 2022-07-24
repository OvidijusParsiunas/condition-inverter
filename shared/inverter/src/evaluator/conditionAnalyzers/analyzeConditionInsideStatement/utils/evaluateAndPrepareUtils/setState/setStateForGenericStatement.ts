import { TraversalUtil } from '../../../../../../shared/functionality/traversalUtil';
import { AnalyzeRedundantBrackets } from '../redundancies/analyzeRedundantBrackets';
import { STRING_QUOTE_JSON } from '../../../../../../shared/consts/specialTokens';
import { EvaluationState } from '../../../../../../shared/types/evaluationState';
import { StartEndIndexes } from '../../../../../../shared/types/StartEndIndexes';
import { FirstFoundToken } from '../../../../../../shared/types/firstFoundToken';
import { LANGUAGE } from '../../../../../../shared/consts/languages';
import { SetEvaluationState } from './shared/setEvaluationState';
import { Tokens } from '../../../../../../shared/types/tokens';

export class SetStateForGenericStatement {
  private static setNoCloseBracketForStatement(start: number, evaluationState: EvaluationState): number {
    // setting evaluationState.conditionSequenceEndIndex to -1 in order to identify that there is no close bracket at end of condition
    evaluationState.conditionSequenceEndIndex = -1;
    return start + 1;
  }

  private static getStatementEndIndexForNoSymbols(startSymbolIndex: number, tokensFromStartSymbol: Tokens): FirstFoundToken | null {
    // prettier-ignore
    const statementEndIndex = TraversalUtil.findFirstTokenFromSelection(
      tokensFromStartSymbol, startSymbolIndex, { ['{']: true, ['}']: true, ['%']: true });
    if (statementEndIndex?.token === '%') {
      if (tokensFromStartSymbol[statementEndIndex.index + 1] !== '>' && tokensFromStartSymbol[statementEndIndex.index + 1] !== '}') {
        return SetStateForGenericStatement.getStatementEndIndexForNoSymbols(statementEndIndex.index + 1, tokensFromStartSymbol);
      }
    }
    return statementEndIndex;
  }

  private static getStatementWithNoSymbolsIndexes(startSymbolIndex: number, tokensFromStartSymbol: Tokens): StartEndIndexes {
    const statementEndIndex = SetStateForGenericStatement.getStatementEndIndexForNoSymbols(0, tokensFromStartSymbol);
    return {
      start: startSymbolIndex - 1,
      // if there is no curly brace or %, then the user has likely partially highlighted the if statement - if dog
      // we can set end to -1 in order to identify that there is no end, which SetEvaluationState.set will react
      // to appropriately and set evaluationState accordingly
      end: statementEndIndex ? startSymbolIndex + statementEndIndex.index : -1,
    };
  }

  private static getGoStatementIndexes(startSymbolIndex: number, tokensFromIfStart: Tokens, evaluationState: EvaluationState): StartEndIndexes {
    evaluationState.language = LANGUAGE.golang;
    return {
      start: startSymbolIndex + tokensFromIfStart.indexOf(';') + 1,
      end: startSymbolIndex + tokensFromIfStart.indexOf('{'),
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
    return colonIndex > -1
      ? SetStateForGenericStatement.getGoStatementIndexes(startSymbolIndex, tokensFromStartSymbol, evaluationState)
      : SetStateForGenericStatement.getStatementWithNoSymbolsIndexes(startSymbolIndex, tokensFromStartSymbol);
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

  private static getStartEndIndexesIfEmberIsActiveArgument(tokens: Tokens, symbolIndexAfterEquals: number): StartEndIndexes | null {
    if (tokens[symbolIndexAfterEquals] === '{') {
      const indexOfTokenAfterOpenCurlyBrace = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, symbolIndexAfterEquals + 1);
      if (tokens[indexOfTokenAfterOpenCurlyBrace] === '{') {
        const endQuoteIndex = TraversalUtil.getIndexOfClosingBrace(tokens, indexOfTokenAfterOpenCurlyBrace, 1);
        return {
          start: indexOfTokenAfterOpenCurlyBrace,
          end: endQuoteIndex,
        };
      }
    }
    return null;
  }

  private static isEqualsSymbolForHTMLAttribute(tokens: Tokens, indexOfTokenAfterStartSymbol: number): StartEndIndexes | null {
    if (tokens[indexOfTokenAfterStartSymbol] === '=') {
      const symbolIndexAfterEquals = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, indexOfTokenAfterStartSymbol + 1);
      if (STRING_QUOTE_JSON[tokens[symbolIndexAfterEquals] as keyof typeof STRING_QUOTE_JSON]) {
        const endQuoteIndex = TraversalUtil.findTokenIndex(tokens, symbolIndexAfterEquals + 1, tokens[symbolIndexAfterEquals] as string);
        return {
          start: symbolIndexAfterEquals,
          end: endQuoteIndex,
        };
      }
      const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, indexOfTokenAfterStartSymbol - 1, false);
      if (tokens[previousTokenIndex] === 'isActive') {
        return SetStateForGenericStatement.getStartEndIndexesIfEmberIsActiveArgument(tokens, symbolIndexAfterEquals);
      }
    }
    return null;
  }

  private static getHTMLAttributeIndexes(tokens: Tokens, startSymbolIndex: number): StartEndIndexes | null {
    let indexOfTokenAfterStartSymbol = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, startSymbolIndex);
    if (tokens[indexOfTokenAfterStartSymbol] === '.') {
      const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, indexOfTokenAfterStartSymbol + 1);
      // when class.name]=", we need to skip the name and set indexOfTokenAfterStartSymbol to ] index
      const indexOfTokenAfterNext = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, nextTokenIndex + 1);
      indexOfTokenAfterStartSymbol = indexOfTokenAfterNext;
    }
    if (tokens[indexOfTokenAfterStartSymbol] === ']') {
      const indexOfTokenAfterCloseSquareBracket = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, indexOfTokenAfterStartSymbol + 1);
      const endStatementPosition = SetStateForGenericStatement.isEqualsSymbolForHTMLAttribute(tokens, indexOfTokenAfterCloseSquareBracket);
      // if no equals or other symbols after, set end to -1 to indicate that there is no statement
      return endStatementPosition || { start: tokens.length - 1, end: -1 };
    }
    return SetStateForGenericStatement.isEqualsSymbolForHTMLAttribute(tokens, indexOfTokenAfterStartSymbol);
  }

  private static getIndexesOfStatementAndSetLanguage(tokens: Tokens, analysisStartIndex: number, evaluationState: EvaluationState): StartEndIndexes {
    const startSymbolIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, analysisStartIndex + 1);
    if (tokens[startSymbolIndex] === '(') {
      return SetStateForGenericStatement.getBrackatableStatementIndexesAndSetLanguage(tokens, analysisStartIndex, startSymbolIndex, evaluationState);
    }
    const htmlAttributeIndexes = SetStateForGenericStatement.getHTMLAttributeIndexes(tokens, startSymbolIndex);
    if (htmlAttributeIndexes) return htmlAttributeIndexes;
    return SetStateForGenericStatement.getNoBracketsStatementIndexesAndSetLanguage(tokens, startSymbolIndex, evaluationState);
  }

  public static set(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const { start, end } = SetStateForGenericStatement.getIndexesOfStatementAndSetLanguage(tokens, index, evaluationState);
    if (end === -1) return SetStateForGenericStatement.setNoCloseBracketForStatement(start, evaluationState);
    const statementBoundaryIndexes = AnalyzeRedundantBrackets.getIndexesOfNestedStartAndEndBrackets(tokens, start, end);
    return SetEvaluationState.set(statementBoundaryIndexes, evaluationState);
  }
}
