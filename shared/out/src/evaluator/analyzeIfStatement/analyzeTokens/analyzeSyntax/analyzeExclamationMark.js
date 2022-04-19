"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeExclamationMark = void 0;
const traversalUtil_1 = require("../../../../shared/functionality/traversalUtil");
const analyzeEqualsSign_1 = require("./analyzeEqualsSign");
class AnalyzeExclamationMark {
    static findLastExclamationMarkIndex(tokens, index) {
        const nextNonSpaceTokenIndex = traversalUtil_1.TraversalUtil.getNonSpaceCharacterIndex(tokens, index + 1);
        // a direct plus or minus after exclamation mark are regarded as part of the condition
        if (tokens[nextNonSpaceTokenIndex] === '!' || tokens[nextNonSpaceTokenIndex] === '+' || tokens[nextNonSpaceTokenIndex] === '-') {
            return AnalyzeExclamationMark.findLastExclamationMarkIndex(tokens, nextNonSpaceTokenIndex);
        }
        return index;
    }
    static getConditionEndIndex(tokens, index) {
        const lastExclamationMarkIndex = AnalyzeExclamationMark.findLastExclamationMarkIndex(tokens, index + 1);
        const nextNonSpaceCharIndex = traversalUtil_1.TraversalUtil.getNonSpaceCharacterIndex(tokens, lastExclamationMarkIndex + 1);
        if (tokens[nextNonSpaceCharIndex] === '(') {
            return traversalUtil_1.TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, lastExclamationMarkIndex);
        }
        return lastExclamationMarkIndex;
    }
    static analyze(tokens, index, evaluationState) {
        const nextNonSpaceTokenIndex = traversalUtil_1.TraversalUtil.getNonSpaceCharacterIndex(tokens, index + 1);
        if (tokens[nextNonSpaceTokenIndex] === '!') {
            // called for - !!..., // !!!!!... // !!!+!-!... // !!!!(...
            // if there are multiple exclamation marks, wrap the condition inside brackets with an exclamation mark
            evaluationState.isOperationWrappableInBrackets = true;
            return AnalyzeExclamationMark.getConditionEndIndex(tokens, index);
        }
        else if (evaluationState.numberOfBracketsOpen === 0) {
            if (tokens[nextNonSpaceTokenIndex] === '(') {
                // called for - !(...
                evaluationState.shouldBracketsBeRemoved = true;
                return traversalUtil_1.TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, index);
            }
            else if (tokens[nextNonSpaceTokenIndex] === '=') {
                // called for - !=...
                return analyzeEqualsSign_1.AnalyzeEqualsSign.analyze(tokens, index, evaluationState);
            }
        }
        return index;
    }
}
exports.AnalyzeExclamationMark = AnalyzeExclamationMark;
//# sourceMappingURL=analyzeExclamationMark.js.map