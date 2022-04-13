import { EvaluationState } from '../../shared/types/evaluationState';
import { AnalyzeEqualsSign } from './analyzeEqualsSign';
import { Tokens } from '../../shared/types/tokens';
import TraversalUtils from '../../traversalUtils';

export class AnalyzeExclamationMark {
  private static findLastExclamationMarkIndex(tokens: Tokens, index: number): any {
    const nextNonSpaceTokenIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
    // a direct plus or minus after exclamation mark are regarded as part of the condition
    if (tokens[nextNonSpaceTokenIndex] === '!' || tokens[nextNonSpaceTokenIndex] === '+' || tokens[nextNonSpaceTokenIndex] === '-') {
      return AnalyzeExclamationMark.findLastExclamationMarkIndex(tokens, nextNonSpaceTokenIndex);
    }
    return index;
  }

  private static getConditionEndIndex(tokens: Tokens, index: number): number {
    const lastExclamationMarkIndex = AnalyzeExclamationMark.findLastExclamationMarkIndex(tokens, index + 1);
    const nextNonSpaceCharIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, lastExclamationMarkIndex + 1);
    if (tokens[nextNonSpaceCharIndex] === '(') {
      return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, lastExclamationMarkIndex);
    }
    return lastExclamationMarkIndex;
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextNonSpaceTokenIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
    if (tokens[nextNonSpaceTokenIndex] === '!') {
      // called for - !!..., // !!!!!... // !!!+!-!... // !!!!(...
      // if there are multiple exclamation marks, wrap the condition inside brackets with an exclamation mark
      evaluationState.isOperationWrappableInBrackets = true;
      return AnalyzeExclamationMark.getConditionEndIndex(tokens, index);
    } else if (evaluationState.numberOfBracketsOpen === 0) {
      // REF - 2000
      // the logic here does not operate inside nested brackets so cases such as if ((!(hello))) will result with if (!(hello))
      // the reason for this is because the overall code does not analyze the level at which inversions should be made, e.g:
      // for if (((!(hello) && cat) || cat) we do not know that !(hello) is not to be inverted upfront, hence it is always
      // safe to assume that no further inversion will take place within brackets
      if (tokens[nextNonSpaceTokenIndex] === '(') {
        // called for - !(...
        evaluationState.shouldBracketsBeRemoved = true;
        return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index);
      } else if (tokens[nextNonSpaceTokenIndex] === '=') {
        // called for - !=...
        return AnalyzeEqualsSign.analyze(tokens, index, evaluationState);
      }
    }
    return index;
  }
}
