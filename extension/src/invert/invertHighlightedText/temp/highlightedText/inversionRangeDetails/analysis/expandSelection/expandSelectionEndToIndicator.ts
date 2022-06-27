// prettier-ignore
import {
  AnalyzeConditionOutsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionOutsideStatement/analyzeConditionOutsideStatement';
// prettier-ignore
import {
  AnalyzeConditionInsideStatement
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionInsideStatement/analyzeConditionInsideStatement';
import { EndPositionDetails, StartPositionDetails } from '../../../../../../../shared/types/inversionRangeDetails';
import { SPACE_JSON, STATEMENT_JSON } from 'shared/inverter/src/shared/consts/statements';
import { IsEndOnOrAfterConditionIndicator } from './isEndOnOrAfterConditionIndicator';
import { ConditionIndicatorPresence } from '../shared/conditionIndicatorPresence';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { Token, Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Position } from '../../../../../../../shared/types/position';
import { RangeCreator } from '../../../../../../shared/rangeCreator';
import { Range, TextEditor } from 'vscode';

export class ExpandSelectionEndToIndicator {
  private static generateEndOperatorPadding(conditionIndicatorPresent: boolean, conditionIndicatorToken: Token): string {
    if (conditionIndicatorPresent || conditionIndicatorToken === ';') return '';
    // if an indicator is a statement initiator, keep it in original form
    if (STATEMENT_JSON[conditionIndicatorToken as keyof typeof STATEMENT_JSON]) return conditionIndicatorToken as string;
    // need to use ? as it does not cause invertion of expression before a colon: e.g: cat : dog ? cat : dog needs to result in cat : !dog ? cat dog
    return conditionIndicatorToken === '?' ? '?' : '&&';
  }

  private static isConditionIndicator(lineTokens: Tokens, index: number): boolean {
    return (
      AnalyzeConditionInsideStatement.shouldAnalysisStart(lineTokens, index) ||
      AnalyzeConditionOutsideStatement.shouldAnalysisStart(lineTokens, index) ||
      lineTokens[index] === ';'
    );
  }

  // prettier-ignore
  private static searchLineFromIndex(
      conditionIndicatorPresent: boolean, lineTokens: Tokens, line: number, startChar: number, startIndex: number): EndPositionDetails {
    for (let i = startIndex; i < lineTokens.length; i += 1) {
      if (ExpandSelectionEndToIndicator.isConditionIndicator(lineTokens, i)) {
        return {
          position: { line, character: startChar + LineTokenTraversalUtils.getTokenStringIndex(lineTokens, i) },
          endOperatorPadding: ExpandSelectionEndToIndicator.generateEndOperatorPadding(conditionIndicatorPresent, lineTokens[i]),
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
        return ExpandSelectionEndToIndicator.searchLineFromIndex(conditionIndicatorPresent, lineTokens, line, startChar, i);
      }
    }
    if (editor.document.lineCount - 1 < line + 1) return null;
    return ExpandSelectionEndToIndicator.searchRightAndDownwards(editor, conditionIndicatorPresent, line + 1);
  }

  private static isConditionIndicatorPresent(editor: TextEditor, highlightEnd: Position, startPositionDetails: StartPositionDetails): boolean {
    if (!startPositionDetails.startOperatorPadding) {
      return ConditionIndicatorPresence.isInRange(editor, RangeCreator.create(startPositionDetails.position, highlightEnd));
    }
    return true;
  }

  public static getNewPositionDetails(editor: TextEditor, fullWordRange: Range, startPositionDetails: StartPositionDetails): EndPositionDetails {
    const highlightEnd = fullWordRange.end;
    if (!IsEndOnOrAfterConditionIndicator.check(editor, highlightEnd)) {
      const endPositionDetails = ExpandSelectionEndToIndicator.searchRightAndDownwards(
        editor,
        ExpandSelectionEndToIndicator.isConditionIndicatorPresent(editor, highlightEnd, startPositionDetails),
        highlightEnd.line,
        highlightEnd.character,
      );
      if (endPositionDetails) return endPositionDetails;
    }
    return { position: highlightEnd };
  }
}
