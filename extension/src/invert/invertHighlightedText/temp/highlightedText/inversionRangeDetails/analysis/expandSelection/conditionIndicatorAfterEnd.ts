// prettier-ignore
import {
  AnalyzeConditionOutsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
// prettier-ignore
import {
  AnalyzeConditionInsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionInsideStatement/analyzeConditionInsideStatement';
import { EndPositionDetails, StartPositionDetails } from '../../../../../../../shared/types/inversionRangeDetails';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { ConditionIndicatorPresence } from '../shared/conditionIndicatorPresence';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { SPACE_JSON } from 'shared/inverter/src/shared/consts/statements';
import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Position } from '../../../../../../../shared/types/position';
import { RangeCreator } from '../../../../../../shared/rangeCreator';
import { TextEditor } from 'vscode';

export class ConditionIndicatorAfterEnd {
  private static isConditionIndicator(lineTokens: Tokens, index: number): boolean {
    return (
      AnalyzeConditionInsideStatement.shouldAnalysisStart(lineTokens, index) ||
      AnalyzeConditionOutsideStatement.shouldAnalysisStart(lineTokens, index)
    );
  }

  private static generateEndOperatorPadding(conditionIndicatorPresent: boolean, conditionIndicatorToken: Token): string {
    if (conditionIndicatorPresent) return '';
    // need to use ? as it does not cause invertion of expression before a colon: e.g: cat : dog ? cat : dog needs to result in cat : !dog ? cat dog
    return conditionIndicatorToken === '?' ? '?' : '&&';
  }
  // prettier-ignore
  private static searchLineFromIndex(
      conditionIndicatorPresent: boolean, lineTokens: Tokens, line: number, startChar: number, startIndex: number): EndPositionDetails {
    for (let i = startIndex; i < lineTokens.length; i += 1) {
      if (ConditionIndicatorAfterEnd.isConditionIndicator(lineTokens, i)) {
        return {
          position: { line, character: startChar + LineTokenTraversalUtils.getTokenStringIndex(lineTokens, i) },
          endOperatorPadding: ConditionIndicatorAfterEnd.generateEndOperatorPadding(conditionIndicatorPresent, lineTokens[i]),
        };
      }
    }
    return { position: { line, character: startChar + lineTokens.join('').length } };
  }

  // prettier-ignore
  private static searchRightAndDownwards(
      editor: TextEditor, conditionIndicatorPresent: boolean, line: number, startChar?: number): EndPositionDetails | null {
    startChar ??= 0;
    const lineTokens = LineTokenTraversalUtils.getLineTokensAfterCharNumber(editor, line, startChar);
    for (let i = 0; i < lineTokens.length; i += 1) {
      if (!SPACE_JSON[lineTokens[i] as string]) {
        return ConditionIndicatorAfterEnd.searchLineFromIndex(conditionIndicatorPresent, lineTokens, line, startChar, i);
      }
    }
    if (editor.document.lineCount - 1 < line + 1) {
      return null;
    }
    return ConditionIndicatorAfterEnd.searchRightAndDownwards(editor, conditionIndicatorPresent, line + 1);
  }

  private static isConditionIndicatorPresent(editor: TextEditor, highlightEnd: Position, startPositionDetails: StartPositionDetails): boolean {
    if (startPositionDetails.replaceableStartOperatorLength === 0) {
      return ConditionIndicatorPresence.isInRange(editor, RangeCreator.create(startPositionDetails.position, highlightEnd));
    }
    return true;
  }

  // WORK - this would thow error if no line above
  private static isEndOnOrAfterConditionIndicator(editor: TextEditor, line: number, endChar?: number): boolean {
    endChar ??= editor.document.lineAt(line).range.end.character;
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      if (!SPACE_JSON[lineTokens[i] as string]) {
        return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(lineTokens, i, false);
      }
    }
    return ConditionIndicatorAfterEnd.isEndOnOrAfterConditionIndicator(editor, line - 1);
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
