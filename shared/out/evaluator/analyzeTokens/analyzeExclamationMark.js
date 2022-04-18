"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeExclamationMark = void 0;
const analyzeEqualsSign_1 = require("./analyzeEqualsSign");
const traversalUtils_1 = require("../../traversalUtils");
class AnalyzeExclamationMark {
    static findLastExclamationMarkIndex(tokens, index) {
        const nextNonSpaceTokenIndex = traversalUtils_1.default.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
        // a direct plus or minus after exclamation mark are regarded as part of the condition
        if (tokens[nextNonSpaceTokenIndex] === '!' || tokens[nextNonSpaceTokenIndex] === '+' || tokens[nextNonSpaceTokenIndex] === '-') {
            return AnalyzeExclamationMark.findLastExclamationMarkIndex(tokens, nextNonSpaceTokenIndex);
        }
        return index;
    }
    static getConditionEndIndex(tokens, index) {
        const lastExclamationMarkIndex = AnalyzeExclamationMark.findLastExclamationMarkIndex(tokens, index + 1);
        const nextNonSpaceCharIndex = traversalUtils_1.default.findNonSpaceCharacterIndexStartingFromIndex(tokens, lastExclamationMarkIndex + 1);
        if (tokens[nextNonSpaceCharIndex] === '(') {
            return traversalUtils_1.default.getIndexOfLastBracketOfIfStatement(tokens, lastExclamationMarkIndex);
        }
        return lastExclamationMarkIndex;
    }
    static analyze(tokens, index, evaluationState) {
        const nextNonSpaceTokenIndex = traversalUtils_1.default.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
        if (tokens[nextNonSpaceTokenIndex] === '!') {
            // called for - !!..., // !!!!!... // !!!+!-!... // !!!!(...
            // if there are multiple exclamation marks, wrap the condition inside brackets with an exclamation mark
            evaluationState.isOperationWrappableInBrackets = true;
            return AnalyzeExclamationMark.getConditionEndIndex(tokens, index);
        }
        else if (evaluationState.numberOfBracketsOpen === 0) {
            // REF - 2000
            // the logic here does not operate inside nested brackets so cases such as if ((!(hello))) will result with if (!(hello))
            // the reason for this is because the overall code does not analyze the level at which inversions should be made, e.g:
            // for if (((!(hello) && cat) || cat) we do not know that !(hello) is not to be inverted upfront, hence it is always
            // safe to assume that no further inversion will take place within brackets
            if (tokens[nextNonSpaceTokenIndex] === '(') {
                // called for - !(...
                evaluationState.shouldBracketsBeRemoved = true;
                return traversalUtils_1.default.getIndexOfLastBracketOfIfStatement(tokens, index);
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