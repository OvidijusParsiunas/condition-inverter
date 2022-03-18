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

function dealWithStandaloneStatements(tokens, logicalOperatorFound, isOperationWrappableInBrackets, areBracketsAlreadyPresent, isOperationWrappableInBracketsForce, conditionIndexes, indexOfNewStatement, shouldBracketsBeRemoved, currentTokenIndex) {
    if (shouldBracketsBeRemoved) {
        const endIndex = getIndexOfLastBracketOfIfStatement(tokens, indexOfNewStatement - 1);
        conditionIndexes.push({ start: indexOfNewStatement, removeNegationBrackets: { start: indexOfNewStatement, end: endIndex } });
        return;
    }
    if (!logicalOperatorFound) {
        conditionIndexes.push({ start: indexOfNewStatement });
    }
    if (isOperationWrappableInBracketsForce || (isOperationWrappableInBrackets && !areBracketsAlreadyPresent)) {
        const endIndex = findNonSpaceCharacterIndexStartingFromIndex(tokens, currentTokenIndex - 1, false);
        conditionIndexes.push({ brackets: true, start: indexOfNewStatement, end: endIndex });
    }
}

function isCharacterArithmeticOperation(character) {
    return character === '-' || character === '+' || character === '/' || character === '*';
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
    // WORK - is this truly needed
    let shouldBracketsBeRemoved = false;
    // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
    let isOperationWrappableInBracketsForce = false;
    let areBracketsAlreadyPresent = false;
    let numberOfBracketsOpen = 0;
    for (let i = startingIndex; i < firstIfStatementCloseBracketIndex; i += 1) {
        if (tokens[i] === '&' || tokens[i] === '|') {
            if (tokens[i + 1] === '&' || tokens[i + 1] === '|') {
                const nextNonSpaceCharacter = findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 2);
                if (numberOfBracketsOpen === 0) {
                    // a look back to see if previous syntax defines a standalone statement
                    dealWithStandaloneStatements(tokens, logicalOperatorFound, isOperationWrappableInBrackets, areBracketsAlreadyPresent, isOperationWrappableInBracketsForce, conditionIndexes, indexOfNewStatement, shouldBracketsBeRemoved, i);
                    conditionIndexes.push({ start: i });
                    indexOfNewStatement = nextNonSpaceCharacter;
                    areBracketsAlreadyPresent = false;
                    isOperationWrappableInBrackets = false;
                    isOperationWrappableInBracketsForce = false;
                    shouldBracketsBeRemoved = false;
                }
                if (numberOfBracketsOpen > 0 && logicalOperatorFound) conditionIndexes.pop();
                logicalOperatorFound = false;
                // subtracting one due to the for loop automatically adding one
                i = (nextNonSpaceCharacter - 1);
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
            conditionIndexes.push({ start: i });
            logicalOperatorFound = true;
            if (tokens[i + 1] === '=') {
                if (tokens[i + 2] === '=') {
                    i += 2;
                } else {
                    i += 1;
                }
            }
        } else if (tokens[i] === '!') {
            if (tokens[i + 1] === '!') {
                // WORK - questionable is this is needed
                isOperationWrappableInBrackets = true;
                i += 1;
                if (tokens[i + 1] === '!') {
                    isOperationWrappableInBracketsForce = true;
                    i += 1;
                }
            } else {
                const nextCharacterTokenIndex = findNonSpaceCharacterIndexStartingFromIndex(tokens, i + 1);
                const potentialArithmeticSymbolIndex = findNonSpaceCharacterIndexStartingFromIndex(tokens, nextCharacterTokenIndex + 1);
                const isFollowedByArithmeticOperation = isCharacterArithmeticOperation(tokens[potentialArithmeticSymbolIndex]);
                const previousCharacterTokenIndex = findNonSpaceCharacterIndexStartingFromIndex(tokens, i - 1, false);
                const isPreviousTokenArithmeticOperation = isCharacterArithmeticOperation(tokens[previousCharacterTokenIndex]);
                if (numberOfBracketsOpen === 0 && ((!isFollowedByArithmeticOperation && !isPreviousTokenArithmeticOperation) || tokens[nextCharacterTokenIndex] === '=' || tokens[nextCharacterTokenIndex] === '(')) {
                    if (tokens[nextCharacterTokenIndex] === '(') {
                        shouldBracketsBeRemoved = true;
                    } else {
                        conditionIndexes.push({ start: i });
                    }
                    logicalOperatorFound = true;
                    if (tokens[i + 1] === '=') {
                        if (tokens[i + 2] === '=') {
                            i += 2;
                        } else {
                            i += 1;
                        }
                    }
                }
            }
        } else if (isCharacterArithmeticOperation(tokens[i])) {
            isOperationWrappableInBrackets = true;
        } else if (tokens[i] === '(') {
            areBracketsAlreadyPresent = true;
            numberOfBracketsOpen += 1;
        } else if (tokens[i] === ')') {
            numberOfBracketsOpen -= 1;
        }
    }
    if (numberOfBracketsOpen === 0) dealWithStandaloneStatements(tokens, logicalOperatorFound, isOperationWrappableInBrackets, areBracketsAlreadyPresent, isOperationWrappableInBracketsForce, conditionIndexes, indexOfNewStatement, shouldBracketsBeRemoved, firstIfStatementCloseBracketIndex);
    return conditionIndexes;
}

function invertIfStatements(tokens, conditionIndexes) {
    let newElementsDelta = 0;
    conditionIndexes.forEach(({ start, end, brackets, hasFollowupEquals, removeNegationBrackets }, conditionIndexesCurrentIndex) => {
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
    const startIndexes = tokens.map((e, i) => e === 'if' ? i : '').filter(String);
    startIndexes.forEach((startIndex) => {
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

// WORK - implement a little bit of intelligence for negating double bangs
// WORK - - and + are allowed
// WORK - compensate for extra spaces in-between

// WORK - implement a little bit of intelligence and convert 0 number to 1, false boolean to true and vice versa
runExclusiveTests();

runTests();

function runExclusiveTests() {
    test(
        'if (!!dog) { console.log(2) }',
        'if (!(!!dog)) { console.log(2) }',
    );

    test(
        'if (!(!!dog)) { console.log(2) }',
        'if (!!dog) { console.log(2) }',
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
        'if ((!!dog && !!dog + 2) && (!!dog && !!dog + 2)) { console.log(2) }',
        'if (!(!!dog && !!dog + 2) || !(!!dog && !!dog + 2)) { console.log(2) }',
    );
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
        '  if   (  dog   -  cat  ||   mouse  ) { console.log(2) }  ',
        '  if   (  !(dog   -  cat)  &&   !mouse  ) { console.log(2) }  ',
    );

    test(
        '  if   (   mouse  ||   dog   -  cat  ) { console.log(2) }  ',
        '  if   (   !mouse  &&   !(dog   -  cat)  ) { console.log(2) }  ',
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
}
