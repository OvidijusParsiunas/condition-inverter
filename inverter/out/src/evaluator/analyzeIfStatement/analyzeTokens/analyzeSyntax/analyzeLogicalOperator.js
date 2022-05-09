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
            // WORK: not sure if evaluationState.numberOfBracketsOpen > 0 is needed
        }
        else if (evaluationState.numberOfBracketsOpen > 0 && evaluationState.comparisonOperatorFound) {
            // instead of inverting the comparison operator, the brackets are inverted
            evaluationState.syntaxToBeInverted.pop();
        }
        evaluationState.comparisonOperatorFound = false;
    }
    static updateState(tokens, currentIndex, nextIndexToAnalayze, evaluationState) {
        const nextNonSpaceCharIndex = traversalUtil_1.TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, nextIndexToAnalayze);
        AnalyzeLogicalOperator.updateStateForStatementsBeforeOperator(tokens, currentIndex, nextNonSpaceCharIndex, evaluationState);
        // subtracting one due to the for loop automatically adding one
        return nextNonSpaceCharIndex - 1;
    }
    static updateStateForSymbol(tokens, index, evaluationState) {
        const nextToken = tokens[index + 1];
        if (nextToken === '&' || nextToken === '|') {
            return AnalyzeLogicalOperator.updateState(tokens, index, index + 2, evaluationState);
        }
        // if & or | is by itself then it is regarded as a bitwise operator
        analyzeBrackatableSyntax_1.AnalyzeBrackatableSyntax.updateState(evaluationState);
        return index;
    }
    static updateStateForKeyword(tokens, index, evaluationState) {
        return AnalyzeLogicalOperator.updateState(tokens, index, index + 1, evaluationState);
    }
}
exports.AnalyzeLogicalOperator = AnalyzeLogicalOperator;
//# sourceMappingURL=analyzeLogicalOperator.js.map