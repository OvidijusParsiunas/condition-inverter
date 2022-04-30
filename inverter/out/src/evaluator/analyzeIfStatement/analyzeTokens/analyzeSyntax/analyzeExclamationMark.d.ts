import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';
export declare class AnalyzeExclamationMark {
    private static findLastExclamationMarkIndex;
    private static getConditionEndIndex;
    static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
