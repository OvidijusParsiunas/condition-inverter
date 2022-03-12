// retrieve outer conditions in an if statement so that only they would need to be changed
// invert outer conditions accordingly

function dealWithStandaloneStatements(logicalOperatorFound, isMultipleStatements, needBrackets, conditionIndexes, indexOfNewStatement, i) {
    if (!logicalOperatorFound) {
        conditionIndexes.push({ start: indexOfNewStatement, end: i - 1});
    }
    if (isMultipleStatements && needBrackets) {
        conditionIndexes.push({ brackets: true, start: indexOfNewStatement, end: i });
    }
}

function identifyConditions(tokens, ifStatementlocationsInTokens, firstIfStatementCloseBracketIndex) {
    const conditionIndexes = [];
    let logicalOperatorFound = false;
    let indexOfNewStatement = ifStatementlocationsInTokens + 2;
    let isMultipleStatements = false;
    let needBrackets = true;
    for (let i = ifStatementlocationsInTokens + 2; i < firstIfStatementCloseBracketIndex; i += 1) {
        if (tokens[i] === '&' || tokens[i] === '|') {
            if (tokens[i + 1] === '&' || tokens[i + 1] === '|') {
                dealWithStandaloneStatements(logicalOperatorFound, isMultipleStatements, needBrackets, conditionIndexes, indexOfNewStatement, i);
                conditionIndexes.push({ start: i});
                indexOfNewStatement = i + 2;
                logicalOperatorFound = false;
                isMultipleStatements = false;
                needBrackets = true;
                i += 1;
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
            isMultipleStatements = true;
        } else if (tokens[i] === '(') {
            needBrackets = false;
        }
    }
    dealWithStandaloneStatements(logicalOperatorFound, isMultipleStatements, needBrackets, conditionIndexes, indexOfNewStatement, firstIfStatementCloseBracketIndex);
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

function getIndexOfLastBracketOfIfStatement(tokens, firstIndex, openBrackets = 0) {
    if (tokens[firstIndex + 1] === '(') {
        return getIndexOfLastBracketOfIfStatement(tokens, firstIndex + 1, openBrackets + 1);
    }
    if (tokens[firstIndex + 1] === ')') {
        if (openBrackets === 0) {
            return firstIndex + 1;
        }
        return getIndexOfLastBracketOfIfStatement(tokens, firstIndex + 1, openBrackets - 1);
    }
    return getIndexOfLastBracketOfIfStatement(tokens, firstIndex + 1, openBrackets);
}

function retrieveIfIndexes(tokens) {
    const ifStatementIndexes = [];
    const startIndexes = tokens.map((e, i) => e === 'if' ? i : '').filter(String);
    startIndexes.forEach((startIndex) => {
        const endIndex = getIndexOfLastBracketOfIfStatement(tokens, startIndex + 1);
        ifStatementIndexes.push({ start: startIndex, end: endIndex });
    })
    return ifStatementIndexes;
}

function tokenize(functionString) {
    const tokens = functionString.replace(/[^\w\s]|_/g, function ($1) { return ' ' + $1 + ' ';}).replace(/[ ]+/g, ' ').split(' ');
    tokens.pop();
    return tokens;
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
        'if ((hello) === (2) && start || number < 2 && hello && end) { console.log(2) }',
        'if((hello)!==(2)||!start&&number>=2||!hello||!end){console.log(2)}',
    );

    test(
        'if ((hello) !== (2) && start || number != 2 && hello && end) { console.log(2) }',
        'if((hello)===(2)||!start&&number==2||!hello||!end){console.log(2)}',
    );

    test(
        'if ((hello) !== (2) && !start || number != 2 && hello && end) { console.log(2) }',
        'if((hello)===(2)||start&&number==2||!hello||!end){console.log(2)}',
    );

    test(
        'if (dog && cat) { console.log(2) }',
        'if(!dog||!cat){console.log(2)}',
    );

    test(
        'if (dog && cat || mouse) { console.log(2) }',
        'if(!dog||!cat&&!mouse){console.log(2)}',
    );

    test(
        'if (dog - cat || mouse) { console.log(2) }',
        'if(!(dog-cat)&&!mouse){console.log(2)}',
    );

    test(
        'if (mouse || dog - cat) { console.log(2) }',
        'if(!mouse&&!(dog-cat)){console.log(2)}',
    );

    test(
        'if (mouse < cat) { console.log(2) }',
        'if(mouse>=cat){console.log(2)}',
    );

    test(
        'if (mouse <= cat) { console.log(2) }',
        'if(mouse>cat){console.log(2)}',
    );

    test(
        'if (mouse <= cat || hello) { console.log(2) }',
        'if(mouse>cat&&!hello){console.log(2)}',
    );

    test(
        'if (hello || mouse <= cat) { console.log(2) }',
        'if(!hello&&mouse>cat){console.log(2)}',
    );
}

runTests();