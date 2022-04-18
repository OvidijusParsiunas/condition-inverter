"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeStandaloneStatements = void 0;
const traversalUtils_1 = require("../../traversalUtils");
class AnalyzeStandaloneStatements {
    static markForBracketAddition(tokens, index, evaluationState) {
        const endIndex = traversalUtils_1.default.findNonSpaceCharacterIndexStartingFromIndex(tokens, index - 1, false);
        evaluationState.conditionsToBeInverted.push({
            brackets: true,
            start: evaluationState.startOfCurrentlyEvaluatedStatementIndex,
            end: endIndex,
        });
    }
    static markForVariableInversion(evaluationState) {
        evaluationState.conditionsToBeInverted.push({ start: evaluationState.startOfCurrentlyEvaluatedStatementIndex });
    }
    static markForBooleanLiteralInversion(evaluationState) {
        evaluationState.conditionsToBeInverted.push({
            start: evaluationState.startOfCurrentlyEvaluatedStatementIndex,
            invertBooleanLiteral: evaluationState.invertBooleanLiteral,
        });
    }
    static markForNegatedBracketRemoval(tokens, evaluationState) {
        const { startOfCurrentlyEvaluatedStatementIndex, conditionsToBeInverted } = evaluationState;
        const endIndex = traversalUtils_1.default.getIndexOfLastBracketOfIfStatement(tokens, startOfCurrentlyEvaluatedStatementIndex - 1);
        conditionsToBeInverted.push({
            start: startOfCurrentlyEvaluatedStatementIndex,
            removeNegationBrackets: { start: startOfCurrentlyEvaluatedStatementIndex, end: endIndex },
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