"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeIfStatement = void 0;
const analyzeRedundantBrackets_1 = require("./analyzeRedundancies/analyzeRedundantBrackets");
const analyzeStandaloneStatement_1 = require("./analyzeTokens/analyzeStandaloneStatement");
const evaluationStateUtil_1 = require("../evaluationState/evaluationStateUtil");
const traversalUtil_1 = require("../../shared/functionality/traversalUtil");
const analyzeTokens_1 = require("./analyzeTokens/analyzeTokens");
class AnalyzeIfStatement {
    static finishEvaluatingIfStatement(tokens, evaluationState) {
        analyzeStandaloneStatement_1.AnalyzeStandaloneStatements.markStandaloneStatementsForInversion(tokens, evaluationState.currentIfStatementCloseBracketIndex, evaluationState);
        evaluationState.isCurrentlyInsideIfStatement = false;
        evaluationState.comparisonOperatorFound = false;
        evaluationStateUtil_1.EvaluationStateUtil.refreshBooleanState(evaluationState);
    }
    static analyze(tokens, index, evaluationState) {
        if (evaluationState.currentIfStatementCloseBracketIndex > index) {
            return analyzeTokens_1.AnalyzeTokens.analyze(tokens, index, evaluationState);
        }
        AnalyzeIfStatement.finishEvaluatingIfStatement(tokens, evaluationState);
        return index;
    }
    static setStartAndEndIndexes(tokens, index, evaluationState, openBracketIndex) {
        const startIndex = traversalUtil_1.TraversalUtil.getNonSpaceCharacterIndex(tokens, openBracketIndex + 1);
        const endIndex = traversalUtil_1.TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, index);
        const result = analyzeRedundantBrackets_1.AnalyzeRedundantBrackets.getIndexesOfNestedStartAndEndBrackets(tokens, startIndex, endIndex - 1);
        evaluationState.startOfCurrentIfStatementInsideIndex = result.start;
        evaluationState.currentIfStatementCloseBracketIndex = result.end + 1;
    }
    static setNewIfStatementState(tokens, index, evaluationState) {
        const openBracketIndex = traversalUtil_1.TraversalUtil.getNonSpaceCharacterIndex(tokens, index + 1);
        AnalyzeIfStatement.setStartAndEndIndexes(tokens, index, evaluationState, openBracketIndex);
        evaluationState.isCurrentlyInsideIfStatement = true;
        return evaluationState.startOfCurrentIfStatementInsideIndex - 1;
    }
}
exports.AnalyzeIfStatement = AnalyzeIfStatement;
//# sourceMappingURL=analyzeIfStatement.js.map