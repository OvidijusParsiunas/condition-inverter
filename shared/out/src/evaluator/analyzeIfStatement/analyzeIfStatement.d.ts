import { EvaluationState } from '../../shared/types/evaluationState';
import { Tokens } from '../../shared/types/tokens';
export declare class AnalyzeIfStatement {
    private static finishEvaluatingIfStatement;
    static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
    private static setStartAndEndIndexes;
    static setNewIfStatementState(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
