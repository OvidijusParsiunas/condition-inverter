"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeEqualsSign = void 0;
class AnalyzeEqualsSign {
    static getNewIndex(tokens, index) {
        if (tokens[index + 2] === '=') {
            return index + 2;
        }
        return index + 1;
    }
    static analyze(tokens, index, evaluationState) {
        evaluationState.comparisonOperatorFound = true;
        evaluationState.syntaxToBeInverted.push({ start: index });
        if (tokens[index + 1] === '=') {
            return AnalyzeEqualsSign.getNewIndex(tokens, index);
        }
        return index;
    }
}
exports.AnalyzeEqualsSign = AnalyzeEqualsSign;
//# sourceMappingURL=analyzeEqualsSign.js.map