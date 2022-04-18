"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeBracket = void 0;
class AnalyzeBracket {
    static open(evaluationState) {
        if (!evaluationState.isOperationWrappableInBrackets && evaluationState.numberOfBracketsOpen === 0) {
            evaluationState.areBracketsAlreadyPresent = true;
        }
        evaluationState.numberOfBracketsOpen += 1;
    }
    static close(evaluationState) {
        evaluationState.numberOfBracketsOpen -= 1;
    }
}
exports.AnalyzeBracket = AnalyzeBracket;
//# sourceMappingURL=analyzeBracket.js.map