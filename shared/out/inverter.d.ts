import { SyntaxToBeInverted } from './shared/types/evaluationState';
import { Tokens } from './shared/types/tokens';
export default class Inverter {
    private static insertValue;
    private static isBrackets;
    private static isRemoveNegationBrackets;
    private static isInvertBooleanLiteral;
    private static isGreaterOrLessThanHasFollowupEquals;
    static invertIfStatements(tokens: Tokens, syntaxToBeInverted: SyntaxToBeInverted[]): void;
}
