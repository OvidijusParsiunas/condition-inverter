import { AnalyzeBitwiseShiftOperator } from './analyzeBitwiseShiftOperator';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeGreaterOrLessThanSign {
  private static analyzeComparisonOperator(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[index + 1];
    evaluationState.comparisonOperatorFound = true;
    if (nextToken === '=') {
      evaluationState.syntaxToBeInverted.push({ start: index, greaterOrLessThanHasFollowUpEquals: true });
      return index + 1;
    }
    evaluationState.syntaxToBeInverted.push({ start: index });
    return index;
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (AnalyzeBitwiseShiftOperator.isBitwise(tokens, index)) {
      return AnalyzeBitwiseShiftOperator.analyze(tokens, index, evaluationState);
    }
    return AnalyzeGreaterOrLessThanSign.analyzeComparisonOperator(tokens, index, evaluationState);
  }
}
