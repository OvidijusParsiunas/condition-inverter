import { jstsReservedTerminatingWords } from '../../../../../shared/consts/jstsReservedTerminatingWords';
import { SPACE_JSON, STRING_QUOTE_JSON } from '../../../../../shared/consts/specialTokens';
import { TraversalUtil } from '../../../../../shared/functionality/traversalUtil';
import { Tokens } from '../../../../../shared/types/tokens';
import { AnalyzeHTMLTag } from './analyzeHTMLTag';

export class AnalyzeTernaryOperator {
  private static getEndIndexIfInHTMLTag(tokens: Tokens, colonIndex: number): number {
    // if string quote token or end of open tag appear - the first one is considered end of ternary operator
    const stringQuoteToken = TraversalUtil.findFirstTokenFromSelection(tokens, colonIndex, STRING_QUOTE_JSON);
    const endOfOpenTagIndex = AnalyzeHTMLTag.findEndOfOpenTagIndex(tokens, colonIndex);
    if (endOfOpenTagIndex > -1) {
      if (stringQuoteToken && stringQuoteToken.index < endOfOpenTagIndex) {
        return stringQuoteToken.index;
      }
      // the reason why endOfOpenTagIndex - 1 is being used is because attemptToFinishViaTerminatingWord needs to end symbol for the open tag
      return endOfOpenTagIndex - 1;
    }
    if (stringQuoteToken) {
      return stringQuoteToken.index;
    }
    return -1;
  }

  private static getColonEndViaTerminatingToken(tokens: Tokens, colonIndex: number): number {
    const terminatingWordToken = TraversalUtil.findFirstTokenFromSelection(tokens, colonIndex + 1, jstsReservedTerminatingWords);
    if (terminatingWordToken) return terminatingWordToken.index - 1;
    const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, colonIndex + 1);
    // if token after colon is a string quote, the ternary operator will end after that index ends
    if (STRING_QUOTE_JSON[tokens[nextTokenIndex] as keyof typeof SPACE_JSON]) {
      return TraversalUtil.findTokenIndex(tokens, nextTokenIndex, tokens[nextTokenIndex]) + 1;
    }
    return AnalyzeTernaryOperator.getEndIndexIfInHTMLTag(tokens, colonIndex);
  }

  private static movePastColonExpression(tokens: Tokens, colonIndex: number, conditionSequenceEndIndex: number): number {
    // line below attempts to find ending bracket by pretending to alrady have one open
    // this is important for conditions outside of statement analysis as they start with
    // 0 brackets marked as open even though the first element is an open bracket
    // this additionally allows invertion to happen inside the brackets e.g:
    // (mouse ? dog : cat) -> (!mouse ? dog : cat)
    const closingBracketIndex = TraversalUtil.getIndexOfClosingBracket(tokens, colonIndex, 1);
    // closingBracketIndex can sometimes be for a statement (e.g. if) close bracket, which should not be regarded as a close bracket of a condition
    // inside a ternary operator, therefore conditionSequenceEndIndex is used to make sure that the identified closeBracketIndex is before the end
    // of a statement close bracket as conditionSequenceEndIndex property is set as the end bracket during the analysis of a statement
    if (closingBracketIndex > -1 && closingBracketIndex < conditionSequenceEndIndex) return closingBracketIndex - 1;
    // not checking whether terminatingTokenIndex comes before closingBracketIndex because is closingBracketIndex
    // is present - then it will definitely be the closing index of the ternary operator as I have yet to find
    // a syntax case where it is not
    const terminatingTokenIndex = AnalyzeTernaryOperator.getColonEndViaTerminatingToken(tokens, colonIndex);
    if (terminatingTokenIndex > -1) return terminatingTokenIndex;
    // get the token before the last one - mostly used for partial highlight outside of statement
    return tokens.length - 2;
  }

  // currently there is a flaw where the first expression before the colon that is a nested typescript function
  // which contains a return type such as : void, will have its colon identified and regarded as a ternary colon
  // which means that the analysis can end earlier if the function also contains a jstsReservedTerminatingWords
  // word, anything after it will also get analyzed and inverted during normal condition analysis, e.g:
  // if (mouse && cat ? (): void => { if (cat || dog) { console.log('hello'); } } || cat : cat) { console.log(2) }
  // will invert || cat to && !dog
  // similarly, this will also not work where instead of a nested function (): void =>, it is a type assertion:
  // if (mouse && cat ? myFunction(dog as { animal: cat }) || cat : cat) { console.log(2) }
  // where || cat will be inverted to && !dog
  public static movePastTernaryOperator(tokens: Tokens, postQuestionMarkIndex: number, conditionSequenceEndIndex: number): number {
    const colonIndex = TraversalUtil.getIndexOfCurrentTernaryColon(tokens, postQuestionMarkIndex, 1);
    if (colonIndex > -1) {
      return AnalyzeTernaryOperator.movePastColonExpression(tokens, colonIndex, conditionSequenceEndIndex);
    }
    // get the token before the last one - mostly used for partial highlight outside of statement
    return tokens.length - 2;
  }
}
