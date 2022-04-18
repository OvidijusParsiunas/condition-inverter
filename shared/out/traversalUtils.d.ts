import { Tokens } from './shared/types/tokens';
export declare class TraversalUtils {
    static getNonSpaceCharacterIndex(tokens: Tokens, index: number, traverseForwards?: boolean): number;
    static getEndQuoteIndex(tokens: Tokens, index: number, quoteString: `'` | '`' | '"'): number;
    static getIndexOfLastBracketOfIfStatement(tokens: Tokens, index: number, openBrackets?: number): number;
}
