import { TraversalUtil } from '../../../../shared/functionality/traversalUtil';
import { Tokens } from '../../../../shared/types/tokens';

// important to note that html attribute conditions are regarded and analysed as outside of statement conditions, however there
// are dom conditions that must be inverted without a condition symbol such as ng-hide; ng-hide="dog" = ng-hide="!dog"
export class AnalyzeAngular {
  // ng-hide, ng-show
  public static isAngularJSDirective(tokens: Tokens, index: number): boolean {
    if (tokens[index] === 'hide' || tokens[index] === 'show') {
      return tokens[index - 1] === '-' && tokens[index - 2] === 'ng';
    }
    return false;
  }

  public static isAngular2Directive(tokens: Tokens, index: number): boolean {
    // [hidden]=
    if (tokens[index] === 'hidden') {
      const indexOfTokenAfterHidden = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index + 1);
      if (tokens[indexOfTokenAfterHidden] === ']') {
        const indexOfTokenAfterCloseSqrBracket = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, indexOfTokenAfterHidden + 1);
        return tokens[indexOfTokenAfterCloseSqrBracket] === '=';
      }
    }
    // [class.name]=
    if (tokens[index] === 'class' && tokens[index + 1] === '.') {
      const nextTokenIndex = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, index + 2);
      // when class.name]=", we need to skip the name and set indexOfTokenAfterStartSymbol to ] index
      const indexOfTokenAfterNext = TraversalUtil.getSiblingNonSpaceTokenIndex(tokens, nextTokenIndex + 1);
      return tokens[indexOfTokenAfterNext] === ']';
    }
    // *ngIf=
    return tokens[index] === 'ngIf';
  }
}
