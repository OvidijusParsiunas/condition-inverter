import { EvaluationState } from '../../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { Tokens } from '../../../../../shared/types/tokens';

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

  public static updateShiftAssignmentState(index: number, evaluationState: EvaluationState): number {
    AnalyzeBrackatableSyntax.updateState(evaluationState);
    return index + 2;
  }

  public static updateUnsignedRightShiftAssignmentState(index: number, evaluationState: EvaluationState): number {
    AnalyzeBrackatableSyntax.updateState(evaluationState);
    return index + 3;
  }

  // no check for whether |, & or ? as the only classes that call it have done the verification and test coverage drops for checks that don't fail
  public static updateStateIfLogicalAssignment(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const firstSymbol = tokens[index];
    if (tokens[index + 1] === firstSymbol) {
      if (tokens[index + 2] === '=') {
        AnalyzeBrackatableSyntax.updateState(evaluationState);
        return index + 2;
      }
    } else if (tokens[index + 1] === '=') {
      AnalyzeBrackatableSyntax.updateState(evaluationState);
      return index + 1;
    }
    return -1;
  }
}
