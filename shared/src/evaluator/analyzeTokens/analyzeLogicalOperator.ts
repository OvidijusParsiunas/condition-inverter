import { EvaluationState } from '../../shared/types/evaluationState';
import { AnalyzeTokensUtil } from './utils/analyzeTokensUtil';
import { Tokens } from '../../shared/types/tokens';
import TraversalUtils from '../../traversalUtils';

export class AnalyzeLogicalOperator {
  private static analyzeStandaloneStatements(tokens: Tokens, index: number, nextNonSpaceCharIndex: number, evaluationState: EvaluationState): void {
    AnalyzeTokensUtil.dealWithStandaloneStatements(tokens, index, evaluationState);
    evaluationState.conditionsToBeInverted.push({ start: index });
    evaluationState.startOfCurrentlyEvaluatedStatementIndex = nextNonSpaceCharIndex;
    AnalyzeTokensUtil.refreshBooleanState(evaluationState);
  }

  private static analyzeStatementsBeforeOperator(tokens: Tokens, index: number, nextNonSpaceCharIndex: number, evaluationState: EvaluationState) {
    if (evaluationState.numberOfBracketsOpen === 0) {
      AnalyzeLogicalOperator.analyzeStandaloneStatements(tokens, index, nextNonSpaceCharIndex, evaluationState);
    } else if (evaluationState.numberOfBracketsOpen > 0 && evaluationState.comparisonOperatorFound) {
      // instead of inverting the comparison operator, the brackets are inverted instead
      evaluationState.conditionsToBeInverted.pop();
    }
    evaluationState.comparisonOperatorFound = false;
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[index + 1];
    if (nextToken === '&' || nextToken === '|') {
      const nextNonSpaceCharIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 2);
      AnalyzeLogicalOperator.analyzeStatementsBeforeOperator(tokens, index, nextNonSpaceCharIndex, evaluationState);
      // subtracting one due to the for loop automatically adding one
      return nextNonSpaceCharIndex - 1;
    }
    return index;
  }
}
