import { jstsReservedTerminatingWords } from '../../../../shared/consts/jstsReservedTerminatingWords';
import { MarkValueForInversion } from '../../shared/analyzeTokens/markValueForInversion';
import { AnalyzeHTMLTag } from '../../shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { CleanUpRedundancies } from '../../shared/redundancies/cleanUpRedundancies';
import { EvaluationStateUtil } from '../../../evaluationState/evaluationStateUtil';
import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { AnalyzeToken } from '../../shared/analyzeTokens/analyzeToken';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeOutsideStatement {
  // not using evaluationState.conditionSequenceEndIndex to identify if finishEvaluatingStatement needs to be run as for conditions that
  // are analysed outside statement this variable is only ever used for identifying an end of a bracket that was used at the start of a
  // condition and the condition can span beyond the bracket - hence it is not a stopping factor: const result = (dog && cat) && mouse
  private static finishEvaluatingStatement(tokens: Tokens, evaluationState: EvaluationState, index: number): void {
    MarkValueForInversion.mark(tokens, index, evaluationState);
    evaluationState.isEvaluatingConditions = false;
    evaluationState.markedForOperatorInversion = false;
    CleanUpRedundancies.removeAdditionOfBracketsFromState(evaluationState);
    EvaluationStateUtil.refreshBooleanState(evaluationState);
  }

  private static attemptToFinishViaTerminatingWord(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    if (jstsReservedTerminatingWords[tokens[index] as keyof typeof jstsReservedTerminatingWords]) {
      const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index - 1, false);
      AnalyzeOutsideStatement.finishEvaluatingStatement(tokens, evaluationState, previousTokenIndex);
      return index - 1;
    }
    // if end tag symbol *ngIf="condition">
    // if condition is inside a brace - end brace symbol defines condition end
    if (
      (tokens[index] === '>' && AnalyzeHTMLTag.isEndTagSymbol(tokens, index)) ||
      (tokens[index] === '}' && evaluationState.numberOfBracesOpen === 0)
    ) {
      AnalyzeOutsideStatement.finishEvaluatingStatement(tokens, evaluationState, index - 1);
      return index;
    }
    return -1;
  }

  // this is used to add brackets when analysis start with no open brackets and the code analysed has encountered something that needs brackets
  // and there is a bracket directly after it:
  // e.g. dog + cat) console.log(dog) should invert to !(dog + cat)) console.log(dog) not !(dog + cat) console.log(dog))
  private static markForBracketAddition(tokens: Tokens, index: number, evaluationState: EvaluationState): void {
    if (evaluationState.isOperationWrappableInBrackets && evaluationState.numberOfBracketsOpen === 0) {
      MarkValueForInversion.mark(tokens, index, evaluationState);
      evaluationState.markedForOperatorInversion = true;
      evaluationState.isOperationWrappableInBrackets = false;
    }
  }

  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const terminatingWordIndex = AnalyzeOutsideStatement.attemptToFinishViaTerminatingWord(tokens, index, evaluationState);
    if (terminatingWordIndex > -1) return terminatingWordIndex;
    if (tokens[index] === ')') AnalyzeOutsideStatement.markForBracketAddition(tokens, index, evaluationState);
    const nextIndex = AnalyzeToken.updateState(tokens, index, evaluationState);
    if (tokens.length - 1 <= nextIndex) AnalyzeOutsideStatement.finishEvaluatingStatement(tokens, evaluationState, nextIndex);
    return nextIndex;
  }
}
