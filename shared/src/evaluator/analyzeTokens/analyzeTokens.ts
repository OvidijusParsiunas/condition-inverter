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
    if (currentToken === '&' || currentToken === '|') {
      return AnalyzeLogicalOperator.analyze(tokens, index, evaluationState);
    } else if (currentToken === '<' || currentToken === '>') {
      return AnalyzeGreaterOrLessThanSign.analyze(tokens, index, evaluationState);
    } else if (currentToken === '=') {
      return AnalyzeEqualsSign.analyze(tokens, index, evaluationState);
    } else if (currentToken === '!') {
      return AnalyzeExclamationMark.analyze(tokens, index, evaluationState);
    } else if (AnalyzeArithmeticOperation.isTokenArithmeticOperation(currentToken)) {
      AnalyzeArithmeticOperation.analyze(evaluationState);
    } else if (currentToken === '(') {
      AnalyzeBracket.open(evaluationState);
    } else if (currentToken === ')') {
      AnalyzeBracket.close(evaluationState);
    } else if (currentToken === 'false' || currentToken === 'true') {
      AnalyzeBooleanLiteral.boolean(evaluationState);
    } else if (currentToken === '0' || currentToken === '1') {
      return AnalyzeBooleanLiteral.number(tokens, index, evaluationState);
    } else if (currentToken === `'` || currentToken === '`' || currentToken === '"') {
      return TraversalUtils.findEndingStringQuoteIndex(tokens, index + 1, currentToken);
    }
    return index;
  }
}
