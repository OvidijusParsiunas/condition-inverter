function dealWithStandaloneStatements(logicalOperatorFound, isArithmeticOperation, needBrackets, conditionIndexes, indexOfNewStatement, endIndex) {
    if (!logicalOperatorFound) {
        conditionIndexes.push({ start: indexOfNewStatement });
    }
    if (isArithmeticOperation && needBrackets) {
        conditionIndexes.push({ brackets: true, start: indexOfNewStatement, end: endIndex });
    }
}

// bug with shift assignment - make sure that < is not follwoed by anither < and > not followed by another >

function identifyConditions(tokens, ifStatementlocationsInTokens, firstIfStatementCloseBracketIndex) {
    const conditionIndexes = [];
    let logicalOperatorFound = false;
    const initialSpaceDelta = tokens[ifStatementlocationsInTokens + 1] === ' ' ? 3 : 2; 
    const startingIndex = ifStatementlocationsInTokens + initialSpaceDelta;
    let indexOfNewStatement = startingIndex;
    let isArithmeticOperation = false;
    let needBrackets = true;
    let numberOfBracketsOpen = 0;
    for (let i = startingIndex; i < firstIfStatementCloseBracketIndex; i += 1) {
        if (tokens[i] === '&' || tokens[i] === '|') {
            if (tokens[i + 1] === '&' || tokens[i + 1] === '|') {
                if (numberOfBracketsOpen === 0) {
                    const endIndex = tokens[i - 1] === ' ' ? i - 1 : i;
                    dealWithStandaloneStatements(logicalOperatorFound, isArithmeticOperation, needBrackets, conditionIndexes, indexOfNewStatement, endIndex);
                    conditionIndexes.push({ start: i });
                    const spaceDelta = tokens[i + 2] === ' ' ? 3 : 2;
                    indexOfNewStatement = i + spaceDelta;
                    needBrackets = true;
                }
                if (numberOfBracketsOpen > 0 && logicalOperatorFound) conditionIndexes.pop();
                logicalOperatorFound = false;
                isArithmeticOperation = false;
                const spaceDelta = tokens[i + 2] === ' ' ? 2 : 1;
                i += spaceDelta;
            }
        } else if (tokens[i] === '<' || tokens[i] === '>') {
            logicalOperatorFound = true;
            if (tokens[i + 1] === '=') {
                conditionIndexes.push({ start: i, hasFollowupEquals: true });
                i += 1;
            } else {
                conditionIndexes.push({ start: i });
            }
        } else if (tokens[i] === '=' || tokens[i] === '!') {
            conditionIndexes.push({ start: i });
            logicalOperatorFound = true;
            if (tokens[i + 1] === '=') {
                if (tokens[i + 2] === '=') {
                    i += 2;
                } else {
                    i += 1;
                }
            }
        } else if (tokens[i] === '-' || tokens[i] === '+' || tokens[i] === '/' || tokens[i] === '*') {
            isArithmeticOperation = true;
        } else if (tokens[i] === '(') {
            needBrackets = false;
            numberOfBracketsOpen += 1;
        } else if (tokens[i] === ')') {
            numberOfBracketsOpen -= 1;
        }
    }
    if (numberOfBracketsOpen === 0) dealWithStandaloneStatements(logicalOperatorFound, isArithmeticOperation, needBrackets, conditionIndexes, indexOfNewStatement, firstIfStatementCloseBracketIndex);
    return conditionIndexes;
}

function invertIfStatements(tokens, conditionIndexes) {
    let newElementsDelta = 0;
    conditionIndexes.forEach(({ start, end, brackets, hasFollowupEquals }) => {
        const arrayIndex = start + newElementsDelta;
        if (brackets) {
            const endArrayIndex = end + newElementsDelta;
            tokens.splice(arrayIndex, 0, '(');
            tokens.splice(endArrayIndex + 1, 0, ')');
            newElementsDelta += 2;
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
                    } else {
                        tokens.splice(arrayIndex, 1);
                        newElementsDelta -= 1;
                    }
                    break;
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
        const endIndex = getIndexOfLastBracketOfIfStatement(tokens, startIndex );
        ifStatementIndexes.push({ start: startIndex, end: endIndex });
    })
    return ifStatementIndexes;
}

function tokenize(functionString) {
    const tokens1 = functionString.match(/(\w+)|(\s)|[^\w\s]/g);
    const tokens = functionString.replace(/(\w+)|(\s)|[^\w\s]/g, function ($1) { return ' ' + $1 + ' ';}).replace(/[ ]+/g, ' ').split(' ');
    tokens.pop();
    return tokens1;
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
        'if (dog - cat || mouse) { console.log(2) }',
        'if (!(dog - cat) && !mouse) { console.log(2) }',
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
        'if (((mouse <= cat) && ((mouse - cat))) || hello) { console.log(2) }',
        'if (!((mouse <= cat) && ((mouse - cat))) && !hello) { console.log(2) }',
    );

    test(
        'if (((mouse - cat) && ((mouse - cat))) || hello) { console.log(2) }',
        'if (!((mouse - cat) && ((mouse - cat))) && !hello) { console.log(2) }',
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

runTests();

function runExclusiveTests() {
    
}

runExclusiveTests();