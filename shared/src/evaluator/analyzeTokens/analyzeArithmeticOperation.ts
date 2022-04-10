import { EvaluationState } from '../../shared/types/evaluationState';
import { Token } from '../../shared/types/tokens';

export class AnalyzeArithmeticOperation {
  public static isTokenArithmeticOperation(token: Token): boolean {
    return token === '-' || token === '+' || token === '/' || token === '*';
  }

  public static analyze(evaluationState: EvaluationState): void {
    evaluationState.isOperationWrappableInBrackets = true;
    if (evaluationState.areBracketsAlreadyPresent && evaluationState.numberOfBracketsOpen === 0) evaluationState.areBracketsAlreadyPresent = false;
  }
}
