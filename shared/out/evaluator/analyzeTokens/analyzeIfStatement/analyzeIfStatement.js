"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeIfStatement = void 0;
const evaluationStateUtil_1 = require("../../evaluationState/evaluationStateUtil");
const analyzeStandaloneStatement_1 = require("../analyzeStandaloneStatement");
const analyzeTokens_1 = require("../analyzeTokens");
class AnalyzeIfStatement {
    static finishEvaluatingIfStatement(tokens, evaluationState) {
        analyzeStandaloneStatement_1.AnalyzeStandaloneStatements.markStandaloneStatementsForInversion(tokens, evaluationState.currentIfStatementCloseBracketIndex, evaluationState);
        evaluationState.isCurrentlyEvaluatingIfStatement = false;
        evaluationState.comparisonOperatorFound = false;
        evaluationStateUtil_1.EvaluationStateUtil.refresh(evaluationState);
    }
    static setConditionsToBeInverted(tokens, index, evaluationState) {
        if (evaluationState.currentIfStatementCloseBracketIndex > index) {
            return analyzeTokens_1.AnalyzeTokens.analyze(tokens, index, evaluationState);
        }
        AnalyzeIfStatement.finishEvaluatingIfStatement(tokens, evaluationState);
        return index;
    }
}
exports.AnalyzeIfStatement = AnalyzeIfStatement;
//# sourceMappingURL=analyzeIfStatement.js.map