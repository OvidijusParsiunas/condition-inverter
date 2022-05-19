import { EvaluationState } from '../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeArithmeticAndAssignmentOperator {
  private static getIndexForArithmenticAssignmentOperator(tokens: Tokens, index: number): number {
    return tokens[index + 1] === '=' ? index + 1 : index;
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (!evaluationState.markedForOperatorInversion) {
      AnalyzeBrackatableSyntax.updateState(evaluationState);
      return AnalyzeArithmeticAndAssignmentOperator.getIndexForArithmenticAssignmentOperator(tokens, index);
    }
    return index;
  }
}
