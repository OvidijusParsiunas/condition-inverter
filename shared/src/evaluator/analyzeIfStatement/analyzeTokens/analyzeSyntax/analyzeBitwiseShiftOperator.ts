import { EvaluationState } from '../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeBitwiseShiftOperator {
  public static isBitwise(tokens: Tokens, index: number): boolean {
    const currentToken = tokens[index];
    const nextToken = tokens[index + 1];
    return currentToken === nextToken;
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    AnalyzeBrackatableSyntax.analyze(evaluationState);
    const thirdToken = tokens[index + 1];
    const currentToken = tokens[index];
    return currentToken === '>' && thirdToken === '>' ? index + 2 : index + 1;
  }
}
