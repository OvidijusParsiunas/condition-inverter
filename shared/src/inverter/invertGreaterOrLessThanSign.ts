import { GreaterOrLessThanHasFollowUpEquals, SyntaxToBeInverted } from '../shared/types/evaluationState';
import { InsertNewSyntax } from './insertNewSyntax';
import { Tokens } from '../shared/types/tokens';

export class InvertGreaterOrLessThanSign {
  private static isGreaterOrLessThanHasFollowUpEquals(
    invertableSyntaxEntry: SyntaxToBeInverted,
  ): invertableSyntaxEntry is GreaterOrLessThanHasFollowUpEquals {
    return (invertableSyntaxEntry as GreaterOrLessThanHasFollowUpEquals).greaterOrLessThanHasFollowUpEquals;
  }

  private static removeEqualsSign(tokens: Tokens, tokenIndex: number): void {
    tokens.splice(tokenIndex + 1, 1);
  }

  public static invert(tokens: Tokens, tokenIndex: number, newElementsDelta: number, syntaxToBeInverted: SyntaxToBeInverted): number {
    tokens[tokenIndex] = tokens[tokenIndex] === '>' ? '<' : '>';
    if (InvertGreaterOrLessThanSign.isGreaterOrLessThanHasFollowUpEquals(syntaxToBeInverted)) {
      InvertGreaterOrLessThanSign.removeEqualsSign(tokens, tokenIndex);
      newElementsDelta -= 1;
    } else {
      newElementsDelta += InsertNewSyntax.insert(tokens, tokenIndex + 1, '=');
    }
    return newElementsDelta;
  }
}
