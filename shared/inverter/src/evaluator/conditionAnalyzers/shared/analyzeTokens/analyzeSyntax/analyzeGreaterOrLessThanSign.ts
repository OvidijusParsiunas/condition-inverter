import { AnalyzeArithmeticAndAssignmentOperator } from './analyzeArithmeticAndAssignmentOperator';
import { TraversalUtil } from '../../../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../../../shared/types/evaluationState';
import { AnalyzeBitwiseShiftOperator } from './analyzeBitwiseShiftOperator';
import { Tokens } from '../../../../../shared/types/tokens';

export class AnalyzeGreaterOrLessThanSign {
  private static isTypeScriptGenericVariableStart(tokens: Tokens, index: number): number {
    const indexAfterLowerThan = index + 1;
    const tokensAfterLowerThan = tokens.slice(indexAfterLowerThan);
    const greaterThanIndex = tokensAfterLowerThan.indexOf('>');
    // this is used to prevent a valid lower than being identified as another nested function's generic variable end statement, e.g:
    // if (cat < dog && myFunc<number>(param)) { console.log(2) }
    const anotherLowerThanIndex = tokensAfterLowerThan.indexOf('<');
    if (greaterThanIndex > -1 && (anotherLowerThanIndex === -1 || greaterThanIndex < anotherLowerThanIndex)) {
      const tokenAfterLowerThanIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokensAfterLowerThan, greaterThanIndex + 1);
      if (tokenAfterLowerThanIndex > -1 && tokensAfterLowerThan[tokenAfterLowerThanIndex] === '(') {
        return indexAfterLowerThan + TraversalUtil.getIndexOfClosingBracket(tokensAfterLowerThan, greaterThanIndex);
      }
    }
    return -1;
  }

  private static udpateStateforEqualThan(index: number, evaluationState: EvaluationState): number {
    evaluationState.markedForOperatorInversion = true;
    evaluationState.syntaxToBeInverted.push({ start: index, greaterOrLessThanHasFollowUpEquals: true });
    return index + 1;
  }

  private static updateStateForComparisonOperator(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const nextToken = tokens[index + 1];
    if (nextToken === '=') {
      return AnalyzeGreaterOrLessThanSign.udpateStateforEqualThan(index, evaluationState);
    }
    const genericVariableStartIndex = AnalyzeGreaterOrLessThanSign.isTypeScriptGenericVariableStart(tokens, index);
    if (genericVariableStartIndex > -1) return genericVariableStartIndex;
    evaluationState.markedForOperatorInversion = true;
    evaluationState.syntaxToBeInverted.push({ start: index });
    return index;
  }

  private static updateStateIfShiftOperator(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const firstSymbol = tokens[index];
    if (tokens[index + 1] === firstSymbol) {
      if (tokens[index + 2] === '=') {
        return AnalyzeArithmeticAndAssignmentOperator.updateShiftAssignmentState(index, evaluationState);
      } else if (firstSymbol === '>' && tokens[index + 2] === firstSymbol && tokens[index + 3] === '=') {
        return AnalyzeArithmeticAndAssignmentOperator.updateUnsignedRightShiftAssignmentState(index, evaluationState);
      }
      return AnalyzeBitwiseShiftOperator.updateState(tokens, index, evaluationState);
    }
    return -1;
  }

  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const newState = AnalyzeGreaterOrLessThanSign.updateStateIfShiftOperator(tokens, index, evaluationState);
    if (newState > -1) return newState;
    return AnalyzeGreaterOrLessThanSign.updateStateForComparisonOperator(tokens, index, evaluationState);
  }
}
