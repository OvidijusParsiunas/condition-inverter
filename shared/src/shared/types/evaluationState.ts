interface Generic {
  start: number;
}

export interface Brackets extends Generic {
  end: number;
  brackets: boolean;
}

export interface InvertBooleanLiteral extends Generic {
  invertBooleanLiteral: boolean;
}

export interface RemoveNegationBrackets extends Generic {
  removeNegationBrackets: { start: number; end: number };
}

export interface GreaterOrLessThanHasFollowupEquals extends Generic {
  greaterOrLessThanFollowedUpByEquals: boolean;
}

export type SyntaxToBeInverted = Generic | GreaterOrLessThanHasFollowupEquals | RemoveNegationBrackets | InvertBooleanLiteral | Brackets;

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
