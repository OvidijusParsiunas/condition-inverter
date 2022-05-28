import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';

interface PreparationAndAnalysisFuncs {
  readonly evaluateAndPrepareState: (tokens: Tokens, index: number, evaluationState: EvaluationState) => number;
  readonly analyzeToken: (tokens: Tokens, index: number, evaluationState: EvaluationState) => number;
}

export class ConditionAnalyzerUtil {
  // prettier-ignore
  public static traverseTokensAndUpdateEvaluationState(
      tokens: Tokens, index: number, evaluationState: EvaluationState, preparationAndAnalysisFuncs: PreparationAndAnalysisFuncs): number {
    const startIndex = preparationAndAnalysisFuncs.evaluateAndPrepareState(tokens, index, evaluationState);
    for (let i = startIndex + 1; i < tokens.length; i += 1) {
      if (!evaluationState.isEvaluatingConditions) return i;
      i = preparationAndAnalysisFuncs.analyzeToken(tokens, i, evaluationState);
    }
    return tokens.length - 1;
  }
}
