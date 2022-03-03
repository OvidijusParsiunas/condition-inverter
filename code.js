// sample string
const str = 'if ((hello) === (2) && hey) { console.log(2) }';

// tokenise words and symbols
const tokens = str.replace(/[^\w\s]|_/g, function ($1) { return ' ' + $1 + ' ';}).replace(/[ ]+/g, ' ').split(' ');

// remove last index as it appears to always be an empty string
tokens.pop();

// retrieve index locations of 'if' substrings
const ifStatementlocationsInTokens = tokens.map((e, i) => e === 'if' ? i : '').filter(String)

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

const firstIfStatementCloseBracketIndex = getIndexOfLastBracketOfIfStatement(tokens, ifStatementlocationsInTokens[0] + 1);

// retrieve outer conditions in an if statement so that only they would need to be changed
// invert outer conditions accordingly



let haveSign = true;
let passedAnd = false;
for (let i = ifStatementlocationsInTokens[0] + 2; i < firstIfStatementCloseBracketIndex; i += 1) {
    if (tokens[i] === '=') {
        if (tokens[i + 1] === '=') {
            tokens[i] = '!';
            if (tokens[i + 2] === '=') {
                i += 2;
            } else {
                i += 1;
            }
            haveSign = false;
            continue;
        }
    }
    // split up where condition starts and confition ends
}

console.log(tokens.join(''));
