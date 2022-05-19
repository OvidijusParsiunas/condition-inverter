import { TraversalUtil } from '../../shared/functionality/traversalUtil';
import { InsertNewSyntax } from '../insert/insertNewSyntax';
import { Tokens } from '../../shared/types/tokens';

export class InvertIdentityOrMembershipOperator {
  private static readonly numberOfRemovableSpaces = 2;

  // dog is cat  or  dog is not cat
  public static invertIdentity(tokens: Tokens, tokenIndex: number, tokenIndexDelta: number): number {
    const siblingTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, tokenIndex + 1);
    const siblingToken = tokens[siblingTokenIndex];
    if (siblingToken === 'not') {
      tokens.splice(siblingTokenIndex - 1, InvertIdentityOrMembershipOperator.numberOfRemovableSpaces);
      return tokenIndexDelta - InvertIdentityOrMembershipOperator.numberOfRemovableSpaces;
    }
    return tokenIndexDelta + InsertNewSyntax.insert(tokens, tokenIndex + 1, ' ', 'not');
  }

  // dog in cat  or  dog not in cat
  public static invertMembership(tokens: Tokens, tokenIndex: number, tokenIndexDelta: number): number {
    const siblingTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, tokenIndex - 1, false);
    if (tokens[siblingTokenIndex] === 'not') {
      tokens.splice(siblingTokenIndex, InvertIdentityOrMembershipOperator.numberOfRemovableSpaces);
      return tokenIndexDelta - InvertIdentityOrMembershipOperator.numberOfRemovableSpaces;
    }
    return tokenIndexDelta + InsertNewSyntax.insert(tokens, tokenIndex, 'not', ' ');
  }
}
