import { AnalyzeArithmeticAndAssignmentOperator } from './analyzeArithmeticAndAssignmentOperator';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { AnalyzeTernaryOperator } from './analyzeTernaryOperator';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeQuestionMark {
  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    // checks if ??=
    const assignmentResult = AnalyzeArithmeticAndAssignmentOperator.updateStateIfLogicalAssignment(tokens, index, evaluationState);
    if (assignmentResult > -1) return assignmentResult;
    const nextTokenIndex = index + 1;
    const nextToken = tokens[index + 1];
    if (nextToken === '?') {
      AnalyzeBrackatableSyntax.updateState(evaluationState);
    } else if (nextToken !== '.') {
      return AnalyzeTernaryOperator.movePastTernaryOperator(tokens, nextTokenIndex, evaluationState);
    }
    return index;
  }
}
