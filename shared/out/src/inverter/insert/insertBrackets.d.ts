import { InsertNewBrackets, SyntaxToBeInverted } from '../../shared/types/evaluationState';
import { Tokens } from '../../shared/types/tokens';
export declare class InsertBrackets {
    static isInsertNewBrackets(invertableSyntaxEntry?: SyntaxToBeInverted): invertableSyntaxEntry is InsertNewBrackets;
    static insert(tokens: Tokens, startIndex: number, endIndex: number, tokenIndexDelta: number): number;
}
