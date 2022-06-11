import { Position as VSCodePosition, Range } from 'vscode';
import { Position } from '../../shared/types/position';

export class RangeCreator {
  public static create(start: Position, end: Position): Range {
    return new Range(new VSCodePosition(start.line, start.character), new VSCodePosition(end.line, end.character));
  }
}
