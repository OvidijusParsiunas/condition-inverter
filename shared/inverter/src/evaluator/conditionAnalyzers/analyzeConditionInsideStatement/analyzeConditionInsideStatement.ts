import { ConditionAnalyzer } from '../../../shared/types/conditionAnalyzer';
import { EvaluateAndPrepareInsideStatement } from './evaluateAndPrepare';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { AnalyzeInsideStatement } from './analyzeToken';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeConditionInsideStatement extends ConditionAnalyzer {
  private static readonly startTokensJSON = { if: true, elif: true, while: true, for: true };

  public static isStart(tokens: Tokens, index: number): boolean {
    if (this.startTokensJSON[tokens[index] as keyof typeof this.startTokensJSON]) {
      return true;
    }
    return false;
  }

  public evaluateAndPrepareState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    return EvaluateAndPrepareInsideStatement.init(tokens, index, evaluationState);
  }

  public analyzeToken(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    return AnalyzeInsideStatement.analyze(tokens, index, evaluationState);
  }
}
