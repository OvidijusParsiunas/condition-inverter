import { Tokens } from '../shared/types/tokens';
import { Variables } from './variables';
export declare class AnalyzeTokens extends Variables {
    private static isTokenArithmeticOperation;
    protected refreshState(): void;
    protected dealWithStandaloneStatements(tokens: Tokens, currentTokenIndex: any): void;
    private evaluateStatementsBeforeLogicalOperator;
    private foundEquals;
    protected analyzeTokens(tokens: Tokens, index: number): number;
}
