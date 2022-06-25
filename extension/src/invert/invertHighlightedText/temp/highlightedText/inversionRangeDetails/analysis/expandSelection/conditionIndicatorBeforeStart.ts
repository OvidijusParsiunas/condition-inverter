import { StartPositionDetails } from '../../../../../../../shared/types/inversionRangeDetails';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { ConditionIndicatorValidator } from '../shared/conditionIndicatorValidator';
import { FirstFoundToken } from 'shared/inverter/src/shared/types/firstFoundToken';
import { LineTokenTraversalUtils } from '../shared/lineTokenTraversalUtils';
import { SPACE_JSON } from 'shared/inverter/src/shared/consts/statements';
import { TokensJSON } from 'shared/inverter/src/shared/types/tokensJSON';
import { Position } from '../../../../../../../shared/types/position';
import { RangeCreator } from '../../../../../../shared/rangeCreator';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { Range, TextEditor } from 'vscode';

export class ConditionIndicatorBeforeStart {
  private static readonly stopSymbols = { [')']: true, [';']: true, [':']: true, ['{']: true } as TokensJSON;

  // this is mostly used for property access -  e.g. if (name().hello)  or  if (name()['hello'])
  private static isPermittedIfCloseBracket(fullLineTokens: Tokens, index: number): boolean {
    if (fullLineTokens[index] === ')') {
      const nextIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, index + 1);
      return fullLineTokens[nextIndex] !== '.' && fullLineTokens[nextIndex] !== '[';
    }
    return true;
  }

  private static generateNewStartPositionDetails(line: number, lineTokens: Tokens, { index, token }: FirstFoundToken): StartPositionDetails {
    const startPositionDetails: StartPositionDetails = {
      position: { line, character: LineTokenTraversalUtils.getTokenStringIndex(lineTokens, index) },
    };
    // if there is a ternary operator before the start, there is no need to replace it with
    // a condition operator to trigger an invertion on the first ternary expression
    // the close bracket is used to stop traversing any further into another conditional expression e.g. if (hello) |
    if (token !== '?' && !ConditionIndicatorBeforeStart.stopSymbols[token as keyof typeof ConditionIndicatorBeforeStart.stopSymbols]) {
      startPositionDetails.startOperatorPadding = token as string;
    }
    return startPositionDetails;
  }

  private static isValidToken(fullLineTokens: Tokens, { index, token }: FirstFoundToken): boolean {
    return (
      ConditionIndicatorBeforeStart.isPermittedIfCloseBracket(fullLineTokens, index) &&
      (ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(fullLineTokens, index, false) ||
        ConditionIndicatorBeforeStart.stopSymbols[token as keyof typeof ConditionIndicatorBeforeStart.stopSymbols])
    );
  }

  private static searchLineFromIndex(line: number, lineTokens: Tokens, endIndex: number, fullLineTokens: Tokens): StartPositionDetails {
    const tokens = lineTokens.slice(0, endIndex);
    const conditionIndicatorTokens = { ...LineTokenTraversalUtils.conditionIndicators, ...ConditionIndicatorBeforeStart.stopSymbols } as TokensJSON;
    const result = TraversalUtil.findFirstTokenFromSelection(tokens, 0, conditionIndicatorTokens, false);
    if (result) {
      if (ConditionIndicatorBeforeStart.isValidToken(fullLineTokens, result)) {
        return ConditionIndicatorBeforeStart.generateNewStartPositionDetails(line, lineTokens, result);
      }
      return ConditionIndicatorBeforeStart.searchLineFromIndex(line, tokens, result.index, fullLineTokens);
    }
    return { position: { line, character: 0 } };
  }

  private static searchLeftAndUpwards(editor: TextEditor, line: number, endChar?: number): StartPositionDetails {
    endChar ??= editor.document.lineAt(line).range.end.character;
    if (endChar === 0 && line === 0) return { position: { line: 0, character: 0 } };
    const lineTokens = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, endChar);
    for (let i = lineTokens.length - 1; i >= 0; i -= 1) {
      if (!SPACE_JSON[lineTokens[i] as string]) {
        const fullLineTokens = LineTokenTraversalUtils.getFullLineTokens(editor, line);
        return ConditionIndicatorBeforeStart.searchLineFromIndex(line, lineTokens, i + 1, fullLineTokens);
      }
    }
    return ConditionIndicatorBeforeStart.searchLeftAndUpwards(editor, line - 1);
  }

  private static isConditionIndicator(editor: TextEditor, line: number, lineTokens: Tokens, startChar: number): boolean {
    // the following line is used to help evaluate more detailed operators like a ternary operator which needs to make sure that there is are no
    // particular symbols before it as otherwise the logic would not recognise it as a ternary operator and return false. Additionally we can trust
    // startChar to not be in the middle of a word due to prior analysis at FullWordRange
    const tokensBeforeChar = LineTokenTraversalUtils.getLineTokensBeforeCharNumber(editor, line, startChar);
    return ConditionIndicatorValidator.isTokenIndexPartOfConditionIndicator(tokensBeforeChar.concat(lineTokens), tokensBeforeChar.length);
  }

  private static isStartAfterConditionIndicator(editor: TextEditor, line: number, startChar?: number): boolean {
    startChar ??= 0;
    const lineTokens = LineTokenTraversalUtils.getLineTokensAfterCharNumber(editor, line, startChar);
    for (let i = 0; i < lineTokens.length; i += 1) {
      if (!SPACE_JSON[lineTokens[i] as string]) {
        return ConditionIndicatorBeforeStart.isConditionIndicator(editor, line, lineTokens, startChar);
      }
    }
    if (editor.document.lineCount - 1 < line + 1) return false;
    return ConditionIndicatorBeforeStart.isStartAfterConditionIndicator(editor, line + 1);
  }

  private static isStartOnOrAfterConditionIndicator(editor: TextEditor, highlightStart: Position): boolean {
    const { line, character } = highlightStart;
    const charBeforeStart = editor.document.getText(RangeCreator.create({ line, character: Math.max(0, character - 1) }, highlightStart));
    // if the cursor is on the right of a non-space, check if it is a condition
    // contrary to isStartAfterConditionIndicator, this brings an advantage to check for a case where the start cursor is at the end of
    // a line and the condition indicator is at the start of the next
    if (Object.keys(SPACE_JSON).indexOf(charBeforeStart) === -1 && charBeforeStart !== '') {
      const lineTokens = LineTokenTraversalUtils.getLineTokensAfterCharNumber(editor, line, character);
      return ConditionIndicatorBeforeStart.isConditionIndicator(editor, line, lineTokens, character);
    }
    return ConditionIndicatorBeforeStart.isStartAfterConditionIndicator(editor, line, character);
  }

  public static getStartPositionDetails(editor: TextEditor, fullWordRange: Range): StartPositionDetails {
    const highlightStart = fullWordRange.start;
    if (!ConditionIndicatorBeforeStart.isStartOnOrAfterConditionIndicator(editor, highlightStart)) {
      return ConditionIndicatorBeforeStart.searchLeftAndUpwards(editor, highlightStart.line, highlightStart.character);
    }
    return { position: highlightStart };
  }
}
