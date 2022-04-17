import { InvertGreaterOrLessThanSign } from './invertGreaterOrLessThanSign';
import { SyntaxToBeInverted } from '../shared/types/evaluationState';
import { InvertLogicalOperator } from './invertLogicalOperator';
import { InvertBooleanLiteral } from './invertBooleanLiteral';
import { InvertNegatedSyntax } from './invertNegatedSyntax';
import { InsertNewSyntax } from './insertNewSyntax';
import { InsertBrackets } from './insertBrackets';
import { Tokens } from '../shared/types/tokens';

export class Inverter {
  private static invert(
    tokens: Tokens,
    tokenIndex: number,
    tokenIndexDelta: number,
    syntaxToBeInverted: SyntaxToBeInverted[],
    entryIndex: number,
  ): number {
    const syntaxToBeInvertedEntry = syntaxToBeInverted[entryIndex];
    switch (tokens[tokenIndex]) {
      case '=':
        tokens[tokenIndex] = '!';
        break;
      case '<':
      case '>':
        tokenIndexDelta = InvertGreaterOrLessThanSign.invert(tokens, tokenIndex, tokenIndexDelta, syntaxToBeInvertedEntry);
        break;
      case '&':
      case '|':
        InvertLogicalOperator.invert(tokens, tokenIndex);
        break;
      case '!':
        tokenIndexDelta = InvertNegatedSyntax.invert(tokens, tokenIndex, tokenIndexDelta, syntaxToBeInverted, entryIndex);
        break;
      case 'true':
      case 'false':
      case '0':
      case '1':
        tokenIndexDelta = InvertBooleanLiteral.invert(tokens, tokenIndex, syntaxToBeInvertedEntry, tokenIndexDelta);
        break;
      default: {
        tokenIndexDelta += InsertNewSyntax.insert(tokens, tokenIndex, '!');
      }
    }
    return tokenIndexDelta;
  }

  public static invertIfStatements(tokens: Tokens, syntaxToBeInverted: SyntaxToBeInverted[]): void {
    let tokenIndexDelta = 0;
    syntaxToBeInverted.forEach((syntaxToBeInvertedEntry, entryIndex) => {
      const relativeTokenIndex = syntaxToBeInvertedEntry.start + tokenIndexDelta;
      if (InsertBrackets.isInsertNewBrackets(syntaxToBeInvertedEntry)) {
        tokenIndexDelta = InsertBrackets.insert(tokens, relativeTokenIndex, syntaxToBeInvertedEntry.end, tokenIndexDelta);
      } else {
        tokenIndexDelta = Inverter.invert(tokens, relativeTokenIndex, tokenIndexDelta, syntaxToBeInverted, entryIndex);
      }
    });
  }
}
