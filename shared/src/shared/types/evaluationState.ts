export interface Brackets {
  start: number;
  end: number;
  brackets: boolean;
}

interface Start {
  start: number;
}

export interface InvertBooleanLiteral {
  start: number;
  invertBooleanLiteral: boolean;
}

export interface RemoveNegationBrackets {
  start: number;
  removeNegationBrackets: { start: number; end: number };
}

export interface GreaterOrLessThanHasFollowupEquals {
  start: number;
  greaterOrLessThanHasFollowupEquals: boolean;
}

export type SyntaxToBeInverted = GreaterOrLessThanHasFollowupEquals | RemoveNegationBrackets | InvertBooleanLiteral | Brackets | Start;

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
