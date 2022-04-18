import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';
export declare class AnalyzeIfStatement {
    private static finishEvaluatingIfStatement;
    static setConditionsToBeInverted(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
