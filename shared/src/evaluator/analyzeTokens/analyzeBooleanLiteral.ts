import { EvaluationState } from '../../shared/types/evaluationState';
import { Tokens } from '../../shared/types/tokens';
import TraversalUtils from '../../traversalUtils';

export class AnalyzeBooleanLiteral {
  public static boolean(evaluationState: EvaluationState): void {
    evaluationState.revertBooleanLiteral = true;
  }

  public static number(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[index + 1];
    if (nextToken === ' ' || nextToken === ')' || nextToken === '&' || nextToken === '|') {
      evaluationState.revertBooleanLiteral = true;
      return index;
    } else {
      return TraversalUtils.getWhenNumberStops(tokens, index);
    }
  }
}
