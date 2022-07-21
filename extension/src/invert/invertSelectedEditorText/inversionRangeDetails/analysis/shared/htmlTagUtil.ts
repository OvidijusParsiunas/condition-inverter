import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { ExpandIfCursorOnPotentialConditionOperatorUtil } from '../fullWordRange/util/selectionExpansionUtil';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { STRING_QUOTE_JSON } from 'shared/inverter/src/shared/consts/specialTokens';
import { LineTokenTraversalUtil } from './lineTokenTraversalUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { TextEditor, Position } from 'vscode';

export class HTMLTagUtil {
  public static isNextTokenTagStart(editor: TextEditor, highlightStart: Position): boolean {
    const lineTokensAfterChar = LineTokenTraversalUtil.getLineTokensAfterCharNumber(editor, highlightStart.line, highlightStart.character);
    return lineTokensAfterChar[0] === '<' && AnalyzeHTMLTag.isStartTagSymbol(lineTokensAfterChar, 0);
  }

  public static isEqualsForHTMLAttribute(fullLineTokens: Tokens, equalsIndex: number): boolean {
    const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, equalsIndex - 1);
    if (STRING_QUOTE_JSON[fullLineTokens[previousTokenIndex] as keyof typeof STRING_QUOTE_JSON] || fullLineTokens[previousTokenIndex] === ']') {
      return ExpandIfCursorOnPotentialConditionOperatorUtil.getEqualsExpansionUntilItEnds(fullLineTokens, equalsIndex) === 1;
    }
    return false;
  }
}
