import { SetStateForGenericStatement } from './evaluateAndPrepareUtils/setState/setStateForGenericStatement';
import { SetStateForLoopStatement } from './evaluateAndPrepareUtils/setState/setStateForLoopStatement';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';

export class EvaluateAndPrepareInsideStatement {
  public static init(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (tokens[index] === 'for') {
      return SetStateForLoopStatement.set(tokens, index, evaluationState);
    }
    return SetStateForGenericStatement.set(tokens, index, evaluationState);
  }
}
