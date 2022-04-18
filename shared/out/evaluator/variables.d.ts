export declare class Variables {
    isCurrentlyEvaluatingIfStatement: boolean;
    startOfCurrentlyEvaluatedStatementIndex: number;
    currentIfStatementCloseBracketIndex: number;
    conditionsToBeInverted: any;
    shouldBracketsBeRemoved: boolean;
    isOperationWrappableInBrackets: boolean;
    revertBooleanLiteral: boolean;
    logicalOperatorFound: boolean;
    areBracketsAlreadyPresent: boolean;
    numberOfBracketsOpen: number;
}
