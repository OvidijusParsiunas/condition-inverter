import { AnalyzeArithmeticAndAssignmentOperator } from './analyzeArithmeticAndAssignmentOperator';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { AnalyzeTernaryOperator } from './analyzeTernaryOperator';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeQuestionMark {
  private static updateStateForNullishCoalescingOrTernaryOperator(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextTokenIndex = index + 1;
    const nextToken = tokens[nextTokenIndex];
    if (nextToken === '?') {
      AnalyzeBrackatableSyntax.updateState(evaluationState);
      return index + 1;
    } else if (nextToken !== '.') {
      return AnalyzeTernaryOperator.movePastTernaryOperator(tokens, nextTokenIndex, evaluationState);
    }
    return -1;
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    // checks if ??=
    const assignmentResult = AnalyzeArithmeticAndAssignmentOperator.updateStateIfLogicalAssignment(tokens, index, evaluationState);
    if (assignmentResult > -1) return assignmentResult;
    const operatorResult = AnalyzeQuestionMark.updateStateForNullishCoalescingOrTernaryOperator(tokens, index, evaluationState);
    if (operatorResult > -1) return operatorResult;
    return index;
  }
}
