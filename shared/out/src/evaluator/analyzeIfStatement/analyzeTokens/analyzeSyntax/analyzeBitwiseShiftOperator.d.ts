import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';
export declare class AnalyzeBitwiseShiftOperator {
    static isBitwise(tokens: Tokens, index: number): boolean;
    static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
