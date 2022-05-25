import { AnalyzeArithmeticAndAssignmentOperator } from './analyzeArithmeticAndAssignmentOperator';
import { EvaluationStateUtil } from '../../evaluationState/evaluationStateUtil';
import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { MarkValueForInversion } from '../markValueForInversion';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeLogicalOperator {
  private static updateStateForStandaloneStatements(
    tokens: Tokens,
    currentIndex: number,
    nextNonSpaceCharIndex: number,
    evaluationState: EvaluationState,
  ): void {
    const endIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, currentIndex - 1, false);
    MarkValueForInversion.mark(tokens, endIndex, evaluationState);
    evaluationState.syntaxToBeInverted.push({ start: currentIndex });
    evaluationState.currentConditionStartIndex = nextNonSpaceCharIndex;
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  private static updateStateForStatementsBeforeOperator(
    tokens: Tokens,
    currentIndex: number,
    nextNonSpaceIndex: number,
    evaluationState: EvaluationState,
  ): void {
    if (evaluationState.numberOfBracketsOpen === 0) {
      AnalyzeLogicalOperator.updateStateForStandaloneStatements(tokens, currentIndex, nextNonSpaceIndex, evaluationState);
    } else if (evaluationState.markedForOperatorInversion) {
      // instead of inverting the comparison operator, the brackets are inverted
      evaluationState.syntaxToBeInverted.pop();
    }
    evaluationState.markedForOperatorInversion = false;
  }

  private static updateState(tokens: Tokens, currentIndex: number, nextIndexToAnalayze: number, evaluationState: EvaluationState): number {
    const nextNonSpaceCharIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, nextIndexToAnalayze);
    AnalyzeLogicalOperator.updateStateForStatementsBeforeOperator(tokens, currentIndex, nextNonSpaceCharIndex, evaluationState);
    // subtracting one due to the for loop automatically adding one
    return nextNonSpaceCharIndex - 1;
  }

  public static updateStateForSymbol(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const andOrAssignmentResult = AnalyzeArithmeticAndAssignmentOperator.updateStateIfLogicalAssignment(tokens, index, evaluationState);
    if (andOrAssignmentResult > -1) return andOrAssignmentResult;
    const nextToken = tokens[index + 1];
    if (nextToken === '&' || nextToken === '|') {
      return AnalyzeLogicalOperator.updateState(tokens, index, index + 2, evaluationState);
    }
    // if & or | is by itself then it is regarded as a bitwise operator
    AnalyzeBrackatableSyntax.updateState(evaluationState);
    return index;
  }

  // currently being used for python
  public static updateStateForKeyword(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    return AnalyzeLogicalOperator.updateState(tokens, index, index + 1, evaluationState);
  }
}
