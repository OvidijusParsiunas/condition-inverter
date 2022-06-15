import { Position } from './position';
import { Range } from 'vscode';

export interface InversionRangeDetails {
  range: Range;
  // this is used to temporarily replace a condition operator indicator that was not in the highlight but needs to be there in order to cause
  // an inversion, if the condition indicator is = or &, it gets accordingly padded to be 'if'
  startOperatorPadding: string;
  // this is used when there is no condition indicator in the highlighted and stretched (start) text. Contrary to the above, it does not need to
  // replace part of a condition indicator, but instead needs to be identified in order for inverter to know what to invert, e.g:
  // ? does not invert the expression before a colon: cat : dog ? cat : dog needs to result in cat : !dog ? cat dog
  endOperatorPadding: string;
}

export interface StartPositionDetails {
  position: Position;
  startOperatorPadding?: string;
}

export interface EndPositionDetails {
  position: Position;
  endOperatorPadding?: string;
}
