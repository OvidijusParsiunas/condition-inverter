import { EvaluationState } from '../../../../../shared/types/evaluationState';
import { AnalyzeBrackatableSyntax } from './analyzeBrackatableSyntax';
import { LANGUAGE } from '../../../../../shared/consts/languages';
import { Tokens } from '../../../../../shared/types/tokens';

export class AnalyzeIdentityOrMembershipOperator {
  // mostly used for javascript/python
  // identity operators: dog is cat  or  dog is not cat
  // membership operators: python - dog in cat  or  dog not in cat  javascript - dog in cat  or  !(dog in cat)
  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): void {
    if (tokens[index] === 'in' && evaluationState.language === LANGUAGE.unknown) {
      AnalyzeBrackatableSyntax.updateState(evaluationState);
    } else {
      evaluationState.markedForOperatorInversion = true;
      evaluationState.syntaxToBeInverted.push({ start: index });
    }
  }
}
