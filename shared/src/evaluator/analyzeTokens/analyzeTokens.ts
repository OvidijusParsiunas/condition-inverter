import { EvaluationState } from '../../shared/types/evaluationState';
import { AnalyzeBooleanLiteral } from './analyzeBooleanLiteral';
import { Token, Tokens } from '../../shared/types/tokens';
import TraversalUtils from '../../traversalUtils';

export class AnalyzeTokens {
  private static isTokenArithmeticOperation(token: Token) {
    return token === '-' || token === '+' || token === '/' || token === '*';
  }

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
    } else if (!evaluationState.logicalOperatorFound) {
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
    if (evaluationState.numberOfBracketsOpen > 0 && evaluationState.logicalOperatorFound) evaluationState.conditionsToBeInverted.pop();
    evaluationState.logicalOperatorFound = false;
  }

  private foundEquals(tokens: Tokens, index, evaluationState: EvaluationState) {
    evaluationState.conditionsToBeInverted.push({ start: index });
    if (tokens[index + 1] === '=') {
      if (tokens[index + 2] === '=') {
        return index + 2;
      } else {
        return index + 1;
      }
    }
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
      evaluationState.logicalOperatorFound = true;
      if (nextToken === '=') {
        evaluationState.conditionsToBeInverted.push({ start: index, hasFollowupEquals: true });
        return index + 1;
      } else {
        evaluationState.conditionsToBeInverted.push({ start: index });
      }
    } else if (currentToken === '=') {
      evaluationState.logicalOperatorFound = true;
      return this.foundEquals(tokens, index, evaluationState);
    } else if (currentToken === '!') {
      const nextExclamationMarkIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
      if (tokens[nextExclamationMarkIndex] === '!') {
        evaluationState.isOperationWrappableInBrackets = true;
        const newIndex = TraversalUtils.findLastExclamationMarkIndex(tokens, index + 1);
        const nextNonSpaceCharacterIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, newIndex + 1);
        if (tokens[nextNonSpaceCharacterIndex] === '(') {
          return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, newIndex);
        }
        return newIndex;
      } else if (evaluationState.numberOfBracketsOpen === 0) {
        const nextCharacterTokenIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
        if (tokens[nextCharacterTokenIndex] === '(') {
          // doesn't get called with syntax !!!!!( as the logic above captures that use case
          // doesn't get called with syntax !!!(!( as this.numberOfBracketsOpen will be more than 1
          // this is called for !( where we are sure that the bracket will need to be removed - which is done in dealWithStandaloneStatements
          evaluationState.shouldBracketsBeRemoved = true;
          return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index);
        } else if (nextToken === '=') {
          evaluationState.logicalOperatorFound = true;
          return this.foundEquals(tokens, index, evaluationState);
        }
      }
    } else if (AnalyzeTokens.isTokenArithmeticOperation(currentToken)) {
      evaluationState.isOperationWrappableInBrackets = true;
      if (evaluationState.areBracketsAlreadyPresent && evaluationState.numberOfBracketsOpen === 0) evaluationState.areBracketsAlreadyPresent = false;
    } else if (currentToken === '(') {
      if (!evaluationState.isOperationWrappableInBrackets && evaluationState.numberOfBracketsOpen === 0) {
        evaluationState.areBracketsAlreadyPresent = true;
      }
      evaluationState.numberOfBracketsOpen += 1;
    } else if (currentToken === ')') {
      evaluationState.numberOfBracketsOpen -= 1;
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
