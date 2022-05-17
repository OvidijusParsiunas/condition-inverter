import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeFunction {
  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    AnalyzeBrackatableSyntax.updateState(evaluationState);
    const openBracketIndex = TraversalUtil.findNextTokenIndex(tokens, index, '(');
    const closeBracketIndex = TraversalUtil.getIndexOfClosingBracket(tokens, openBracketIndex, 1);
    const openCurlyBracketIndex = TraversalUtil.findNextTokenIndex(tokens, closeBracketIndex + 1, '{');
    return TraversalUtil.getIndexOfClosingBrace(tokens, openCurlyBracketIndex, 1);
  }
}
