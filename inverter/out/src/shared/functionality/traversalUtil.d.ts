import { Tokens } from '../types/tokens';
export declare class TraversalUtil {
    static getNonSpaceCharacterIndex(tokens: Tokens, index: number, traverseForwards?: boolean): number;
    static getEndQuoteIndex(tokens: Tokens, index: number, quoteString: `'` | '`' | '"'): number;
    static getIndexOfLastBracketOfIfStatement(tokens: Tokens, index: number, openBrackets?: number): number;
}
