import { Position } from '../../types/invertHighlightedText/invertHighlightedText';
import { Position as VSCodePosition, Range } from 'vscode';

export class SharedUtils {
  public static createRange(start: Position, end: Position): Range {
    return new Range(new VSCodePosition(start.line, start.character), new VSCodePosition(end.line, end.character));
  }
}
