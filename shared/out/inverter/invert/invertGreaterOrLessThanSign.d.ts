import { SyntaxToBeInverted } from '../../shared/types/evaluationState';
import { Tokens } from '../../shared/types/tokens';
export declare class InvertGreaterOrLessThanSign {
    private static isGreaterOrLessThanHasFollowUpEquals;
    private static removeEqualsSign;
    static invert(tokens: Tokens, tokenIndex: number, tokenIndexDelta: number, syntaxToBeInverted: SyntaxToBeInverted): number;
}
