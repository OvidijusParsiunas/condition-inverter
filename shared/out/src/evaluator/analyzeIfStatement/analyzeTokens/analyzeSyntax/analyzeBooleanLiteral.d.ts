import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';
export declare class AnalyzeBooleanLiteral {
    static updateStateForBoolean(evaluationState: EvaluationState): void;
    private static doesTokenEndNumber;
    private static findNumberEndIndex;
    static updateStateForBooleanNumber(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
