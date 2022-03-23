const TraversalUtils = require('./traversalUtils');

module.exports = class Inverter {
    static invertIfStatements(tokens, conditionIndexes) {
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
                                const startIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, arrayIndex);
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
}
