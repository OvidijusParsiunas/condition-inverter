"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evaluator = void 0;
const analyzeEmptyIfStatement_1 = require("./analyzeIfStatement/analyzeRedundancies/analyzeEmptyIfStatement");
const analyzeIfStatement_1 = require("./analyzeIfStatement/analyzeIfStatement");
const evaluationStateUtil_1 = require("./evaluationState/evaluationStateUtil");
class Evaluator {
    static evaluate(tokens) {
        const evaluationState = evaluationStateUtil_1.EvaluationStateUtil.generateNewState();
        evaluationState.currentIfStatementCloseBracketIndex = tokens.length - 1;
        for (let index = 0; index < tokens.length; index += 1) {
            if (evaluationState.isCurrentlyInsideIfStatement) {
                index = analyzeIfStatement_1.AnalyzeIfStatement.analyze(tokens, index, evaluationState);
            }
            else if (tokens[index] === 'if') {
                index = analyzeIfStatement_1.AnalyzeIfStatement.setNewIfStatementState(tokens, index, evaluationState);
                const isEmpty = analyzeEmptyIfStatement_1.AnalyzeEmptyIfStatement.isEmpty(tokens, evaluationState);
                if (isEmpty)
                    return [];
            }
        }
        return evaluationState.syntaxToBeInverted;
    }
}
exports.Evaluator = Evaluator;
//# sourceMappingURL=evaluator.js.map