import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';
export declare class AnalyzeLogicalOperator {
    private static updateStateForStandaloneStatements;
    private static updateStateForStatementsBeforeOperator;
    static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
