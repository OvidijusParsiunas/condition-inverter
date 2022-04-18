"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeArithmeticOperation = void 0;
class AnalyzeArithmeticOperation {
    static doesStatementBeforeArithmeticOperationHasBrackets(evaluationState) {
        return evaluationState.areBracketsAlreadyPresent && evaluationState.numberOfBracketsOpen === 0;
    }
    static analyze(evaluationState) {
        evaluationState.isOperationWrappableInBrackets = true;
        if (AnalyzeArithmeticOperation.doesStatementBeforeArithmeticOperationHasBrackets(evaluationState)) {
            evaluationState.areBracketsAlreadyPresent = false;
        }
    }
}
exports.AnalyzeArithmeticOperation = AnalyzeArithmeticOperation;
//# sourceMappingURL=analyzeArithmeticOperation.js.map