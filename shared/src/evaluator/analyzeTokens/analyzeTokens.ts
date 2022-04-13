import { AnalyzeGreaterOrLessThanSign } from './analyzeGreaterOrLessThanSign';
import { AnalyzeArithmeticOperation } from './analyzeArithmeticOperation';
import { EvaluationState } from '../../shared/types/evaluationState';
import { AnalyzeExclamationMark } from './analyzeExclamationMark';
import { AnalyzeLogicalOperator } from './analyzeLogicalOperator';
import { AnalyzeBooleanLiteral } from './analyzeBooleanLiteral';
import { AnalyzeEqualsSign } from './analyzeEqualsSign';
import { Tokens } from '../../shared/types/tokens';
import TraversalUtils from '../../traversalUtils';
import { AnalyzeBracket } from './analyzeBracket';

export class AnalyzeTokens {
  public static analyze(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const currentToken = tokens[index];
    switch (currentToken) {
      case '&':
      case '|':
        return AnalyzeLogicalOperator.analyze(tokens, index, evaluationState);
      case '<':
      case '>':
        return AnalyzeGreaterOrLessThanSign.analyze(tokens, index, evaluationState);
      case '=':
        return AnalyzeEqualsSign.analyze(tokens, index, evaluationState);
      case '!':
        return AnalyzeExclamationMark.analyze(tokens, index, evaluationState);
      case '-':
      case '+':
      case '/':
      case '*':
        AnalyzeArithmeticOperation.analyze(evaluationState);
        break;
      case '(':
        AnalyzeBracket.open(evaluationState);
        break;
      case ')':
        AnalyzeBracket.close(evaluationState);
        break;
      case 'false':
      case 'true':
        AnalyzeBooleanLiteral.boolean(evaluationState);
        break;
      case '0':
      case '1':
        return AnalyzeBooleanLiteral.number(tokens, index, evaluationState);
      case `'`:
      case '`':
      case '"':
        return TraversalUtils.findEndingStringQuoteIndex(tokens, index + 1, currentToken);
      default: {
      }
    }
    return index;
  }
}
