import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';
import { AnalyzeEqualsSign } from './analyzeEqualsSign';

export class AnalyzeExclamationMark {
  private static findLastExclamationMarkIndex(tokens: Tokens, index: number): number {
    const nextNonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, index + 1);
    // a direct plus or minus after exclamation mark are regarded as part of the condition
    if (tokens[nextNonSpaceTokenIndex] === '!' || tokens[nextNonSpaceTokenIndex] === '+' || tokens[nextNonSpaceTokenIndex] === '-') {
      return AnalyzeExclamationMark.findLastExclamationMarkIndex(tokens, nextNonSpaceTokenIndex);
    }
    return index;
  }

  private static getConditionEndIndex(tokens: Tokens, index: number): number {
    const lastExclamationMarkIndex = AnalyzeExclamationMark.findLastExclamationMarkIndex(tokens, index + 1);
    const nextNonSpaceCharIndex = TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, lastExclamationMarkIndex + 1);
    if (tokens[nextNonSpaceCharIndex] === '(') {
      return TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, lastExclamationMarkIndex);
    }
    return lastExclamationMarkIndex;
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextNonSpaceTokenIndex = TraversalUtil.getSiblingNonSpaceCharacterIndex(tokens, index + 1);
    if (tokens[nextNonSpaceTokenIndex] === '!') {
      // called for - !!..., // !!!!!... // !!!+!-!... // !!!!(...
      // if there are multiple exclamation marks, wrap the condition inside brackets with an exclamation mark
      evaluationState.isOperationWrappableInBrackets = true;
      return AnalyzeExclamationMark.getConditionEndIndex(tokens, index);
    } else if (evaluationState.numberOfBracketsOpen === 0) {
      if (tokens[nextNonSpaceTokenIndex] === '(') {
        // called for - !(...
        evaluationState.shouldBracketsBeRemoved = true;
        return TraversalUtil.getIndexOfLastBracketOfIfStatement(tokens, index);
      } else if (tokens[nextNonSpaceTokenIndex] === '=') {
        // called for - !=...
        return AnalyzeEqualsSign.updateState(tokens, index, evaluationState);
      }
    }
    return index;
  }
}
