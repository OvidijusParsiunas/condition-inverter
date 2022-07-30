// prettier-ignore
import {
  AnalyzeFrontendFramework
} from 'shared/inverter/src/evaluator/conditionAnalyzers/analyzeConditionInsideStatement/utils/analyzeFrontendFramework';
import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { StartPositionDetails } from '../../../../../shared/types/inversionRangeDetails';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { STRING_QUOTE_JSON } from 'shared/inverter/src/shared/consts/specialTokens';
import { LineTokenTraversalUtil } from '../../../shared/lineTokenTraversalUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';
import { CurlyBracketSyntaxUtil } from '../../../shared/curlyBracketSyntaxUtil';

export class SelectionStartDetailsForHTMLToken {
  private static createPositionDetails(fullLineTokens: Tokens, tokenIndex: number, line: number): StartPositionDetails {
    return { position: { line, character: LineTokenTraversalUtil.getTokenStringIndex(fullLineTokens, tokenIndex) } };
  }

  private static createIfFrameworkConditionSyntax(fullLineTokens: Tokens, line: number, previousTokenIndex: number): StartPositionDetails | null {
    if (
      AnalyzeFrontendFramework.isStartOfAngularJSOrVueDirective(fullLineTokens, previousTokenIndex) ||
      AnalyzeFrontendFramework.isAngular2Directive(fullLineTokens, previousTokenIndex) ||
      AnalyzeFrontendFramework.isStartOfEmberIsActiveArgument(fullLineTokens, previousTokenIndex)
    ) {
      return SelectionStartDetailsForHTMLToken.createPositionDetails(fullLineTokens, previousTokenIndex, line);
    }
    return null;
  }

  // prettier-ignore
  private static createIfLessThanSymbolHTMLAttribute(
      fullLineTokens: Tokens, line: number, previousTokenIndex: number, currentLessThanSymbolIndex: number): StartPositionDetails | null {
    const indexOfTokenAfterLessThanSymbol = currentLessThanSymbolIndex + 1;
    if (previousTokenIndex === -1 && indexOfTokenAfterLessThanSymbol < fullLineTokens.length
        && AnalyzeHTMLTag.isHTMLTagWord(fullLineTokens[indexOfTokenAfterLessThanSymbol])) {
      return SelectionStartDetailsForHTMLToken.createPositionDetails(fullLineTokens, indexOfTokenAfterLessThanSymbol, line);
    }
    return null;
  }

  // prettier-ignore
  private static createIfOpenStringQuoteHTMLAttribute(
      fullLineTokens: Tokens, line: number, openStringQuoteIndex: number, currentIndex: number): StartPositionDetails | null {
    const tokenIndexBeforeOpenStringQuote = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, openStringQuoteIndex - 1, false);
    return fullLineTokens[tokenIndexBeforeOpenStringQuote] === '='
      ? SelectionStartDetailsForHTMLToken.createPositionDetails(fullLineTokens, currentIndex, line)
      : null;
  }

  // prettier-ignore
  private static createIfCloseBraceHTMLAttribute(
      fullLineTokens: Tokens, line: number, closeBraceIndex: number, currentIndex: number): StartPositionDetails | null {
    return AnalyzeHTMLTag.isCloseBraceForHTMLAttribribute(fullLineTokens, closeBraceIndex)
      ? SelectionStartDetailsForHTMLToken.createPositionDetails(fullLineTokens, currentIndex, line)
      : null;
  }

  // prettier-ignore
  private static createIfStringQuoteHTMLAttribute(
      fullLineTokens: Tokens, line: number, previousTokenIndex: number, currentIndex: number): StartPositionDetails | null {
    // }"|
    if (fullLineTokens[previousTokenIndex] === '}') {
      return SelectionStartDetailsForHTMLToken.createIfCloseBraceHTMLAttribute(fullLineTokens, line, previousTokenIndex, currentIndex);
    }
    // ="dog"|
    const openStringQuoteIndex = TraversalUtil.findTokenIndex(fullLineTokens, currentIndex, fullLineTokens[currentIndex], false);
    if (openStringQuoteIndex > -1) {
      return SelectionStartDetailsForHTMLToken.createIfOpenStringQuoteHTMLAttribute(fullLineTokens, line, openStringQuoteIndex, currentIndex);
    }
    return null;
  }

  public static createPositionDetailsIfHTML(fullLineTokens: Tokens, line: number, currentIndex: number): StartPositionDetails | null {
    const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, currentIndex - 1, false);
    if (STRING_QUOTE_JSON[fullLineTokens[currentIndex] as keyof typeof STRING_QUOTE_JSON]) {
      return SelectionStartDetailsForHTMLToken.createIfStringQuoteHTMLAttribute(fullLineTokens, line, previousTokenIndex, currentIndex);
    } else if (fullLineTokens[currentIndex] === '<') {
      return SelectionStartDetailsForHTMLToken.createIfLessThanSymbolHTMLAttribute(fullLineTokens, line, previousTokenIndex, currentIndex);
    } else if (CurlyBracketSyntaxUtil.isEmberCloseClause(fullLineTokens, currentIndex)) {
      return SelectionStartDetailsForHTMLToken.createPositionDetails(fullLineTokens, currentIndex, line);
    }
    return SelectionStartDetailsForHTMLToken.createIfFrameworkConditionSyntax(fullLineTokens, line, previousTokenIndex);
  }
}
