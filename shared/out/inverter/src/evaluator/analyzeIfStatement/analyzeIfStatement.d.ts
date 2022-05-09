import { EvaluationState } from '../../shared/types/evaluationState';
import { Tokens } from '../../shared/types/tokens';
export declare class AnalyzeIfStatement {
    private static finishEvaluatingIfStatement;
    static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
    private static getInnerIndexesOfIfStatement;
    private static setEvaluationStartAndEndIndexes;
    static setNewIfStatementState(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
