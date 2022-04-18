"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeBooleanLiteral = void 0;
const traversalUtils_1 = require("../../traversalUtils");
class AnalyzeBooleanLiteral {
    analyze(tokens, index, evaluationState) {
        const nextToken = tokens[index];
        if (nextToken === ' ' || nextToken === ')' || nextToken === '&' || nextToken === '|') {
            evaluationState.revertBooleanLiteral = true;
            return index;
        }
        else {
            return traversalUtils_1.default.getWhenNumberStops(tokens, index);
        }
    }
}
exports.AnalyzeBooleanLiteral = AnalyzeBooleanLiteral;
//# sourceMappingURL=number.js.map