"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeGreaterOrLessThanSign = void 0;
class AnalyzeGreaterOrLessThanSign {
    static analyze(tokens, index, evaluationState) {
        const nextToken = tokens[index + 1];
        evaluationState.comparisonOperatorFound = true;
        if (nextToken === '=') {
            evaluationState.conditionsToBeInverted.push({ start: index, greaterOrLessThanHasFollowupEquals: true });
            return index + 1;
        }
        evaluationState.conditionsToBeInverted.push({ start: index });
        return index;
    }
}
exports.AnalyzeGreaterOrLessThanSign = AnalyzeGreaterOrLessThanSign;
//# sourceMappingURL=analyzeGreaterOrLessThanSign.js.map