import { EvaluationState } from '../../../../shared/types/evaluationState';

export class AnalyzeIdentityOrMembershipOperator {
  // mostly used for python
  // identity operators: dog is cat  or  dog is not cat
  // membership operators: dog in cat  or  dog not in cat
  public static updateState(index: number, evaluationState: EvaluationState): void {
    // need to mark here as upon analyzing standalone statements the index is incorrect
    evaluationState.markedForOperatorInversion = true;
    evaluationState.syntaxToBeInverted.push({ start: index });
  }
}
