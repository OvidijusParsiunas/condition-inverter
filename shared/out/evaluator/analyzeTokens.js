"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeTokens = void 0;
const traversalUtils_1 = require("../traversalUtils");
const variables_1 = require("./variables");
class AnalyzeTokens extends variables_1.Variables {
    static isTokenArithmeticOperation(token) {
        return token === '-' || token === '+' || token === '/' || token === '*';
    }
    refreshState() {
        this.isOperationWrappableInBrackets = false;
        this.shouldBracketsBeRemoved = false;
        this.areBracketsAlreadyPresent = false;
        this.revertBooleanLiteral = false;
    }
    // a look back to see if previous syntax defines a standalone statement
    dealWithStandaloneStatements(tokens, currentTokenIndex) {
        if (this.shouldBracketsBeRemoved) {
            const endIndex = traversalUtils_1.default.getIndexOfLastBracketOfIfStatement(tokens, this.startOfCurrentlyEvaluatedStatementIndex - 1);
            this.conditionsToBeInverted.push({
                start: this.startOfCurrentlyEvaluatedStatementIndex,
                removeNegationBrackets: { start: this.startOfCurrentlyEvaluatedStatementIndex, end: endIndex },
            });
        }
        else if (this.revertBooleanLiteral && !this.isOperationWrappableInBrackets) {
            this.conditionsToBeInverted.push({
                start: this.startOfCurrentlyEvaluatedStatementIndex,
                revertBooleanLiteral: this.revertBooleanLiteral,
            });
        }
        else if (!this.logicalOperatorFound) {
            this.conditionsToBeInverted.push({ start: this.startOfCurrentlyEvaluatedStatementIndex });
        }
        if (this.isOperationWrappableInBrackets && !this.areBracketsAlreadyPresent) {
            const endIndex = traversalUtils_1.default.findNonSpaceCharacterIndexStartingFromIndex(tokens, currentTokenIndex - 1, false);
            this.conditionsToBeInverted.push({
                brackets: true,
                start: this.startOfCurrentlyEvaluatedStatementIndex,
                end: endIndex,
            });
        }
    }
    evaluateStatementsBeforeLogicalOperator(tokens, index, nextNonSpaceCharacter) {
        if (this.numberOfBracketsOpen === 0) {
            this.dealWithStandaloneStatements(tokens, index);
            this.conditionsToBeInverted.push({ start: index });
            this.startOfCurrentlyEvaluatedStatementIndex = nextNonSpaceCharacter;
            this.refreshState();
        }
        if (this.numberOfBracketsOpen > 0 && this.logicalOperatorFound)
            this.conditionsToBeInverted.pop();
        this.logicalOperatorFound = false;
    }
    foundEquals(tokens, index) {
        this.conditionsToBeInverted.push({ start: index });
        if (tokens[index + 1] === '=') {
            if (tokens[index + 2] === '=') {
                return index + 2;
            }
            else {
                return index + 1;
            }
        }
    }
    analyzeTokens(tokens, index) {
        if (tokens[index] === '&' || tokens[index] === '|') {
            if (tokens[index + 1] === '&' || tokens[index + 1] === '|') {
                const nextNonSpaceCharacter = traversalUtils_1.default.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 2);
                this.evaluateStatementsBeforeLogicalOperator(tokens, index, nextNonSpaceCharacter);
                // subtracting one due to the for loop automatically adding one
                return nextNonSpaceCharacter - 1;
            }
        }
        else if (tokens[index] === '<' || tokens[index] === '>') {
            this.logicalOperatorFound = true;
            if (tokens[index + 1] === '=') {
                this.conditionsToBeInverted.push({ start: index, hasFollowupEquals: true });
                return index + 1;
            }
            else {
                this.conditionsToBeInverted.push({ start: index });
            }
        }
        else if (tokens[index] === '=') {
            this.logicalOperatorFound = true;
            return this.foundEquals(tokens, index);
        }
        else if (tokens[index] === '!') {
            const nextExclamationMarkIndex = traversalUtils_1.default.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
            if (tokens[nextExclamationMarkIndex] === '!') {
                this.isOperationWrappableInBrackets = true;
                const newIndex = traversalUtils_1.default.findLastExclamationMarkIndex(tokens, index + 1);
                const nextNonSpaceCharacterIndex = traversalUtils_1.default.findNonSpaceCharacterIndexStartingFromIndex(tokens, newIndex + 1);
                if (tokens[nextNonSpaceCharacterIndex] === '(') {
                    return traversalUtils_1.default.getIndexOfLastBracketOfIfStatement(tokens, newIndex);
                }
                return newIndex;
            }
            else if (this.numberOfBracketsOpen === 0) {
                const nextCharacterTokenIndex = traversalUtils_1.default.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
                if (tokens[nextCharacterTokenIndex] === '(') {
                    // doesn't get called with syntax !!!!!( as the logic above captures that use case
                    // doesn't get called with syntax !!!(!( as this.numberOfBracketsOpen will be more than 1
                    // this is called for !( where we are sure that the bracket will need to be removed - which is done in dealWithStandaloneStatements
                    this.shouldBracketsBeRemoved = true;
                    return traversalUtils_1.default.getIndexOfLastBracketOfIfStatement(tokens, index);
                }
                else if (tokens[index + 1] === '=') {
                    this.logicalOperatorFound = true;
                    return this.foundEquals(tokens, index);
                }
            }
        }
        else if (AnalyzeTokens.isTokenArithmeticOperation(tokens[index])) {
            this.isOperationWrappableInBrackets = true;
            if (this.areBracketsAlreadyPresent && this.numberOfBracketsOpen === 0)
                this.areBracketsAlreadyPresent = false;
        }
        else if (tokens[index] === '(') {
            if (!this.isOperationWrappableInBrackets && this.numberOfBracketsOpen === 0)
                this.areBracketsAlreadyPresent = true;
            this.numberOfBracketsOpen += 1;
        }
        else if (tokens[index] === ')') {
            this.numberOfBracketsOpen -= 1;
        }
        else if (tokens[index] === 'false' || tokens[index] === 'true') {
            this.revertBooleanLiteral = true;
        }
        else if (tokens[index] === '0' || tokens[index] === '1') {
            const nextCharacter = tokens[index + 1];
            if (nextCharacter === ' ' || nextCharacter === ')' || nextCharacter === '&' || nextCharacter === '|') {
                this.revertBooleanLiteral = true;
            }
            else {
                return traversalUtils_1.default.getWhenNumberStops(tokens, index);
            }
        }
        else if (tokens[index] === `'` || tokens[index] === '`' || tokens[index] === '"') {
            return traversalUtils_1.default.findEndingStringQuoteIndex(tokens, index + 1, tokens[index]);
        }
        return index;
    }
}
exports.AnalyzeTokens = AnalyzeTokens;
//# sourceMappingURL=analyzeTokens.js.map