// prettier-ignore
import {
  AnalyzeConditionOutsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
import { EndPositionDetails, StartPositionDetails } from '../../../../../../shared/types/inversionRangeDetails';
import { ConditionIndicatorValidator } from './shared/conditionIndicatorValidator';
import { ConditionIndicatorPresence } from './shared/conditionIndicatorPresence';
import { LineTraversalTokenUtils } from './shared/lineTraversalTokenUtils';
import { Position } from '../../../../../../shared/types/position';
import { RangeCreator } from '../../../../../shared/rangeCreator';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { TextEditor } from 'vscode';

export class ConditionIndicatorAfterEnd {
  // prettier-ignore
  private static searchLineFromIndex(
      conditionIndicatorPresent: boolean, lineTokens: Tokens, line: number, startChar: number, index: number): EndPositionDetails {
    for (let i = index; i < lineTokens.length; i += 1) {
      const shouldAnalysisStart = AnalyzeConditionOutsideStatement.shouldAnalysisStart(lineTokens, i);
      if (shouldAnalysisStart) {
        return {
          position: { line, character: startChar + LineTraversalTokenUtils.getTokenStringIndex(lineTokens, i) },
          endOperatorPaddingRequired: !conditionIndicatorPresent,
        };
      }
    }
    return { position: { line, character: startChar + LineTraversalTokenUtils.getTokenStringIndex(lineTokens, lineTokens.length - 1) } };
  }

  // prettier-ignore
  private static searchRightAndDownwards(
      editor: TextEditor, conditionIndicatorPresent: boolean, line: number, startChar?: number): EndPositionDetails | null {
    startChar ??= 0;
    const lineTokens = LineTraversalTokenUtils.getLineTokensAfterCharNumber(editor, line, startChar);
    for (let i = 0; i < lineTokens.length; i += 1) {
      if (!LineTraversalTokenUtils.isSpaceToken(lineTokens[i])) {
        return ConditionIndicatorAfterEnd.searchLineFromIndex(conditionIndicatorPresent, lineTokens, line, startChar, i);
      }
    }
    if (editor.document.lineCount - 1 < line + 1) {
      return null;
    }
    return ConditionIndicatorAfterEnd.searchRightAndDownwards(editor, conditionIndicatorPresent, line + 1);
  }

  // WORK - this would thow error if no line above
  private static isEndOnOrAfterConditionIndicator(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTraversalTokenUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      if (!LineTraversalTokenUtils.isSpaceToken(lineTokens[i])) {
        return ConditionIndicatorValidator.isIndexOnConditionIndicator(lineTokens, i, false);
      }
    }
    return ConditionIndicatorAfterEnd.isEndOnOrAfterConditionIndicator(editor, line - 1);
  }

  private static isConditionIndicatorPresent(editor: TextEditor, highlightEnd: Position, startPositionDetails: StartPositionDetails): boolean {
    if (startPositionDetails.replaceableStartOperatorLength === 0) {
      return ConditionIndicatorPresence.isInRange(editor, RangeCreator.create(startPositionDetails.position, highlightEnd));
    }
    return true;
  }

  public static getEndPositionDetails(editor: TextEditor, highlightEnd: Position, startPositionDetails: StartPositionDetails): EndPositionDetails {
    if (!ConditionIndicatorAfterEnd.isEndOnOrAfterConditionIndicator(editor, highlightEnd.line, highlightEnd.character)) {
      const endPositionDetails = ConditionIndicatorAfterEnd.searchRightAndDownwards(
        editor,
        ConditionIndicatorAfterEnd.isConditionIndicatorPresent(editor, highlightEnd, startPositionDetails),
        highlightEnd.line,
        highlightEnd.character,
      );
      if (endPositionDetails) return endPositionDetails;
    }
    return { position: highlightEnd };
  }
}
