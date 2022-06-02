import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';

type AnalyzeTokenFunc = (tokens: Tokens, index: number, evaluationState: EvaluationState) => number;

export class ConditionAnalyzer {
  // prettier-ignore
  public static traverseTokensAndUpdateEvaluationState(
      tokens: Tokens, startIndex: number, evaluationState: EvaluationState, analyzeTokenFunc: AnalyzeTokenFunc): number {
    for (let i = startIndex; i < tokens.length; i += 1) {
      if (!evaluationState.isEvaluatingConditions) return i;
      i = analyzeTokenFunc(tokens, i, evaluationState);
    }
    return tokens.length - 1;
  }
}
