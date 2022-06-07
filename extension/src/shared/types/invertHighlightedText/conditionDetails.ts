import { Range } from 'vscode';

export interface OutsideHighlightDetails {
  range: Range;
  // this is used to help build up a consistent length padding text string and correctly substring the inversion result
  replaceableOperatorLength: number;
}

export interface InsideHighlightDetails {
  range: Range;
}

export type ConditionDetails = InsideHighlightDetails | OutsideHighlightDetails;
