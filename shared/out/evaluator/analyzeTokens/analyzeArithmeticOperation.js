"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeArithmeticOperation = void 0;
class AnalyzeArithmeticOperation {
    static analyze(evaluationState) {
        evaluationState.isOperationWrappableInBrackets = true;
        if (evaluationState.areBracketsAlreadyPresent && evaluationState.numberOfBracketsOpen === 0)
            evaluationState.areBracketsAlreadyPresent = false;
    }
}
exports.AnalyzeArithmeticOperation = AnalyzeArithmeticOperation;
//# sourceMappingURL=analyzeArithmeticOperation.js.map