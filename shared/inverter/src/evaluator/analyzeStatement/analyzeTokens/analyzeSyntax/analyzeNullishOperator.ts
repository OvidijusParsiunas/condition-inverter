import { AnalyzeArithmeticAndAssignmentOperator } from './analyzeArithmeticAndAssignmentOperator';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeNullishOperator {
  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    // check if ??=
    const assignmentResult = AnalyzeArithmeticAndAssignmentOperator.updateStateIfLogicalAssignment(tokens, index, evaluationState);
    if (assignmentResult > -1) return assignmentResult;
    if (tokens[index + 1] === '?') {
      AnalyzeBrackatableSyntax.updateState(evaluationState);
    }
    return index + 1;
  }
}
