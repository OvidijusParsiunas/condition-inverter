import { EvaluationState } from '../../shared/types/evaluationState';
import { Tokens } from '../../shared/types/tokens';
export declare class AnalyzeEqualsSign {
    private static getNewIndex;
    static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
