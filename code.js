// retrieve outer conditions in an if statement so that only they would need to be changed
// invert outer conditions accordingly

function identifyConditions(tokens, ifStatementlocationsInTokens, firstIfStatementCloseBracketIndex) {
    const conditionIndexes = [];
    let signFound = false;
    let indexOfNewStatement = 0;
    for (let i = ifStatementlocationsInTokens + 2; i < firstIfStatementCloseBracketIndex; i += 1) {
        if (tokens[i] === '&' || tokens[i] === '|') {
            if (tokens[i + 1] === '&' || tokens[i + 1] === '|') {
                if (!signFound) {
                    conditionIndexes.push({ start: indexOfNewStatement, end: i - 1});
                }
                indexOfNewStatement = i + 2;
                signFound = false;
            }
        } else if (tokens[i] === '=' || tokens[i] === '<' || tokens[i] === '>') {
            conditionIndexes.push({ start: i });
            signFound = true;
            if (tokens[i + 1] === '=') {
                if (tokens[i + 2] === '=') {
                    i += 2;
                } else {
                    i += 1;
                }
                continue;
            }
        }
    }
    if (!signFound) {
        conditionIndexes.push({ start: indexOfNewStatement, end: firstIfStatementCloseBracketIndex - 1});
    }
    return conditionIndexes;
}

function invertIfStatements(tokens, conditionIndexes) {
    let newElementsDelta = 0;
    conditionIndexes.forEach(({ start }) => {
        const arrayIndex = start + newElementsDelta;
        switch (tokens[arrayIndex]) {
            case '=':
                tokens[arrayIndex] = '!';
                break;
            case '<':
                tokens[arrayIndex] = '>';
                break;
            case '>':
                tokens[arrayIndex] = '<';
                break;
            default: {
                tokens.splice(arrayIndex, 0, '!');
                newElementsDelta += 1;
            }
        }
    })
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
        const conditions = identifyConditions(tokens, start, end);
        invertIfStatements(tokens, conditions);
    });
    return tokens.join('');
}

function test(input, expectedResult) {
    const result = runInvert(input);
    console.log(`input: ${input}, exected result: ${expectedResult}:`);
    console.log(`${result === expectedResult ? 'PASS' : 'FAIL'}`);
    if (result !== expectedResult) {
        console.log(`Result was: ${result}`);
    }
}

function runTests() {
    test(
        'if ((hello) === (2) && start || number < 2 && hello && end) { console.log(2) }',
        'if((hello)!==(2)&&!start||number>2&&!hello&&!end){console.log(2)}',
    )
}

runTests();