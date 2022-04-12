export interface EvaluationState {
  isCurrentlyEvaluatingIfStatement: boolean;
  startOfCurrentlyEvaluatedStatementIndex: number;
  currentIfStatementCloseBracketIndex: number;
  // WORK - change
  conditionsToBeInverted: any[];
  shouldBracketsBeRemoved: boolean;
  // usually for conditions that include arithmentic operations or double bangs
  isOperationWrappableInBrackets: boolean;
  revertBooleanLiteral: boolean;
  // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
  comparisonOperatorFound: boolean;
  areBracketsAlreadyPresent: boolean;
  numberOfBracketsOpen: number;
}
