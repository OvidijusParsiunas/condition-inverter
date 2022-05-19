import { InvertIdentityOrMembershipOperator } from './invert/invertIdentityOrMembershipOperator';
import { InvertGreaterOrLessThanSign } from './invert/invertGreaterOrLessThanSign';
import { InvertLogicalOperator } from './invert/invertLogicalOperator';
import { SyntaxToBeInverted } from '../shared/types/evaluationState';
import { InvertBooleanLiteral } from './invert/invertBooleanLiteral';
import { InvertNegatedSyntax } from './invert/invertNegatedSyntax';
import { InsertNewSyntax } from './insert/insertNewSyntax';
import { InsertBrackets } from './insert/insertBrackets';
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
        InvertLogicalOperator.invertSymbol(tokens, tokenIndex);
        break;
      case 'and':
      case 'or':
        InvertLogicalOperator.invertKeyword(tokens, tokenIndex);
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
      case 'is':
        tokenIndexDelta = InvertIdentityOrMembershipOperator.invertIdentity(tokens, tokenIndex, tokenIndexDelta);
        break;
      case 'in':
        tokenIndexDelta = InvertIdentityOrMembershipOperator.invertMembership(tokens, tokenIndex, tokenIndexDelta);
        break;
      default: {
        tokenIndexDelta += InsertNewSyntax.insert(tokens, tokenIndex, '!');
      }
    }
    return tokenIndexDelta;
  }

  public static invertStatements(tokens: Tokens, syntaxToBeInverted: SyntaxToBeInverted[]): void {
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
