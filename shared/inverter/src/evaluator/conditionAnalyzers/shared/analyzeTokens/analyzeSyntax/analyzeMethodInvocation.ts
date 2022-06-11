import { TraversalUtil } from '../../../../../shared/functionality/traversalUtil';
import { Tokens } from '../../../../../shared/types/tokens';

export class AnalyzeMethodInvocation {
  public static updateState(tokens: Tokens, index: number): number {
    const nextToken = tokens[index + 1];
    if (nextToken === '(') {
      const indexOfClosingBracket = TraversalUtil.getIndexOfClosingBracket(tokens, index);
      return indexOfClosingBracket > -1 ? indexOfClosingBracket : tokens.length - 1;
    }
    return index;
  }
}
