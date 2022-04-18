import { Tokens } from './shared/types/tokens';
export default class Evaluator {
    isCurrentlyEvaluatingIfStatement: boolean;
    startOfCurrentlyEvaluatedStatementIndex: number;
    currentIfStatementCloseBracketIndex: number;
    indexesRequiringInversion: any;
    shouldBracketsBeRemoved: boolean;
    isOperationWrappableInBrackets: boolean;
    revertBooleanLiteral: boolean;
    logicalOperatorFound: boolean;
    areBracketsAlreadyPresent: boolean;
    numberOfBracketsOpen: number;
    static isCharacterArithmeticOperation(character: any): boolean;
    refreshState(): void;
    dealWithStandaloneStatements(tokens: any, currentTokenIndex: any): void;
    foundEquals(tokens: any, index: any): any;
    evaluateStatementsBeforeLogicalOperator(tokens: any, index: any, nextNonSpaceCharacter: any): void;
    finishEvaluatingIfStatement(tokens: any): void;
    evaluate(tokens: Tokens): any;
}
