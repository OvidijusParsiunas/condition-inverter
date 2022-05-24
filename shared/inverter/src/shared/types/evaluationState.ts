import { ConditionAnalyzer } from './conditionAnalyzer';
import { StartEndIndexes } from './StartEndIndexes';
import { LANGUAGE } from '../consts/languages';

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
  // WORK - to be removed
  conditionAnalyzer: ConditionAnalyzer;
  isCurrentlyEvaluatingConditions: boolean;
  currentStatementStartIndex: number;
  currentStatementEndIndex: number;
  syntaxToBeInverted: SyntaxToBeInverted[];
  shouldBracketsBeRemoved: boolean;
  // for conditions that include arithmetic operations or double bangs
  isOperationWrappableInBrackets: boolean;
  invertBooleanLiteral: boolean;
  // this means that there is no entity to syntaxToBeInverted required to be added and the Inverter class code is going to take care of the inversion
  markedForOperatorInversion: boolean;
  areBracketsAlreadyPresent: boolean;
  numberOfBracketsOpen: number;
  lastRedundantOpenBracketIndex?: number;
  language: LANGUAGE;
}
