import { AnalyzeArithmeticAndAssignmentOperator } from './analyzeArithmeticAndAssignmentOperator';
import { AnalyzeBitwiseShiftOperator } from './analyzeBitwiseShiftOperator';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeGreaterOrLessThanSign {
  private static updateStateForComparisonOperator(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[index + 1];
    evaluationState.markedForOperatorInversion = true;
    if (nextToken === '=') {
      evaluationState.syntaxToBeInverted.push({ start: index, greaterOrLessThanHasFollowUpEquals: true });
      return index + 1;
    }
    evaluationState.syntaxToBeInverted.push({ start: index });
    return index;
  }

  private static updateStateIfShiftOperator(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const firstSymbol = tokens[index];
    if (tokens[index + 1] === firstSymbol) {
      if (tokens[index + 2] === '=') {
        return AnalyzeArithmeticAndAssignmentOperator.updateShiftAssignmentState(index, evaluationState);
      } else if (firstSymbol === '>' && tokens[index + 2] === firstSymbol && tokens[index + 3] === '=') {
        return AnalyzeArithmeticAndAssignmentOperator.updateUnsignedRightShiftAssignmentState(index, evaluationState);
      }
      return AnalyzeBitwiseShiftOperator.updateState(tokens, index, evaluationState);
    }
    return -1;
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const newState = AnalyzeGreaterOrLessThanSign.updateStateIfShiftOperator(tokens, index, evaluationState);
    if (newState > -1) return newState;
    return AnalyzeGreaterOrLessThanSign.updateStateForComparisonOperator(tokens, index, evaluationState);
  }
}
