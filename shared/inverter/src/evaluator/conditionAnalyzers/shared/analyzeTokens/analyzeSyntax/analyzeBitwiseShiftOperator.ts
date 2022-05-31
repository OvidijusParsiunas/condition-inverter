import { EvaluationState } from '../../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { Tokens } from '../../../../../shared/types/tokens';

export class AnalyzeBitwiseShiftOperator {
  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    AnalyzeBrackatableSyntax.updateState(evaluationState);
    const thirdToken = tokens[index + 1];
    const currentToken = tokens[index];
    return currentToken === '>' && thirdToken === '>' ? index + 2 : index + 1;
  }
}
