import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeMethodInvocation {
  public static updateState(tokens: Tokens, index: number): number {
    const nextToken = tokens[index + 1];
    if (nextToken === '(') {
      return TraversalUtil.getIndexOfLastBracketOfStatement(tokens, index);
    }
    return index;
  }
}
