import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeEmptyIfStatement {
  public static isEmpty(tokens: Tokens, evaluationState: EvaluationState): boolean {
    const { startOfCurrentIfStatementInsideIndex, currentIfStatementCloseBracketIndex } = evaluationState;
    for (let i = startOfCurrentIfStatementInsideIndex; i < currentIfStatementCloseBracketIndex; i += 1) {
      if (tokens[startOfCurrentIfStatementInsideIndex] !== ' ') {
        return false;
      }
    }
    return true;
  }
}
