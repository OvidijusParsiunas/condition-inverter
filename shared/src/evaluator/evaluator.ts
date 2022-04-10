import { EvaluationState } from '../shared/types/evaluationState';
import { AnalyzeTokens } from './analyzeTokens/analyzeTokens';
import { Tokens } from '../shared/types/tokens';
import TraversalUtils from '../traversalUtils';

export default class Evaluator extends AnalyzeTokens {
  private evaluationState: EvaluationState = {
    isCurrentlyEvaluatingIfStatement: false,
    startOfCurrentlyEvaluatedStatementIndex: 0,
    currentIfStatementCloseBracketIndex: 0,
    conditionsToBeInverted: [],
    shouldBracketsBeRemoved: false,
    // usually involves arithmentic operations or double bangs
    isOperationWrappableInBrackets: false,
    revertBooleanLiteral: false,
    // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
    logicalOperatorFound: false,
    areBracketsAlreadyPresent: false,
    numberOfBracketsOpen: 0,
  };

  private finishEvaluatingIfStatement(tokens: Tokens): void {
    this.dealWithStandaloneStatements(tokens, this.evaluationState.currentIfStatementCloseBracketIndex, this.evaluationState);
    this.evaluationState.isCurrentlyEvaluatingIfStatement = false;
    this.evaluationState.logicalOperatorFound = false;
    this.refreshState(this.evaluationState);
  }

  private setConditionsToBeInverted(tokens: Tokens, index: number): number {
    if (this.evaluationState.currentIfStatementCloseBracketIndex > index) {
      return this.analyzeTokens(tokens, index, this.evaluationState);
    }
    this.finishEvaluatingIfStatement(tokens);
    return index;
  }

  public evaluate(tokens: Tokens) {
    this.evaluationState.currentIfStatementCloseBracketIndex = tokens.length - 1;
    for (let index = 0; index < tokens.length; index += 1) {
      if (this.evaluationState.isCurrentlyEvaluatingIfStatement) {
        index = this.setConditionsToBeInverted(tokens, index);
      } else if (tokens[index] === 'if') {
        this.evaluationState.currentIfStatementCloseBracketIndex = TraversalUtils.getIndexOfLastBracketOfIfStatement(tokens, index);
        const bracketIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(tokens, index + 1);
        this.evaluationState.startOfCurrentlyEvaluatedStatementIndex = TraversalUtils.findNonSpaceCharacterIndexStartingFromIndex(
          tokens,
          bracketIndex + 1,
        );
        index = this.evaluationState.startOfCurrentlyEvaluatedStatementIndex - 1;
        this.evaluationState.isCurrentlyEvaluatingIfStatement = true;
      }
    }
    return this.evaluationState.conditionsToBeInverted;
  }
}
