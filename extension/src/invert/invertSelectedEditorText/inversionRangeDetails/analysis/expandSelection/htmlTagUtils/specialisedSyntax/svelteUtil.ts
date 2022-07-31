import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class SvelteUtil {
  public static isCloseClause(tokens: Tokens, index: number): boolean {
    if (tokens[index] === '}') {
      const openBraceIndex = TraversalUtil.getIndexOfOpenBrace(tokens, index - 1, 1);
      if (openBraceIndex > -1) {
        const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, openBraceIndex + 1);
        return tokens[nextTokenIndex] === '#' || tokens[nextTokenIndex] === ':';
      }
    }
    return false;
  }
}
