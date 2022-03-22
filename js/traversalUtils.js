module.exports = class TraversalUtils {
    static findNonSpaceCharacterIndexStartingFromIndex(tokens, index, forwards = true) {
        if (index === 0) {
            return 0;
        }
        if (tokens[index] !== ' ') {
            return index;
        }
        const newIndex = forwards ? index + 1 : index - 1;
        return TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, newIndex, forwards);
    }
    
    static getWhenNumberStops(tokens, index) {
        if (index > tokens.length - 1) {
            console.log('attempt to retrieve when number declaration stops is out of bounds');
            return -1;
        }
        const nextCharacter = tokens[index];
        if (nextCharacter === ' ' || nextCharacter === ')' || nextCharacter === '&' || nextCharacter === '|') {
            return index;
        }
        return TraversalUtils.getWhenNumberStops(tokens, index + 1);
    }
    
    static findEndingStringQuoteIndex(tokens, index, typeOfQuoteString) {
        if (tokens[index] === typeOfQuoteString) {
            return index;
        }
        return TraversalUtils.findEndingStringQuoteIndex(tokens, index + 1, typeOfQuoteString);
    }
    
    static findLastExclamationMarkIndex(tokens, index) {
        const nextCharacterTokenIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
        if (tokens[nextCharacterTokenIndex] === '!') {
            return TraversalUtils.findLastExclamationMarkIndex(tokens, nextCharacterTokenIndex);
        }
        if (tokens[nextCharacterTokenIndex] === '+' || tokens[nextCharacterTokenIndex] === '-') {
            return TraversalUtils.findLastExclamationMarkIndex(tokens, nextCharacterTokenIndex);
        }
        return index;
    }
    
    static getIndexOfLastBracketOfIfStatement(tokens, index, openBrackets = 0) {
        if (index > tokens.length - 1) {
            console.log('index out of bounds');
            return -1;
        }
        if (tokens[index + 1] === '(') {
            return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets + 1);
        }
        if (tokens[index + 1] === ')') {
            if (openBrackets === 1) {
                return index + 1;
            }
            return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets - 1);
        }
        return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index + 1, openBrackets);
    }
}
