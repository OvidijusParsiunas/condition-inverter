import { Tokens } from '../shared/types/tokens';
import TraversalUtils from '../traversalUtils';

export default class Evaluator {
  isCurrentlyEvaluatingIfStatement = false;
  startOfCurrentlyEvaluatedStatementIndex = 0;
  currentIfStatementCloseBracketIndex = 0;
  conditionsToBeInverted: any = [];
  shouldBracketsBeRemoved = false;
  // usually involves arithmentic operations or double bangs
  isOperationWrappableInBrackets = false;
  revertBooleanLiteral = false;
  // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
  logicalOperatorFound = false;
  areBracketsAlreadyPresent = false;
  numberOfBracketsOpen = 0;

  static isCharacterArithmeticOperation(character) {
    return character === '-' || character === '+' || character === '/' || character === '*';
  }

  refreshState() {
    this.isOperationWrappableInBrackets = false;
    this.shouldBracketsBeRemoved = false;
    this.areBracketsAlreadyPresent = false;
    this.revertBooleanLiteral = false;
  }

  // a look back to see if previous syntax defines a standalone statement
  dealWithStandaloneStatements(tokens: Tokens, currentTokenIndex) {
    if (this.shouldBracketsBeRemoved) {
      const endIndex = TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, this.startOfCurrentlyEvaluatedStatementIndex - 1);
      this.conditionsToBeInverted.push({
        start: this.startOfCurrentlyEvaluatedStatementIndex,
        removeNegationBrackets: { start: this.startOfCurrentlyEvaluatedStatementIndex, end: endIndex },
      });
    } else if (this.revertBooleanLiteral && !this.isOperationWrappableInBrackets) {
      this.conditionsToBeInverted.push({
        start: this.startOfCurrentlyEvaluatedStatementIndex,
        revertBooleanLiteral: this.revertBooleanLiteral,
      });
    } else if (!this.logicalOperatorFound) {
      this.conditionsToBeInverted.push({ start: this.startOfCurrentlyEvaluatedStatementIndex });
    }
    if (this.isOperationWrappableInBrackets && !this.areBracketsAlreadyPresent) {
      const endIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, currentTokenIndex - 1, false);
      this.conditionsToBeInverted.push({
        brackets: true,
        start: this.startOfCurrentlyEvaluatedStatementIndex,
        end: endIndex,
      });
    }
  }

  foundEquals(tokens: Tokens, index) {
    this.conditionsToBeInverted.push({ start: index });
    if (tokens[index + 1] === '=') {
      if (tokens[index + 2] === '=') {
        return index + 2;
      } else {
        return index + 1;
      }
    }
  }

  evaluateStatementsBeforeLogicalOperator(tokens: Tokens, index, nextNonSpaceCharacter) {
    if (this.numberOfBracketsOpen === 0) {
      this.dealWithStandaloneStatements(tokens, index);
      this.conditionsToBeInverted.push({ start: index });
      this.startOfCurrentlyEvaluatedStatementIndex = nextNonSpaceCharacter;
      this.refreshState();
    }
    if (this.numberOfBracketsOpen > 0 && this.logicalOperatorFound) this.conditionsToBeInverted.pop();
    this.logicalOperatorFound = false;
  }

  private finishEvaluatingIfStatement(tokens: Tokens) {
    this.dealWithStandaloneStatements(tokens, this.currentIfStatementCloseBracketIndex);
    this.isCurrentlyEvaluatingIfStatement = false;
    this.logicalOperatorFound = false;
    this.refreshState();
  }

  private setConditionsToBeInverted(tokens: Tokens, index: number): number {
    if (this.currentIfStatementCloseBracketIndex <= index) {
      this.finishEvaluatingIfStatement(tokens);
    } else if (tokens[index] === '&' || tokens[index] === '|') {
      if (tokens[index + 1] === '&' || tokens[index + 1] === '|') {
        const nextNonSpaceCharacter = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 2);
        this.evaluateStatementsBeforeLogicalOperator(tokens, index, nextNonSpaceCharacter);
        // subtracting one due to the for loop automatically adding one
        return nextNonSpaceCharacter - 1;
      }
    } else if (tokens[index] === '<' || tokens[index] === '>') {
      this.logicalOperatorFound = true;
      if (tokens[index + 1] === '=') {
        this.conditionsToBeInverted.push({ start: index, hasFollowupEquals: true });
        return index + 1;
      } else {
        this.conditionsToBeInverted.push({ start: index });
      }
    } else if (tokens[index] === '=') {
      this.logicalOperatorFound = true;
      return this.foundEquals(tokens, index);
    } else if (tokens[index] === '!') {
      const nextExclamationMarkIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
      if (tokens[nextExclamationMarkIndex] === '!') {
        this.isOperationWrappableInBrackets = true;
        const newIndex = TraversalUtils.findLastExclamationMarkIndex(tokens, index + 1);
        const nextNonSpaceCharacterIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, newIndex + 1);
        if (tokens[nextNonSpaceCharacterIndex] === '(') {
          return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, newIndex);
        }
        return newIndex;
      } else if (this.numberOfBracketsOpen === 0) {
        const nextCharacterTokenIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
        if (tokens[nextCharacterTokenIndex] === '(') {
          // doesn't get called with syntax !!!!!( as the logic above captures that use case
          // doesn't get called with syntax !!!(!( as this.numberOfBracketsOpen will be more than 1
          // this is called for !( where we are sure that the bracket will need to be removed - which is done in dealWithStandaloneStatements
          this.shouldBracketsBeRemoved = true;
          return TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index);
        } else if (tokens[index + 1] === '=') {
          this.logicalOperatorFound = true;
          return this.foundEquals(tokens, index);
        }
      }
    } else if (Evaluator.isCharacterArithmeticOperation(tokens[index])) {
      this.isOperationWrappableInBrackets = true;
      if (this.areBracketsAlreadyPresent && this.numberOfBracketsOpen === 0) this.areBracketsAlreadyPresent = false;
    } else if (tokens[index] === '(') {
      if (!this.isOperationWrappableInBrackets && this.numberOfBracketsOpen === 0) this.areBracketsAlreadyPresent = true;
      this.numberOfBracketsOpen += 1;
    } else if (tokens[index] === ')') {
      this.numberOfBracketsOpen -= 1;
    } else if (tokens[index] === 'false' || tokens[index] === 'true') {
      this.revertBooleanLiteral = true;
    } else if (tokens[index] === '0' || tokens[index] === '1') {
      const nextCharacter = tokens[index + 1];
      if (nextCharacter === ' ' || nextCharacter === ')' || nextCharacter === '&' || nextCharacter === '|') {
        this.revertBooleanLiteral = true;
      } else {
        return TraversalUtils.getWhenNumberStops(tokens, index);
      }
    } else if (tokens[index] === `'` || tokens[index] === '`' || tokens[index] === '"') {
      return TraversalUtils.findEndingStringQuoteIndex(tokens, index + 1, tokens[index]);
    }
    return index;
  }

  public evaluate(tokens: Tokens) {
    this.currentIfStatementCloseBracketIndex = tokens.length - 1;
    for (let index = 0; index < tokens.length; index += 1) {
      if (this.isCurrentlyEvaluatingIfStatement) {
        index = this.setConditionsToBeInverted(tokens, index);
      } else if (tokens[index] === 'if') {
        this.currentIfStatementCloseBracketIndex = TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index);
        const bracketIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
        this.startOfCurrentlyEvaluatedStatementIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, bracketIndex + 1);
        index = this.startOfCurrentlyEvaluatedStatementIndex - 1;
        this.isCurrentlyEvaluatingIfStatement = true;
      }
    }
    return this.conditionsToBeInverted;
  }
}
