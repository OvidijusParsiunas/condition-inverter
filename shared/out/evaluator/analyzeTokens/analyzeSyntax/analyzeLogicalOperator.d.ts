import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';
export declare class AnalyzeLogicalOperator {
    private static analyzeStandaloneStatements;
    private static analyzeStatementsBeforeOperator;
    static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number;
}
