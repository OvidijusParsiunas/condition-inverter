import { EvaluationState } from './evaluationState';
import { Tokens } from './tokens';

export abstract class ConditionAnalyzer {
  constructor() {}
  public abstract evaluateAndPrepareState(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
  public abstract analyzeToken(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
