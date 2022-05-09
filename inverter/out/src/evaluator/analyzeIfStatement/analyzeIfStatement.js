"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeIfStatement = void 0;
const analyzeStandaloneStatement_1 = require("./analyzeTokens/analyzeStandaloneStatement");
const analyzeRedundantBrackets_1 = require("./analyzeRedundancies/analyzeRedundantBrackets");
const evaluationStateUtil_1 = require("../evaluationState/evaluationStateUtil");
const traversalUtil_1 = require("../../shared/functionality/traversalUtil");
const analyzeTokens_1 = require("./analyzeTokens/analyzeTokens");
class AnalyzeIfStatement {
    static finishEvaluatingIfStatement(tokens, evaluationState) {
        analyzeStandaloneStatement_1.UpdateStateForStandaloneStatements.markStandaloneStatementsForInversion(tokens, evaluationState.currentIfStatementCloseBracketIndex, evaluationState);
        evaluationState.isCurrentlyInsideIfStatement = false;
        evaluationState.comparisonOperatorFound = false;
        evaluationStateUtil_1.EvaluationStateUtil.refreshBooleanState(evaluationState);
    }
    static updateState(tokens, index, evaluationState) {
        if (evaluationState.currentIfStatementCloseBracketIndex > index) {
            return analyzeTokens_1.AnalyzeTokens.updateState(tokens, index, evaluationState);
        }
        AnalyzeIfStatement.finishEvaluatingIfStatement(tokens, evaluationState);
        return index;
    }
    static getInnerIndexesOfIfStatement(tokens, index) {
        const startSymbolIndex = traversalUtil_1.TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, index + 1);
        if (tokens[startSymbolIndex] === '(') {
            return {
                start: traversalUtil_1.TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, startSymbolIndex + 1),
                end: traversalUtil_1.TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, index) - 1,
            };
        }
        // WORK: need tests for selection and highlighted scenarios
        return {
            start: startSymbolIndex,
            end: tokens.indexOf(':') - 1,
        };
    }
    static setEvaluationStartAndEndIndexes(tokens, index, evaluationState) {
        const { start, end } = AnalyzeIfStatement.getInnerIndexesOfIfStatement(tokens, index);
        const noRedundantBracketsIndexes = analyzeRedundantBrackets_1.AnalyzeRedundantBrackets.getIndexesOfNestedStartAndEndBrackets(tokens, start, end);
        evaluationState.startOfCurrentIfStatementInsideIndex = noRedundantBracketsIndexes.start;
        evaluationState.currentIfStatementCloseBracketIndex = noRedundantBracketsIndexes.end + 1;
    }
    static setNewIfStatementState(tokens, index, evaluationState) {
        AnalyzeIfStatement.setEvaluationStartAndEndIndexes(tokens, index, evaluationState);
        evaluationState.isCurrentlyInsideIfStatement = true;
        return evaluationState.startOfCurrentIfStatementInsideIndex - 1;
    }
}
exports.AnalyzeIfStatement = AnalyzeIfStatement;
//# sourceMappingURL=analyzeIfStatement.js.map