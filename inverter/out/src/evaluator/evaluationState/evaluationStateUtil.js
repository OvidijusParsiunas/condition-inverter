"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationStateUtil = void 0;
class EvaluationStateUtil {
    static generateNewState() {
        return {
            isCurrentlyInsideIfStatement: false,
            startOfCurrentIfStatementInsideIndex: 0,
            currentIfStatementCloseBracketIndex: 0,
            syntaxToBeInverted: [],
            shouldBracketsBeRemoved: false,
            // usually involves arithmentic operations or double bangs
            isOperationWrappableInBrackets: false,
            invertBooleanLiteral: false,
            // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
            comparisonOperatorFound: false,
            areBracketsAlreadyPresent: false,
            numberOfBracketsOpen: 0,
        };
    }
    static refreshBooleanState(evaluationState) {
        evaluationState.isOperationWrappableInBrackets = false;
        evaluationState.shouldBracketsBeRemoved = false;
        evaluationState.areBracketsAlreadyPresent = false;
        evaluationState.invertBooleanLiteral = false;
    }
}
exports.EvaluationStateUtil = EvaluationStateUtil;
//# sourceMappingURL=evaluationStateUtil.js.map