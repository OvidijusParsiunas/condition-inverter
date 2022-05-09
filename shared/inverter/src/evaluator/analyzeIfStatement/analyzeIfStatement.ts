import { UpdateStateForStandaloneStatements } from './analyzeTokens/analyzeStandaloneStatement';
import { AnalyzeRedundantBrackets } from './analyzeRedundancies/analyzeRedundantBrackets';
import { EvaluationStateUtil } from '../evaluationState/evaluationStateUtil';
import { TraversalUtil } from '../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../shared/types/evaluationState';
import { StartEndIndexes } from '../../shared/types/StartEndIndexes';
import { AnalyzeTokens } from './analyzeTokens/analyzeTokens';
import { Tokens } from '../../shared/types/tokens';

export class AnalyzeIfStatement {
  private static finishEvaluatingIfStatement(tokens: Tokens, evaluationState: EvaluationState): void {
    UpdateStateForStandaloneStatements.markStandaloneStatementsForInversion(
      tokens,
      evaluationState.currentIfStatementCloseBracketIndex,
      evaluationState,
    );
    evaluationState.isCurrentlyInsideIfStatement = false;
    evaluationState.comparisonOperatorFound = false;
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (evaluationState.currentIfStatementCloseBracketIndex > index) {
      return AnalyzeTokens.updateState(tokens, index, evaluationState);
    }
    AnalyzeIfStatement.finishEvaluatingIfStatement(tokens, evaluationState);
    return index;
  }

  private static getInnerIndexesOfIfStatement(tokens: Tokens, index: number): StartEndIndexes {
    const startSymbolIndex = TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, index + 1);
    if (tokens[startSymbolIndex] === '(') {
      return {
        start: TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, startSymbolIndex + 1),
        end: TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, index) - 1,
      };
    }
    // WORK: need tests for selection and highlighted scenarios
    return {
      start: startSymbolIndex,
      end: tokens.indexOf(':') - 1,
    };
  }

  private static setEvaluationStartAndEndIndexes(tokens: Tokens, index: number, evaluationState: EvaluationState): void {
    const { start, end } = AnalyzeIfStatement.getInnerIndexesOfIfStatement(tokens, index);
    const noRedundantBracketsIndexes = AnalyzeRedundantBrackets.getIndexesOfNestedStartAndEndBrackets(tokens, start, end);
    evaluationState.startOfCurrentIfStatementInsideIndex = noRedundantBracketsIndexes.start;
    evaluationState.currentIfStatementCloseBracketIndex = noRedundantBracketsIndexes.end + 1;
  }

  public static setNewIfStatementState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    AnalyzeIfStatement.setEvaluationStartAndEndIndexes(tokens, index, evaluationState);
    evaluationState.isCurrentlyInsideIfStatement = true;
    return evaluationState.startOfCurrentIfStatementInsideIndex - 1;
  }
}
