import { Tokens } from '../../../shared/types/tokens';
interface Result {
    start: number;
    end: number;
    usePreviousTraversalResult?: true;
}
export declare class AnalyzeRedundantBrackets {
    private static isNestedUnaryOperator;
    private static createNewResult;
    private static constructResult;
    private static isValidBracket;
    static getIndexesOfNestedStartAndEndBrackets(tokens: Tokens, startIndex: number, endIndex: number, layers?: number): Result;
}
export {};
