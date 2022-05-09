import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';
export declare class AnalyzeLogicalOperator {
    private static updateStateForStandaloneStatements;
    private static updateStateForStatementsBeforeOperator;
    private static updateState;
    static updateStateForSymbol(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
    static updateStateForKeyword(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
