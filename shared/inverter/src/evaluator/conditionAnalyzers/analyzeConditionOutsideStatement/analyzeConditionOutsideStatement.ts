import { ConditionAnalyzer } from '../../../shared/types/conditionAnalyzer';
import { EvaluateAndPrepareOutsideStatement } from './evaluateAndPrepare';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { AnalyzeOutsideStatement } from './analyzeToken';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeConditionOutsideStatement extends ConditionAnalyzer {
  // WORK: need to do < >
  private static readonly startTokensJSON = { ['&']: true, ['|']: true };

  public static isStart(tokens: Tokens, index: number): boolean {
    if (this.startTokensJSON[tokens[index] as keyof typeof this.startTokensJSON]) {
      return true;
    }
    return false;
  }

  public evaluateAndPrepareState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    return EvaluateAndPrepareOutsideStatement.init(tokens, index, evaluationState);
  }

  public analyzeToken(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    return AnalyzeOutsideStatement.analyze(tokens, index, evaluationState);
  }
}
