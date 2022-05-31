import { AnalyzeConditionOutsideStatement } from './conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
import AnalyzeConditionInsideStatement from './conditionAnalyzers/analyzeConditionInsideStatement/analyzeConditionInsideStatement';
import { EvaluationState, SyntaxToBeInverted } from '../shared/types/evaluationState';
import { EvaluationStateUtil } from './evaluationState/evaluationStateUtil';
import { Tokens } from '../shared/types/tokens';

export class Evaluator {
  private static readonly conditionAnalyzers = [AnalyzeConditionOutsideStatement, AnalyzeConditionInsideStatement];

  private static invertConditionsUsingAnalyzer(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    for (let i = 0; i < Evaluator.conditionAnalyzers.length; i += 1) {
      if (Evaluator.conditionAnalyzers[i].shouldAnalysisStart(tokens, index)) {
        return Evaluator.conditionAnalyzers[i].traverseTokensAndUpdateEvaluationState(tokens, index, evaluationState);
      }
    }
    return index;
  }

  public static evaluate(tokens: Tokens): SyntaxToBeInverted[] {
    const evaluationState = EvaluationStateUtil.generateNewState();
    evaluationState.conditionSequenceEndIndex = tokens.length - 1;
    for (let index = 0; index < tokens.length; index += 1) {
      index = Evaluator.invertConditionsUsingAnalyzer(tokens, index, evaluationState);
    }
    return evaluationState.syntaxToBeInverted;
  }
}
