import { AnalyzeGreaterOrLessThanSign } from './analyzeSyntax/analyzeGreaterOrLessThanSign';
import { AnalyzeArithmeticOperation } from './analyzeSyntax/analyzeArithmeticOperation';
import { AnalyzeExclamationMark } from './analyzeSyntax/analyzeExclamationMark';
import { AnalyzeLogicalOperator } from './analyzeSyntax/analyzeLogicalOperator';
import { AnalyzeBooleanLiteral } from './analyzeSyntax/analyzeBooleanLiteral';
import { TraversalUtil } from '../../../shared/functionality/traversalUtil';
import { EvaluationState } from '../../../shared/types/evaluationState';
import { AnalyzeEqualsSign } from './analyzeSyntax/analyzeEqualsSign';
import { AnalyzeBracket } from './analyzeSyntax/analyzeBracket';
import { Tokens } from '../../../shared/types/tokens';

export class AnalyzeTokens {
  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const currentToken = tokens[index];
    switch (currentToken) {
      case '!':
        return AnalyzeExclamationMark.analyze(tokens, index, evaluationState);
      case '(':
        AnalyzeBracket.analyzeOpen(evaluationState);
        break;
      case ')':
        AnalyzeBracket.analyzeClose(evaluationState);
        break;
      case '&':
      case '|':
        return AnalyzeLogicalOperator.analyze(tokens, index, evaluationState);
      case '<':
      case '>':
        return AnalyzeGreaterOrLessThanSign.analyze(tokens, index, evaluationState);
      case '=':
        return AnalyzeEqualsSign.analyze(tokens, index, evaluationState);
      case 'false':
      case 'true':
        AnalyzeBooleanLiteral.analyzeBoolean(evaluationState);
        break;
      case '0':
      case '1':
        return AnalyzeBooleanLiteral.analyzeBooleanNumber(tokens, index, evaluationState);
      case `'`:
      case '`':
      case '"':
        return TraversalUtil.getEndQuoteIndex(tokens, index + 1, currentToken);
      case '-':
      case '+':
      case '/':
      case '*':
        AnalyzeArithmeticOperation.analyze(evaluationState);
        break;
      default: {
      }
    }
    return index;
  }
}
