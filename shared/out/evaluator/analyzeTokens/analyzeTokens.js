"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeTokens = void 0;
const analyzeGreaterOrLessThanSign_1 = require("./analyzeSyntax/analyzeGreaterOrLessThanSign");
const analyzeArithmeticOperation_1 = require("./analyzeSyntax/analyzeArithmeticOperation");
const analyzeExclamationMark_1 = require("./analyzeSyntax/analyzeExclamationMark");
const analyzeLogicalOperator_1 = require("./analyzeSyntax/analyzeLogicalOperator");
const analyzeBooleanLiteral_1 = require("./analyzeSyntax/analyzeBooleanLiteral");
const analyzeEqualsSign_1 = require("./analyzeSyntax/analyzeEqualsSign");
const analyzeBracket_1 = require("./analyzeSyntax/analyzeBracket");
const traversalUtils_1 = require("../../traversalUtils");
class AnalyzeTokens {
    static analyze(tokens, index, evaluationState) {
        const currentToken = tokens[index];
        switch (currentToken) {
            case '!':
                return analyzeExclamationMark_1.AnalyzeExclamationMark.analyze(tokens, index, evaluationState);
            case '(':
                analyzeBracket_1.AnalyzeBracket.open(evaluationState);
                break;
            case ')':
                analyzeBracket_1.AnalyzeBracket.close(evaluationState);
                break;
            case '&':
            case '|':
                return analyzeLogicalOperator_1.AnalyzeLogicalOperator.analyze(tokens, index, evaluationState);
            case '<':
            case '>':
                return analyzeGreaterOrLessThanSign_1.AnalyzeGreaterOrLessThanSign.analyze(tokens, index, evaluationState);
            case '=':
                return analyzeEqualsSign_1.AnalyzeEqualsSign.analyze(tokens, index, evaluationState);
            case 'false':
            case 'true':
                analyzeBooleanLiteral_1.AnalyzeBooleanLiteral.boolean(evaluationState);
                break;
            case '0':
            case '1':
                return analyzeBooleanLiteral_1.AnalyzeBooleanLiteral.number(tokens, index, evaluationState);
            case `'`:
            case '`':
            case '"':
                return traversalUtils_1.default.findEndingStringQuoteIndex(tokens, index + 1, currentToken);
            case '-':
            case '+':
            case '/':
            case '*':
                analyzeArithmeticOperation_1.AnalyzeArithmeticOperation.analyze(evaluationState);
                break;
            default: {
            }
        }
        return index;
    }
}
exports.AnalyzeTokens = AnalyzeTokens;
//# sourceMappingURL=analyzeTokens.js.map