"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeGreaterOrLessThanSign = void 0;
const analyzeBitwiseShiftOperator_1 = require("./analyzeBitwiseShiftOperator");
class AnalyzeGreaterOrLessThanSign {
    static analyzeComparisonOperator(tokens, index, evaluationState) {
        const nextToken = tokens[index + 1];
        evaluationState.comparisonOperatorFound = true;
        if (nextToken === '=') {
            evaluationState.syntaxToBeInverted.push({ start: index, greaterOrLessThanHasFollowUpEquals: true });
            return index + 1;
        }
        evaluationState.syntaxToBeInverted.push({ start: index });
        return index;
    }
    static analyze(tokens, index, evaluationState) {
        if (analyzeBitwiseShiftOperator_1.AnalyzeBitwiseShiftOperator.isBitwise(tokens, index)) {
            return analyzeBitwiseShiftOperator_1.AnalyzeBitwiseShiftOperator.analyze(tokens, index, evaluationState);
        }
        return AnalyzeGreaterOrLessThanSign.analyzeComparisonOperator(tokens, index, evaluationState);
    }
}
exports.AnalyzeGreaterOrLessThanSign = AnalyzeGreaterOrLessThanSign;
//# sourceMappingURL=analyzeGreaterOrLessThanSign.js.map