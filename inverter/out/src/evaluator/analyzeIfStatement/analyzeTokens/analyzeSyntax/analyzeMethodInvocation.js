"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeMethodInvocation = void 0;
const traversalUtil_1 = require("../../../../shared/functionality/traversalUtil");
class AnalyzeMethodInvocation {
    static updateState(tokens, index) {
        const nextToken = tokens[index + 1];
        if (nextToken === '(') {
            return traversalUtil_1.TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, index);
        }
        return index;
    }
}
exports.AnalyzeMethodInvocation = AnalyzeMethodInvocation;
//# sourceMappingURL=analyzeMethodInvocation.js.map