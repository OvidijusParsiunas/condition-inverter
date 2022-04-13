import { AnalyzeGreaterOrLessThanSign } from './analyzeSyntax/analyzeGreaterOrLessThanSign';
import { AnalyzeArithmeticOperation } from './analyzeSyntax/analyzeArithmeticOperation';
import { AnalyzeExclamationMark } from './analyzeSyntax/analyzeExclamationMark';
import { AnalyzeLogicalOperator } from './analyzeSyntax/analyzeLogicalOperator';
import { AnalyzeBooleanLiteral } from './analyzeSyntax/analyzeBooleanLiteral';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { AnalyzeEqualsSign } from './analyzeSyntax/analyzeEqualsSign';
import { AnalyzeBracket } from './analyzeSyntax/analyzeBracket';
import { Tokens } from '../../../shared/types/tokens';
import TraversalUtils from '../../../traversalUtils';

export class AnalyzeTokens {
  public static markSyntaxUpForInversion(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const currentToken = tokens[index];
    switch (currentToken) {
      case '!':
        return AnalyzeExclamationMark.markSyntaxUpForInversion(tokens, index, evaluationState);
      case '(':
        AnalyzeBracket.open(evaluationState);
        break;
      case ')':
        AnalyzeBracket.close(evaluationState);
        break;
      case '&':
      case '|':
        return AnalyzeLogicalOperator.markSyntaxUpForInversion(tokens, index, evaluationState);
      case '<':
      case '>':
        return AnalyzeGreaterOrLessThanSign.markSyntaxUpForInversion(tokens, index, evaluationState);
      case '=':
        return AnalyzeEqualsSign.markSyntaxUpForInversion(tokens, index, evaluationState);
      case 'false':
      case 'true':
        AnalyzeBooleanLiteral.markBooleanSyntaxUpForInversion(evaluationState);
        break;
      case '0':
      case '1':
        return AnalyzeBooleanLiteral.markBooleanNumberSyntaxUpForInversion(tokens, index, evaluationState);
      case `'`:
      case '`':
      case '"':
        return TraversalUtils.findEndingStringQuoteIndex(tokens, index + 1, currentToken);
      case '-':
      case '+':
      case '/':
      case '*':
        AnalyzeArithmeticOperation.markSyntaxUpForInversion(evaluationState);
        break;
      default: {
      }
    }
    return index;
  }
}
