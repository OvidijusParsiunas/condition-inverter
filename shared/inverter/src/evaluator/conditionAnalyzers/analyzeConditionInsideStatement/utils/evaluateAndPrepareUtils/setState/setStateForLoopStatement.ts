import { TokenOccurrences } from '../../../../../../shared/functionality/tokenOccurrences';
import { TraversalUtil } from '../../../../../../shared/functionality/traversalUtil';
import { AnalyzeRedundantBrackets } from '../redundancies/analyzeRedundantBrackets';
import { EvaluationState } from '../../../../../../shared/types/evaluationState';
import { LANGUAGE } from '../../../../../../shared/consts/languages';
import { SetEvaluationState } from './shared/setEvaluationState';
import { Tokens } from '../../../../../../shared/types/tokens';

export class SetStateForLoopStatement {
  private static isConditionInValid(statementTokens: Tokens, start: number, end: number): boolean {
    const nextTokenAfterStart = TraversalUtil.getSiblingNonSpaceTokenIndex(statementTokens, start + 1);
    return nextTokenAfterStart >= end;
  }

  private static setEvaluationStateIfValid(tokens: Tokens, start: number, end: number, evaluationState: EvaluationState): number {
    const statementBoundaryIndexes = AnalyzeRedundantBrackets.getIndexesOfNestedStartAndEndBrackets(tokens, start, end);
    if (SetStateForLoopStatement.isConditionInValid(tokens, start, end)) return end;
    return SetEvaluationState.set(statementBoundaryIndexes, evaluationState, tokens);
  }

  private static setBoundariesForMiddleOfIfStatement(tokens: Tokens, startIndex: number, endIndex: number, evaluationState: EvaluationState): number {
    const statementTokens = tokens.slice(startIndex, endIndex);
    const semicolonOccurenceIndexes = TokenOccurrences.getIndexes(statementTokens, ';');
    if (semicolonOccurenceIndexes.length > 0) {
      const conditionStart = startIndex + semicolonOccurenceIndexes[0];
      const conditionEnd = startIndex + semicolonOccurenceIndexes[1];
      return SetStateForLoopStatement.setEvaluationStateIfValid(tokens, conditionStart, conditionEnd, evaluationState);
    }
    return -1;
  }

  private static setStateForGolang(tokens: Tokens, startIndex: number, indexOfCurlyBracket: number, evaluationState: EvaluationState): number {
    evaluationState.language = LANGUAGE.golang;
    const newIndex = SetStateForLoopStatement.setBoundariesForMiddleOfIfStatement(tokens, startIndex, indexOfCurlyBracket, evaluationState);
    if (newIndex > -1) return newIndex;
    const rangeIndex = tokens.indexOf('range');
    if (rangeIndex > -1 && rangeIndex < indexOfCurlyBracket) {
      return indexOfCurlyBracket;
    }
    SetStateForLoopStatement.setEvaluationStateIfValid(tokens, startIndex - 1, indexOfCurlyBracket, evaluationState);
    return startIndex + 1;
  }

  private static setStateForBrackatable(tokens: Tokens, openBracketIndex: number, evaluationState: EvaluationState): number {
    const closeBracketIndex = TraversalUtil.getIndexOfClosingBracket(tokens, openBracketIndex, 1) + 1;
    const newIndex = SetStateForLoopStatement.setBoundariesForMiddleOfIfStatement(tokens, openBracketIndex, closeBracketIndex, evaluationState);
    return newIndex > -1 ? newIndex : closeBracketIndex;
  }

  public static set(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const startIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index + 1);
    const startToken = tokens[startIndex];
    if (startToken === '(') {
      return SetStateForLoopStatement.setStateForBrackatable(tokens, startIndex, evaluationState);
    }
    const openCurlyBraceIndex = tokens.indexOf('{');
    if (openCurlyBraceIndex > -1) {
      return SetStateForLoopStatement.setStateForGolang(tokens, startIndex, openCurlyBraceIndex, evaluationState);
    }
    const colonIndex = tokens.indexOf(':');
    if (colonIndex > -1) {
      // python for loops do not contain conditions, hence the index is moved to end of syntax
      evaluationState.language = LANGUAGE.python;
      return tokens.length;
    }
    // setting end to -1 in order to identify that there is no end, which SetEvaluationState.set will react
    // to appropriately and set evaluationState accordingly
    // IMPORTANT to note that this will result in an inconsistency where python for loops are not inverted when fully highlighed by
    // the user (highliught end with a :) but if the colon is not there, the following will set the condition to be evaluated
    // WORK - attempt to find the colon when highlighting using the extension
    return SetEvaluationState.set({ start: startIndex - 1, end: -1 }, evaluationState, tokens);
  }
}
