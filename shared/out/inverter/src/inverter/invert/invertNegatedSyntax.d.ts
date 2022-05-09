import { SyntaxToBeInverted } from '../../shared/types/evaluationState';
import { Tokens } from '../../shared/types/tokens';
export declare class InvertNegatedSyntax {
    private static removeBrackets;
    private static isRemoveNegationBrackets;
    private static removeExclamationMark;
    private static removeNegation;
    private static replaceExclamationWithEquals;
    static invert(tokens: Tokens, tokenIndex: number, tokenIndexDelta: number, syntaxToBeInverted: SyntaxToBeInverted[], entryIndex: number): number;
}
