import { AnalyzeArithmeticAndAssignmentOperator } from './analyzeSyntax/analyzeArithmeticAndAssignmentOperator';
import { AnalyzeGreaterOrLessThanSign } from './analyzeSyntax/analyzeGreaterOrLessThanSign';
import { AnalyzeMethodInvocation } from './analyzeSyntax/analyzeMethodInvocation';
import { AnalyzeExclamationMark } from './analyzeSyntax/analyzeExclamationMark';
import { AnalyzeLogicalOperator } from './analyzeSyntax/analyzeLogicalOperator';
import { AnalyzeBooleanLiteral } from './analyzeSyntax/analyzeBooleanLiteral';
import { TraversalUtil } from '../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { AnalyzeEqualsSign } from './analyzeSyntax/analyzeEqualsSign';
import { AnalyzeFunction } from './analyzeSyntax/analyzeFunction';
import { AnalyzeBracket } from './analyzeSyntax/analyzeBracket';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeTokens {
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
      case 'function':
        return AnalyzeFunction.updateState(tokens, index, evaluationState);
      default: {
        // it is easier to check if the current token is part of a method invocation rather than checking
        // if the previous token is a method name using the AnalyzeBracket class
        return AnalyzeMethodInvocation.updateState(tokens, index);
      }
    }
    return index;
  }
}
