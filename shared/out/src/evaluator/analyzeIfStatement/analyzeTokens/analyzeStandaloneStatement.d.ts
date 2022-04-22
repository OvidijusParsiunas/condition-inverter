import { EvaluationState } from '../../../shared/types/evaluationState';
import { Tokens } from '../../../shared/types/tokens';
export declare class UpdateStateForStandaloneStatements {
    private static markForBracketAddition;
    private static markForVariableInversion;
    private static markForBooleanLiteralInversion;
    private static markForNegatedBracketRemoval;
    static markStandaloneStatementsForInversion(tokens: Tokens, index: number, evaluationState: EvaluationState): void;
}
