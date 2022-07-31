import { TraversalUtil } from '../../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../../shared/types/evaluationState';
import { Tokens } from '../../../../../shared/types/tokens';
import { AnalyzeEqualsSign } from './analyzeEqualsSign';

export class AnalyzeExclamationMark {
  private static updateStateForExclamationWithBracket(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    // -1 can be returned for partial conditions where tokens end without a close bracket, in such scenarios move to the last token e.g:
    // dog && cat && !( - will be inverted to - dog && cat && ( without the bracket removal as there is no token for the close bracket
    const closeBracketIndex = TraversalUtil.getIndexOfClosingBracket(tokens, index, 0);
    if (closeBracketIndex > -1) {
      evaluationState.shouldBracketsBeRemoved = true;
      return closeBracketIndex;
    }
    return tokens.length - 2;
  }

  private static findLastExclamationMarkIndex(tokens: Tokens, index: number): number {
    const nextNonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index + 1);
    // a direct plus or minus after exclamation mark are regarded as part of the condition
    if (tokens[nextNonSpaceTokenIndex] === '!' || tokens[nextNonSpaceTokenIndex] === '+' || tokens[nextNonSpaceTokenIndex] === '-') {
      return AnalyzeExclamationMark.findLastExclamationMarkIndex(tokens, nextNonSpaceTokenIndex);
    }
    return index;
  }

  private static getConditionEndIndex(tokens: Tokens, index: number): number {
    const lastExclamationMarkIndex = AnalyzeExclamationMark.findLastExclamationMarkIndex(tokens, index + 1);
    const nextNonSpaceCharIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, lastExclamationMarkIndex + 1);
    if (tokens[nextNonSpaceCharIndex] === '(') {
      return TraversalUtil.getIndexOfClosingBracket(tokens, lastExclamationMarkIndex, 0);
    }
    return lastExclamationMarkIndex;
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextNonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index + 1);
    if (tokens[nextNonSpaceTokenIndex] === '!') {
      // called for - !!..., // !!!!!... // !!!+!-!... // !!!!(...
      // if there are multiple exclamation marks, wrap the condition inside brackets with an exclamation mark
      evaluationState.isOperationWrappableInBrackets = true;
      return AnalyzeExclamationMark.getConditionEndIndex(tokens, index);
    } else if (evaluationState.numberOfBracketsOpen === 0) {
      if (tokens[nextNonSpaceTokenIndex] === '(') {
        // called for - !(...
        return AnalyzeExclamationMark.updateStateForExclamationWithBracket(tokens, index, evaluationState);
      }
      if (tokens[nextNonSpaceTokenIndex] === '=') {
        // called for - !=...
        return AnalyzeEqualsSign.updateState(tokens, index, evaluationState);
      }
    }
    return index;
  }
}
