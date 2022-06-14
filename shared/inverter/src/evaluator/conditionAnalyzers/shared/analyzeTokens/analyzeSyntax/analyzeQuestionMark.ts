import { AnalyzeArithmeticAndAssignmentOperator } from './analyzeArithmeticAndAssignmentOperator';
import { EvaluationStateUtil } from '../../../../evaluationState/evaluationStateUtil';
import { TraversalUtil } from '../../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { AnalyzeTernaryOperator } from './analyzeTernaryOperator';
import { MarkValueForInversion } from '../markValueForInversion';
import { Tokens } from '../../../../../shared/types/tokens';

export class AnalyzeQuestionMark {
  private static updateStateForTernaryOperator(tokens: Tokens, currentIndex: number, evaluationState: EvaluationState): void {
    const endIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, currentIndex - 1, false);
    MarkValueForInversion.mark(tokens, endIndex, evaluationState);
    evaluationState.currentConditionStartIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, currentIndex + 1, true);
    EvaluationStateUtil.refreshBooleanState(evaluationState);
    evaluationState.markedForOperatorInversion = true;
  }

  // prettier-ignore
  private static updateStateForNullishCoalescingOrTernaryOperator(
      tokens: Tokens, currentIndex: number, nextTokenIndex: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[nextTokenIndex];
    if (nextToken === '?') {
      AnalyzeBrackatableSyntax.updateState(evaluationState);
      return nextTokenIndex;
    } else if (nextToken !== '.') {
      AnalyzeQuestionMark.updateStateForTernaryOperator(tokens, currentIndex, evaluationState);
      if (nextToken < tokens.length) {
        return AnalyzeTernaryOperator.movePastTernaryOperator(tokens, nextTokenIndex, evaluationState.conditionSequenceEndIndex);
      }
    }
    return -1;
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    // checks if ??=
    const assignmentResult = AnalyzeArithmeticAndAssignmentOperator.updateStateIfLogicalAssignment(tokens, index, evaluationState);
    if (assignmentResult > -1) return assignmentResult;
    if (index < tokens.length) {
      const operatorResult = AnalyzeQuestionMark.updateStateForNullishCoalescingOrTernaryOperator(tokens, index, index + 1, evaluationState);
      if (operatorResult > -1) return operatorResult;
    }
    return index;
  }
}
