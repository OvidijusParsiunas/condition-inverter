import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeFunction {
  public static updateStateForRegular(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    AnalyzeBrackatableSyntax.updateState(evaluationState);
    const openBracketIndex = TraversalUtil.findTokenIndex(tokens, index, '(');
    const closeBracketIndex = TraversalUtil.getIndexOfClosingBracket(tokens, openBracketIndex, 1);
    const openCurlyBracketIndex = TraversalUtil.findTokenIndex(tokens, closeBracketIndex + 1, '{');
    return TraversalUtil.getIndexOfClosingBrace(tokens, openCurlyBracketIndex, 1);
  }

  public static updateStateForArrow(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    AnalyzeBrackatableSyntax.updateState(evaluationState);
    const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index);
    if (tokens[nextTokenIndex] === '{') {
      return TraversalUtil.getIndexOfClosingBrace(tokens, nextTokenIndex, 1);
    } else if (tokens[nextTokenIndex] === '(') {
      return TraversalUtil.getIndexOfClosingBracket(tokens, nextTokenIndex, 1);
    }
    return index;
  }
}
