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
  isEvaluatingConditions: boolean;
  currentConditionStartIndex: number;
  conditionSequenceEndIndex: number;
  syntaxToBeInverted: SyntaxToBeInverted[];
  shouldBracketsBeRemoved: boolean;
  // for conditions that include arithmetic operations or double bangs
  isOperationWrappableInBrackets: boolean;
  invertBooleanLiteral: boolean;
  // this means that the variable has already been marked for inversion so there is no need to adda another syntaxToBeInverted entry for it
  markedForOperatorInversion: boolean;
  areBracketsAlreadyPresent: boolean;
  numberOfBracketsOpen: number;
  numberOfBracesOpen: number;
  lastRedundantOpenBracketIndex?: number;
  language: LANGUAGE;
}
