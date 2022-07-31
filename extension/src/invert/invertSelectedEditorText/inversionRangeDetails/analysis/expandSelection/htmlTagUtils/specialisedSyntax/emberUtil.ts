import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class EmberUtil {
  public static isCloseClause(tokens: Tokens, index: number): boolean {
    if (tokens[index] === '}') {
      const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index - 1, false);
      if (tokens[previousTokenIndex] === '}') return true;
      const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index + 1);
      return tokens[nextTokenIndex] === '}';
    }
    return false;
  }
}
