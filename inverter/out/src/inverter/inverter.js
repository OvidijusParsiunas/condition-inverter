"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inverter = void 0;
const invertGreaterOrLessThanSign_1 = require("./invert/invertGreaterOrLessThanSign");
const invertLogicalOperator_1 = require("./invert/invertLogicalOperator");
const invertBooleanLiteral_1 = require("./invert/invertBooleanLiteral");
const invertNegatedSyntax_1 = require("./invert/invertNegatedSyntax");
const insertNewSyntax_1 = require("./insert/insertNewSyntax");
const insertBrackets_1 = require("./insert/insertBrackets");
class Inverter {
    static invert(tokens, tokenIndex, tokenIndexDelta, syntaxToBeInverted, entryIndex) {
        const syntaxToBeInvertedEntry = syntaxToBeInverted[entryIndex];
        switch (tokens[tokenIndex]) {
            case '=':
                tokens[tokenIndex] = '!';
                break;
            case '<':
            case '>':
                tokenIndexDelta = invertGreaterOrLessThanSign_1.InvertGreaterOrLessThanSign.invert(tokens, tokenIndex, tokenIndexDelta, syntaxToBeInvertedEntry);
                break;
            case '&':
            case '|':
                invertLogicalOperator_1.InvertLogicalOperator.invertSymbol(tokens, tokenIndex);
                break;
            case 'and':
            case 'or':
                invertLogicalOperator_1.InvertLogicalOperator.invertKeyword(tokens, tokenIndex);
                break;
            case '!':
                tokenIndexDelta = invertNegatedSyntax_1.InvertNegatedSyntax.invert(tokens, tokenIndex, tokenIndexDelta, syntaxToBeInverted, entryIndex);
                break;
            case 'true':
            case 'false':
            case '0':
            case '1':
                tokenIndexDelta = invertBooleanLiteral_1.InvertBooleanLiteral.invert(tokens, tokenIndex, syntaxToBeInvertedEntry, tokenIndexDelta);
                break;
            default: {
                tokenIndexDelta += insertNewSyntax_1.InsertNewSyntax.insert(tokens, tokenIndex, '!');
            }
        }
        return tokenIndexDelta;
    }
    static invertIfStatements(tokens, syntaxToBeInverted) {
        let tokenIndexDelta = 0;
        syntaxToBeInverted.forEach((syntaxToBeInvertedEntry, entryIndex) => {
            const relativeTokenIndex = syntaxToBeInvertedEntry.start + tokenIndexDelta;
            if (insertBrackets_1.InsertBrackets.isInsertNewBrackets(syntaxToBeInvertedEntry)) {
                tokenIndexDelta = insertBrackets_1.InsertBrackets.insert(tokens, relativeTokenIndex, syntaxToBeInvertedEntry.end, tokenIndexDelta);
            }
            else {
                tokenIndexDelta = Inverter.invert(tokens, relativeTokenIndex, tokenIndexDelta, syntaxToBeInverted, entryIndex);
            }
        });
    }
}
exports.Inverter = Inverter;
//# sourceMappingURL=inverter.js.map