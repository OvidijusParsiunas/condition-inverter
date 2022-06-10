// prettier-ignore
import {
  AnalyzeConditionOutsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
import { Position } from '../../../../../../shared/types/invertHighlightedText/invertHighlightedText';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { OutsideHighlightSharedAssets } from './shared';
import { TextEditor } from 'vscode';

export class ConditionIndicatorAfterEnd {
  private static searchLineFromIndex(lineTokens: Tokens, line: number, startChar: number, index: number): Position {
    for (let i = index; i < lineTokens.length; i += 1) {
      const shouldAnalysisStart = AnalyzeConditionOutsideStatement.shouldAnalysisStart(lineTokens, i);
      if (shouldAnalysisStart) {
        return { line, character: startChar + OutsideHighlightSharedAssets.getTokenIndexAsString(lineTokens, i) };
      }
    }
    return { line, character: startChar + OutsideHighlightSharedAssets.getTokenIndexAsString(lineTokens, lineTokens.length - 1) };
  }

  private static searchRightAndDownwards(editor: TextEditor, line: number, startChar?: number): Position | null {
    startChar ??= 0;
    const lineTokens = OutsideHighlightSharedAssets.getLineTokensAfterCharNumber(editor, line, startChar);
    for (let i = 0; i < lineTokens.length; i += 1) {
      if (!OutsideHighlightSharedAssets.isSpaceToken(lineTokens[i])) {
        return ConditionIndicatorAfterEnd.searchLineFromIndex(lineTokens, line, startChar, i);
      }
    }
    if (editor.document.lineCount - 1 < line + 1) {
      return null;
    }
    return ConditionIndicatorAfterEnd.searchRightAndDownwards(editor, line + 1);
  }

  // WORK - make json for symbol start and a separate one for keyword
  private static isIndexOnOrAfterConditionIndicator(tokens: Tokens, index: number): boolean {
    const token = tokens[index] as keyof typeof OutsideHighlightSharedAssets.conditionStartIndicators;
    switch (token) {
      case '&':
      case '|':
        return tokens[index - 1] === token;
      case '<':
      case '>':
        return tokens[index - 1] !== token;
      case '=':
        return tokens[index - 1] === '=' || tokens[index - 1] === '<' || tokens[index - 1] === '>' || tokens[index - 1] === '!';
      case 'and':
      case 'or':
      case 'if':
      case 'elif':
      case 'for':
      case 'while':
        return true;
      default:
        return false;
    }
  }

  // WORK - this would thow error if no line above
  private static isEndOnOrAfterConditionIndicator(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = OutsideHighlightSharedAssets.getLineTokensBeforeCharNumber(editor, line, endChar);
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      if (!OutsideHighlightSharedAssets.isSpaceToken(lineTokens[i])) {
        return ConditionIndicatorAfterEnd.isIndexOnOrAfterConditionIndicator(lineTokens, i);
      }
    }
    return ConditionIndicatorAfterEnd.isEndOnOrAfterConditionIndicator(editor, line - 1);
  }

  public static getEndPosition(editor: TextEditor, highlightEnd: Position): Position {
    if (!ConditionIndicatorAfterEnd.isEndOnOrAfterConditionIndicator(editor, highlightEnd.line, highlightEnd.character)) {
      const conditionIndicatorPosition = ConditionIndicatorAfterEnd.searchRightAndDownwards(editor, highlightEnd.line, highlightEnd.character);
      if (conditionIndicatorPosition) return conditionIndicatorPosition;
    }
    return highlightEnd;
  }
}
