"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeLogicalOperator = void 0;
const evaluationStateUtil_1 = require("../../../evaluationState/evaluationStateUtil");
const analyzeStandaloneStatement_1 = require("../analyzeStandaloneStatement");
const traversalUtil_1 = require("../../../../shared/functionality/traversalUtil");
const analyzeBrackatableSyntax_1 = require("./analyzeBrackatableSyntax");
class AnalyzeLogicalOperator {
    static updateStateForStandaloneStatements(tokens, index, nextNonSpaceCharIndex, evaluationState) {
        analyzeStandaloneStatement_1.UpdateStateForStandaloneStatements.markStandaloneStatementsForInversion(tokens, index, evaluationState);
        evaluationState.syntaxToBeInverted.push({ start: index });
        evaluationState.startOfCurrentIfStatementInsideIndex = nextNonSpaceCharIndex;
        evaluationStateUtil_1.EvaluationStateUtil.refreshBooleanState(evaluationState);
    }
    static updateStateForStatementsBeforeOperator(tokens, index, nextNonSpaceIndex, evaluationState) {
        if (evaluationState.numberOfBracketsOpen === 0) {
            AnalyzeLogicalOperator.updateStateForStandaloneStatements(tokens, index, nextNonSpaceIndex, evaluationState);
        }
        else if (evaluationState.numberOfBracketsOpen > 0 && evaluationState.comparisonOperatorFound) {
            // instead of inverting the comparison operator, the brackets are inverted
            evaluationState.syntaxToBeInverted.pop();
        }
        evaluationState.comparisonOperatorFound = false;
    }
    static updateState(tokens, index, evaluationState) {
        const nextToken = tokens[index + 1];
        if (nextToken === '&' || nextToken === '|') {
            const nextNonSpaceCharIndex = traversalUtil_1.TraversalUtil.getNonSpaceCharacterIndex(tokens, index + 2);
            AnalyzeLogicalOperator.updateStateForStatementsBeforeOperator(tokens, index, nextNonSpaceCharIndex, evaluationState);
            // subtracting one due to the for loop automatically adding one
            return nextNonSpaceCharIndex - 1;
        }
        // if & or | is by itself then it is regarded as a bitwise operator
        analyzeBrackatableSyntax_1.AnalyzeBrackatableSyntax.updateState(evaluationState);
        return index;
    }
}
exports.AnalyzeLogicalOperator = AnalyzeLogicalOperator;
//# sourceMappingURL=analyzeLogicalOperator.js.map