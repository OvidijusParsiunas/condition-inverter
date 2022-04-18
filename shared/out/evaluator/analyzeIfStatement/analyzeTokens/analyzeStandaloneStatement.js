"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeStandaloneStatements = void 0;
const traversalUtil_1 = require("../../../shared/functionality/traversalUtil");
class AnalyzeStandaloneStatements {
    static markForBracketAddition(tokens, index, evaluationState) {
        const endIndex = traversalUtil_1.TraversalUtil.getNonSpaceCharacterIndex(tokens, index - 1, false);
        evaluationState.syntaxToBeInverted.push({
            insertNewBrackets: true,
            start: evaluationState.startOfCurrentIfStatementInsideIndex,
            end: endIndex,
        });
    }
    static markForVariableInversion(evaluationState) {
        evaluationState.syntaxToBeInverted.push({ start: evaluationState.startOfCurrentIfStatementInsideIndex });
    }
    static markForBooleanLiteralInversion(evaluationState) {
        evaluationState.syntaxToBeInverted.push({
            start: evaluationState.startOfCurrentIfStatementInsideIndex,
            invertBooleanLiteral: evaluationState.invertBooleanLiteral,
        });
    }
    static markForNegatedBracketRemoval(tokens, evaluationState) {
        const { startOfCurrentIfStatementInsideIndex, syntaxToBeInverted } = evaluationState;
        const endIndex = traversalUtil_1.TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, startOfCurrentIfStatementInsideIndex - 1);
        syntaxToBeInverted.push({
            start: startOfCurrentIfStatementInsideIndex,
            removeNegatedBrackets: { start: startOfCurrentIfStatementInsideIndex, end: endIndex },
        });
    }
    // a look back to see if previous syntax defines a standalone statement
    static markStandaloneStatementsForInversion(tokens, index, evaluationState) {
        if (evaluationState.shouldBracketsBeRemoved) {
            AnalyzeStandaloneStatements.markForNegatedBracketRemoval(tokens, evaluationState);
        }
        else if (evaluationState.invertBooleanLiteral && !evaluationState.isOperationWrappableInBrackets) {
            AnalyzeStandaloneStatements.markForBooleanLiteralInversion(evaluationState);
        }
        else if (!evaluationState.comparisonOperatorFound) {
            AnalyzeStandaloneStatements.markForVariableInversion(evaluationState);
        }
        if (evaluationState.isOperationWrappableInBrackets && !evaluationState.areBracketsAlreadyPresent) {
            AnalyzeStandaloneStatements.markForBracketAddition(tokens, index, evaluationState);
        }
    }
}
exports.AnalyzeStandaloneStatements = AnalyzeStandaloneStatements;
//# sourceMappingURL=analyzeStandaloneStatement.js.map