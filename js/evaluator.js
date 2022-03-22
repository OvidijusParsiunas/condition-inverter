const traversalUtils = require('./traversalUtils');

module.exports = class Evaluator {
    dealWithStandaloneStatements(tokens, logicalOperatorFound, isOperationWrappableInBrackets, areBracketsAlreadyPresent, conditionIndexes, indexOfNewStatement, shouldBracketsBeRemoved, revertBooleanLiteral, currentTokenIndex) {
        if (shouldBracketsBeRemoved) {
            const endIndex = traversalUtils.getIndexOfLastBracketOfIfStatement(tokens, indexOfNewStatement - 1);
            conditionIndexes.push({ start: indexOfNewStatement, removeNegationBrackets: { start: indexOfNewStatement, end: endIndex } });
        } else if (revertBooleanLiteral && !isOperationWrappableInBrackets) {
            conditionIndexes.push({ start: indexOfNewStatement, revertBooleanLiteral });
        } else if (!logicalOperatorFound) {
            conditionIndexes.push({ start: indexOfNewStatement });
        }
        if (isOperationWrappableInBrackets && !areBracketsAlreadyPresent) {
            const endIndex = traversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, currentTokenIndex - 1, false);
            conditionIndexes.push({ brackets: true, start: indexOfNewStatement, end: endIndex });
        }
    }
    
    isCharacterArithmeticOperation(character) {
        return character === '-' || character === '+' || character === '/' || character === '*';
    }
    
    foundEquals(index, tokens, conditionIndexes) {
        conditionIndexes.push({ start: index });
        if (tokens[index + 1] === '=') {
            if (tokens[index + 2] === '=') {
                return index + 2;
            } else {
                return index + 1;
            }
        }
    }
    
    // bug with shift assignment - make sure that < is not follwoed by anither < and > not followed by another >
    
    identifyConditions(tokens) {
        let currentIfStatementCloseBracketIndex = tokens.length - 1;
        let indexOfNewStatement = 0;
        const conditionIndexes = [];
        let logicalOperatorFound = false;
        // usually involves arithmentic operations or double bangs
        let isOperationWrappableInBrackets = false;
        let shouldBracketsBeRemoved = false;
        // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
        let areBracketsAlreadyPresent = false;
        let numberOfBracketsOpen = 0;
        let revertBooleanLiteral = false;
        let isCurrentlyEvaluatingIfStatement = false;
        for (let i = 0; i < tokens.length; i += 1) {
            if (isCurrentlyEvaluatingIfStatement) {
                if (currentIfStatementCloseBracketIndex <= i) {
                    this.dealWithStandaloneStatements(tokens, logicalOperatorFound, isOperationWrappableInBrackets, areBracketsAlreadyPresent, conditionIndexes, indexOfNewStatement, shouldBracketsBeRemoved, revertBooleanLiteral, currentIfStatementCloseBracketIndex);
                    isCurrentlyEvaluatingIfStatement = false;
                    logicalOperatorFound = false;
                    refreshState();
                } else if (tokens[i] === '&' || tokens[i] === '|') {
                    if (tokens[i + 1] === '&' || tokens[i + 1] === '|') {
                        const nextNonSpaceCharacter = traversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 2);
                        if (numberOfBracketsOpen === 0) {
                            // a look back to see if previous syntax defines a standalone statement
                            this.dealWithStandaloneStatements(tokens, logicalOperatorFound, isOperationWrappableInBrackets, areBracketsAlreadyPresent, conditionIndexes, indexOfNewStatement, shouldBracketsBeRemoved, revertBooleanLiteral, i);
                            conditionIndexes.push({ start: i });
                            indexOfNewStatement = nextNonSpaceCharacter;
                            refreshState();
                        }
                        if (numberOfBracketsOpen > 0 && logicalOperatorFound) conditionIndexes.pop();
                        logicalOperatorFound = false;
                        // subtracting one due to the for loop automatically adding one
                        i = nextNonSpaceCharacter - 1;
                    }
                } else if (tokens[i] === '<' || tokens[i] === '>') {
                    logicalOperatorFound = true;
                    if (tokens[i + 1] === '=') {
                        conditionIndexes.push({ start: i, hasFollowupEquals: true });
                        i += 1;
                    } else {
                        conditionIndexes.push({ start: i });
                    }
                } else if (tokens[i] === '=') {
                    logicalOperatorFound = true;
                    i = this.foundEquals(i, tokens, conditionIndexes);
                } else if (tokens[i] === '!') {
                    const nextExclamationMarkIndex = traversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 1);
                    if (tokens[nextExclamationMarkIndex] === '!') {
                        isOperationWrappableInBrackets = true;
                        i = traversalUtils.findLastExclamationMarkIndex(tokens, i + 1);
                        const nextNonSpaceCharacterIndex = traversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 1);
                        if (tokens[nextNonSpaceCharacterIndex] === '(') {
                            i = traversalUtils.getIndexOfLastBracketOfIfStatement(tokens, i);
                        }
                    } else if (numberOfBracketsOpen === 0) {
                        const nextCharacterTokenIndex = traversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 1);
                        if (tokens[nextCharacterTokenIndex] === '(') {
                            // doesn't get called with syntax !!!!!( as the logic above captures that use case
                            // doesn't get called with syntax !!!(!( as numberOfBracketsOpen will be more than 1
                            // this is called for !( where we are sure that the bracket will need to be removed - which is done in dealWithStandaloneStatements
                            shouldBracketsBeRemoved = true;
                            i = traversalUtils.getIndexOfLastBracketOfIfStatement(tokens, i);
                        } else if (tokens[i + 1] === '=') {
                            logicalOperatorFound = true;
                            i = this.foundEquals(i, tokens, conditionIndexes);
                        }
                    }
                } else if (this.isCharacterArithmeticOperation(tokens[i])) {
                    isOperationWrappableInBrackets = true;
                    if (areBracketsAlreadyPresent && numberOfBracketsOpen === 0) areBracketsAlreadyPresent = false;
                } else if (tokens[i] === '(') {
                    if (!isOperationWrappableInBrackets && numberOfBracketsOpen === 0) areBracketsAlreadyPresent = true;
                    numberOfBracketsOpen += 1;
                } else if (tokens[i] === ')') {
                    numberOfBracketsOpen -= 1;
                } else if (tokens[i] === 'false' || tokens[i] === 'true') {
                    revertBooleanLiteral = true;
                } else if (tokens[i] === '0' || tokens[i] === '1') {
                    const nextCharacter = tokens[i + 1];
                    if (nextCharacter === ' ' || nextCharacter === ')' || nextCharacter === '&' || nextCharacter === '|') {
                        revertBooleanLiteral = true;
                    } else {
                        i = traversalUtils.getWhenNumberStops(tokens, i);
                    }
                } else if (tokens[i] === `'` || tokens[i] === '`' || tokens[i] === '"') {
                    i = traversalUtils.findEndingStringQuoteIndex(tokens, i + 1, tokens[i]);
                }
            } else if (tokens[i] === 'if') {
                currentIfStatementCloseBracketIndex = traversalUtils.getIndexOfLastBracketOfIfStatement(tokens, i);
                const bracketIndex = traversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 1);
                indexOfNewStatement = traversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, bracketIndex + 1);
                i = indexOfNewStatement - 1;
                isCurrentlyEvaluatingIfStatement = true;
            }
        }
        return conditionIndexes;
    
        function refreshState() {
            isOperationWrappableInBrackets = false;
            shouldBracketsBeRemoved = false;
            areBracketsAlreadyPresent = false;
            revertBooleanLiteral = false;
        }
    }
}
