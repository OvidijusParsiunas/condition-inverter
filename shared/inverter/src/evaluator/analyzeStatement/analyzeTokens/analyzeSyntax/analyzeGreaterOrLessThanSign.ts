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

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (AnalyzeBitwiseShiftOperator.isBitwise(tokens, index)) {
      return AnalyzeBitwiseShiftOperator.updateState(tokens, index, evaluationState);
    }
    return AnalyzeGreaterOrLessThanSign.updateStateForComparisonOperator(tokens, index, evaluationState);
  }
}
