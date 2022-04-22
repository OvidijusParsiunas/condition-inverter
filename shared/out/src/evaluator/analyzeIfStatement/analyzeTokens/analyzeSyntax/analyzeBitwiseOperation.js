"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeBitwiseOperator = void 0;
class AnalyzeBitwiseOperator {
    static doesStatementBeforeArithmeticOperationHasBrackets(evaluationState) {
        return evaluationState.areBracketsAlreadyPresent && evaluationState.numberOfBracketsOpen === 0;
    }
    static analyze(evaluationState) {
        evaluationState.isOperationWrappableInBrackets = true;
        if (AnalyzeBitwiseOperator.doesStatementBeforeArithmeticOperationHasBrackets(evaluationState)) {
            evaluationState.areBracketsAlreadyPresent = false;
        }
    }
    static isLeftOrRightShiftOperator(tokens, index) {
        const currentToken = tokens[index];
        const nextToken = tokens[index + 1];
        return currentToken === nextToken;
    }
    static analyzeLeftOrRightShiftOperator(tokens, index, evaluationState) {
        AnalyzeBitwiseOperator.analyze(evaluationState);
        const thirdToken = tokens[index + 1];
        const currentToken = tokens[index];
        return currentToken === '>' && thirdToken === '>' ? index + 2 : index + 1;
    }
}
exports.AnalyzeBitwiseOperator = AnalyzeBitwiseOperator;
//# sourceMappingURL=analyzeBitwiseOperation.js.map