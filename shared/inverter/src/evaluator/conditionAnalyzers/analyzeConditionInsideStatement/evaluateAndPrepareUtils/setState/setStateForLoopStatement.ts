import { TokenOccurrences } from '../../../../../shared/functionality/tokenOccurrences';
import { AnalyzeRedundantBrackets } from '../redundancies/analyzeRedundantBrackets';
import { TraversalUtil } from '../../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../../shared/types/evaluationState';
import { LANGUAGE } from '../../../../../shared/consts/languages';
import { SetEvaluationState } from './shared/setEvaluationState';
import { Tokens } from '../../../../../shared/types/tokens';

export class SetStateForLoopStatement {
  private static isConditionInValid(statementTokens: Tokens, start: number, end: number): boolean {
    const nextTokenAfterStart = TraversalUtil.getSiblingNonSpaceTokenIndex(statementTokens, start + 1);
    return nextTokenAfterStart >= end;
  }

  private static setEvaluationStateIfValid(tokens: Tokens, start: number, end: number, evaluationState: EvaluationState): number {
    const statementBoundaryIndexes = AnalyzeRedundantBrackets.getIndexesOfNestedStartAndEndBrackets(tokens, start, end);
    if (SetStateForLoopStatement.isConditionInValid(tokens, start, end)) return end;
    return SetEvaluationState.set(statementBoundaryIndexes, evaluationState);
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
    const indexOfCurlyBracket = tokens.indexOf('{');
    if (indexOfCurlyBracket > -1) {
      return SetStateForLoopStatement.setStateForGolang(tokens, startIndex, indexOfCurlyBracket, evaluationState);
    }
    evaluationState.language = LANGUAGE.python;
    // python for loops do not contain conditions index is moved to end of syntax
    return tokens.indexOf(':');
  }
}
