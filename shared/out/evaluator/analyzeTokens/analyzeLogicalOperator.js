"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeLogicalOperator = void 0;
const analyzeStandaloneStatement_1 = require("./analyzeStandaloneStatement");
const analyzeTokensUtil_1 = require("./utils/analyzeTokensUtil");
const traversalUtils_1 = require("../../traversalUtils");
class AnalyzeLogicalOperator {
    static analyzeStandaloneStatements(tokens, index, nextNonSpaceCharIndex, evaluationState) {
        analyzeStandaloneStatement_1.AnalyzeStandaloneStatements.markStandaloneStatementsForInversion(tokens, index, evaluationState);
        evaluationState.conditionsToBeInverted.push({ start: index });
        evaluationState.startOfCurrentlyEvaluatedStatementIndex = nextNonSpaceCharIndex;
        analyzeTokensUtil_1.AnalyzeTokensUtil.refreshBooleanState(evaluationState);
    }
    static analyzeStatementsBeforeOperator(tokens, index, nextNonSpaceCharIndex, evaluationState) {
        if (evaluationState.numberOfBracketsOpen === 0) {
            AnalyzeLogicalOperator.analyzeStandaloneStatements(tokens, index, nextNonSpaceCharIndex, evaluationState);
        }
        else if (evaluationState.numberOfBracketsOpen > 0 && evaluationState.comparisonOperatorFound) {
            // instead of inverting the comparison operator, the brackets are inverted instead
            evaluationState.conditionsToBeInverted.pop();
        }
        evaluationState.comparisonOperatorFound = false;
    }
    static analyze(tokens, index, evaluationState) {
        const nextToken = tokens[index + 1];
        if (nextToken === '&' || nextToken === '|') {
            const nextNonSpaceCharIndex = traversalUtils_1.default.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 2);
            AnalyzeLogicalOperator.analyzeStatementsBeforeOperator(tokens, index, nextNonSpaceCharIndex, evaluationState);
            // subtracting one due to the for loop automatically adding one
            return nextNonSpaceCharIndex - 1;
        }
        return index;
    }
}
exports.AnalyzeLogicalOperator = AnalyzeLogicalOperator;
//# sourceMappingURL=analyzeLogicalOperator.js.map