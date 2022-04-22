import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';
export declare class AnalyzeBitwiseOperator {
    private static doesStatementBeforeArithmeticOperationHasBrackets;
    static analyze(evaluationState: EvaluationState): void;
    static isLeftOrRightShiftOperator(tokens: Tokens, index: number): boolean;
    static analyzeLeftOrRightShiftOperator(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
