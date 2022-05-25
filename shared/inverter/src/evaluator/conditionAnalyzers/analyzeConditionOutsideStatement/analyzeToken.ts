import { CleanUpRedundancies } from '../analyzeConditionInsideStatement/evaluateAndPrepareUtils/redundancies/cleanUpRedundancies';
import { MarkValueForInversion } from '../../shared/analyzeTokens/markValueForInversion';
import { EvaluationStateUtil } from '../../shared/evaluationState/evaluationStateUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { AnalyzeToken } from '../../shared/analyzeTokens/analyzeToken';
import { Token, Tokens } from '../../../shared/types/tokens';

export class AnalyzeOutsideStatement {
  private static finishEvaluatingStatement(tokens: Tokens, evaluationState: EvaluationState): void {
    MarkValueForInversion.mark(tokens, evaluationState.conditionSequenceEndIndex || tokens.length - 1, evaluationState);
    evaluationState.isEvaluatingConditions = false;
    evaluationState.markedForOperatorInversion = false;
    CleanUpRedundancies.removeAdditionOfBracketsFromState(evaluationState);
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  private static notEndToken(token: Token): boolean {
    return token !== ';' && token !== 'const' && token !== 'let' && token !== 'var';
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (AnalyzeOutsideStatement.notEndToken(tokens[index]) && index < tokens.length - 1 && index <= evaluationState.conditionSequenceEndIndex) {
      return AnalyzeToken.updateState(tokens, index, evaluationState);
    }
    AnalyzeOutsideStatement.finishEvaluatingStatement(tokens, evaluationState);
    return index;
  }
}
