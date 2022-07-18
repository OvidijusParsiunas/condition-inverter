import { SyntaxToBeInverted, GreaterOrLessThanHasFollowUpEquals } from '../../shared/types/evaluationState';
import { LOGICAL_OPERATOR_PART_JSON } from '../../shared/consts/specialTokens';
import { TraversalUtil } from '../../shared/functionality/traversalUtil';
import { InsertNewSyntax } from '../insert/insertNewSyntax';
import { Tokens } from '../../shared/types/tokens';

export class InvertGreaterOrLessThanSign {
  private static isGreaterOrLessThanHasFollowUpEquals(
    invertableSyntaxEntry: SyntaxToBeInverted,
  ): invertableSyntaxEntry is GreaterOrLessThanHasFollowUpEquals {
    return (invertableSyntaxEntry as GreaterOrLessThanHasFollowUpEquals).greaterOrLessThanHasFollowUpEquals;
  }

  private static removeEqualsSign(tokens: Tokens, tokenIndex: number): void {
    tokens.splice(tokenIndex + 1, 1);
  }

  private static updateStateIfHTMLTag(tokens: Tokens, tokenIndex: number, tokenIndexDelta: number): number {
    const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, tokenIndex - 1, false);
    if (LOGICAL_OPERATOR_PART_JSON[tokens[previousTokenIndex] as keyof typeof previousTokenIndex]) {
      return (tokenIndexDelta += InsertNewSyntax.insert(tokens, tokenIndex, '!'));
    }
    return -1;
  }

  public static invert(tokens: Tokens, tokenIndex: number, tokenIndexDelta: number, syntaxToBeInverted: SyntaxToBeInverted): number {
    const htmlTagUpdateIndex = InvertGreaterOrLessThanSign.updateStateIfHTMLTag(tokens, tokenIndex, tokenIndexDelta);
    if (htmlTagUpdateIndex > -1) return htmlTagUpdateIndex;
    tokens[tokenIndex] = tokens[tokenIndex] === '>' ? '<' : '>';
    if (InvertGreaterOrLessThanSign.isGreaterOrLessThanHasFollowUpEquals(syntaxToBeInverted)) {
      InvertGreaterOrLessThanSign.removeEqualsSign(tokens, tokenIndex);
      tokenIndexDelta -= 1;
    } else {
      tokenIndexDelta += InsertNewSyntax.insert(tokens, tokenIndex + 1, '=');
    }
    return tokenIndexDelta;
  }
}
