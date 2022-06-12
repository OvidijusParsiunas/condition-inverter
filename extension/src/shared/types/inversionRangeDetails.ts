import { Position } from './position';
import { Range } from 'vscode';

export interface InversionRangeDetails {
  range: Range;
  // this is used to temporarily replace a condition operator indicator that was not in the highlight but needs to be there in order to cause
  // an inversion, most and foremost this is used to build a consistent length conditional statement padding string to add and remove after
  // inversion as instance like the conversion of > results in longer length condition indicator of <=
  replacableStartOperatorLength: number;
  // this is used when there is no condition indicator in the highlighted and stretched (start) text. Contrary to the above, it does not need to
  // replace a condition that was not in highlighted text, but instead one is added to the end to invoke an inversion and removed afterwards
  endOperatorPaddingRequired: boolean;
}

export interface StartPositionDetails {
  position: Position;
  replaceableStartOperatorLength: number;
}

export interface EndPositionDetails {
  position: Position;
  endOperatorPaddingRequired?: boolean;
}
