"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeTokensUtil = void 0;
class AnalyzeTokensUtil {
    static refreshBooleanState(evaluationState) {
        evaluationState.isOperationWrappableInBrackets = false;
        evaluationState.shouldBracketsBeRemoved = false;
        evaluationState.areBracketsAlreadyPresent = false;
        evaluationState.invertBooleanLiteral = false;
    }
}
exports.AnalyzeTokensUtil = AnalyzeTokensUtil;
//# sourceMappingURL=analyzeTokensUtil.js.map