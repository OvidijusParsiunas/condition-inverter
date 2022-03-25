import TraversalUtils from "./traversalUtils";

export default class Evaluator {
    isCurrentlyEvaluatingIfStatement = false;
    startOfCurrentlyEvaluatedStatementIndex = 0;
    currentIfStatementCloseBracketIndex = 0;
    indexesRequiringInversion: any = [];
    shouldBracketsBeRemoved = false;
    // usually involves arithmentic operations or double bangs
    isOperationWrappableInBrackets = false;
    revertBooleanLiteral = false;
    // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
    logicalOperatorFound = false;
    areBracketsAlreadyPresent = false;
    numberOfBracketsOpen = 0;

    static isCharacterArithmeticOperation(character) {
        return character === '-' || character === '+' || character === '/' || character === '*';
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
            const endIndex = TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, this.startOfCurrentlyEvaluatedStatementIndex - 1);
            this.indexesRequiringInversion.push({ start: this.startOfCurrentlyEvaluatedStatementIndex, removeNegationBrackets: { start: this.startOfCurrentlyEvaluatedStatementIndex, end: endIndex } });
        } else if (this.revertBooleanLiteral && !this.isOperationWrappableInBrackets) {
            this.indexesRequiringInversion.push({ start: this.startOfCurrentlyEvaluatedStatementIndex, revertBooleanLiteral: this.revertBooleanLiteral });
        } else if (!this.logicalOperatorFound) {
            this.indexesRequiringInversion.push({ start: this.startOfCurrentlyEvaluatedStatementIndex });
        }
        if (this.isOperationWrappableInBrackets && !this.areBracketsAlreadyPresent) {
            const endIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, currentTokenIndex - 1, false);
            this.indexesRequiringInversion.push({ brackets: true, start: this.startOfCurrentlyEvaluatedStatementIndex, end: endIndex });
        }
    }

    foundEquals(tokens, index) {
        this.indexesRequiringInversion.push({ start: index });
        if (tokens[index + 1] === '=') {
            if (tokens[index + 2] === '=') {
                return index + 2;
            } else {
                return index + 1;
            }
        }
    }

    

    evaluateStatementsBeforeLogicalOperator(tokens, index, nextNonSpaceCharacter) {
        if (this.numberOfBracketsOpen === 0) {
            this.dealWithStandaloneStatements(tokens, index);
            this.indexesRequiringInversion.push({ start: index });
            this.startOfCurrentlyEvaluatedStatementIndex = nextNonSpaceCharacter;
            this.refreshState();
        }
        if (this.numberOfBracketsOpen > 0 && this.logicalOperatorFound) this.indexesRequiringInversion.pop();
        this.logicalOperatorFound = false;
    }

    finishEvaluatingIfStatement(tokens) {
        this.dealWithStandaloneStatements(tokens, this.currentIfStatementCloseBracketIndex);
        this.isCurrentlyEvaluatingIfStatement = false;
        this.logicalOperatorFound = false;
        this.refreshState();
    }

    // bug with shift assignment - make sure that < is not follwoed by anither < and > not followed by another >

    evaluate(tokens) {
        this.currentIfStatementCloseBracketIndex = tokens.length - 1;
        for (let i = 0; i < tokens.length; i += 1) {
            if (this.isCurrentlyEvaluatingIfStatement) {
                if (this.currentIfStatementCloseBracketIndex <= i) {
                    this.finishEvaluatingIfStatement(tokens);
                } else if (tokens[i] === '&' || tokens[i] === '|') {
                    if (tokens[i + 1] === '&' || tokens[i + 1] === '|') {
                        const nextNonSpaceCharacter = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 2);
                        this.evaluateStatementsBeforeLogicalOperator(tokens, i, nextNonSpaceCharacter);
                        // subtracting one due to the for loop automatically adding one
                        i = nextNonSpaceCharacter - 1;
                    }
                } else if (tokens[i] === '<' || tokens[i] === '>') {
                    this.logicalOperatorFound = true;
                    if (tokens[i + 1] === '=') {
                        this.indexesRequiringInversion.push({ start: i, hasFollowupEquals: true });
                        i += 1;
                    } else {
                        this.indexesRequiringInversion.push({ start: i });
                    }
                } else if (tokens[i] === '=') {
                    this.logicalOperatorFound = true;
                    i = this.foundEquals(tokens, i);
                } else if (tokens[i] === '!') {
                    const nextExclamationMarkIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 1);
                    if (tokens[nextExclamationMarkIndex] === '!') {
                        this.isOperationWrappableInBrackets = true;
                        i = TraversalUtils.findLastExclamationMarkIndex(tokens, i + 1);
                        const nextNonSpaceCharacterIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 1);
                        if (tokens[nextNonSpaceCharacterIndex] === '(') {
                            i = TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, i);
                        }
                    } else if (this.numberOfBracketsOpen === 0) {
                        const nextCharacterTokenIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 1);
                        if (tokens[nextCharacterTokenIndex] === '(') {
                            // doesn't get called with syntax !!!!!( as the logic above captures that use case
                            // doesn't get called with syntax !!!(!( as this.numberOfBracketsOpen will be more than 1
                            // this is called for !( where we are sure that the bracket will need to be removed - which is done in dealWithStandaloneStatements
                            this.shouldBracketsBeRemoved = true;
                            i = TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, i);
                        } else if (tokens[i + 1] === '=') {
                            this.logicalOperatorFound = true;
                            i = this.foundEquals(tokens, i);
                        }
                    }
                } else if (Evaluator.isCharacterArithmeticOperation(tokens[i])) {
                    this.isOperationWrappableInBrackets = true;
                    if (this.areBracketsAlreadyPresent && this.numberOfBracketsOpen === 0) this.areBracketsAlreadyPresent = false;
                } else if (tokens[i] === '(') {
                    if (!this.isOperationWrappableInBrackets && this.numberOfBracketsOpen === 0) this.areBracketsAlreadyPresent = true;
                    this.numberOfBracketsOpen += 1;
                } else if (tokens[i] === ')') {
                    this.numberOfBracketsOpen -= 1;
                } else if (tokens[i] === 'false' || tokens[i] === 'true') {
                    this.revertBooleanLiteral = true;
                } else if (tokens[i] === '0' || tokens[i] === '1') {
                    const nextCharacter = tokens[i + 1];
                    if (nextCharacter === ' ' || nextCharacter === ')' || nextCharacter === '&' || nextCharacter === '|') {
                        this.revertBooleanLiteral = true;
                    } else {
                        i = TraversalUtils.getWhenNumberStops(tokens, i);
                    }
                } else if (tokens[i] === `'` || tokens[i] === '`' || tokens[i] === '"') {
                    i = TraversalUtils.findEndingStringQuoteIndex(tokens, i + 1, tokens[i]);
                }
            } else if (tokens[i] === 'if') {
                this.currentIfStatementCloseBracketIndex = TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, i);
                const bracketIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 1);
                this.startOfCurrentlyEvaluatedStatementIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, bracketIndex + 1);
                i = this.startOfCurrentlyEvaluatedStatementIndex - 1;
                this.isCurrentlyEvaluatingIfStatement = true;
            }
        }
        return this.indexesRequiringInversion;
    }
}
