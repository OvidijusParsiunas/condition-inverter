"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeEmptyIfStatement = void 0;
class AnalyzeEmptyIfStatement {
    static isEmpty(evaluationState) {
        return evaluationState.startOfCurrentIfStatementInsideIndex >= evaluationState.currentIfStatementCloseBracketIndex;
    }
}
exports.AnalyzeEmptyIfStatement = AnalyzeEmptyIfStatement;
//# sourceMappingURL=analyzeEmptyIfStatement.js.map