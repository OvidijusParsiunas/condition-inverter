import { SyntaxToBeInverted } from '../../shared/types/evaluationState';
import { Tokens } from '../../shared/types/tokens';
export declare class InvertBooleanLiteral {
    private static readonly booleanLiteralToInveted;
    private static isInvertBooleanLiteral;
    static invert(tokens: Tokens, tokenIndex: number, syntaxToBeInvertedEntry: SyntaxToBeInverted, tokenIndexDelta: number): number;
}
