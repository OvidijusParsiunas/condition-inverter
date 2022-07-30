import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { DjangoFlaskUtil } from '../expandSelection/htmlTagUtils/specialisedSyntax/djangoFlaskUtil';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class CurlyBracketSyntaxUtil {
  public static isStringTemplateOpenToken(tokens: Tokens, currentIndex: number): boolean {
    return tokens[currentIndex] === '{' && tokens[currentIndex - 1] === '$';
  }

  public static isEmberCloseClause(fullLineTokens: Tokens, index: number): boolean {
    if (fullLineTokens[index] === '}') {
      const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, index - 1, false);
      if (fullLineTokens[previousTokenIndex] === '}') return true;
      const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(fullLineTokens, index + 1);
      return fullLineTokens[nextTokenIndex] === '}';
    }
    return false;
  }

  private static isEmberOpenClause(tokens: Tokens, currentIndex: number): boolean {
    const previousTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, currentIndex - 1, false);
    if (tokens[previousTokenIndex] === '{') {
      const indexBeforeSecondCurlyBrace = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, previousTokenIndex - 1, false);
      return tokens[indexBeforeSecondCurlyBrace] === '=';
    }
    if (tokens[previousTokenIndex] === '=') {
      const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, currentIndex + 1);
      return tokens[nextTokenIndex] === '{';
    }
    return false;
  }

  public static isScopeOpenToken(tokens: Tokens, currentIndex: number): boolean {
    return tokens[currentIndex] === '{' && tokens[currentIndex - 1] !== '$';
  }

  public static isStartSelectionExpansionStopToken(tokens: Tokens, currentIndex: number): boolean {
    return (
      tokens[currentIndex] === '{' &&
      !CurlyBracketSyntaxUtil.isStringTemplateOpenToken(tokens, currentIndex) &&
      !CurlyBracketSyntaxUtil.isEmberOpenClause(tokens, currentIndex)
    );
  }

  // when |} for html value, ember close clause |}} or }|}, or django close clause %|}
  public static isScopeClose(tokens: Tokens, currentIndex: number): boolean {
    if (tokens[currentIndex] === '}') {
      return (
        AnalyzeHTMLTag.isCloseBraceForHTMLAttribribute(tokens, currentIndex) ||
        CurlyBracketSyntaxUtil.isEmberCloseClause(tokens, currentIndex) ||
        DjangoFlaskUtil.isCloseClauseStartingWthCloseBrace(tokens, currentIndex)
      );
    }
    return false;
  }
}
