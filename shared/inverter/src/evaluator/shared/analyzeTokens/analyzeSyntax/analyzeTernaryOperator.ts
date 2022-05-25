import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { FirstFoundToken } from '../../../../shared/types/firstFoundToken';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeTernaryOperator {
  private static readonly ternaryOperatorEndingTokens = [';', '\n', '\r'];

  private static findColonExpressionEndingIndex(colonExpressionTokens: Tokens, colonIndex: number): FirstFoundToken {
    return TraversalUtil.findFirstTokenFromSelection(colonExpressionTokens, colonIndex + 1, AnalyzeTernaryOperator.ternaryOperatorEndingTokens);
  }

  // the end of colon expression here is determined by the ternaryOperatorEndingTokens symbols. JavaScript can end it without ';'
  // and can have an expression past the colon that can freely span multiple lines - making it difficult to identify when does it end.
  // In order not to have to check if a token is a reserver JavaScript keyword, the colon end is determined by ternaryOperatorEndingTokens
  // prettier-ignore
  private static getColonEndViaSpecificTokenIndex(
      colonExpressionTokens: Tokens, colonIndex: number, questionMarkIndex: number, evaluationState: EvaluationState): number {
    const colonEndToken = AnalyzeTernaryOperator.findColonExpressionEndingIndex(colonExpressionTokens, colonIndex);
    if (colonEndToken.token !== null) {
      return colonEndToken.index + questionMarkIndex;
    }
    return evaluationState.conditionSequenceEndIndex;
  }

  private static getColonEndViaCloseBracketIndex(colonExpressionTokens: Tokens, questionMarkIndex: number): number {
    const closingBracketIndex = TraversalUtil.getIndexOfClosingBracket(colonExpressionTokens, 0, 1);
    // WORK - not sure if this is needed
    // const colonEndToken = AnalyzeQuestionMark.findColonExpressionEndingIndex(colonExpressionTokens, colonIndex);
    // if (colonEndToken.firstToken !== null) {
    //   return (colonEndToken.index < closingBracketIndex ? colonEndToken.index : closingBracketIndex) + questionMarkIndex;
    // }
    // - 1 in order for analysis to pick it up and numberOfBracketsOpen -= 1 to action
    return closingBracketIndex + questionMarkIndex - 1;
  }

  private static movePastColonExpression(tokens: Tokens, questionMarkIndex: number, colonIndex: number, evaluationState: EvaluationState): number {
    const colonExpressionTokens = tokens.slice(questionMarkIndex, evaluationState.conditionSequenceEndIndex);
    // WORK - check if this is valid for outside statement condition
    if (evaluationState.numberOfBracketsOpen > 0) {
      return AnalyzeTernaryOperator.getColonEndViaCloseBracketIndex(colonExpressionTokens, questionMarkIndex);
    }
    return AnalyzeTernaryOperator.getColonEndViaSpecificTokenIndex(colonExpressionTokens, colonIndex, questionMarkIndex, evaluationState);
  }

  public static movePastTernaryOperator(tokens: Tokens, questionMarkIndex: number, evaluationState: EvaluationState): number {
    const colonIndex = TraversalUtil.getIndexOfCurrentTernaryColon(tokens, questionMarkIndex, 1);
    if (colonIndex > -1) {
      return AnalyzeTernaryOperator.movePastColonExpression(tokens, questionMarkIndex, colonIndex, evaluationState);
    }
    return tokens.length;
  }
}
