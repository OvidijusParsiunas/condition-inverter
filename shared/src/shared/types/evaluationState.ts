interface Generic {
  start: number;
}

export interface InsertNewBrackets extends Generic {
  end: number;
  insertNewBrackets: boolean;
}

export interface InvertBooleanLiteral extends Generic {
  invertBooleanLiteral: boolean;
}

export interface RemoveNegationBrackets extends Generic {
  removeNegatedBrackets: { start: number; end: number };
}

export interface GreaterOrLessThanHasFollowUpEquals extends Generic {
  greaterOrLessThanHasFollowUpEquals: boolean;
}

export type SyntaxToBeInverted = Generic | GreaterOrLessThanHasFollowUpEquals | RemoveNegationBrackets | InvertBooleanLiteral | InsertNewBrackets;

export interface EvaluationState {
  isCurrentlyInsideIfStatement: boolean;
  startOfCurrentIfStatementInsideIndex: number;
  currentIfStatementCloseBracketIndex: number;
  // WORK - change
  syntaxToBeInverted: SyntaxToBeInverted[];
  shouldBracketsBeRemoved: boolean;
  // usually for conditions that include arithmetic operations or double bangs
  isOperationWrappableInBrackets: boolean;
  invertBooleanLiteral: boolean;
  // should add brackets regardless if areBracketsAlreadyPresent is set to true or not
  comparisonOperatorFound: boolean;
  areBracketsAlreadyPresent: boolean;
  numberOfBracketsOpen: number;
}
