import { StartEndIndexes } from './StartEndIndexes';

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
  removeNegatedBrackets: StartEndIndexes;
}

export interface GreaterOrLessThanHasFollowUpEquals extends Generic {
  greaterOrLessThanHasFollowUpEquals: boolean;
}

export type SyntaxToBeInverted = Generic | InsertNewBrackets | InvertBooleanLiteral | RemoveNegationBrackets | GreaterOrLessThanHasFollowUpEquals;

export interface EvaluationState {
  isCurrentlyInsideStatement: boolean;
  startOfCurrentStatementInsideIndex: number;
  currentStatementCloseBracketIndex: number;
  syntaxToBeInverted: SyntaxToBeInverted[];
  shouldBracketsBeRemoved: boolean;
  // for conditions that include arithmetic operations or double bangs
  isOperationWrappableInBrackets: boolean;
  invertBooleanLiteral: boolean;
  comparisonOperatorFound: boolean;
  areBracketsAlreadyPresent: boolean;
  numberOfBracketsOpen: number;
  lastRedundantOpenBracketIndex?: number;
}
