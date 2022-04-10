import { EvaluationState } from '../../shared/types/evaluationState';
import { AnalyzeEqualsSign } from './analyzeEqualsSign';
import { Tokens } from '../../shared/types/tokens';
import TraversalUtils from '../../traversalUtils';

export class AnalyzeExclamationMark {
  private static findLastExclamationMarkIndex(tokens: Tokens, index: number): any {
    const nextNonSpaceTokenIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
    // a plus or minus after exclamation mark are regarded to be part of it
    if (tokens[nextNonSpaceTokenIndex] === '!' || tokens[nextNonSpaceTokenIndex] === '+' || tokens[nextNonSpaceTokenIndex] === '-') {
      return AnalyzeExclamationMark.findLastExclamationMarkIndex(tokens, nextNonSpaceTokenIndex);
    }
    return index;
  }

  private static getNewIndexAfterMultipleMarks(tokens: Tokens, index: number): number {
    const lastExclamationMarkIndex = AnalyzeExclamationMark.findLastExclamationMarkIndex(tokens, index + 1);
    const nextNonSpaceCharacterIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, lastExclamationMarkIndex + 1);
    // if multiple exclamation marks were in front of bracket, do not need to evaluate inside
    if (tokens[nextNonSpaceCharacterIndex] === '(') {
      return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, lastExclamationMarkIndex);
    }
    return lastExclamationMarkIndex;
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[index + 1];
    const nextNonSpaceTokenIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
    if (tokens[nextNonSpaceTokenIndex] === '!') {
      evaluationState.isOperationWrappableInBrackets = true;
      return AnalyzeExclamationMark.getNewIndexAfterMultipleMarks(tokens, index);
    } else if (evaluationState.numberOfBracketsOpen === 0) {
      if (tokens[nextNonSpaceTokenIndex] === '(') {
        // doesn't get called with syntax !!!!!( as the logic above captures that use case
        // doesn't get called with syntax !!!(!( as this.numberOfBracketsOpen will be more than 1
        // this is called for !( where we are sure that the bracket will need to be removed - which is done in dealWithStandaloneStatements
        evaluationState.shouldBracketsBeRemoved = true;
        return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index);
      } else if (nextToken === '=') {
        evaluationState.logicalOperatorFound = true;
        return AnalyzeEqualsSign.analyze(tokens, index, evaluationState);
      }
    }
    return index;
  }
}
