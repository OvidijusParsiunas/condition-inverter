import { AnalyzeArithmeticAndAssignmentOperator } from './analyzeArithmeticAndAssignmentOperator';
import { EvaluationState } from '../../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { AnalyzeTernaryOperator } from './analyzeTernaryOperator';
import { Tokens } from '../../../../../shared/types/tokens';

export class AnalyzeQuestionMark {
  private static updateStateForNullishCoalescingOrTernaryOperator(tokens: Tokens, nextTokenIndex: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[nextTokenIndex];
    if (nextToken === '?') {
      AnalyzeBrackatableSyntax.updateState(evaluationState);
      return nextTokenIndex;
    } else if (nextToken !== '.') {
      return AnalyzeTernaryOperator.movePastTernaryOperator(tokens, nextTokenIndex, evaluationState);
    }
    return -1;
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    // checks if ??=
    const assignmentResult = AnalyzeArithmeticAndAssignmentOperator.updateStateIfLogicalAssignment(tokens, index, evaluationState);
    if (assignmentResult > -1) return assignmentResult;
    if (index + 1 < tokens.length) {
      const operatorResult = AnalyzeQuestionMark.updateStateForNullishCoalescingOrTernaryOperator(tokens, index + 1, evaluationState);
      if (operatorResult > -1) return operatorResult;
    }
    return index;
  }
}
