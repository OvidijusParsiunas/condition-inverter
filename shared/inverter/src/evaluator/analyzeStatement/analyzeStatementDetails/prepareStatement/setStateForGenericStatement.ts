import { GenericStatementBoundariesAndLanguage } from './genericStatementBoundariesAndLanguage';
import { AnalyzeEmptyStatement } from '../redundancies/analyzeEmptyStatement';
import { EvaluationState } from '../../../../shared/types/evaluationState';
import { Tokens } from '../../../../shared/types/tokens';

export class SetStateForGenericStatement {
  public static set(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    GenericStatementBoundariesAndLanguage.set(tokens, index, evaluationState);
    evaluationState.isCurrentlyInsideStatement = true;
    if (AnalyzeEmptyStatement.isEmpty(evaluationState)) evaluationState.isCurrentlyInsideStatement = false;
    return evaluationState.startOfCurrentStatementIndex - 1;
  }
}
