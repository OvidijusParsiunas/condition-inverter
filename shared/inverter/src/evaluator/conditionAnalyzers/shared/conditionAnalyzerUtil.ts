import { AnalyzerStartTokens } from '../../../shared/types/analyzerStartTokens';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';

interface PreparationAndAnalysisFuncs {
  readonly evaluateAndPrepareState: (tokens: Tokens, index: number, evaluationState: EvaluationState) => number;
  readonly analyzeToken: (tokens: Tokens, index: number, evaluationState: EvaluationState) => number;
}

export class ConditionAnalyzerUtil {
  public static shouldAnalysisStart(tokens: Tokens, index: number, startTokens: AnalyzerStartTokens): boolean {
    if (startTokens[tokens[index] as keyof typeof startTokens]) {
      return true;
    }
    return false;
  }

  // prettier-ignore
  public static traverseTokensAndUpdateEvaluationState(
      tokens: Tokens, index: number, evaluationState: EvaluationState, preparationAndAnalysisFuncs: PreparationAndAnalysisFuncs): number {
    const startIndex = preparationAndAnalysisFuncs.evaluateAndPrepareState(tokens, index, evaluationState);
    if (!evaluationState.isCurrentlyEvaluatingConditions) return startIndex;
    for (let i = startIndex + 1; i < tokens.length; i += 1) {
      i = preparationAndAnalysisFuncs.analyzeToken(tokens, i, evaluationState);
      if (!evaluationState.isCurrentlyEvaluatingConditions) return i;
    }
    return tokens.length - 1;
  }
}
