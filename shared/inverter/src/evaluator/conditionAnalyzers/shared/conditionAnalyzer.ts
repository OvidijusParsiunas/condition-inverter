import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';

type AnalyzeTokenFunc = (tokens: Tokens, index: number, evaluationState: EvaluationState) => number;

export class ConditionAnalyzer {
  // prettier-ignore
  public static traverseTokensAndUpdateEvaluationState(
      tokens: Tokens, startIndex: number, evaluationState: EvaluationState, analyzeTokenFunc: AnalyzeTokenFunc): number {
    if (!evaluationState.isEvaluatingConditions) return startIndex;
    for (let i = startIndex; i < tokens.length; i += 1) {
      i = analyzeTokenFunc(tokens, i, evaluationState);
      if (!evaluationState.isEvaluatingConditions) return i;
    }
    return tokens.length - 1;
  }
}
