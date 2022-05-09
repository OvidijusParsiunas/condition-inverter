import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';
export declare class AnalyzeGreaterOrLessThanSign {
    private static updateStateForComparisonOperator;
    static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
