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
    static updateState(tokens, index, evaluationState) {
        evaluationState.comparisonOperatorFound = true;
        evaluationState.syntaxToBeInverted.push({ start: index });
        // this is run for == and === but not = as it is invalid inside an if statement
        return AnalyzeEqualsSign.getNewIndex(tokens, index);
    }
}
exports.AnalyzeEqualsSign = AnalyzeEqualsSign;
//# sourceMappingURL=analyzeEqualsSign.js.map