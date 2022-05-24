import { AnalyzeConditionOutsideStatement } from './conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
import { AnalyzeConditionInsideStatement } from './conditionAnalyzers/analyzeConditionInsideStatement/analyzeConditionInsideStatement';
import { EvaluationState, SyntaxToBeInverted } from '../shared/types/evaluationState';
import { EvaluationStateUtil } from './shared/evaluationState/evaluationStateUtil';
import { ConditionAnalyzer } from '../shared/types/conditionAnalyzer';
import { Tokens } from '../shared/types/tokens';

type ConditionAnalyzerArg<T> = T & { isStart: (tokens: Tokens, index: number) => boolean };

export class Evaluator {
  //prettier-ignore
  private static invertIfCondition<T extends new () => ConditionAnalyzer>(
      tokens: Tokens, index: number, evaluationState: EvaluationState, conditionAnalyzers: ConditionAnalyzerArg<T>[],
  ): number {
    for (let i = 0; i < conditionAnalyzers.length; i += 1) {
      if (conditionAnalyzers[i].isStart(tokens, index)) {
        evaluationState.conditionAnalyzer = new conditionAnalyzers[i]();
        return evaluationState.conditionAnalyzer.evaluateAndPrepareState(tokens, index, evaluationState);
      }
    }
    return index;
  }

  public static evaluate(tokens: Tokens): SyntaxToBeInverted[] {
    const evaluationState = EvaluationStateUtil.generateNewState();
    evaluationState.currentStatementEndIndex = tokens.length - 1;
    for (let index = 0; index < tokens.length; index += 1) {
      if (evaluationState.isCurrentlyEvaluatingConditions) {
        index = evaluationState.conditionAnalyzer.analyzeToken(tokens, index, evaluationState);
      } else {
        index = Evaluator.invertIfCondition(tokens, index, evaluationState, [AnalyzeConditionOutsideStatement, AnalyzeConditionInsideStatement]);
      }
    }
    return evaluationState.syntaxToBeInverted;
  }
}
