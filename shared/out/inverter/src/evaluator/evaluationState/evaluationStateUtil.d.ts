import { EvaluationState } from '../../shared/types/evaluationState';
export declare class EvaluationStateUtil {
    static generateNewState(): EvaluationState;
    static refreshBooleanState(evaluationState: EvaluationState): void;
}
