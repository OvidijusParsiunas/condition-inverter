import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';
export declare class AnalyzeBitwiseShiftOperator {
    static isLeftOrRightShiftOperator(tokens: Tokens, index: number): boolean;
    static analyzeLeftOrRightShiftOperator(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
