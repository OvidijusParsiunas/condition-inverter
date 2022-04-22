import { EvaluationStateUtil } from '../../../evaluationState/evaluationStateUtil';
import { UpdateStateForStandaloneStatements } from '../analyzeStandaloneStatement';
import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeLogicalOperator {
  private static updateStateForStandaloneStatements(
    tokens: Tokens,
    index: number,
    nextNonSpaceCharIndex: number,
    evaluationState: EvaluationState,
  ): void {
    UpdateStateForStandaloneStatements.markStandaloneStatementsForInversion(tokens, index, evaluationState);
    evaluationState.syntaxToBeInverted.push({ start: index });
    evaluationState.startOfCurrentIfStatementInsideIndex = nextNonSpaceCharIndex;
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  private static updateStateForStatementsBeforeOperator(
    tokens: Tokens,
    index: number,
    nextNonSpaceIndex: number,
    evaluationState: EvaluationState,
  ): void {
    if (evaluationState.numberOfBracketsOpen === 0) {
      AnalyzeLogicalOperator.updateStateForStandaloneStatements(tokens, index, nextNonSpaceIndex, evaluationState);
    } else if (evaluationState.numberOfBracketsOpen > 0 && evaluationState.comparisonOperatorFound) {
      // instead of inverting the comparison operator, the brackets are inverted
      evaluationState.syntaxToBeInverted.pop();
    }
    evaluationState.comparisonOperatorFound = false;
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[index + 1];
    if (nextToken === '&' || nextToken === '|') {
      const nextNonSpaceCharIndex = TraversalUtil.getNonSpaceCharacterIndex(tokens, index + 2);
      AnalyzeLogicalOperator.updateStateForStatementsBeforeOperator(tokens, index, nextNonSpaceCharIndex, evaluationState);
      // subtracting one due to the for loop automatically adding one
      return nextNonSpaceCharIndex - 1;
    }
    // if & or | is by itself then it is regarded as a bitwise operator
    AnalyzeBrackatableSyntax.updateState(evaluationState);
    return index;
  }
}
