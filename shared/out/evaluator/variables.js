"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variables = void 0;
class Variables {
    constructor() {
        this.isCurrentlyEvaluatingIfStatement = false;
        this.startOfCurrentlyEvaluatedStatementIndex = 0;
        this.currentIfStatementCloseBracketIndex = 0;
        this.conditionsToBeInverted = [];
        this.shouldBracketsBeRemoved = false;
        // usually involves arithmentic operations or double bangs
        this.isOperationWrappableInBrackets = false;
        this.revertBooleanLiteral = false;
        // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
        this.logicalOperatorFound = false;
        this.areBracketsAlreadyPresent = false;
        this.numberOfBracketsOpen = 0;
    }
}
exports.Variables = Variables;
//# sourceMappingURL=variables.js.map