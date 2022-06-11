import { Range } from 'vscode';

export interface InversionRangeDetails {
  range: Range;
  // this is used to temporarily replace a condition operator indicator that was not highlighted but needs to act in order to cause an inversion,
  // most and foremost this is used to build a consistent length conditional statement padding string to add and remove after inversion as
  // instances like conversion of > results in longer length xonsirion insicator of <=
  replacableStartOperatorLength: number;
}
