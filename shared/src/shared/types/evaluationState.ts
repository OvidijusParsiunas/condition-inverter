export interface EvaluationState {
  isCurrentlyInsideIfStatement: boolean;
  startOfCurrentIfStatementInsideIndex: number;
  currentIfStatementCloseBracketIndex: number;
  // WORK - change
  syntaxToBeInverted: any[];
  shouldBracketsBeRemoved: boolean;
  // usually for conditions that include arithmetic operations or double bangs
  isOperationWrappableInBrackets: boolean;
  invertBooleanLiteral: boolean;
  // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
  comparisonOperatorFound: boolean;
  areBracketsAlreadyPresent: boolean;
  numberOfBracketsOpen: number;
}
