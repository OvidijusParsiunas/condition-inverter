import { StartEndIndexes } from '../../../shared/types/StartEndIndexes';
import { Tokens } from '../../../shared/types/tokens';
declare type Result = {
    usePreviousTraversalResult?: true;
} & StartEndIndexes;
export declare class AnalyzeRedundantBrackets {
    private static isNestedUnaryOperator;
    private static createNewResult;
    private static constructResult;
    private static isValidBracket;
    static getIndexesOfNestedStartAndEndBrackets(tokens: Tokens, startIndex: number, endIndex: number, layers?: number): Result;
}
export {};
