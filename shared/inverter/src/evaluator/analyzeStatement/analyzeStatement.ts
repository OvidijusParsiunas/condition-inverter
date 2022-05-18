import { UpdateStateForStandaloneStatements } from './analyzeTokens/analyzeStandaloneStatement';
import { AnalyzeRedundantBrackets } from './redundancies/analyzeRedundantBrackets';
import { EvaluationStateUtil } from '../evaluationState/evaluationStateUtil';
import { TraversalUtil } from '../../shared/functionality/traversalUtil';
import { CleanUpRedundancies } from './redundancies/cleanUpRedundancies';
import { EvaluationState } from '../../shared/types/evaluationState';
import { StartEndIndexes } from '../../shared/types/StartEndIndexes';
import { AnalyzeTokens } from './analyzeTokens/analyzeTokens';
import { Tokens } from '../../shared/types/tokens';

export class AnalyzeStatement {
  private static finishEvaluatingStatement(tokens: Tokens, evaluationState: EvaluationState): void {
    UpdateStateForStandaloneStatements.markStandaloneStatementsForInversion(
      tokens,
      evaluationState.currentStatementCloseBracketIndex,
      evaluationState,
    );
    evaluationState.isCurrentlyInsideStatement = false;
    evaluationState.comparisonOperatorFound = false;
    CleanUpRedundancies.removeAdditionOfBracketsFromState(evaluationState);
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (evaluationState.currentStatementCloseBracketIndex > index) {
      return AnalyzeTokens.updateState(tokens, index, evaluationState);
    }
    AnalyzeStatement.finishEvaluatingStatement(tokens, evaluationState);
    return index;
  }

  private static getInnerIndexesOfStatement(tokens: Tokens, index: number): StartEndIndexes {
    const startSymbolIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index + 1);
    if (tokens[startSymbolIndex] === '(') {
      return {
        start: TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, startSymbolIndex + 1),
        end: TraversalUtil.getIndexOfClosingBracket(tokens, index) - 1,
      };
    }
    return {
      start: startSymbolIndex,
      end: startSymbolIndex + tokens.slice(startSymbolIndex).indexOf(':') - 1,
    };
  }

  private static setEvaluationStartAndEndIndexes(tokens: Tokens, index: number, evaluationState: EvaluationState): void {
    const { start, end } = AnalyzeStatement.getInnerIndexesOfStatement(tokens, index);
    const noRedundantBracketsIndexes = AnalyzeRedundantBrackets.getIndexesOfNestedStartAndEndBrackets(tokens, start, end);
    evaluationState.lastRedundantOpenBracketIndex = noRedundantBracketsIndexes.lastRedundantOpenBracketIndex;
    evaluationState.startOfCurrentStatementInsideIndex = noRedundantBracketsIndexes.start;
    evaluationState.currentStatementCloseBracketIndex = noRedundantBracketsIndexes.end + 1;
  }

  public static setNewStatementState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    AnalyzeStatement.setEvaluationStartAndEndIndexes(tokens, index, evaluationState);
    evaluationState.isCurrentlyInsideStatement = true;
    return evaluationState.startOfCurrentStatementInsideIndex - 1;
  }
}
