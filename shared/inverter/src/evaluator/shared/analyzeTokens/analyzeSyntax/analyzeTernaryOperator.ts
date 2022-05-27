import { jstsReservedTerminatingWords } from '../../../../shared/consts/jstsReservedTerminatingWords';
import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { Tokens } from '../../../../shared/types/tokens';

export class AnalyzeTernaryOperator {
  private static getColonEndViaTerminatingToken(tokens: Tokens, colonIndex: number): number {
    const colonEndToken = TraversalUtil.findFirstTokenFromSelection(tokens, colonIndex + 1, jstsReservedTerminatingWords);
    if (colonEndToken.token !== null) {
      return colonEndToken.index - 1;
    }
    return -1;
  }

  private static movePastColonExpression(tokens: Tokens, colonIndex: number): number {
    // line below attempts to find ending bracket by pretending to alrady have one open
    // this is important for conditions outside of statement analysis as they start with
    // 0 brackets marked as open even though the first element is an open bracket
    // this additionally allows invertion to happen inside the brackets e.g.:
    // (mouse ? dog : cat) -> (!mouse ? dog : cat)
    const closingBracketIndex = TraversalUtil.getIndexOfClosingBracket(tokens, colonIndex, 1);
    if (closingBracketIndex > -1) return closingBracketIndex - 1;
    // not checking whether terminatingTokenIndex comes before closingBracketIndex because is closingBracketIndex
    // is present - then it will definitely be the closing index of the ternary operator as I have yet to find
    // a syntax case where it is not
    const terminatingTokenIndex = AnalyzeTernaryOperator.getColonEndViaTerminatingToken(tokens, colonIndex);
    if (terminatingTokenIndex > -1) return terminatingTokenIndex;
    // get the token before the last one - mostly used for partial highlight outside of statement
    return tokens.length - 2;
  }

  // currently there is a flaw where the first expression before the column that is a nested typescript function
  // which contains a return type such as : void, will have its colon identified and regarded as a ternary colon
  // which means that the analysis can end earlier if the function also contains a jstsReservedTerminatingWords
  // word, and anything after it will get analyzed and inverted as part of normal analysis. E.g.
  // if (mouse && cat ? (): void => { if (cat || dog) { console.log('hello'); } } || cat : cat) { console.log(2) }
  // will invert || cat
  public static movePastTernaryOperator(tokens: Tokens, postQuestionMarkIndex: number): number {
    const colonIndex = TraversalUtil.getIndexOfCurrentTernaryColon(tokens, postQuestionMarkIndex, 1);
    if (colonIndex > -1) {
      return AnalyzeTernaryOperator.movePastColonExpression(tokens, colonIndex);
    }
    // get the token before the last one - mostly used for partial highlight outside of statement
    return tokens.length - 2;
  }
}
