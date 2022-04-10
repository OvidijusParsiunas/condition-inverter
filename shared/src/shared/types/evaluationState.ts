export interface EvaluationState {
  isCurrentlyEvaluatingIfStatement: boolean;
  startOfCurrentlyEvaluatedStatementIndex: number;
  currentIfStatementCloseBracketIndex: number;
  // WORK - change
  conditionsToBeInverted: any[];
  shouldBracketsBeRemoved: boolean;
  // usually involves arithmentic operations or double bangs
  isOperationWrappableInBrackets: boolean;
  revertBooleanLiteral: boolean;
  // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
  logicalOperatorFound: boolean;
  areBracketsAlreadyPresent: boolean;
  numberOfBracketsOpen: number;
}
