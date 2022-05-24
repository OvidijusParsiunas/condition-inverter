import { AnalyzeArithmeticAndAssignmentOperator } from './analyzeSyntax/analyzeArithmeticAndAssignmentOperator';
import { AnalyzeIdentityOrMembershipOperator } from './analyzeSyntax/analyzeIdentityOrMembershipOperator';
import { AnalyzeGreaterOrLessThanSign } from './analyzeSyntax/analyzeGreaterOrLessThanSign';
import { AnalyzeBrackatableSyntax } from './analyzeSyntax/analyzeBrackatableSyntax';
import { AnalyzeMethodInvocation } from './analyzeSyntax/analyzeMethodInvocation';
import { AnalyzeExclamationMark } from './analyzeSyntax/analyzeExclamationMark';
import { AnalyzeLogicalOperator } from './analyzeSyntax/analyzeLogicalOperator';
import { AnalyzeNullishOperator } from './analyzeSyntax/analyzeNullishOperator';
import { AnalyzeBooleanLiteral } from './analyzeSyntax/analyzeBooleanLiteral';
import { TraversalUtil } from '../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { AnalyzeEqualsSign } from './analyzeSyntax/analyzeEqualsSign';
import { AnalyzeFunction } from './analyzeSyntax/analyzeFunction';
import { AnalyzeBracket } from './analyzeSyntax/analyzeBracket';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeToken {
  public static updateState(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const currentToken = tokens[index];
    switch (currentToken) {
      case '!':
        return AnalyzeExclamationMark.updateState(tokens, index, evaluationState);
      case '(':
        AnalyzeBracket.updateStateForOpen(evaluationState);
        break;
      case ')':
        AnalyzeBracket.updateStateForClose(evaluationState);
        break;
      case '&':
      case '|':
        return AnalyzeLogicalOperator.updateStateForSymbol(tokens, index, evaluationState);
      case 'and':
      case 'or':
        return AnalyzeLogicalOperator.updateStateForKeyword(tokens, index, evaluationState);
      case '<':
      case '>':
        return AnalyzeGreaterOrLessThanSign.updateState(tokens, index, evaluationState);
      case '=':
        return AnalyzeEqualsSign.updateState(tokens, index, evaluationState);
      case 'false':
      case 'true':
      case 'False':
      case 'True':
        AnalyzeBooleanLiteral.updateStateForBoolean(evaluationState);
        break;
      case '0':
      case '1':
        return AnalyzeBooleanLiteral.updateStateForBooleanNumber(tokens, index, evaluationState);
      case `'`:
      case '`':
      case '"':
        return TraversalUtil.getEndQuoteIndex(tokens, index + 1, currentToken);
      case '-':
      case '+':
      case '/':
      case '*':
      case '^':
      case '~':
      case '%':
        return AnalyzeArithmeticAndAssignmentOperator.updateState(tokens, index, evaluationState);
      // converting if (dog as { key: number }) to if (!dog as {key: name }) is fine, however the compiler will display the following error:
      // Conversion of type 'boolean' to type '{ dog: number; }' may be a mistake
      // hence we use the following to add brackets on either sides and convert to the following if (!(dog as {key: name }))
      case 'as':
      case 'instanceof':
        AnalyzeBrackatableSyntax.updateState(evaluationState);
        break;
      case 'function':
        return AnalyzeFunction.updateStateForRegular(tokens, index, evaluationState);
      case 'is':
      case 'in':
        AnalyzeIdentityOrMembershipOperator.updateState(tokens, index, evaluationState);
        break;
      case '?':
        return AnalyzeNullishOperator.updateState(tokens, index, evaluationState);
      default: {
        // it is easier to check if the current token is part of a method invocation rather than checking
        // if the previous token is a method name using the AnalyzeBracket class
        return AnalyzeMethodInvocation.updateState(tokens, index);
      }
    }
    return index;
  }
}
