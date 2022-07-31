import { AnalyzeHTMLTag } from 'shared/inverter/src/evaluator/conditionAnalyzers/shared/analyzeTokens/analyzeSyntax/analyzeHTMLTag';
import { DjangoFlaskUtil } from '../expandSelection/htmlTagUtils/specialisedSyntax/djangoFlaskUtil';
import { SvelteUtil } from '../expandSelection/htmlTagUtils/specialisedSyntax/svelteUtil';
import { EmberUtil } from '../expandSelection/htmlTagUtils/specialisedSyntax/emberUtil';
import { TraversalUtil } from 'shared/inverter/src/shared/functionality/traversalUtil';
import { Tokens } from 'shared/inverter/src/shared/types/tokens';

export class CurlyBracketSyntaxUtil {
  private static isStringTemplateOpenToken(tokens: Tokens, currentIndex: number): boolean {
    return tokens[currentIndex] === '{' && tokens[currentIndex - 1] === '$';
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

  // when |} for html value, ember close clause |}} or }|}, svelte {:else if |}, django close clause %|},
  public static isScopeClose(tokens: Tokens, currentIndex: number): boolean {
    if (tokens[currentIndex] === '}') {
      return (
        AnalyzeHTMLTag.isCloseBraceForHTMLAttribribute(tokens, currentIndex) ||
        EmberUtil.isCloseClause(tokens, currentIndex) ||
        SvelteUtil.isCloseClause(tokens, currentIndex) ||
        DjangoFlaskUtil.isCloseClauseStartingWthCloseBrace(tokens, currentIndex)
      );
    }
    return false;
  }
}
