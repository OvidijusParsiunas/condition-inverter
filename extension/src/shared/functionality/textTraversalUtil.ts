interface Result {
  word: string;
  index: number;
}

export class TextTraversalUtil {
  private static extractResult(start: number, end: number, cursor: number, text: string): Result {
    if (end < 0) {
      return { word: text.slice(start), index: start };
    }
    return { word: text.slice(start, end + cursor), index: start };
  }

  public static getWordAtCursor(text: string, cursor: number): Result {
    const start = text.slice(0, cursor + 1).search(/\S+$/);
    const end = text.slice(cursor).search(/\s/);
    return TextTraversalUtil.extractResult(start, end, cursor, text);
  }
}
