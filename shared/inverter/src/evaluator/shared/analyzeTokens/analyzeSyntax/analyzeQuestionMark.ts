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
    const nextToken = tokens[nextTokenIndex];
    if (nextToken === '?') {
      AnalyzeBrackatableSyntax.updateState(evaluationState);
    } else if (nextToken !== '.') {
      // WORK - can potentially reuse outside statement logic here to traverse back and invert for dog && (dog ? true : false) operator statement
      return AnalyzeTernaryOperator.movePastTernaryOperator(tokens, nextTokenIndex, evaluationState);
    }
    return index;
  }
}
