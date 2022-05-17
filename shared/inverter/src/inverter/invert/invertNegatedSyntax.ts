import { RemoveNegationBrackets, SyntaxToBeInverted } from '../../shared/types/evaluationState';
import { TraversalUtil } from '../../shared/functionality/traversalUtil';
import { InsertNewSyntax } from '../insert/insertNewSyntax';
import { InsertBrackets } from '../insert/insertBrackets';
import { Tokens } from '../../shared/types/tokens';

export class InvertNegatedSyntax {
  private static removeBrackets(
    tokens: Tokens,
    tokenIndex: number,
    tokenIndexDelta: number,
    syntaxToBeInvertedEntry: RemoveNegationBrackets,
  ): number {
    const startIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, tokenIndex);
    tokens.splice(startIndex, 1);
    tokenIndexDelta -= 1;
    tokens.splice(syntaxToBeInvertedEntry.removeNegatedBrackets.end + tokenIndexDelta, 1);
    tokenIndexDelta -= 1;
    return tokenIndexDelta;
  }

  private static isRemoveNegationBrackets(invertableSyntaxEntry: SyntaxToBeInverted): invertableSyntaxEntry is RemoveNegationBrackets {
    return !!(invertableSyntaxEntry as RemoveNegationBrackets).removeNegatedBrackets;
  }

  private static removeExclamationMark(tokens: Tokens, tokenIndex: number, tokenIndexDelta: number): number {
    tokens.splice(tokenIndex, 1);
    return tokenIndexDelta - 1;
  }

  private static removeNegation(tokens: Tokens, tokenIndex: number, tokenIndexDelta: number, syntaxToBeInvertedEntry: SyntaxToBeInverted): number {
    tokenIndexDelta = InvertNegatedSyntax.removeExclamationMark(tokens, tokenIndex, tokenIndexDelta);
    // REF - 1889
    if (InvertNegatedSyntax.isRemoveNegationBrackets(syntaxToBeInvertedEntry)) {
      tokenIndexDelta = InvertNegatedSyntax.removeBrackets(tokens, tokenIndex, tokenIndexDelta, syntaxToBeInvertedEntry);
    }
    return tokenIndexDelta;
  }

  private static replaceExclamationWithEquals(tokens: Tokens, tokenIndex: number): void {
    tokens[tokenIndex] = '=';
  }

  public static invert(
    tokens: Tokens,
    tokenIndex: number,
    tokenIndexDelta: number,
    syntaxToBeInverted: SyntaxToBeInverted[],
    entryIndex: number,
  ): number {
    if (tokens[tokenIndex + 1] === '=') {
      InvertNegatedSyntax.replaceExclamationWithEquals(tokens, tokenIndex);
    } else if (InsertBrackets.isInsertNewBrackets(syntaxToBeInverted[entryIndex + 1])) {
      tokenIndexDelta += InsertNewSyntax.insert(tokens, tokenIndex, '!');
    } else {
      tokenIndexDelta = InvertNegatedSyntax.removeNegation(tokens, tokenIndex, tokenIndexDelta, syntaxToBeInverted[entryIndex]);
    }
    return tokenIndexDelta;
  }
}
