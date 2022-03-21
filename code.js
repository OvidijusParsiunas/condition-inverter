function findNonSpaceCharacterIndexStartingFromIndex(tokens, index, forwards = true) {
    if (index === 0) {
        return 0;
    }
    if (tokens[index] !== ' ') {
        return index;
    }
    const newIndex = forwards ? index + 1 : index - 1;
    return findNonSpaceCharacterIndexStartingFromIndex(tokens, newIndex, forwards);
}

function dealWithStandaloneStatements(tokens, logicalOperatorFound, isOperationWrappableInBrackets, areBracketsAlreadyPresent, conditionIndexes, indexOfNewStatement, shouldBracketsBeRemoved, revertBooleanLiteral, currentTokenIndex) {
    if (shouldBracketsBeRemoved) {
        const endIndex = getIndexOfLastBracketOfIfStatement(tokens, indexOfNewStatement - 1);
        conditionIndexes.push({ start: indexOfNewStatement, removeNegationBrackets: { start: indexOfNewStatement, end: endIndex } });
    } else if (revertBooleanLiteral && !isOperationWrappableInBrackets) {
        conditionIndexes.push({ start: indexOfNewStatement, revertBooleanLiteral });
    } else if (!logicalOperatorFound) {
        conditionIndexes.push({ start: indexOfNewStatement });
    }
    if (isOperationWrappableInBrackets && !areBracketsAlreadyPresent) {
        const endIndex = findNonSpaceCharacterIndexStartingFromIndex(tokens, currentTokenIndex - 1, false);
        conditionIndexes.push({ brackets: true, start: indexOfNewStatement, end: endIndex });
    }
}

function getWhenNumberStops(tokens, index) {
    if (index > tokens.length - 1) {
        console.log('attempt to retrieve when number declaration stops is out of bounds');
        return -1;
    }
    const nextCharacter = tokens[index];
    if (nextCharacter === ' ' || nextCharacter === ')' || nextCharacter === '&' || nextCharacter === '|') {
        return index;
    }
    return getWhenNumberStops(tokens, index + 1);
}

function isCharacterArithmeticOperation(character) {
    return character === '-' || character === '+' || character === '/' || character === '*';
}

function foundEquals(index, tokens, conditionIndexes) {
    conditionIndexes.push({ start: index });
    if (tokens[index + 1] === '=') {
        if (tokens[index + 2] === '=') {
            return index + 2;
        } else {
            return index + 1;
        }
    }
}

function findEndingStringQuoteIndex(tokens, index, typeOfQuoteString) {
    if (tokens[index] === typeOfQuoteString) {
        return index;
    }
    return findEndingStringQuoteIndex(tokens, index + 1, typeOfQuoteString);
}

function findLastExclamationMarkIndex(tokens, index) {
    const nextCharacterTokenIndex = findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
    if (tokens[nextCharacterTokenIndex] === '!') {
        return findLastExclamationMarkIndex(tokens, nextCharacterTokenIndex);
    }
    if (tokens[nextCharacterTokenIndex] === '+' || tokens[nextCharacterTokenIndex] === '-') {
        return findLastExclamationMarkIndex(tokens, nextCharacterTokenIndex);
    }
    return index;
}

// bug with shift assignment - make sure that < is not follwoed by anither < and > not followed by another >

function identifyConditions(tokens, ifStatementlocationsInTokens, firstIfStatementCloseBracketIndex) {
    const conditionIndexes = [];
    let logicalOperatorFound = false;
    // adding + 1 in order to be inside the brackets
    const startingIndex = findNonSpaceCharacterIndexStartingFromIndex(tokens, ifStatementlocationsInTokens + 1) + 1;
    let indexOfNewStatement = findNonSpaceCharacterIndexStartingFromIndex(tokens, startingIndex);
    // usually involves arithmentic operations or double bangs
    let isOperationWrappableInBrackets = false;
    let shouldBracketsBeRemoved = false;
    // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
    let areBracketsAlreadyPresent = false;
    let numberOfBracketsOpen = 0;
    let revertBooleanLiteral = false;
    for (let i = startingIndex; i < firstIfStatementCloseBracketIndex; i += 1) {
        if (tokens[i] === '&' || tokens[i] === '|') {
            if (tokens[i + 1] === '&' || tokens[i + 1] === '|') {
                const nextNonSpaceCharacter = findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 2);
                if (numberOfBracketsOpen === 0) {
                    // a look back to see if previous syntax defines a standalone statement
                    dealWithStandaloneStatements(tokens, logicalOperatorFound, isOperationWrappableInBrackets, areBracketsAlreadyPresent, conditionIndexes, indexOfNewStatement, shouldBracketsBeRemoved, revertBooleanLiteral, i);
                    conditionIndexes.push({ start: i });
                    indexOfNewStatement = nextNonSpaceCharacter;
                    areBracketsAlreadyPresent = false;
                    isOperationWrappableInBrackets = false;
                    shouldBracketsBeRemoved = false;
                    revertBooleanLiteral = false;
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
            i = foundEquals(i, tokens, conditionIndexes);
        } else if (tokens[i] === '!') {
            const nextExclamationMarkIndex = findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 1);
            if (tokens[nextExclamationMarkIndex] === '!') {
                isOperationWrappableInBrackets = true;
                i = findLastExclamationMarkIndex(tokens, i + 1);
                const nextNonSpaceCharacterIndex = findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 1);
                if (tokens[nextNonSpaceCharacterIndex] === '(') {
                    i = getIndexOfLastBracketOfIfStatement(tokens, i);
                }
            } else if (numberOfBracketsOpen === 0) {
                const nextCharacterTokenIndex = findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 1);
                if (tokens[nextCharacterTokenIndex] === '(') {
                    // doesn't get called with syntax !!!!!( as the logic above captures that use case
                    // doesn't get called with syntax !!!(!( as numberOfBracketsOpen will be more than 1
                    // this is called for !( where we are sure that the bracket will need to be removed - which is done in dealWithStandaloneStatements
                    shouldBracketsBeRemoved = true;
                    i = getIndexOfLastBracketOfIfStatement(tokens, i);
                } else if (tokens[i + 1] === '=') {
                    logicalOperatorFound = true;
                    i = foundEquals(i, tokens, conditionIndexes);
                }
            }
        } else if (isCharacterArithmeticOperation(tokens[i])) {
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
                i = getWhenNumberStops(tokens, i);
            }
        } else if (tokens[i] === `'` || tokens[i] === '`' || tokens[i] === '"') {
            i = findEndingStringQuoteIndex(tokens, i + 1, tokens[i]);
        }
    }
    dealWithStandaloneStatements(tokens, logicalOperatorFound, isOperationWrappableInBrackets, areBracketsAlreadyPresent, conditionIndexes, indexOfNewStatement, shouldBracketsBeRemoved, revertBooleanLiteral, firstIfStatementCloseBracketIndex);
    return conditionIndexes;
}

function invertIfStatements(tokens, conditionIndexes) {
    let newElementsDelta = 0;
    conditionIndexes.forEach(({ start, end, brackets, hasFollowupEquals, removeNegationBrackets, revertBooleanLiteral }, conditionIndexesCurrentIndex) => {
        const arrayIndex = start + newElementsDelta;
        if (brackets) {
            tokens.splice(arrayIndex, 0, '(');
            newElementsDelta += 1;
            tokens.splice(end + newElementsDelta + 1, 0, ')');
            newElementsDelta += 1;
        } else {
            switch (tokens[arrayIndex]) {
                case '=':
                    tokens[arrayIndex] = '!';
                    break;
                case '<':
                    tokens[arrayIndex] = '>';
                    if (hasFollowupEquals) {
                        tokens.splice(arrayIndex + 1, 1);
                        newElementsDelta -= 1;
                    } else {
                        tokens.splice(arrayIndex + 1, 0, '=');
                        newElementsDelta += 1;
                    }
                    break;
                case '>':
                    tokens[arrayIndex] = '<';
                    if (hasFollowupEquals) {
                        tokens.splice(arrayIndex + 1, 1);
                        newElementsDelta -= 1;
                    } else {
                        tokens.splice(arrayIndex + 1, 0, '=');
                        newElementsDelta += 1;
                    }
                    break;
                case '&':
                    tokens[arrayIndex] = '|';
                    tokens[arrayIndex + 1] = '|';
                    break;
                case '|':
                    tokens[arrayIndex] = '&';
                    tokens[arrayIndex + 1] = '&';
                    break;
                case '!':
                    if (tokens[arrayIndex + 1] === '=') {
                        tokens[arrayIndex] = '=';
                        break;
                    } else if (!conditionIndexes[conditionIndexesCurrentIndex + 1]?.brackets) {
                        // if brackets are present, remove the exclamation mark
                        tokens.splice(arrayIndex, 1);
                        newElementsDelta -= 1;
                        if (removeNegationBrackets) {
                            const startIndex = findNonSpaceCharacterIndexStartingFromIndex(tokens, arrayIndex);
                            tokens.splice(startIndex, 1);
                            newElementsDelta -= 1;
                            tokens.splice(removeNegationBrackets.end + newElementsDelta, 1);
                            newElementsDelta -= 1;
                        }
                        break;
                    }
                case 'true':
                    if (revertBooleanLiteral) {
                        tokens[arrayIndex] = false;
                        break;
                    }
                case 'false':
                    if (revertBooleanLiteral) {
                        tokens[arrayIndex] = true;
                        break;
                    }
                case '0':
                    if (revertBooleanLiteral) {
                        tokens[arrayIndex] = 1;
                        break;
                    }
                case '1':
                    if (revertBooleanLiteral) {
                        tokens[arrayIndex] = 0;
                        break;
                    }
                    // if brackets are required - proceed to go onto the next section and append a ! at the start before the brackets
                default: {
                    tokens.splice(arrayIndex, 0, '!');
                    newElementsDelta += 1;
                }
            }
        }
    });
}

function getIndexOfLastBracketOfIfStatement(tokens, index, openBrackets = 0) {
    if (index > tokens.length - 1) {
        console.log('index out of bounds');
        return -1;
    }
    if (tokens[index + 1] === '(') {
        return getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets + 1);
    }
    if (tokens[index + 1] === ')') {
        if (openBrackets === 1) {
            return index + 1;
        }
        return getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets - 1);
    }
    return getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets);
}

function retrieveIfIndexes(tokens) {
    const ifStatementIndexes = [];
    // will probably need to parse if statements differently
    // const startIndexes = tokens.map((e, i) => e === 'if' ? i : '').filter(String);
    [0].forEach((startIndex) => {
        const endIndex = getIndexOfLastBracketOfIfStatement(tokens, startIndex);
        ifStatementIndexes.push({ start: startIndex, end: endIndex });
    })
    return ifStatementIndexes;
}

function tokenize(functionString) {
    return functionString.match(/(\w+)|(\s)|[^\w\s]/g);
}

function runInvert(functionString) {
    const tokens = tokenize(functionString);
    const ifStatementIndexes = retrieveIfIndexes(tokens);
    ifStatementIndexes.forEach(({ start, end }) => {
        const conditionIndexes = identifyConditions(tokens, start, end);
        invertIfStatements(tokens, conditionIndexes);
    });
    return tokens.join('');
}

function test(input, expectedResult) {
    const result = runInvert(input);
    if (result === expectedResult) {
        console.log('PASS');
    } else {
        console.log(`FAIL: input - ${input}`);
        console.log(`e: ${expectedResult}`)
        console.log(`a: ${result}`);
    }
}

runExclusiveTests();

runTests();

function runExclusiveTests() {
    // test(
    //     '  if   (  dog   -  cat  ||   mouse  ) { console.log(2) }  ',
    //     '  if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }  ',
    // );
}


function runTests() {

    test(
        'if (mouse && cat) { console.log(2) }',
        'if (!mouse || !cat) { console.log(2) }',
    );

    test(
        'if (mouse &&cat) { console.log(2) }',
        'if (!mouse ||!cat) { console.log(2) }',
    );

    test(
        'if(mouse && cat) { console.log(2) }',
        'if(!mouse || !cat) { console.log(2) }',
    );

    test(
        'if(mouse &&cat) { console.log(2) }',
        'if(!mouse ||!cat) { console.log(2) }',
    );

    test(
        'if (dog && cat) { console.log(2) }',
        'if (!dog || !cat) { console.log(2) }',
    );

    test(
        'if (dog && cat || mouse) { console.log(2) }',
        'if (!dog || !cat && !mouse) { console.log(2) }',
    );

    test(
        'if (dog - cat || mouse) { console.log(2) }',
        'if (!(dog - cat) && !mouse) { console.log(2) }',
    );

    test(
        'if (dog - cat  || mouse) { console.log(2) }',
        'if (!(dog - cat)  && !mouse) { console.log(2) }',
    );

    test(
        'if (!dog - cat) { console.log(2) }',
        'if (!(!dog - cat)) { console.log(2) }',
    );

    test(
        'if (!dog - cat && !dog - cat) { console.log(2) }',
        'if (!(!dog - cat) || !(!dog - cat)) { console.log(2) }',
    );

    test(
        'if (!  dog - cat && !  dog - cat) { console.log(2) }',
        'if (!(!  dog - cat) || !(!  dog - cat)) { console.log(2) }',
    );

    test(
        'if (dog - !cat && dog - !cat) { console.log(2) }',
        'if (!(dog - !cat) || !(dog - !cat)) { console.log(2) }',
    );

    test(
        'if (dog -   !cat && dog -  !cat) { console.log(2) }',
        'if (!(dog -   !cat) || !(dog -  !cat)) { console.log(2) }',
    );

    test(
        'if (dog -   !cat && dog -  !  cat  ) { console.log(2) }',
        'if (!(dog -   !cat) || !(dog -  !  cat)  ) { console.log(2) }',
    );

    test(
        'if ((!(!dog - cat)) && (!(!dog - cat))) { console.log(2) }',
        'if (!(!(!dog - cat)) || !(!(!dog - cat))) { console.log(2) }',
    );

    test(
        'if (  (!  (!  dog - cat)) && (  !(  !dog - cat))) { console.log(2) }',
        'if (  !(!  (!  dog - cat)) || !(  !(  !dog - cat))) { console.log(2) }',
    );

    test(
        'if (dog - cat ||   mouse) { console.log(2) }',
        'if (!(dog - cat) &&   !mouse) { console.log(2) }',
    );

    test(
        'if   (dog - cat ||   mouse) { console.log(2) }',
        'if   (!(dog - cat) &&   !mouse) { console.log(2) }',
    );

    test(
        'if (dog - cat || mouse  ) { console.log(2) }',
        'if (!(dog - cat) && !mouse  ) { console.log(2) }',
    );

    test(
        'if   (  dog   -  cat  ||   mouse  ) { console.log(2) }',
        'if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }',
    );

    test(
        'if   (   mouse  ||   dog   -  cat  ) { console.log(2) }',
        'if   (   !mouse  &&   !(dog   -  cat)  ) { console.log(2) }',
    );

    test(
        'if (!(mouse - cat)) { console.log(2) }',
        'if (mouse - cat) { console.log(2) }',
    );

    test(
        'if (  !  (  mouse - cat)  ) { console.log(2) }',
        'if (      mouse - cat  ) { console.log(2) }',
    );

    test(
        'if (  !  (  mouse - cat)  &&   !  (  mouse - cat)  ) { console.log(2) }',
        'if (      mouse - cat  ||       mouse - cat  ) { console.log(2) }',
    );

    test(
        'if (mouse || dog - cat) { console.log(2) }',
        'if (!mouse && !(dog - cat)) { console.log(2) }',
    );

    test(
        'if (dog - cat || mouse && cat - dog) { console.log(2) }',
        'if (!(dog - cat) && !mouse || !(cat - dog)) { console.log(2) }',
    );

    test(
        'if (mouse || (dog - cat)) { console.log(2) }',
        'if (!mouse && !(dog - cat)) { console.log(2) }',
    );

    test(
        'if (mouse < cat) { console.log(2) }',
        'if (mouse >= cat) { console.log(2) }',
    );

    test(
        'if (mouse > cat) { console.log(2) }',
        'if (mouse <= cat) { console.log(2) }',
    );

    test(
        'if (mouse <= cat) { console.log(2) }',
        'if (mouse > cat) { console.log(2) }',
    );

    test(
        'if (mouse <= cat || hello) { console.log(2) }',
        'if (mouse > cat && !hello) { console.log(2) }',
    );

    test(
        'if (hello || mouse <= cat) { console.log(2) }',
        'if (!hello && mouse > cat) { console.log(2) }',
    );

    test(
        'if (hello || (mouse <= cat)) { console.log(2) }',
        'if (!hello && (mouse > cat)) { console.log(2) }',
    );

    test(
        'if (hello || ((mouse <= cat))) { console.log(2) }',
        'if (!hello && ((mouse > cat))) { console.log(2) }',
    );

    test(
        'if (hello || (mouse <= cat && mouse - cat)) { console.log(2) }',
        'if (!hello && !(mouse <= cat && mouse - cat)) { console.log(2) }',
    );

    test(
        'if (hello || (mouse <= cat && (mouse - cat))) { console.log(2) }',
        'if (!hello && !(mouse <= cat && (mouse - cat))) { console.log(2) }',
    );

    test(
        'if ((hello) === (2) && start || number < 2 && hello && end) { console.log(2) }',
        'if ((hello) !== (2) || !start && number >= 2 || !hello || !end) { console.log(2) }',
    );

    test(
        'if ((hello) !== (2) && start || number != 2 && hello && end) { console.log(2) }',
        'if ((hello) === (2) || !start && number == 2 || !hello || !end) { console.log(2) }',
    );

    test(
        'if ((hello) !== (2) && !start || number != 2 && hello && end) { console.log(2) }',
        'if ((hello) === (2) || start && number == 2 || !hello || !end) { console.log(2) }',
    );

    test(
        'if (hello || (mouse <= cat && ((mouse - cat)))) { console.log(2) }',
        'if (!hello && !(mouse <= cat && ((mouse - cat)))) { console.log(2) }',
    );

    test(
        'if ((mouse <= cat && mouse - cat) || hello) { console.log(2) }',
        'if (!(mouse <= cat && mouse - cat) && !hello) { console.log(2) }',
    );

    test(
        'if ((mouse <= cat && (mouse - cat)) || hello) { console.log(2) }',
        'if (!(mouse <= cat && (mouse - cat)) && !hello) { console.log(2) }',
    );

    test(
        'if ((mouse <= cat && ((mouse - cat))) || hello) { console.log(2) }',
        'if (!(mouse <= cat && ((mouse - cat))) && !hello) { console.log(2) }',
    );

    test(
        'if (  (mouse <= cat &&   (    (mouse   -   cat)    )  ) || hello  ) { console.log(2) }',
        'if (  !(mouse <= cat &&   (    (mouse   -   cat)    )  ) && !hello  ) { console.log(2) }',
    );

    test(
        'if (((mouse <= cat) && ((mouse - cat))) || hello) { console.log(2) }',
        'if (!((mouse <= cat) && ((mouse - cat))) && !hello) { console.log(2) }',
    );

    test(
        'if (((mouse - cat) && ((mouse - cat))) || hello) { console.log(2) }',
        'if (!((mouse - cat) && ((mouse - cat))) && !hello) { console.log(2) }',
    );

    test(
        'if  (  (  (mouse - cat) && (  (mouse - cat) )    ) ||   hello  ) { console.log(2) }',
        'if  (  !(  (mouse - cat) && (  (mouse - cat) )    ) &&   !hello  ) { console.log(2) }',
    );

    test(
        'if (((mouse - cat) && ((mouse - cat)) && ((mouse - cat) && ((mouse - cat)))) || hello) { console.log(2) }',
        'if (!((mouse - cat) && ((mouse - cat)) && ((mouse - cat) && ((mouse - cat)))) && !hello) { console.log(2) }',
    );

    test(
        'if (((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat)))) { console.log(2) }',
        'if (!((mouse - cat) && ((mouse - cat))) && !((mouse - cat) && ((mouse - cat)))) { console.log(2) }',
    );

    test(
        'if ((((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat)))) && (((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat))))) { console.log(2) }',
        'if (!(((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat)))) || !(((mouse - cat) && ((mouse - cat))) || ((mouse - cat) && ((mouse - cat))))) { console.log(2) }',
    );

    test(
        'if (!!dog) { console.log(2) }',
        'if (!(!!dog)) { console.log(2) }',
    );

    test(
        'if (!(!!dog)) { console.log(2) }',
        'if (!!dog) { console.log(2) }',
    );

    test(
        'if (! !dog) { console.log(2) }',
        'if (!(! !dog)) { console.log(2) }',
    );

    test(
        'if (!(! !dog)) { console.log(2) }',
        'if (! !dog) { console.log(2) }',
    );

    test(
        'if (! !(dog)) { console.log(2) }',
        'if (!(! !(dog))) { console.log(2) }',
    );

    test(
        'if (!(! !(dog))) { console.log(2) }',
        'if (! !(dog)) { console.log(2) }',
    );

    test(
        'if (! !!! (dog)) { console.log(2) }',
        'if (!(! !!! (dog))) { console.log(2) }',
    );

    test(
        'if (! !!!  (  dog != 1)) { console.log(2) }',
        'if (!(! !!!  (  dog != 1))) { console.log(2) }',
    );

    test(
        'if (!!!!dog) { console.log(2) }',
        'if (!(!!!!dog)) { console.log(2) }',
    );

    test(
        'if (!(!!!!dog)) { console.log(2) }',
        'if (!!!!dog) { console.log(2) }',
    );

    test(
        'if (!!!(!!dog)) { console.log(2) }',
        'if (!(!!!(!!dog))) { console.log(2) }',
    );

    test(
        'if (!!!(!!dog) && !!!(!!dog)) { console.log(2) }',
        'if (!(!!!(!!dog)) || !(!!!(!!dog))) { console.log(2) }',
    );

    test(
        'if (!(!!!(!!dog)) || !(!!!(!!dog))) { console.log(2) }',
        'if (!!!(!!dog) && !!!(!!dog)) { console.log(2) }',
    );

    test(
        'if (!!!(!!dog + 1) && !!!(!!dog)) { console.log(2) }',
        'if (!(!!!(!!dog + 1)) || !(!!!(!!dog))) { console.log(2) }',
    );

    test(
        'if (!(!!!(!!dog + 1)) || !(!!!(!!dog))) { console.log(2) }',
        'if (!!!(!!dog + 1) && !!!(!!dog)) { console.log(2) }',
    );

    test(
        'if (!!!(!!dog && cat) && !!!(!!dog)) { console.log(2) }',
        'if (!(!!!(!!dog && cat)) || !(!!!(!!dog))) { console.log(2) }',
    );

    test(
        'if (!(!!!(!!dog && cat)) || !(!!!(!!dog))) { console.log(2) }',
        'if (!!!(!!dog && cat) && !!!(!!dog)) { console.log(2) }',
    );

    test(
        'if (!!-!!dog) { console.log(2) }',
        'if (!(!!-!!dog)) { console.log(2) }',
    );

    test(
        'if (!!+!!dog) { console.log(2) }',
        'if (!(!!+!!dog)) { console.log(2) }',
    );

    test(
        'if (!!dog + 2) { console.log(2) }',
        'if (!(!!dog + 2)) { console.log(2) }',
    );

    test(
        'if (!!dog && !!dog + 2) { console.log(2) }',
        'if (!(!!dog) || !(!!dog + 2)) { console.log(2) }',
    );

    test(
        'if (!!dog && !!dog +  2) { console.log(2) }',
        'if (!(!!dog) || !(!!dog +  2)) { console.log(2) }',
    );
    
    test(
        'if ((!!dog && !!dog + 2) && (!!dog && !!dog + 2)) { console.log(2) }',
        'if (!(!!dog && !!dog + 2) || !(!!dog && !!dog + 2)) { console.log(2) }',
    );

    test(
        'if (!!!!(dog)) { console.log(2) }',
        'if (!(!!!!(dog))) { console.log(2) }',
    );

    test(
        'if (!!!  !(dog)) { console.log(2) }',
        'if (!(!!!  !(dog))) { console.log(2) }',
    );

    test(
        'if (!(!!!!(dog))) { console.log(2) }',
        'if (!!!!(dog)) { console.log(2) }',
    );

    test(
        'if (!(!!!!  (  dog))) { console.log(2) }',
        'if (!!!!  (  dog)) { console.log(2) }',
    );

    test(
        'if (!!!!(dog != cat)) { console.log(2) }',
        'if (!(!!!!(dog != cat))) { console.log(2) }',
    );

    test(
        'if (!!!!(dog != cat && cat - dog)) { console.log(2) }',
        'if (!(!!!!(dog != cat && cat - dog))) { console.log(2) }',
    );

    test(
        'if (! !!  !(dog != cat && cat   - dog) ) { console.log(2) }',
        'if (!(! !!  !(dog != cat && cat   - dog)) ) { console.log(2) }',
    );

    test(
        'if (!(!!!!(dog != cat && cat - dog)) && !(!!!!(dog != cat && cat - dog))) { console.log(2) }',
        'if (!!!!(dog != cat && cat - dog) || !!!!(dog != cat && cat - dog)) { console.log(2) }',
    );

    test(
        'if (!!!+!(dog != cat)) { console.log(2) }',
        'if (!(!!!+!(dog != cat))) { console.log(2) }',
    );

    test(
        'if (!(!!!+!(dog != cat))) { console.log(2) }',
        'if (!!!+!(dog != cat)) { console.log(2) }',
    );

    test(
        'if (!!!  +  !!(dog !=   cat)) { console.log(2) }',
        'if (!(!!!  +  !!(dog !=   cat))) { console.log(2) }',
    );

    test(
        'if (!!(!!  +  !!(dog !=   cat))) { console.log(2) }',
        'if (!(!!(!!  +  !!(dog !=   cat)))) { console.log(2) }',
    );

    test(
        'if (!!!+!!(dog != cat)) { console.log(2) }',
        'if (!(!!!+!!(dog != cat))) { console.log(2) }',
    );

    test(
        'if (!(!!!+!!(dog != cat))) { console.log(2) }',
        'if (!!!+!!(dog != cat)) { console.log(2) }',
    );

    test(
        'if (!!!!!+(dog != cat)) { console.log(2) }',
        'if (!(!!!!!+(dog != cat))) { console.log(2) }',
    );

    test(
        'if (!(!!!!!+(dog != cat))) { console.log(2) }',
        'if (!!!!!+(dog != cat)) { console.log(2) }',
    );

    test(
        'if (+!!!!!(dog != cat)) { console.log(2) }',
        'if (!(+!!!!!(dog != cat))) { console.log(2) }',
    );

    test(
        'if (!(+!!!!!(dog != cat))) { console.log(2) }',
        'if (+!!!!!(dog != cat)) { console.log(2) }',
    );

    test(
        'if ((+!!!!!(dog != cat))) { console.log(2) }',
        'if (!(+!!!!!(dog != cat))) { console.log(2) }',
    );

    test(
        'if ((-!!!!!(dog != cat))) { console.log(2) }',
        'if (!(-!!!!!(dog != cat))) { console.log(2) }',
    );

    test(
        'if (( - !!!!!(dog != cat))) { console.log(2) }',
        'if (!( - !!!!!(dog != cat))) { console.log(2) }',
    );

    test(
        'if (!( - !!!!!(dog != cat))) { console.log(2) }',
        'if ( - !!!!!(dog != cat)) { console.log(2) }',
    );

    test(
        'if (!!!!(!(dog || cat)) || !!!!(!(dog || cat))) { console.log(2) }',
        'if (!(!!!!(!(dog || cat))) && !(!!!!(!(dog || cat)))) { console.log(2) }',
    );

    test(
        'if (!!!!  (! (dog || cat) ) || !!  !!(! (dog || cat))) { console.log(2) }',
        'if (!(!!!!  (! (dog || cat) )) && !(!!  !!(! (dog || cat)))) { console.log(2) }',
    );

    test(
        'if (!(!!!!(!(dog || cat))) && !(!!!!(!(dog || cat)))) { console.log(2) }',
        'if (!!!!(!(dog || cat)) || !!!!(!(dog || cat))) { console.log(2) }',
    );

    test(
        'if (  !(!!! !(!(dog || cat))) && !(!! ! !(!(dog ||  cat) ))) { console.log(2) }',
        'if (  !!! !(!(dog || cat)) || !! ! !(!(dog ||  cat) )) { console.log(2) }',
    );

    test(
        'if (!! + - + -!!(!(dog || cat))) { console.log(2) }',
        'if (!(!! + - + -!!(!(dog || cat)))) { console.log(2) }',
    );

    test(
        'if (!! + - + -!!(!(dog ||  + - + - cat))) { console.log(2) }',
        'if (!(!! + - + -!!(!(dog ||  + - + - cat)))) { console.log(2) }',
    );

    test(
        'if (+ - + -!!(!(dog ||  + - + - cat))) { console.log(2) }',
        'if (!(+ - + -!!(!(dog ||  + - + - cat)))) { console.log(2) }',
    );

    test(
        'if (+ - + - !!(!(dog ||  + - + - cat))) { console.log(2) }',
        'if (!(+ - + - !!(!(dog ||  + - + - cat)))) { console.log(2) }',
    );

    test(
        'if (!(+ - + - !!(!(dog ||  + - + - cat)))) { console.log(2) }',
        'if (+ - + - !!(!(dog ||  + - + - cat))) { console.log(2) }',
    );

        test(
        'if (-dog) { console.log(2) }',
        'if (!(-dog)) { console.log(2) }',
    );

    test(
        'if (- + dog) { console.log(2) }',
        'if (!(- + dog)) { console.log(2) }',
    );

    test(
        'if ((- + dog)) { console.log(2) }',
        'if (!(- + dog)) { console.log(2) }',
    );

    test(
        'if ((- + dog) && (- + dog)) { console.log(2) }',
        'if (!(- + dog) || !(- + dog)) { console.log(2) }',
    );

    test(
        'if (( - + - + dog) && (- + - + dog)) { console.log(2) }',
        'if (!( - + - + dog) || !(- + - + dog)) { console.log(2) }',
    );

    test(
        'if (!!(- + - + dog) && !!( - + - + dog)) { console.log(2) }',
        'if (!(!!(- + - + dog)) || !(!!( - + - + dog))) { console.log(2) }',
    );

    test(
        'if (!!(- + - + dog + cat) && !!(- + - + dog - cat)) { console.log(2) }',
        'if (!(!!(- + - + dog + cat)) || !(!!(- + - + dog - cat))) { console.log(2) }',
    );

    test(
        'if (- + - + dog + cat && - + - + dog - cat) { console.log(2) }',
        'if (!(- + - + dog + cat) || !(- + - + dog - cat)) { console.log(2) }',
    );

    test(
        'if (- + - + dog + !!cat) { console.log(2) }',
        'if (!(- + - + dog + !!cat)) { console.log(2) }',
    );

    test(
        'if (- + -   + dog + !!cat && - + - + !!dog - cat) { console.log(2) }',
        'if (!(- + -   + dog + !!cat) || !(- + - + !!dog - cat)) { console.log(2) }',
    );

    test(
        'if (!(- + -   + dog + !!cat) || !(- + - + !!dog - cat)) { console.log(2) }',
        'if (- + -   + dog + !!cat && - + - + !!dog - cat) { console.log(2) }',
    );

    test(
        'if (!(- + dog)) { console.log(2) }',
        'if (- + dog) { console.log(2) }',
    );
    
    test(
        'if (+dog) { console.log(2) }',
        'if (!(+dog)) { console.log(2) }',
    );
    
    test(
        'if (+!!dog) { console.log(2) }',
        'if (!(+!!dog)) { console.log(2) }',
    );

    test(
        'if (-+!!dog) { console.log(2) }',
        'if (!(-+!!dog)) { console.log(2) }',
    );

    test(
        'if (!(-+!!dog)) { console.log(2) }',
        'if (-+!!dog) { console.log(2) }',
    );

    test(
        'if (-  +  !!dog) { console.log(2) }',
        'if (!(-  +  !!dog)) { console.log(2) }',
    );

    test(
        'if (!(-  +  !!dog)) { console.log(2) }',
        'if (-  +  !!dog) { console.log(2) }',
    );

    test(
        'if (!(-  +  !!dog - !!cat + - + - (dog && !!cat))) { console.log(2) }',
        'if (-  +  !!dog - !!cat + - + - (dog && !!cat)) { console.log(2) }',
    );

    test(
        'if (false) { console.log(1) }',
        'if (true) { console.log(1) }'
    );

    test(
        'if (0) { console.log(1) }',
        'if (1) { console.log(1) }'
    );

    test(
        'if (0123123) { console.log(1) }',
        'if (!0123123) { console.log(1) }'
    );

    test(
        'if (0123123 && 0123123) { console.log(1) }',
        'if (!0123123 || !0123123) { console.log(1) }'
    );

    test(
        'if (0123123 + 123213123) { console.log(1) }',
        'if (!(0123123 + 123213123)) { console.log(1) }'
    );

    test(
        'if (1) { console.log(1) }',
        'if (0) { console.log(1) }'
    );

    test(
        'if (0.0) { console.log(1) }',
        'if (!0.0) { console.log(1) }'
    );

    test(
        'if (1_1) { console.log(1) }',
        'if (!1_1) { console.log(1) }'
    );

    test(
        'if (0.0 + 2) { console.log(1) }',
        'if (!(0.0 + 2)) { console.log(1) }'
    );

    test(
        'if (true) { console.log(1) }',
        'if (false) { console.log(1) }'
    );

    test(
        'if (  !!  false  ) { console.log(1) }',
        'if (  !(!!  false)  ) { console.log(1) }'
    );

    test(
        'if (!(!!  false)) { console.log(1) }',
        'if (!!  false) { console.log(1) }'
    );
    
    test(
        'if (false && true) { console.log(1) }',
        'if (true || false) { console.log(1) }'
    );

    test(
        'if (!(false && true)) { console.log(1) }',
        'if (false && true) { console.log(1) }'
    );

    test(
        'if (false   &&   true) { console.log(1) }',
        'if (true   ||   false) { console.log(1) }'
    );

    test(
        'if (!(false && true)) { console.log(1) }',
        'if (false && true) { console.log(1) }'
    );

    test(
        'if (!(  false   &&   true  )) { console.log(1) }',
        'if (  false   &&   true  ) { console.log(1) }'
    );

    test(
        'if (false + dog && true + cat) { console.log(1) }',
        'if (!(false + dog) || !(true + cat)) { console.log(1) }'
    );

    test(
        'if (!(false + dog) || !(true + cat)) { console.log(1) }',
        'if (false + dog && true + cat) { console.log(1) }'
    );

    test(
        'if (!(false   && true  ) &&   true) { console.log(1) }',
        'if (false   && true   ||   false) { console.log(1) }'
    );

    test(
        'if (  true   ||   false   &&   true  ) { console.log(1) }',
        'if (  false   &&   true   ||   false  ) { console.log(1) }'
    );

    test(
        'if ((1) + 12) { console.log(1) }',
        'if (!((1) + 12)) { console.log(1) }',
    );

    test(
        'if ((1) + (12)) { console.log(1) }',
        'if (!((1) + (12))) { console.log(1) }',
    );

    test(
        'if (( ( 1 ) ) + ( ( 12 ) )) { console.log(1) }',
        'if (!(( ( 1 ) ) + ( ( 12 ) ))) { console.log(1) }',
    );

    test(
        'if ((1 - 1) + (12 + 0)) { console.log(1) }',
        'if (!((1 - 1) + (12 + 0))) { console.log(1) }',
    );

    test(
        'if (!((1 - 1) + (12 + 0))) { console.log(1) }',
        'if ((1 - 1) + (12 + 0)) { console.log(1) }',
    );

    test(
        'if ((1 && 4) + (12 || 4)) { console.log(1) }',
        'if (!((1 && 4) + (12 || 4))) { console.log(1) }',
    );

    test(
        'if ((1) + ((2 + 5)) + 12) { console.log(1) }',
        'if (!((1) + ((2 + 5)) + 12)) { console.log(1) }',
    );

    test(
        'if (!((1) + ((2 + 5)) + 12)) { console.log(1) }',
        'if ((1) + ((2 + 5)) + 12) { console.log(1) }',
    );

    test(
        'if ((2 < 5) && (4 > 2)) { console.log(1) }',
        'if ((2 >= 5) || (4 <= 2)) { console.log(1) }',
    );

    test(
        'if ((2 >= 5) || (4 <= 2)) { console.log(1) }',
        'if ((2 < 5) && (4 > 2)) { console.log(1) }',
    );

    test(
        `if ('mouse' && cat) { console.log(2) }`,
        `if (!'mouse' || !cat) { console.log(2) }`,
    );

    test(
        `if ('false' && cat) { console.log(2) }`,
        `if (!'false' || !cat) { console.log(2) }`,
    );

    test(
        `if ('false && cat' && cat) { console.log(2) }`,
        `if (!'false && cat' || !cat) { console.log(2) }`,
    );

    test(
        'if (`false && cat` && cat) { console.log(2) }',
        'if (!`false && cat` || !cat) { console.log(2) }',
    );

    test(
        'if ("false && cat" && cat) { console.log(2) }',
        'if (!"false && cat" || !cat) { console.log(2) }',
    );

    test(
        'if ("false && `cat`" && `"cat"`) { console.log(2) }',
        'if (!"false && `cat`" || !`"cat"`) { console.log(2) }',
    );

    test(
        'if (!"false && `cat`" || !`"cat"`) { console.log(2) }',
        'if ("false && `cat`" && `"cat"`) { console.log(2) }',
    );

    test(
        'if ("1" + 2 && cat) { console.log(2) }',
        'if (!("1" + 2) || !cat) { console.log(2) }',
    );

    test(
        'if (!("1" + 2) || !("1" + 2)) { console.log(2) }',
        'if ("1" + 2 && "1" + 2) { console.log(2) }',
    );

    test(
        `if ('if (!("1" + 2) || !("1" + 2)) { console.log(2) }' && cat) { console.log(2) }`,
        `if (!'if (!("1" + 2) || !("1" + 2)) { console.log(2) }' || !cat) { console.log(2) }`,
    );

    test(
        `if (!'if (!("1" + 2) || !("1" + 2)) { console.log(2) }' || !cat) { console.log(2) }`,
        `if ('if (!("1" + 2) || !("1" + 2)) { console.log(2) }' && cat) { console.log(2) }`,
    );
}
