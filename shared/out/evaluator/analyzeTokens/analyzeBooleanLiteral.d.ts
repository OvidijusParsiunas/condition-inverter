import { EvaluationState } from '../../shared/types/evaluationState';
import { Tokens } from '../../shared/types/tokens';
export declare class AnalyzeBooleanLiteral {
    static boolean(evaluationState: EvaluationState): void;
    private static doesTokenEndNumber;
    static findNumberEndIndex(tokens: Tokens, index: number): number;
    static number(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
