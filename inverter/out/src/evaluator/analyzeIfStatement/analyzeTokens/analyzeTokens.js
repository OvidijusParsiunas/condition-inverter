"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeTokens = void 0;
const analyzeGreaterOrLessThanSign_1 = require("./analyzeSyntax/analyzeGreaterOrLessThanSign");
const analyzeBrackatableSyntax_1 = require("./analyzeSyntax/analyzeBrackatableSyntax");
const analyzeMethodInvocation_1 = require("./analyzeSyntax/analyzeMethodInvocation");
const analyzeExclamationMark_1 = require("./analyzeSyntax/analyzeExclamationMark");
const analyzeLogicalOperator_1 = require("./analyzeSyntax/analyzeLogicalOperator");
const analyzeBooleanLiteral_1 = require("./analyzeSyntax/analyzeBooleanLiteral");
const traversalUtil_1 = require("../../../shared/functionality/traversalUtil");
const analyzeEqualsSign_1 = require("./analyzeSyntax/analyzeEqualsSign");
const analyzeBracket_1 = require("./analyzeSyntax/analyzeBracket");
class AnalyzeTokens {
    static updateState(tokens, index, evaluationState) {
        const currentToken = tokens[index];
        switch (currentToken) {
            case '!':
                return analyzeExclamationMark_1.AnalyzeExclamationMark.updateState(tokens, index, evaluationState);
            case '(':
                analyzeBracket_1.AnalyzeBracket.updateStateForOpen(evaluationState);
                break;
            case ')':
                analyzeBracket_1.AnalyzeBracket.updateStateForClose(evaluationState);
                break;
            case '&':
            case '|':
                return analyzeLogicalOperator_1.AnalyzeLogicalOperator.updateStateForSymbol(tokens, index, evaluationState);
            case 'and':
            case 'or':
                return analyzeLogicalOperator_1.AnalyzeLogicalOperator.updateStateForKeyword(tokens, index, evaluationState);
            case '<':
            case '>':
                return analyzeGreaterOrLessThanSign_1.AnalyzeGreaterOrLessThanSign.updateState(tokens, index, evaluationState);
            case '=':
                return analyzeEqualsSign_1.AnalyzeEqualsSign.updateState(tokens, index, evaluationState);
            case 'false':
            case 'true':
                analyzeBooleanLiteral_1.AnalyzeBooleanLiteral.updateStateForBoolean(evaluationState);
                break;
            case '0':
            case '1':
                return analyzeBooleanLiteral_1.AnalyzeBooleanLiteral.updateStateForBooleanNumber(tokens, index, evaluationState);
            case `'`:
            case '`':
            case '"':
                return traversalUtil_1.TraversalUtil.getEndQuoteIndex(tokens, index + 1, currentToken);
            case '-':
            case '+':
            case '/':
            case '*':
            case '^':
            case '~':
                analyzeBrackatableSyntax_1.AnalyzeBrackatableSyntax.updateState(evaluationState);
                break;
            default: {
                // it is easier to check if the current token is part of a method invocation rather than checking
                // if the previous token is a method name using the AnalyzeBracket class
                return analyzeMethodInvocation_1.AnalyzeMethodInvocation.updateState(tokens, index);
            }
        }
        return index;
    }
}
exports.AnalyzeTokens = AnalyzeTokens;
//# sourceMappingURL=analyzeTokens.js.map