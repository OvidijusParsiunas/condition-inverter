import { AnalyzeArithmeticOperation } from './analyzeArithmeticOperation';
import { EvaluationState } from '../../shared/types/evaluationState';
import { AnalyzeGreaterOrLessThan } from './analyzeLogicalOperator';
import { AnalyzeExclamationMark } from './analyzeExclamationMark';
import { AnalyzeBooleanLiteral } from './analyzeBooleanLiteral';
import { AnalyzeEqualsSign } from './analyzeEqualsSign';
import { Tokens } from '../../shared/types/tokens';
import TraversalUtils from '../../traversalUtils';
import { AnalyzeBracket } from './analyzeBracket';

export class AnalyzeTokens {
  protected refreshState(evaluationState: EvaluationState) {
    evaluationState.isOperationWrappableInBrackets = false;
    evaluationState.shouldBracketsBeRemoved = false;
    evaluationState.areBracketsAlreadyPresent = false;
    evaluationState.revertBooleanLiteral = false;
  }

  // a look back to see if previous syntax defines a standalone statement
  protected dealWithStandaloneStatements(tokens: Tokens, currentTokenIndex, evaluationState: EvaluationState) {
    if (evaluationState.shouldBracketsBeRemoved) {
      const endIndex = TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, evaluationState.startOfCurrentlyEvaluatedStatementIndex - 1);
      evaluationState.conditionsToBeInverted.push({
        start: evaluationState.startOfCurrentlyEvaluatedStatementIndex,
        removeNegationBrackets: { start: evaluationState.startOfCurrentlyEvaluatedStatementIndex, end: endIndex },
      });
    } else if (evaluationState.revertBooleanLiteral && !evaluationState.isOperationWrappableInBrackets) {
      evaluationState.conditionsToBeInverted.push({
        start: evaluationState.startOfCurrentlyEvaluatedStatementIndex,
        revertBooleanLiteral: evaluationState.revertBooleanLiteral,
      });
    } else if (!evaluationState.comparisonOperatorFound) {
      evaluationState.conditionsToBeInverted.push({ start: evaluationState.startOfCurrentlyEvaluatedStatementIndex });
    }
    if (evaluationState.isOperationWrappableInBrackets && !evaluationState.areBracketsAlreadyPresent) {
      const endIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, currentTokenIndex - 1, false);
      evaluationState.conditionsToBeInverted.push({
        brackets: true,
        start: evaluationState.startOfCurrentlyEvaluatedStatementIndex,
        end: endIndex,
      });
    }
  }

  private evaluateStatementsBeforeLogicalOperator(tokens: Tokens, index, nextNonSpaceCharacter, evaluationState: EvaluationState) {
    if (evaluationState.numberOfBracketsOpen === 0) {
      this.dealWithStandaloneStatements(tokens, index, evaluationState);
      evaluationState.conditionsToBeInverted.push({ start: index });
      evaluationState.startOfCurrentlyEvaluatedStatementIndex = nextNonSpaceCharacter;
      this.refreshState(evaluationState);
    }
    if (evaluationState.numberOfBracketsOpen > 0 && evaluationState.comparisonOperatorFound) evaluationState.conditionsToBeInverted.pop();
    evaluationState.comparisonOperatorFound = false;
  }

  protected analyzeTokens(tokens: Tokens, index: number, evaluationState: EvaluationState): number {
    const currentToken = tokens[index];
    const nextToken = tokens[index + 1];
    if (currentToken === '&' || currentToken === '|') {
      if (nextToken === '&' || nextToken === '|') {
        const nextNonSpaceCharacter = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 2);
        this.evaluateStatementsBeforeLogicalOperator(tokens, index, nextNonSpaceCharacter, evaluationState);
        // subtracting one due to the for loop automatically adding one
        return nextNonSpaceCharacter - 1;
      }
    } else if (currentToken === '<' || currentToken === '>') {
      return AnalyzeGreaterOrLessThan.analyze(tokens, index, evaluationState);
    } else if (currentToken === '=') {
      evaluationState.comparisonOperatorFound = true;
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
