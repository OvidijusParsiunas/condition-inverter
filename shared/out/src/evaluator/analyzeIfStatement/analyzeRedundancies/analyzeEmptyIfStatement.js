"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeEmptyIfStatement = void 0;
class AnalyzeEmptyIfStatement {
    static isEmpty(tokens, evaluationState) {
        const { startOfCurrentIfStatementInsideIndex, currentIfStatementCloseBracketIndex } = evaluationState;
        for (let i = startOfCurrentIfStatementInsideIndex; i < currentIfStatementCloseBracketIndex; i += 1) {
            if (tokens[startOfCurrentIfStatementInsideIndex] !== ' ') {
                return false;
            }
        }
        return true;
    }
}
exports.AnalyzeEmptyIfStatement = AnalyzeEmptyIfStatement;
//# sourceMappingURL=analyzeEmptyIfStatement.js.map