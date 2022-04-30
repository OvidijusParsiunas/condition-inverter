import { SyntaxToBeInverted } from '../shared/types/evaluationState';
import { Tokens } from '../shared/types/tokens';
export declare class Inverter {
    private static invert;
    static invertIfStatements(tokens: Tokens, syntaxToBeInverted: SyntaxToBeInverted[]): void;
}
