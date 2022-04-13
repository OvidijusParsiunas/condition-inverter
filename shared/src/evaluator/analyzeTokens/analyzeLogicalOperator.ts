import { EvaluationState } from '../../shared/types/evaluationState';
import { Tokens } from '../../shared/types/tokens';
import TraversalUtils from '../../traversalUtils';
import { AnalyzeTokensUtil } from './utils/analyzeTokensUtil';

export class AnalyzeLogicalOperator {
  private static evaluateStatementsBeforeLogicalOperator(tokens: Tokens, index: number, nextNonSpaceCharacter, evaluationState: EvaluationState) {
    if (evaluationState.numberOfBracketsOpen === 0) {
      AnalyzeTokensUtil.dealWithStandaloneStatements(tokens, index, evaluationState);
      evaluationState.conditionsToBeInverted.push({ start: index });
      evaluationState.startOfCurrentlyEvaluatedStatementIndex = nextNonSpaceCharacter;
      AnalyzeTokensUtil.refreshState(evaluationState);
    }
    if (evaluationState.numberOfBracketsOpen > 0 && evaluationState.comparisonOperatorFound) evaluationState.conditionsToBeInverted.pop();
    evaluationState.comparisonOperatorFound = false;
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[index + 1];
    if (nextToken === '&' || nextToken === '|') {
      const nextNonSpaceCharacter = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 2);
      AnalyzeLogicalOperator.evaluateStatementsBeforeLogicalOperator(tokens, index, nextNonSpaceCharacter, evaluationState);
      // subtracting one due to the for loop automatically adding one
      return nextNonSpaceCharacter - 1;
    }
    return index;
  }
}
