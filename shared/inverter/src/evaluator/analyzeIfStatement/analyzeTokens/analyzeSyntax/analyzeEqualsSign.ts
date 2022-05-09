import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeEqualsSign {
  private static getNewIndex(tokens: Tokens, index: number): number {
    if (tokens[index + 2] === '=') {
      return index + 2;
    }
    return index + 1;
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    evaluationState.comparisonOperatorFound = true;
    evaluationState.syntaxToBeInverted.push({ start: index });
    // this is run for == and === but not = as it is invalid inside an if statement
    return AnalyzeEqualsSign.getNewIndex(tokens, index);
  }
}
